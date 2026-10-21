"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Domain-warped fbm "neural plasma" with contour lines that bend toward the cursor.
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_c1;
uniform vec3 u_c2;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0);
  float t = u_time * 0.05;

  float md = length(p - m);
  p += (p - m) * 0.18 * exp(-md * 2.5);

  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 4.0));
  vec2 r = vec2(fbm(p * 1.8 + q * 2.2 + vec2(1.7, 9.2) + t * 1.4), fbm(p * 1.8 + q * 2.2 + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.8 + r * 1.6);

  vec3 cyan = u_c1;
  vec3 violet = u_c2;
  vec3 col = vec3(0.012, 0.014, 0.03);
  col = mix(col, violet * 0.45, smoothstep(0.35, 0.95, f));
  col = mix(col, cyan * 0.55, smoothstep(0.5, 1.0, f * r.x * 1.7));

  float lines = abs(fract(f * 9.0 - t * 2.0) - 0.5);
  col += mix(cyan, violet, uv.x) * 0.22 * smoothstep(0.045, 0.0, lines) * smoothstep(0.35, 0.75, f);
  col += cyan * 0.08 * exp(-md * 4.0);

  col *= smoothstep(1.35, 0.15, length(p * vec2(0.75, 1.1)));
  col *= smoothstep(0.0, 0.45, uv.y);
  gl_FragColor = vec4(col, 1.0);
}
`;

type RGB = [number, number, number];

export default function ShaderBackground({
  className = "",
  colors = [[0.13, 0.83, 0.93], [0.55, 0.36, 0.96]],
}: {
  className?: string;
  /** Two linear-RGB colors (0–1) for the highlight and body of the field. */
  colors?: [RGB, RGB];
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    gl.uniform3fv(gl.getUniformLocation(prog, "u_c1"), colors[0]);
    gl.uniform3fv(gl.getUniformLocation(prog, "u_c2"), colors[1]);

    // Render below native resolution: the field is soft, so this is free quality-wise.
    const scale = Math.min(window.devicePixelRatio, 1.5) * 0.6;
    const resize = () => {
      canvas.width = Math.floor(canvas.clientWidth * scale);
      canvas.height = Math.floor(canvas.clientHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0.5, y: 0.6, tx: 0.5, ty: 0.6 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, still ? 20 : (performance.now() - start) / 1000 + 20);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={`h-full w-full ${className}`} aria-hidden />;
}
