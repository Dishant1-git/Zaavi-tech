/* All website copy, taken from "Zaavi Technologies — Website Content (Revised Draft)", 20 October 2026.
   Editor notes from that document are not published; they are kept here as comments where relevant. */

import { site } from "./site";

export type IconName =
  | "spark" | "workflow" | "chart" | "chat" | "cloud" | "signal" | "compass" | "doc" | "text" | "bot"
  | "brain" | "dashboard" | "plug" | "server" | "shield" | "refresh" | "target" | "flask" | "link"
  | "gauge" | "lock" | "rocket" | "factory" | "cart" | "cap" | "heart" | "truck" | "bank" | "building";

/* ------------------------------------------------------------------ Service landing pages (Part 5) */

export type Landing = {
  slug: string;
  group: "ai" | "enterprise";
  requires?: keyof typeof site.offers;
  nav: string;
  icon: IconName;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  deliver: string[];
  helps: string[];
  closing: string;
  cta: string;
  /** Part 10: "one simple diagram per page showing how the solution works". */
  flow: [string, string, string];
};

export const landings: Landing[] = [
  {
    slug: "ai-consulting",
    group: "ai",
    nav: "AI Consulting",
    icon: "compass",
    seoTitle: "AI Consulting & Strategy Services | Zaavi Technologies",
    metaDescription: "Find where AI will pay off. Use-case prioritisation, data-readiness assessment and a costed AI roadmap. Book an AI strategy session.",
    h1: "AI Consulting & Strategy Services",
    intro: "Know where AI will pay off before you spend on it. We help you identify, prioritise and plan AI initiatives that match your goals, data and budget.",
    deliver: [
      "AI opportunity workshop with your leadership and process owners",
      "Use-case shortlist ranked by value, feasibility and risk",
      "Data-readiness and technology assessment",
      "Costed implementation roadmap with success measures",
      "Governance and responsible-AI guidelines",
    ],
    helps: ["Building a first AI strategy", "Choosing between competing AI ideas or vendors", "Restarting a stalled AI initiative"],
    closing: "Invest in the AI projects that will actually move the needle.",
    cta: "Book an AI Strategy Session",
    flow: ["Your goals, processes & data", "Opportunity assessment", "Costed AI roadmap"],
  },
  {
    slug: "generative-ai-solutions",
    group: "ai",
    nav: "Generative AI",
    icon: "spark",
    seoTitle: "Generative AI Solutions for Business | Zaavi Technologies",
    metaDescription: "Secure generative AI to summarise documents, draft content and search your company knowledge. Explore a generative AI use case.",
    h1: "Generative AI Solutions for Businesses",
    intro: "Generative AI can draft, summarise and answer questions in seconds. We help you use it safely on your own content, so outputs are accurate, private and genuinely useful.",
    deliver: [
      "Document summarisation, extraction and processing",
      "Content drafting workflows for reports, proposals and emails",
      "Knowledge discovery across your files and systems",
      "Model selection, secure deployment and cost control",
      "Guardrails, quality testing and usage monitoring",
    ],
    helps: ["Summarising contracts, reports and meeting notes", "Drafting proposals and responses from past work", "Finding answers across thousands of documents"],
    closing: "Give every employee a capable assistant that knows your business.",
    cta: "Explore a Generative AI Use Case",
    flow: ["Your documents & data", "Secure generative AI", "Summaries, drafts & answers"],
  },
  {
    slug: "ai-automation",
    group: "ai",
    nav: "AI Automation & Agents",
    icon: "workflow",
    seoTitle: "AI Automation & AI Agents | Zaavi Technologies",
    metaDescription: "Automate invoices, tickets and onboarding with AI agents that follow your rules and keep people in control. Start with one workflow.",
    h1: "AI Automation & AI Agent Development",
    intro: "Automate the repetitive, multi-step work that slows your team down. Our AI agents read, decide and act within the rules you set, and bring in a person whenever judgement is needed.",
    deliver: [
      "Process discovery and an automation roadmap ranked by return",
      "AI agents connected to email, CRM, ERP and helpdesk tools",
      "Document-driven workflows for invoices, forms and onboarding",
      "Permissions, approval steps and full activity logs",
      "Dashboards tracking time and cost saved",
    ],
    helps: ["Invoice and form processing", "Routing and responding to support tickets", "Employee and customer onboarding"],
    closing: "Free your people for work that needs a human.",
    cta: "Automate a Workflow",
    flow: ["Incoming work: emails, invoices, tickets", "AI agent acting within your rules", "Task completed or passed to a person"],
  },
  {
    slug: "machine-learning",
    group: "ai",
    nav: "Machine Learning & Predictive Analytics",
    icon: "brain",
    seoTitle: "Machine Learning & Predictive Analytics | Zaavi",
    metaDescription: "Forecast demand, detect anomalies and predict risks with machine learning models built on your data and monitored in production.",
    h1: "Machine Learning & Predictive Analytics Solutions",
    intro: "Your data already holds early warnings and opportunities. We build machine learning models that surface them: forecasting demand, spotting anomalies and predicting problems before they cost you.",
    deliver: [
      "Data assessment and preparation",
      "Custom forecasting, classification and anomaly-detection models",
      "Dashboards and automated alerts",
      "Deployment, monitoring and retraining",
    ],
    helps: ["Demand and inventory forecasting", "Predictive maintenance for equipment and networks", "Risk and fraud detection"],
    closing: "Move from reacting to anticipating.",
    cta: "Assess Your Data",
    flow: ["Historical & operational data", "Trained, monitored model", "Forecasts, alerts & dashboards"],
  },
  {
    slug: "ai-chatbot-development",
    group: "ai",
    nav: "AI Chatbots",
    icon: "chat",
    seoTitle: "AI Chatbot Development Services | Zaavi Technologies",
    metaDescription: "24/7 AI chatbots for customers and staff, connected to your knowledge base and systems, with smooth handover to human agents.",
    h1: "AI Chatbot Development",
    intro: "Give customers and employees instant, accurate answers 24/7, on your website, messaging channels or internal portal.",
    // Editor note: confirm which channels (WhatsApp, Teams, web) and languages Zaavi supports.
    deliver: [
      "Customer-service and internal helpdesk chatbots",
      "Integration with your knowledge base, CRM and booking systems",
      "Website, WhatsApp and Microsoft Teams channels",
      "Smooth handover to human agents",
      "Analytics on questions, resolution rates and satisfaction",
    ],
    helps: ["Customer FAQs, order tracking and enquiries", "IT and HR helpdesk", "Lead capture and appointment booking"],
    closing: "Answer every query, day or night, without adding headcount.",
    cta: "Design Your Chatbot",
    flow: ["Customer or staff question", "Assistant connected to your knowledge", "Instant answer or human handover"],
  },
  {
    slug: "rag-solutions",
    group: "ai",
    nav: "RAG Knowledge Assistants",
    icon: "doc",
    seoTitle: "Enterprise RAG & Knowledge Assistants | Zaavi",
    metaDescription: "AI assistants that answer from your own documents with source citations and role-based access. Build a secure knowledge assistant.",
    h1: "Enterprise RAG & AI Knowledge Assistants",
    intro: "Turn your manuals, policies and records into an assistant that answers questions accurately, citing the exact source, and only shows people what they are allowed to see.",
    deliver: [
      "Secure ingestion of documents, wikis and databases",
      "Retrieval-augmented generation (RAG) with source citations",
      "Role-based access controls",
      "Accuracy testing against real questions",
      "Ongoing content updates and monitoring",
    ],
    helps: ["Policy and SOP assistant for employees", "Technical support knowledge base", "Sales assistant for product and pricing information"],
    closing: "Make your organisation's knowledge instantly accessible and reliable.",
    cta: "Build a Knowledge Assistant",
    flow: ["Approved documents", "AI knowledge assistant", "Cited answer"],
  },
  {
    slug: "ai-integration",
    group: "ai",
    nav: "AI Integration",
    icon: "plug",
    seoTitle: "AI Integration Services | Zaavi Technologies",
    metaDescription: "Connect AI to your ERP, CRM, websites and apps through secure APIs, with permissions, monitoring and cost controls built in.",
    h1: "AI Integration Services",
    intro: "AI delivers most when it sits inside the tools your team already uses. We connect AI capabilities to your applications, websites and data, securely and reliably.",
    deliver: [
      "Integration architecture and data-flow design",
      "API development and connectors for ERP, CRM and web apps",
      "Authentication, permissions and audit logging",
      "Performance, error handling and cost controls",
      "Testing and documentation",
    ],
    helps: ["Adding AI features to an existing product or portal", "Connecting a chatbot to live business data", "Automating hand-offs between systems"],
    closing: "Make AI part of the way your business already works.",
    cta: "Plan Your Integration",
    flow: ["Your ERP, CRM & apps", "Secure APIs & connectors", "AI inside everyday tools"],
  },
  {
    slug: "cloud-services",
    group: "enterprise",
    requires: "cloud",
    nav: "Cloud Infrastructure & Migration",
    icon: "cloud",
    seoTitle: "Cloud Infrastructure & Migration | Zaavi Technologies",
    metaDescription: "Cloud migration and AI-ready infrastructure planned for performance, security and cost. Plan your migration with Zaavi Technologies.",
    h1: "Cloud Infrastructure & Migration Services",
    intro: "AI is only as reliable as the infrastructure beneath it. We plan, migrate and manage cloud environments that are secure, scalable and cost-efficient.",
    deliver: [
      "Cloud readiness assessment and migration planning",
      "Migration of applications and data",
      "Infrastructure for AI and data workloads",
      "Security, backup and disaster recovery",
      "Monitoring and cost optimisation",
    ],
    helps: ["Moving legacy systems to the cloud", "Preparing data platforms for AI", "Reducing infrastructure cost and downtime"],
    closing: "Build on a foundation that scales with you.",
    cta: "Plan Your Migration",
    flow: ["Legacy systems & data", "Planned, secure migration", "Scalable, AI-ready cloud"],
  },
  {
    slug: "telecom-solutions",
    group: "enterprise",
    requires: "telecom",
    nav: "Telecom & Network Optimisation",
    icon: "signal",
    seoTitle: "Telecom & Network Optimisation | Zaavi Technologies",
    metaDescription: "Network measurement, audits, KPI analytics and AI-assisted anomaly detection for telecom operators and enterprises.",
    h1: "Telecom & Network Optimisation",
    intro: "We help telecom operators and enterprises measure, analyse and optimise network performance, using AI to find issues faster than manual analysis.",
    deliver: [
      "Network measurement and performance monitoring",
      "Technical and process audits",
      "Network data analysis and KPI reporting",
      "AI-assisted anomaly detection",
      "Optimisation recommendations and remediation plans",
    ],
    helps: ["Coverage and quality benchmarking", "Early detection of performance degradation", "Post-rollout network validation"],
    closing: "Know exactly how your network performs, and how to improve it.",
    cta: "Talk to Our Telecom Team",
    flow: ["Network measurements & data", "AI-assisted analysis", "Optimisation plan"],
  },
];

