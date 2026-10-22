import Image from "next/image";
import type { IconName } from "@/lib/content";
import type { Photo as PhotoData } from "@/lib/images";
import Icon from "@/components/ag/icons";

/** Rounded, cropped photo that fills its box; optional icon + label chip in the corner. */
export default function Photo({
  photo,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  tint = false,
  icon,
  label,
  priority,
}: {
  photo: PhotoData;
  sizes?: string;
  className?: string;
  tint?: boolean;
  icon?: IconName;
  label?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${tint ? "photo-tint" : ""} ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} />
      {label && (
        <div className="chip">
          {icon && <span className="i"><Icon name={icon} /></span>}
          {label}
        </div>
      )}
    </div>
  );
}
