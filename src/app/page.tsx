import Image from "next/image";

type ServiceStatus = "operational" | "degraded" | "outage";

type Service = {
  name: string;
  region: string;
  status: ServiceStatus;
  uptime: string;
  responseTime: string;
  lastIncident: string;
};

type IncidentStatus = "investigating" | "identified" | "monitoring" | "resolved";

type Incident = {
  id: string;
  title: string;
  status: IncidentStatus;
  startedAt: string;
  resolvedAt?: string;
  summary: string;
  affected: string[];
};

type Maintenance = {
  id: string;
  title: string;
  window: string;
  impact: string;
  owner: string;
};

const statusMeta: Record<
  ServiceStatus,
  { label: string; badge: string; dot: string; shadow: string }
> = {
  operational: {
    label: "Operational",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    dot: "bg-emerald-500",
    shadow: "shadow-emerald-500/20",
  },
  degraded: {
    label: "Degraded",
    badge: "bg-amber-50 text-amber-700 border border-amber-100",
    dot: "bg-amber-500",
    shadow: "shadow-amber-500/20",
  },
  outage: {
    label: "Outage",
    badge: "bg-rose-50 text-rose-700 border border-rose-100",
    dot: "bg-rose-500",
    shadow: "shadow-rose-500/20",
  },
};

const services: Service[] = [
  {
    name: "Web Application",
    region: "Global",
    status: "operational",
    uptime: "99.98%",
    responseTime: "328 ms",
    lastIncident: "32 days ago",
  },
  {
    name: "Public APIs",
    region: "Global",
    status: "operational",
    uptime: "99.91%",
    responseTime: "412 ms",
    lastIncident: "5 days ago",
  },
  {
    name: "Realtime Gateway",
    region: "US & EU",
    status: "degraded",
    uptime: "99.47%",
    responseTime: "621 ms",
    lastIncident: "Active",
  },
  {
    name: "Background Jobs",
    region: "Global",
    status: "operational",
    uptime: "99.87%",
    responseTime: "1.2 s",
    lastIncident: "12 days ago",
  },
  {
    name: "Billing + Webhooks",
    region: "Global",
    status: "operational",
    uptime: "99.73%",
    responseTime: "214 ms",
    lastIncident: "44 days ago",
  },
];

const incidents: Incident[] = [
  {
    id: "INC-2371",
    title: "Realtime gateway latency",
    status: "monitoring",
    startedAt: "Nov 09, 19:24 UTC",
    resolvedAt: "Nov 09, 20:10 UTC",
    summary:
      "Traffic spikes in us-east-1 caused websocket connection churn. Requests were automatically failed over to eu-central-1 while we rebalanced shards.",
    affected: ["Realtime Gateway", "Web Application"],
  },
  {
    id: "INC-2360",
    title: "Increased 5xx errors for create-order API",
    status: "resolved",
    startedAt: "Nov 06, 02:11 UTC",
    resolvedAt: "Nov 06, 02:58 UTC",
    summary:
      "A bad deploy introduced a regression in the validation layer. We rolled back and added additional schema checks.",
    affected: ["Public APIs"],
  },
  {
    id: "INC-2344",
    title: "Delayed billing notifications",
    status: "resolved",
    startedAt: "Nov 01, 14:42 UTC",
    resolvedAt: "Nov 01, 16:35 UTC",
    summary:
      "Downstream email provider latency delayed webhook delivery. Impact was limited to invoice.created events.",
    affected: ["Billing + Webhooks"],
  },
];

const maintenance: Maintenance[] = [
  {
    id: "MAIN-148",
    title: "Database storage upgrade",
    window: "Nov 12, 01:00-03:00 UTC",
    impact: "Up to 2 minutes of read-only mode in us-west-2.",
    owner: "SRE",
  },
  {
    id: "MAIN-149",
    title: "Realtime cluster rotation",
    window: "Nov 15, 22:00-23:00 UTC",
    impact: "Websocket reconnects expected; no data loss.",
    owner: "Edge Platform",
  },
];