export const activeLandings = landings.filter((l) => !l.requires || site.offers[l.requires]);
export const landingBySlug = (slug: string) => activeLandings.find((l) => l.slug === slug);

/* ------------------------------------------------------------------ Homepage (Part 2) */

export const home = {
  seoTitle: "Zaavi Technologies | AI Solutions & Intelligent Automation",
  metaDescription: "Practical AI, automation, machine learning and analytics, connected to your systems and proven before they scale. Discuss your AI project.",
  hero: {
    h1: "Turn AI into Measurable Business Advantage.",
    sub: "Practical AI, automation and analytics: designed around your processes, connected to your systems and proven before they scale.",
    body: "Zaavi Technologies helps organisations put artificial intelligence to work. We identify where AI will pay off, build solutions that fit the software and data you already use, and stay with you until they deliver.",
    cta: "Discuss Your AI Project",
    secondary: "Explore AI Solutions",
  },
  // Editor note: add "[X]+ Projects Delivered" and partner badges only once verified; until then show the service line alone.
  trust: ["AI Consulting", "Generative AI", "Automation", "Analytics", "Cloud"],
  intro: {
    h2: "Intelligence That Works for Your Business.",
    lead: "AI creates value when it solves the right problem, not when it is added for its own sake.",
    body: [
      "Zaavi Technologies starts with your goals: the process that takes too long, the decision made on gut feel, the question your team answers a hundred times a week. We find where AI makes a real difference, build it into the systems your people already use, and measure the result.",
      "Whether you are exploring your first AI project or modernising established systems, you get a clear plan, a working solution and results you can measure.",
    ],
    approach: ["Find the right problem", "Prove the value", "Scale with confidence"],
  },
  closing: {
    h2: "Ready to See What AI Can Do for Your Business?",
    body: "Bring us one challenge: a slow process, a data question or an idea you want to test. We'll help you judge whether AI is the right fit and map the fastest practical path to results.",
    cta: "Discuss Your AI Requirements",
  },
};

