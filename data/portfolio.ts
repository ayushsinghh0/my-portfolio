import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export type Project = {
  slug: string;
  title: string;
  cardTitle?: string;
  stackDescription?: string;
  tech: string[];
  description: string;
  about?: string;
  keyFeatures?: string[];
  launchedYear?: string;
  traction?: string;
  websiteUrl?: string;
  githubUrl: string;
  liveUrl: string;
  videoPath: string;
  logoPath?: string;
  hasShield?: boolean;
  caseStudySections: {
    heading: string;
    points: string[];
  }[];
  quickStart?: string[];
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const projects: Project[] = [
  {
    slug: "workwizard-intelligent-job-portal",
    title: "WorkWizard - Intelligent Job Portal",
    cardTitle: "WorkWizard",
    stackDescription: "AI-first job platform with secure auth, recruiter workflows, and event-driven email automation.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Kafka", "Razorpay", "Gemini AI"],
    description:
      "Production-grade microservices job platform connecting job seekers and recruiters with AI resume analysis, AI career guidance, subscription-priority applicant ranking, and Kafka-based asynchronous email pipelines.",
    about:
      "WorkWizard is an intelligent, production-aware job portal that connects job seekers and recruiters through AI-assisted hiring workflows, secure role-based authentication, and event-driven communication across microservices.",
    keyFeatures: [
      "AI Resume ATS Analyzer with actionable score breakdowns",
      "AI Career Path Advisor powered by Gemini",
      "Kafka-based async email pipeline for auth and application updates",
      "Subscription-priority applicant ordering with Razorpay verification",
      "Role-based recruiter and jobseeker flows with secure JWT auth",
    ],
    launchedYear: "2026",
    traction: "Production-style microservices platform",
    websiteUrl: "#",
    githubUrl: "https://github.com/ayushsinghh0/WorkWizard",
    liveUrl: "#",
    videoPath: "/videos/project1.mp4",
    logoPath: "/projects/ic-workwizard.svg",
    caseStudySections: [
      {
        heading: "Problem Statement",
        points: [
          "Traditional job boards are passive and provide little intelligence for job seekers and recruiters.",
          "Teams struggle to combine secure auth, payments, async workflows, and AI features in one scalable platform.",
        ],
      },
      {
        heading: "Solution Overview",
        points: [
          "Built WorkWizard as a domain-driven microservices system: auth, jobs, users, payments, and shared utils.",
          "Integrated Gemini AI for ATS resume scoring and career path recommendations from user skills.",
          "Added subscription-based applicant prioritization using Razorpay with server-side signature verification.",
        ],
      },
      {
        heading: "Architecture & Platform Highlights",
        points: [
          "Kafka producer-consumer pipeline decouples email delivery from request lifecycle for better reliability.",
          "Redis handles reset-token TTL, ephemeral auth state, and fast validation paths.",
          "Cloudinary stores resumes, profile images, and company logos with replace-on-update behavior.",
          "Role-based recruiter/jobseeker flows with strict ownership checks on recruiter mutations.",
        ],
      },
      {
        heading: "Impact",
        points: [
          "Delivered a production-aware system combining AI, payments, event streaming, and secure authentication.",
          "Improved responsiveness by offloading heavy email operations through Kafka async processing.",
          "Embedded business logic directly in data layer with subscription-priority applicant ranking.",
        ],
      },
    ],
    quickStart: [
      "git clone https://github.com/ayushsinghh0/WorkWizard.git",
      "cd WorkWizard",
      "# Frontend",
      "cd frontend && npm install",
      "# Services",
      "cd ../services/auth && npm install",
      "cd ../job && npm install",
      "cd ../users && npm install",
      "cd ../payment && npm install",
      "cd ../utils && npm install",
      "# Run all services in separate terminals, then start frontend",
      "cd frontend && npm run dev",
    ],
  },
  {
    slug: "aegisid-auth-service",
    title: "AegisID - Centralized Auth Service",
    cardTitle: "AegisID",
    stackDescription: "OAuth2/OIDC authentication core with token rotation, Redis acceleration, and hardened security flows.",
    tech: ["Node.js", "Redis", "Docker"],
    description:
      "OAuth2/OpenID compliant authentication server with RS256 signing. Redis caching reduced database load by 40%. Refresh token rotation and PKCE security flows. Dockerized deployment.",
    about:
      "AegisID is a secure identity and authentication platform implementing OAuth2 and OpenID Connect with centralized session, token, and authorization management across applications.",
    keyFeatures: [
      "OAuth2 / OpenID Connect compliant authentication flows",
      "JWT access and refresh token rotation with revocation support",
      "Redis-backed token cache, session storage, and rate limiting",
      "Token introspection and audit-friendly auth event logging",
      "Docker-ready deployment with CI/CD integration",
    ],
    launchedYear: "2026",
    traction: "~40% lower auth latency on key paths",
    websiteUrl: "#",
    githubUrl: "https://github.com/ayushsinghh0/aegisid-auth-server",
    liveUrl: "#",
    videoPath: "/videos/project1.mp4",
    logoPath: "/projects/ic-aegisid.svg",
    hasShield: true,
    caseStudySections: [
      {
        heading: "Problem Statement",
        points: [
          "Implementing OAuth2 and OpenID Connect correctly from scratch is complex and error-prone.",
          "Teams need secure login, token lifecycle management, and rate limiting without sacrificing performance.",
        ],
      },
      {
        heading: "Solution Overview",
        points: [
          "AegisID centralizes authentication and identity management behind a consistent API.",
          "Built with Node.js, Express, Prisma, PostgreSQL, and Redis for low-latency auth workflows.",
          "Supports web, mobile, and server-to-server clients with standards-compliant auth flows.",
        ],
      },
      {
        heading: "Security & Feature Set",
        points: [
          "OAuth2 and OpenID Connect compliant token flows.",
          "JWT access and refresh tokens with rotation, revocation, and introspection support.",
          "Role-based and scope-based authorization with audit-ready authentication logs.",
          "Redis-backed rate limiting to protect login and token endpoints from abuse.",
        ],
      },
      {
        heading: "Redis Performance Impact",
        points: [
          "Token/session caching in Redis reduced repeated database lookups.",
          "Authentication latency dropped by around 40% on critical paths.",
          "Session invalidation, revocation checks, and rate limiting remain fast under concurrency.",
        ],
      },
    ],
    quickStart: [
      "git clone https://github.com/ayushsinghh0/aegisid-auth-server.git",
      "cd aegisid-auth-server",
      "npm install",
      "npx prisma migrate dev",
      "npm run dev",
      "# Optional: docker compose up --build",
    ],
  },
  {
    slug: "collaborative-realtime-whiteboard",
    title: "Real-Time Collaborative Drawing App",
    cardTitle: "Collaborative Drawing",
    stackDescription: "Low-latency collaborative canvas with WebSocket synchronization and conflict-aware editing sessions.",
    tech: ["React", "WebSocket", "TypeScript"],
    description:
      "Low-latency collaborative drawing platform with real-time synchronization, conflict-aware interactions, and optimized undo/redo session handling.",
    about:
      "A real-time collaborative drawing application designed for low-latency co-editing, predictable conflict handling, and smooth session workflows across connected clients.",
    keyFeatures: [
      "Live collaborative canvas updates over WebSockets",
      "Conflict-aware synchronization for simultaneous drawing",
      "Optimized undo/redo behavior for shared sessions",
      "Type-safe event contracts using TypeScript",
      "Scalable architecture direction for future feature expansion",
    ],
    launchedYear: "2026",
    traction: "Work in progress",
    websiteUrl: "#",
    githubUrl: "https://github.com/ayushsinghh0/Real-time-Collaborative-Drawing-App",
    liveUrl: "#",
    videoPath: "/videos/project1.mp4",
    logoPath: "/projects/ic-drawing-app.svg",
    caseStudySections: [
      {
        heading: "Problem Statement",
        points: [
          "Realtime drawing tools often suffer from lag, conflicting edits, and unstable session state.",
          "Undo/redo across multiple collaborators is hard to keep consistent without efficient state modeling.",
        ],
      },
      {
        heading: "Solution Overview",
        points: [
          "Built a collaborative whiteboard around WebSocket-driven state synchronization.",
          "Focused on low-latency event propagation and predictable reconciliation for simultaneous edits.",
          "Used TypeScript for strict contracts across drawing events and session state.",
        ],
      },
      {
        heading: "Current Engineering Focus",
        points: [
          "Conflict resolution strategies for overlapping updates.",
          "Session-level undo/redo optimization with minimal payload overhead.",
          "Improving canvas rendering efficiency for smoother collaborative UX.",
        ],
      },
      {
        heading: "Status",
        points: [
          "Work in progress with production-style backend communication patterns.",
          "Architecture is being designed for scalability and future feature expansion.",
        ],
      },
    ],
  },
  {
    slug: "zod-json-schema-builder",
    title: "Zod & JSON Schema Builder",
    cardTitle: "Zod & JSON Schema Builder",
    stackDescription: "Build schema definitions visually and export both JSON Schema and production-ready Zod validation code.",
    tech: ["Next.js", "TypeScript", "Zod", "JSON Schema", "Monaco Editor"],
    description:
      "Visual schema modeling tool for teams that want one source of truth across frontend forms, backend validation, and API contracts.",
    about:
      "Zod & JSON Schema Builder is a contract-design tool that helps teams draft nested schemas visually and generate synchronized JSON Schema and Zod definitions without manual duplication.",
    keyFeatures: [
      "Visual drag-and-build schema editor with nested object and array support",
      "Instant export to JSON Schema and Zod from a single configuration",
      "Field-level constraints, defaults, optional states, and type-safe previews",
      "Schema version snapshots for rapid iterations",
      "Developer-first interface optimized for validation workflow speed",
    ],
    launchedYear: "2026",
    traction: "Active build and iteration",
    websiteUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
    videoPath: "/videos/project1.mp4",
    logoPath: "/projects/ic-zod-json.svg",
    caseStudySections: [
      {
        heading: "Problem Statement",
        points: [
          "Validation logic often gets duplicated across UI, API contracts, and backend runtime checks.",
          "Manual synchronization between JSON Schema and Zod slows down delivery and introduces drift.",
        ],
      },
      {
        heading: "Solution Overview",
        points: [
          "Built a visual schema editor that stores canonical field metadata and relationships.",
          "Added generation pipelines that emit JSON Schema and Zod from the same internal model.",
          "Focused on fast iteration loops for schema authors and API teams.",
        ],
      },
      {
        heading: "Product Highlights",
        points: [
          "Supports nested objects, arrays, enums, and required/optional field modeling.",
          "Encodes validation rules like min/max length, ranges, and custom constraints.",
          "Provides clean exports that can be dropped directly into production codebases.",
        ],
      },
      {
        heading: "Impact",
        points: [
          "Reduces schema drift across frontend and backend by keeping one canonical source.",
          "Speeds up contract design and validation integration for full-stack teams.",
        ],
      },
    ],
    quickStart: [
      "git clone <your-repo-url>",
      "cd zod-json-schema-builder",
      "npm install",
      "npm run dev",
    ],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "C++", "SQL", "HTML", "CSS"],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "WebSockets",
      "REST APIs",
      "Microservices",
      "Kafka",
    ],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Material UI"],
  },
  {
    title: "Databases & Infrastructure",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Git",
      "Linux",
      "Prisma",
    ],
  },
  {
    title: "Core CS",
    skills: ["DSA", "Distributed Systems", "System Design", "OOP", "DBMS"],
  },
];

export const achievements = [
  "Solved 400+ LeetCode problems",
  "95th percentile in JEE Mains among 1M+ candidates",
];

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "#",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedin,
  },
  {
    label: "LeetCode",
    href: "#",
    icon: SiLeetcode,
  },
];