const metrics = [
  { label: "Global uptime (30d)", value: "99.964%" },
  { label: "API success rate (24h)", value: "99.72%" },
  { label: "Peak latency (p95)", value: "642 ms" },
];

const overallStatus: ServiceStatus = (() => {
  if (services.some((service) => service.status === "outage")) return "outage";
  if (services.some((service) => service.status === "degraded")) return "degraded";
  return "operational";
})();

const activeIncident = incidents.find((incident) => incident.status !== "resolved");

const profile = {
  name: "Haojia Yu",
  title: "Senior Software Engineer @ Tesla",
  summary:
    "Full-stack developer crafting Tesla OS across web, mobile, backend, and AI-powered surfaces.",
  location: "San Jose, CA",
  email: "harryyuhaojia@gmail.com",
  linkedin: "https://www.linkedin.com/in/haojia-yu/",
};

const nowFocus = [
  "Architecting open-source micro-frontend frameworks that unify legacy systems.",
  "Developing AI-driven assistants and UI modules that boost productivity.",
];

const learning = [
  "Cloud-native architecture",
  "Next.js 15 for high-performance delivery",
  "LLM-powered automation and prompt-driven workflows",
];

const collaborate = [
  "Open-source micro-frontend tooling",
  "AI × Web projects (NLP, chatbots, internal assistants)",
  "Fun side projects like game bots and desktop apps",
];

const needHelp = [
  "Designing smarter CI/CD for large micro-frontend fleets",
  "Building an open-source template for enterprise frontends",
];

const askMeAbout = [
  "Frontend architecture at scale (Angular 15, React 18, micro-frontends)",
  "Scalable REST / GraphQL APIs",
  "Cloud DevOps with Docker, Kubernetes, CI/CD",
  "How software accelerates clean-energy innovation ⚡",
];

const funFacts = [
  "Finding motivation for the next workout",
  "Browsing 99 Ranch or Costco for cooking ideas",
  "Debugging something at 2 AM just because",
];

function StatusBadge({ status }: { status: ServiceStatus }) {
  const meta = statusMeta[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${meta.badge}`}
    >
      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-12 pt-6">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/40 p-8 shadow-xl shadow-slate-950/50">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">👋 Hi</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">
                {profile.name}
              </h1>
              <p className="mt-2 text-lg text-slate-200">
                Senior Software Engineer @ Tesla | Full-Stack Developer | Cloud & AI Enthusiast
              </p>
              <p className="mt-4 text-base text-slate-300">{profile.summary}</p>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <p>📍 {profile.location}</p>
              <p>
                📧{" "}
                <a className="text-sky-300 underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
              <p>
                🔗{" "}
                <a
                  className="text-sky-300 underline"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </p>
              <p>
                💻{" "}
                <a
                  className="text-sky-300 underline"
                  href="https://github.com/yuhaojia"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </p>
            </div>
            <div className="flex w-full justify-center lg:w-auto lg:justify-end">
              <Image
                src="/profile-speech.JPG"
                width={384}
                height={384}
                alt="Haojia Yu speaking at a tech event"
                className="h-48 w-48 rounded-3xl border border-slate-800/80 object-cover shadow-2xl shadow-slate-950/50"
                priority
              />
            </div>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <InfoCard title="💼 What I’m Doing Now" items={nowFocus} />
            <InfoCard title="🌱 I’m Currently Learning" items={learning} />
            <InfoCard title="👯 I’m Looking to Collaborate On" items={collaborate} />
            <InfoCard title="🤔 I’m Looking for Help With" items={needHelp} />
            <InfoCard title="💬 Ask Me About" items={askMeAbout} />
            <InfoCard title="⚡ Fun Fact" items={funFacts} />
          </div>
          <p className="mt-8 text-sm text-slate-400">
            ⭐️ “Code should empower people and accelerate progress — that’s what drives me every
            day.”
          </p>
        </section>
      </main>
    </div>
  );
}