export type Card = { title: string; headline: string; copy: string; link: string; href: string; icon: IconName; requires?: keyof typeof site.offers };

const deliverAll: Card[] = [
  { title: "Generative AI Solutions", headline: "Put your organisation's knowledge to work.", copy: "AI that drafts, summarises and answers questions from your own documents and data. Your team finds information in seconds instead of searching for hours.", link: "Explore Generative AI", href: "/generative-ai-solutions", icon: "spark" },
  { title: "Intelligent Automation & AI Agents", headline: "Take repetitive work off your team's desk.", copy: "Automate multi-step workflows such as data entry, document handling, ticket routing and reporting. AI agents work within the permissions you set and pass exceptions to people.", link: "Explore Automation", href: "/ai-automation", icon: "workflow" },
  { title: "Machine Learning & Predictive Analytics", headline: "See what's coming, not just what happened.", copy: "Forecast demand, spot anomalies and anticipate risks using models built on your own data. Insights arrive as dashboards and alerts your team can act on.", link: "Explore Analytics", href: "/machine-learning", icon: "chart" },
  { title: "AI Chatbots & Virtual Assistants", headline: "Instant answers, around the clock.", copy: "Assistants that handle customer enquiries, staff questions and service requests 24/7. They are connected to your knowledge base and hand over to a person when needed.", link: "Explore Chatbots", href: "/ai-chatbot-development", icon: "chat" },
  { title: "AI-Ready Cloud & Infrastructure", headline: "A foundation built for AI workloads.", copy: "Cloud migration, data platforms and system integration planned around performance, security and cost. Your AI runs reliably as usage grows.", link: "Explore Cloud Services", href: "/cloud-services", icon: "cloud", requires: "cloud" },
  { title: "Telecom & Network Intelligence", headline: "Smarter networks, fewer surprises.", copy: "Network analytics, performance monitoring, audits and optimisation, enhanced with AI that finds issues faster than manual analysis.", link: "Explore Telecom", href: "/telecom-solutions", icon: "signal", requires: "telecom" },
];

