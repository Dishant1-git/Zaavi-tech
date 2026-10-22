/* Blog articles. Starter posts written from Zaavi's service content; review the wording and dates before
   launch. To add a post, append an entry: it appears on /blog, gets its own page at /blog/<slug>, and the
   three newest show on the homepage. */

import { photos, type Photo } from "./images";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  readMinutes: number;
  cover: Photo;
  body: Block[];
  related?: string; // service page slug to link from the post
};

export const posts: Post[] = [
  {
    slug: "how-to-choose-your-first-ai-use-case",
    title: "How to Choose Your First AI Use Case",
    excerpt: "The best first AI project is rarely the most ambitious one. Here is a simple way to find a use case that is valuable, feasible and quick to prove.",
    category: "AI Strategy",
    date: "2026-10-20",
    readMinutes: 5,
    cover: photos.whiteboard,
    related: "ai-consulting",
    body: [
      { type: "p", text: "Most organisations do not lack AI ideas. They lack a reliable way to decide which idea to try first. Pick too big and the project stalls; pick too small and nobody notices the result. A good first use case sits in between: it solves a problem people feel every week, it uses data you already have, and you can measure the outcome within a few weeks." },
      { type: "h2", text: "Start with the problem, not the technology" },
      { type: "p", text: "List the tasks that consume time, cause delays or depend on a few experts. Typical candidates are repetitive document handling, the same questions answered again and again, slow reporting, and decisions made on gut feel because the data is hard to reach. Write each one down as a business problem, for example \"invoice data is re-keyed by hand\", not as a technology, such as \"we need a chatbot\"." },
      { type: "h2", text: "Score each idea on three things" },
      { type: "list", items: [
        "Value: how much time, cost or risk would a good solution remove, and who would notice?",
        "Feasibility: is the data available, reasonably clean and allowed to be used? Can the solution connect to the systems involved?",
        "Risk: what happens when the AI is wrong? Low-risk tasks with a human check are ideal first projects.",
      ] },
      { type: "p", text: "Ideas that score well on all three move to the top. Ideas with high value but low feasibility often become a second-phase project once the data groundwork is done." },
      { type: "h2", text: "Define success before you build" },
      { type: "p", text: "Agree one or two measures up front: hours saved per week, turnaround time, accuracy against a sample of past cases, or the share of questions answered without escalation. Measure today's baseline so the comparison is honest." },
      { type: "quote", text: "If you cannot say what \"better\" looks like, you are not ready to build yet." },
      { type: "h2", text: "Prove it small, then scale" },
      { type: "p", text: "Run a focused proof of concept on real data with a handful of users. Keep the scope tight, review the results against your measures, and only then plan the production rollout and integrations. This keeps spending proportional to evidence, and gives you a working example to build support for the next project." },
    ],
  },
  {
    slug: "rag-explained-ai-answers-from-your-documents",
    title: "RAG Explained: AI That Answers From Your Own Documents",
    excerpt: "Retrieval-augmented generation lets an AI assistant answer from your approved policies, manuals and knowledge base, with sources you can check.",
    category: "Generative AI",
    date: "2026-10-13",
    readMinutes: 6,
    cover: photos.robotReading,
    related: "rag-solutions",
    body: [
      { type: "p", text: "General-purpose AI models are trained on public information. They do not know your pricing, your HR policy or last month's product update, and when they do not know something they can still produce a confident-sounding answer. Retrieval-augmented generation, usually shortened to RAG, addresses both problems." },
      { type: "h2", text: "How RAG works" },
      { type: "list", items: [
        "Your approved documents are split into passages and indexed so they can be searched by meaning, not just keywords.",
        "When someone asks a question, the system retrieves the most relevant passages for that question.",
        "The AI model writes its answer using only those passages, and shows which sources it used.",
      ] },
      { type: "p", text: "Because the answer is grounded in retrieved text, people can click through to the source and check it. When the documents change, the index is refreshed and answers follow, with no model retraining needed." },
      { type: "h2", text: "Where it helps most" },
      { type: "p", text: "RAG works well wherever people spend time searching for information that already exists: employee policy and procedure questions, technical support knowledge bases, sales teams looking up product details, and customer service agents who need the right answer quickly." },
      { type: "h2", text: "What makes a RAG system trustworthy" },
      { type: "list", items: [
        "Access controls, so each person only retrieves documents they are allowed to see.",
        "Clean, current source material. Outdated or contradictory documents produce outdated or contradictory answers.",
        "Citations on every answer, and a clear \"I don't know\" when nothing relevant is found.",
        "Testing against a set of real questions before launch, and monitoring afterwards.",
      ] },
      { type: "quote", text: "A knowledge assistant is only as good as the knowledge you give it." },
      { type: "p", text: "Start with one well-maintained document collection and a group of users who ask the same questions often. That gives you a clear way to measure accuracy and time saved before expanding to more content." },
    ],
  },
  {
    slug: "proof-of-concept-pilot-production",
    title: "Proof of Concept, Pilot, Production: What Each Stage Should Prove",
    excerpt: "AI projects stall when every stage tries to do everything. Giving each stage one clear job keeps progress steady and spending under control.",
    category: "Delivery",
    date: "2026-10-06",
    readMinutes: 5,
    cover: photos.presentation,
    related: "ai-integration",
    body: [
      { type: "p", text: "Many AI initiatives end as impressive demos that never reach everyday use. A common cause is that the stages blur together: a proof of concept is expected to be production-ready, or a production system is launched without ever being tested with real users. Separating the stages, each with its own question to answer, avoids this." },
      { type: "h2", text: "Proof of concept: can it work?" },
      { type: "p", text: "The goal is to test feasibility on your real data, quickly and cheaply. It does not need polished screens or full integrations. It needs a representative sample of data, clear success measures and an honest review of the results, including where the approach falls short." },
      { type: "h2", text: "Pilot: does it work for people?" },
      { type: "p", text: "A pilot puts the solution in front of a small group of real users doing real work. The questions change: does it fit the workflow, do people trust the output, and what happens with the edge cases nobody anticipated? This is where usability, review steps and support processes take shape." },
      { type: "h2", text: "Production: can it run reliably at scale?" },
      { type: "list", items: [
        "Integration with the systems people already use, with proper permissions and data flows.",
        "Monitoring of accuracy, speed and cost, with alerts when performance drifts.",
        "Security review, audit logs and a clear owner for the solution.",
        "Training for users and a plan for regular improvement.",
      ] },
      { type: "quote", text: "Each stage should end with a decision: continue, change course, or stop." },
      { type: "p", text: "Treating stopping as a valid outcome is what keeps the approach affordable. You invest more only as the evidence grows, and the projects that reach production have already earned their place." },
    ],
  },
  {
    slug: "keeping-ai-secure-checklist",
    title: "Keeping AI Secure: A Practical Checklist for Business Leaders",
    excerpt: "Security and reliability are not add-ons for AI projects. These are the questions to ask before, during and after you launch.",
    category: "Security",
    date: "2026-09-29",
    readMinutes: 4,
    cover: photos.circuit,
    related: "ai-consulting",
    body: [
      { type: "p", text: "AI solutions handle the same sensitive information as the rest of your business, and they add new questions: what data does the model see, where is it processed, and how do you know the output is right? The good news is that the answers are mostly familiar disciplines applied carefully." },
      { type: "h2", text: "Before you build" },
      { type: "list", items: [
        "Which data will the solution use, and are you permitted to use it for this purpose?",
        "Where will data be processed and stored, and does that meet the data-protection laws that apply to you?",
        "What is the impact if the AI gets an answer wrong, and where must a person review the output?",
      ] },
      { type: "h2", text: "While you build" },
      { type: "list", items: [
        "Apply least-privilege access: the solution and its users see only what they need.",
        "Minimise data: send models the fields required for the task, not entire records.",
        "Test outputs against real examples for accuracy, consistency and harmful or off-topic responses.",
        "Log activity so actions and decisions can be traced.",
      ] },
      { type: "h2", text: "After you launch" },
      { type: "list", items: [
        "Monitor accuracy and behaviour over time, since data and usage change.",
        "Give users an easy way to flag wrong answers, and review those reports regularly.",
        "Review access, vendors and costs on a schedule, not only when something goes wrong.",
      ] },
      { type: "quote", text: "Being clear about what a solution can and cannot do is part of its security." },
      { type: "p", text: "None of this needs to slow a project down. Built in from day one, these controls are what let teams trust the solution enough to use it every day." },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
