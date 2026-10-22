/**
 * Site photography. All files live in /public/images and are free stock photos from Unsplash
 * (Unsplash License: free for commercial use, no attribution required). The Unsplash photo ID is kept
 * next to each one so it can be traced or swapped. Replace any entry with your own photo of the same name.
 */
export const photos = {
  teamCollab: { src: "/images/team-collab.jpg", alt: "A team working together on laptops around a table", unsplash: "1522071820081-009f0129c71c" },
  whiteboard: { src: "/images/whiteboard.jpg", alt: "A colleague mapping ideas on sticky notes during a workshop", unsplash: "1552664730-d307ca884978" },
  workshop: { src: "/images/workshop.jpg", alt: "A small team discussing a plan at a whiteboard", unsplash: "1557804506-669a67965ba0" },
  presentation: { src: "/images/presentation.jpg", alt: "A presenter leading a meeting around a conference table", unsplash: "1542744173-8e7e53415bb0" },
  partnership: { src: "/images/partnership.jpg", alt: "Two business partners celebrating a successful project", unsplash: "1600880292203-757bb62b4baf" },
  analyticsLaptop: { src: "/images/analytics-laptop.jpg", alt: "An analytics dashboard open on a laptop", unsplash: "1460925895917-afdab827c52f" },
  dashboardScreen: { src: "/images/dashboard-screen.jpg", alt: "Charts and performance metrics on a monitor", unsplash: "1551288049-bebda4e38f71" },
  dashboardLaptop: { src: "/images/dashboard-laptop.jpg", alt: "A business intelligence report on a laptop screen", unsplash: "1504868584819-f8e8b4b6d7e3" },
  serverRoom: { src: "/images/server-room.jpg", alt: "Server racks with network cabling in a data centre", unsplash: "1558494949-ef010cbdcc31" },
  datacenter: { src: "/images/datacenter.jpg", alt: "Engineers with tablets in a data centre aisle", unsplash: "1573164713988-8665fc963095" },
  networkCables: { src: "/images/network-cables.jpg", alt: "Network cables plugged into a patch panel", unsplash: "1544197150-b99a580bb7a8" },
  earthNetwork: { src: "/images/earth-network.jpg", alt: "City lights across the Earth seen from orbit", unsplash: "1451187580459-43490279c0fa" },
  codeScreen: { src: "/images/code-screen.jpg", alt: "Source code on a laptop screen", unsplash: "1488590528505-98d2b5aba04b" },
  codeDesk: { src: "/images/code-desk.jpg", alt: "A developer's desk with code on a laptop", unsplash: "1498050108023-c5249f4df085" },
  chip: { src: "/images/chip.jpg", alt: "Close-up of a circuit board and processor", unsplash: "1518770660439-4636190af475" },
  circuit: { src: "/images/circuit.jpg", alt: "Illuminated circuit pathways on a dark board", unsplash: "1550751827-4bd374c3f58b" },
  aiLetters: { src: "/images/ai-letters.jpg", alt: "The letters AI rendered in blue with flowing lines", unsplash: "1677442136019-21780ecad995" },
  robotHand: { src: "/images/robot-hand.jpg", alt: "A white robotic hand reaching out", unsplash: "1531746790731-6c087fecd65a" },
  robotReading: { src: "/images/robot-reading.jpg", alt: "A humanoid robot reading on a bench", unsplash: "1620712943543-bcc4688e7485" },
  blocks: { src: "/images/blocks.jpg", alt: "Connected blocks forming a network on a dark background", unsplash: "1639322537228-f710d846310a" },
  chatPhone: { src: "/images/chat-phone.jpg", alt: "Someone using a chat app on a phone beside a laptop", unsplash: "1563986768609-322da13575f3" },
  healthcare: { src: "/images/healthcare.jpg", alt: "A doctor using a smartphone", unsplash: "1576091160399-112ba8d25d1d" },
  engineerLab: { src: "/images/engineer-lab.jpg", alt: "An engineer working with equipment in a lab", unsplash: "1581091226825-a6a2a5aee158" },
  warehouse: { src: "/images/warehouse.jpg", alt: "A large warehouse stacked with parcels", unsplash: "1586528116311-ad8dd3c8310d" },
  retail: { src: "/images/retail.jpg", alt: "A clothing store interior with shelves and racks", unsplash: "1441986300917-64674bd600d8" },
  financeTowers: { src: "/images/finance-towers.jpg", alt: "Glass office towers seen from below", unsplash: "1486406146926-c627a92ad1ab" },
  officeFloor: { src: "/images/office-floor.jpg", alt: "A busy open-plan office", unsplash: "1504384308090-c894fdcc538d" },
  laptopPointing: { src: "/images/laptop-pointing.jpg", alt: "Two people reviewing work on a laptop", unsplash: "1516321318423-f06f85e504b3" },
  teamCoding: { src: "/images/team-coding.jpg", alt: "Colleagues working through a problem at a computer", unsplash: "1531482615713-2afd69097998" },
} as const;

export type Photo = (typeof photos)[keyof typeof photos];

/** Homepage "What We Deliver" panel, keyed by the card's link. */
export const deliverPhotos: Record<string, Photo> = {
  "/generative-ai-solutions": photos.aiLetters,
  "/ai-automation": photos.robotHand,
  "/machine-learning": photos.dashboardScreen,
  "/ai-chatbot-development": photos.chatPhone,
  "/cloud-services": photos.serverRoom,
  "/telecom-solutions": photos.networkCables,
  "/ai-solutions": photos.dashboardLaptop,
  "/ai-consulting": photos.whiteboard,
};

export const industryPhotos: Record<string, Photo> = {
  Telecommunications: photos.earthNetwork,
  Manufacturing: photos.engineerLab,
  "Retail & e-commerce": photos.retail,
  Education: photos.teamCoding,
  Healthcare: photos.healthcare,
  Logistics: photos.warehouse,
  "Financial services": photos.financeTowers,
  "Enterprise operations": photos.officeFloor,
};

/** AI Solutions page, keyed by category letter. */
export const categoryPhotos: Record<string, Photo> = {
  A: photos.whiteboard,
  B: photos.aiLetters,
  C: photos.robotHand,
  D: photos.analyticsLaptop,
  E: photos.datacenter,
  F: photos.laptopPointing,
};

/** Service pages: one photo per "Where It Helps" use case. */
export const servicePhotos: Record<string, [Photo, Photo, Photo]> = {
  "ai-consulting": [photos.whiteboard, photos.presentation, photos.workshop],
  "generative-ai-solutions": [photos.aiLetters, photos.codeDesk, photos.robotReading],
  "ai-automation": [photos.robotHand, photos.chatPhone, photos.teamCollab],
  "machine-learning": [photos.dashboardScreen, photos.engineerLab, photos.financeTowers],
  "ai-chatbot-development": [photos.chatPhone, photos.laptopPointing, photos.dashboardLaptop],
  "rag-solutions": [photos.robotReading, photos.teamCoding, photos.presentation],
  "ai-integration": [photos.codeScreen, photos.blocks, photos.circuit],
  "cloud-services": [photos.serverRoom, photos.datacenter, photos.chip],
  "telecom-solutions": [photos.networkCables, photos.earthNetwork, photos.circuit],
};

/** Card image for a service page when it appears in "Related Solutions". */
export const serviceCover = (slug: string) => servicePhotos[slug]?.[0] ?? photos.aiLetters;