/** Editor note: if Cloud or Telecom is not offered, replace those cards with these. */
const deliverFallback: Card[] = [
  { title: "Data Analytics & Business Intelligence", headline: "Every team sees the numbers that matter.", copy: "Turn raw data into clear dashboards and reports. Every team can see performance, spot trends and act faster.", link: "Explore AI Solutions", href: "/ai-solutions", icon: "dashboard" },
  { title: "AI Consulting & Strategy", headline: "Know where AI will pay off.", copy: "We assess your processes and data and rank use cases by impact and feasibility. You get a practical, costed roadmap before you invest.", link: "Explore AI Consulting", href: "/ai-consulting", icon: "compass" },
];

export const deliverCards: Card[] = (() => {
  const cards = deliverAll.filter((c) => !c.requires || site.offers[c.requires]);
  const missing = deliverAll.length - cards.length;
  return [...cards, ...deliverFallback.slice(0, missing)];
})();

export const reasons: { title: string; copy: string; icon: IconName }[] = [
  { title: "Business problem first", copy: "We start with your operational challenge and recommend AI only where it outperforms simpler options.", icon: "target" },
  { title: "Proof before scale", copy: "A focused proof of concept on your real data shows the value before you commit to a full rollout.", icon: "flask" },
  { title: "Built into your systems", copy: "Our solutions connect to your existing software, data and workflows, so they become part of daily work instead of another tool to learn.", icon: "link" },
  { title: "Measured results", copy: "We agree success measures up front, such as hours saved, accuracy and response time, and report against them openly.", icon: "gauge" },
  { title: "Secure by design", copy: "Access controls, data protection, audit trails and human review are built in from day one, in line with the data-protection laws that apply to your business.", icon: "lock" },
  { title: "Ready to scale and supported", copy: "We plan for performance, maintenance and growth from the start, and keep improving solutions after go-live.", icon: "rocket" },
];

export const sixSteps = [
  { title: "Discover", body: "We map your objectives, workflows, available data and current challenges.", receive: "A shortlist of high-value AI opportunities" },
  { title: "Assess", body: "We test AI suitability, data readiness, feasibility, risks and expected return.", receive: "A business case and recommended approach" },
  { title: "Design", body: "We define the architecture, integrations, security controls and success criteria.", receive: "A solution blueprint and project plan" },
  { title: "Develop", body: "We build the solution and connect the models, data sources and systems it needs.", receive: "A working solution in a test environment" },
  { title: "Validate", body: "We test accuracy, reliability, usability, security and performance against the agreed criteria.", receive: "A test report and go-live sign-off" },
  { title: "Deploy & Improve", body: "We launch, train your users, monitor performance and roll out improvements.", receive: "A live solution, user training and regular performance reports" },
];

// Editor note: these are application areas, not completed client projects.
export const industries: { name: string; challenge: string; help: string; icon: IconName }[] = [
  { name: "Telecommunications", challenge: "Network issues found too late; growing operational data", help: "Network analytics, anomaly detection, performance optimisation", icon: "signal" },
  { name: "Manufacturing", challenge: "Unplanned downtime and quality defects", help: "Predictive maintenance, quality analytics, process optimisation", icon: "factory" },
  { name: "Retail & e-commerce", challenge: "Stock-outs, overstock and high volumes of customer queries", help: "Demand forecasting, customer insights, support chatbots", icon: "cart" },
  { name: "Education", challenge: "Administrative load and scattered information", help: "Student and staff assistants, admissions and admin automation", icon: "cap" },
  { name: "Healthcare", challenge: "Paperwork taking time from patient care", help: "Administrative workflow automation and analytics, with strict privacy controls", icon: "heart" },
  { name: "Logistics", challenge: "Unpredictable demand and limited visibility", help: "Demand planning, route and capacity forecasting, operational dashboards", icon: "truck" },
  { name: "Financial services", challenge: "Manual document reviews and fraud risk", help: "Document processing, anomaly detection, decision-support tools within your risk controls", icon: "bank" },
  { name: "Enterprise operations", challenge: "Knowledge locked in documents and inboxes", help: "Knowledge assistants, document processing, workflow automation", icon: "building" },
];

// Editor note: add typical durations or starting prices once confirmed.
export const engagements = [
  { title: "AI Discovery Session", bestFor: "Teams exploring where AI fits", outcome: "Prioritised use cases and a clear next step" },
  { title: "Proof of Concept", bestFor: "Testing one high-value idea", outcome: "A working prototype on your data with measured results" },
  { title: "Full Implementation", bestFor: "Scaling a proven solution", outcome: "A production solution integrated with your systems and adopted by users" },
  { title: "Support & Optimisation", bestFor: "Keeping solutions performing", outcome: "Monitoring, maintenance and continuous improvement" },
];

/* ------------------------------------------------------------------ AI Solutions page (Part 3) */

export const solutionsPage = {
  seoTitle: "AI Solutions & Services for Business | Zaavi Technologies",
  metaDescription: "Explore AI consulting, generative AI, AI agents, chatbots, machine learning, analytics and AI integration from Zaavi Technologies.",
  h1: "AI Solutions & Services",
  sub: "Practical artificial intelligence for real business challenges.",
  body: [
    "AI can automate repetitive work, unlock the value in your data and change how you serve customers, provided you choose the right use case and build it into the way people work.",
    "Zaavi Technologies delivers the full journey: strategy, development, integration, infrastructure and ongoing improvement. Explore our services below, or tell us your challenge and we'll recommend where to start.",
  ],
  cta: "Schedule an AI Consultation",
  closing: {
    h2: "Find the Right AI Solution for Your Organisation",
    body: "Not every problem needs AI, and not every AI idea is ready for production. We'll give you an honest view of the opportunity and a practical route to results.",
    cta: "Schedule an AI Consultation",
  },
};

export type Service = { n: number; title: string; copy: string; icon: IconName; href?: string; requires?: keyof typeof site.offers };

// Editor note: publish only the services Zaavi can deliver today (confirm RAG, AI agents, model evaluation, 13 and 14).
const categoriesAll: { letter: string; name: string; services: Service[] }[] = [
  { letter: "A", name: "AI Strategy", services: [
    { n: 1, title: "AI Consulting & Strategy", copy: "Find out where AI will create the most value before you invest. We assess your processes and data, rank use cases by impact and feasibility, and give you a practical, costed roadmap.", icon: "compass", href: "/ai-consulting" },
  ] },
  { letter: "B", name: "Generative & Conversational AI", services: [
    { n: 2, title: "Generative AI Solutions", copy: "Summarise documents, draft content, extract information and answer questions at scale, using models chosen for your accuracy, cost and privacy needs.", icon: "spark", href: "/generative-ai-solutions" },
    { n: 3, title: "AI Chatbots & Virtual Assistants", copy: "Round-the-clock assistants for customer service, employee support and business enquiries, connected to your documentation, databases and systems.", icon: "chat", href: "/ai-chatbot-development" },
    { n: 4, title: "Retrieval-Augmented Generation (RAG) & Knowledge Assistants", copy: "AI assistants that answer from your approved documents and data, not the open internet. Responses cite their sources, and access controls ensure people see only what they are allowed to see.", icon: "doc", href: "/rag-solutions" },
    { n: 5, title: "Natural Language Processing (NLP)", copy: "Classify emails and requests, extract key details from documents, analyse sentiment and power search that understands meaning, not just keywords.", icon: "text" },
  ] },
  { letter: "C", name: "Automation & AI Agents", services: [
    { n: 6, title: "AI Agent Development", copy: "AI agents that follow instructions, use approved tools and complete multi-step tasks. Clear permissions, approval steps and activity logs keep people in control.", icon: "bot", href: "/ai-automation" },
    { n: 7, title: "Intelligent Process Automation", copy: "Automate repetitive, rule-based and document-heavy work end to end, reducing manual effort, errors and turnaround time.", icon: "workflow", href: "/ai-automation" },
  ] },
  { letter: "D", name: "Data, Machine Learning & Analytics", services: [
    { n: 8, title: "Machine Learning Development", copy: "Custom models for classification, prediction and pattern recognition: trained on your data, validated against agreed metrics and ready for production.", icon: "brain", href: "/machine-learning" },
    { n: 9, title: "Predictive Analytics & Forecasting", copy: "Forecast demand, flag risks, plan maintenance and track performance using your historical and operational data.", icon: "chart", href: "/machine-learning" },
    { n: 10, title: "Data Analytics & Business Intelligence", copy: "Turn raw data into clear dashboards and reports, so every team can see performance, spot trends and act faster.", icon: "dashboard" },
  ] },
  { letter: "E", name: "Integration & Infrastructure", services: [
    { n: 11, title: "AI Integration & Application Development", copy: "Embed AI into your existing software, websites, databases and workflows through secure APIs, with the data flows and permissions properly planned.", icon: "plug", href: "/ai-integration" },
    { n: 12, title: "AI-Ready Cloud Infrastructure", copy: "Right-sized compute, storage and deployment environments for AI workloads, balancing performance, data sensitivity and cost.", icon: "cloud", href: "/cloud-services", requires: "cloud" },
    { n: 13, title: "Enterprise IT & Infrastructure Solutions", copy: "Infrastructure planning, cloud migration, network optimisation and data-centre solutions that give your AI initiatives a solid foundation.", icon: "server", requires: "cloud" },
    { n: 14, title: "Telecom & Network Intelligence", copy: "Network measurement, performance monitoring, data analysis and optimisation for telecom environments, with AI that detects issues early.", icon: "signal", href: "/telecom-solutions", requires: "telecom" },
  ] },
  { letter: "F", name: "Quality & Lifecycle", services: [
    { n: 15, title: "AI Model Evaluation & Quality Assurance", copy: "Test AI outputs for accuracy, relevance, consistency, speed and safety before launch, so you know exactly how a solution performs.", icon: "shield" },
    { n: 16, title: "AI Monitoring & Continuous Improvement", copy: "Monitor performance after go-live, analyse errors and roll out controlled updates, so your solution keeps improving as your business changes.", icon: "refresh" },
  ] },
];

export const categories = categoriesAll
  .map((c) => ({ ...c, services: c.services.filter((s) => !s.requires || site.offers[s.requires]) }))
  .filter((c) => c.services.length);

/* ------------------------------------------------------------------ About page (Part 4) */

export const aboutPage = {
  seoTitle: "About Zaavi Technologies | AI & Enterprise Technology",
  metaDescription: "Meet Zaavi Technologies, a technology partner helping organisations adopt practical AI, automation and enterprise technology.",
  h1: "About Zaavi Technologies",
  sub: "Enabling smarter business through AI and technology",
  who: `Zaavi Technologies is a technology partner specialising in artificial intelligence, intelligent automation and enterprise technology. Based in ${site.city}, we help organisations find practical uses for AI and build them into the systems and processes that run their business.`,
  why: [
    "Too many AI projects end as impressive demos that never reach everyday use. The model works, but it is not connected to the right data, does not fit the workflow, or nobody trusts its output.",
    "We started Zaavi to close that gap. We begin with the business problem, design for the systems already in place, and measure success by what changes for the people using the solution.",
  ],
  // Editor note: add founding year, leadership names and backgrounds, and one or two milestones.
  mission: "To help organisations solve real business challenges through practical AI, intelligent automation and dependable technology, so they can work faster, decide better and serve customers well.",
  vision: "A future in which every organisation, not just the largest, can use AI responsibly to improve productivity, strengthen resilience and create lasting value.",
  principles: [
    { title: "Purpose before technology", copy: "We start with the problem and choose the right tool, whether that is AI, conventional software or both." },
    { title: "Practical innovation", copy: "We focus on use cases that can be tested against clear requirements and measured results." },
    { title: "Built to fit", copy: "Our solutions work with your existing infrastructure, applications, data and workflows." },
    { title: "Responsible AI", copy: "Data protection, security, human oversight and output validation are part of every project." },
    { title: "Continuous improvement", copy: "We keep measuring and improving solutions as your needs evolve." },
  ],
  whatWeDo: [
    { text: "AI consulting, generative AI and machine learning", href: "/ai-consulting", icon: "compass" as IconName },
    { text: "Intelligent automation and AI agents", href: "/ai-automation", icon: "workflow" as IconName },
    { text: "Predictive analytics, data analytics and business intelligence", href: "/machine-learning", icon: "chart" as IconName },
    { text: "AI integration and application development", href: "/ai-integration", icon: "plug" as IconName },
    { text: "Cloud and enterprise IT infrastructure", href: "/cloud-services", icon: "cloud" as IconName, requires: "cloud" as const },
    { text: "Telecommunications and network intelligence", href: "/telecom-solutions", icon: "signal" as IconName, requires: "telecom" as const },
  ].filter((w) => !w.requires || site.offers[w.requires]),
  engage: [
    { title: "Understand", body: "We learn about your challenge, your users and the information available." },
    { title: "Define", body: "Together we agree scope, deliverables, timeline and how success will be measured." },
    { title: "Deliver", body: "We build, test and launch the solution, keeping you informed at every milestone." },
    { title: "Improve", body: "We monitor results and refine the solution as your business grows." },
  ],
  commitment: [
    "We promise clarity, not hype. Every engagement has a defined scope, agreed success measures and transparent reporting.",
    "AI can make mistakes, and its performance depends on data and context. That is why we build in testing, monitoring and human oversight from day one, and tell you plainly what a solution can and cannot do.",
  ],
  closing: {
    h2: "Build Your Next Technology Initiative with Us",
    body: "Whether you're testing an AI proof of concept, improving a workflow or preparing your infrastructure for AI, we'll help you define the right next step.",
    cta: "Talk to Our Team",
  },
};

/* ------------------------------------------------------------------ Contact page (Part 6) */

export const contactPage = {
  seoTitle: "Contact Zaavi Technologies | Discuss Your AI Project",
  // Editor note: change "within one business day" if Zaavi cannot commit to it.
  metaDescription: "Tell us about your business challenge and get an honest view of what AI can do. We reply within one business day.",
  h1: "Let's Talk About Your AI Project",
  sub: "Tell us about your challenge. We'll help you find the right next step.",
  body: "Whether you have a clear project in mind or just a process you suspect could work better, our team will listen, ask the right questions and give you an honest view of what AI can do for you.",
  interests: [
    { label: "AI Consulting", slug: "ai-consulting" },
    { label: "Generative AI", slug: "generative-ai-solutions" },
    { label: "Automation & AI Agents", slug: "ai-automation" },
    { label: "Machine Learning & Analytics", slug: "machine-learning" },
    { label: "Chatbots", slug: "ai-chatbot-development" },
    { label: "Integration", slug: "ai-integration" },
    { label: "Cloud", slug: "cloud-services", requires: "cloud" as const },
    { label: "Telecom", slug: "telecom-solutions", requires: "telecom" as const },
    { label: "Not sure yet", slug: "" },
  ].filter((i) => !i.requires || site.offers[i.requires]),
  challengeHint: "What process or problem would you like to improve, and what would success look like?",
  consent: "I agree to Zaavi Technologies contacting me about my enquiry.",
  cta: "Send My Enquiry",
  next: [
    { bold: "We review your enquiry", rest: `and reply within ${site.responseTime}.` },
    { bold: "We schedule a short discovery call", rest: "to understand your goals, current process and data." },
    { bold: "You receive our recommendation:", rest: "whether AI is the right fit, and a practical first step." },
  ],
};

/* ------------------------------------------------------------------ FAQ (Part 8) */

export const faqPage = {
  seoTitle: "AI Project FAQs | Zaavi Technologies",
  metaDescription: "Answers to common questions about AI projects: services, data, timelines, cost, security and how to get started with Zaavi Technologies.",
  h1: "Frequently Asked Questions",
  sub: "Straight answers to the questions buyers ask first.",
};

export const faqs = [
  { q: "What AI services does Zaavi Technologies offer?", a: "We cover the full AI journey: consulting and strategy, generative AI, AI agents and automation, chatbots, machine learning, predictive analytics, AI integration, and the cloud infrastructure to run it. Every engagement is shaped around your specific business goal." },
  { q: "How can AI help my business?", a: "AI can automate repetitive tasks, extract information from documents, answer customer and staff questions, improve forecasts and flag problems early. The biggest gains come from choosing the right problem, which is where every project with us begins." },
  { q: "Does every business need AI?", a: "No. AI is worth it when it solves a real problem at a sensible cost and risk. Some challenges are better solved with conventional software or a simpler process, and we'll tell you when that is the case." },
  { q: "Can AI work with our existing business software?", a: "Usually, yes. We connect AI to existing applications, databases and websites through APIs and standard connectors, and confirm integration feasibility early, before any build begins." },
  { q: "What data do we need to get started?", a: "It depends on the use case. A knowledge assistant can work from your existing documents, while predictive models need relevant historical data. We assess what you have, its quality and its access rules before recommending an approach." },
  { q: "How long does an AI project take?", a: "A focused proof of concept usually takes a few weeks. A production system integrated with several platforms takes longer. We agree a realistic timeline after the discovery stage, and stick to it." },
  { q: "What does an AI project cost?", a: "Cost depends on scope, data readiness and integrations. Most clients start with a fixed-scope discovery session or proof of concept, so you see the value before committing to a larger investment." },
  { q: "How do you keep AI secure and reliable?", a: "We build in access controls, data minimisation, testing, output evaluation, human review and ongoing monitoring, matched to each solution's risk level and the data-protection laws that apply to you." },
  { q: "Will AI replace our staff?", a: "Our aim is to remove repetitive work, not people. Most solutions handle routine tasks so your team can focus on judgement, relationships and higher-value work, with people always able to review AI decisions." },
  { q: "How can I get started?", a: "Contact us with a short description of your challenge, your current process and the outcome you want. We'll set up a discovery call and recommend a practical next step." },
];

/* ------------------------------------------------------------------ Navigation (Part 9) */

export type NavItem = { label: string; href: string; children?: { label: string; href: string; icon: IconName }[] };

export const nav: NavItem[] = (() => {
  const ai = activeLandings.filter((l) => l.group === "ai");
  const ent = activeLandings.filter((l) => l.group === "enterprise");
  const items: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "AI Solutions", href: "/ai-solutions", children: ai.map((l) => ({ label: l.nav, href: `/${l.slug}`, icon: l.icon })) },
  ];
  if (ent.length) items.push({ label: "Enterprise Technology", href: `/${ent[0].slug}`, children: ent.map((l) => ({ label: l.nav, href: `/${l.slug}`, icon: l.icon })) });
  // Industries are held back until they have a few pages of real content (Part 9).
  items.push(
    { label: "Others", href: "/blog", children: [
      { label: "Blog", href: "/blog", icon: "doc" },
      { label: "FAQ", href: "/faq", icon: "chat" },
    ] },
    { label: "Contact Us", href: "/contact" },
  );
  return items;
})();

export const contactCta = "Discuss Your AI Project";
