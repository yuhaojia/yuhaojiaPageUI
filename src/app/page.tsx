"use client";

import Image from "next/image";
import { useState } from "react";

type Locale = "en" | "zh" | "ko";
type SectionKey = "now" | "learning" | "collaborate" | "needHelp" | "ask" | "fun";
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

const profile = {
  email: "harryyuhaojia@gmail.com",
  linkedin: "https://www.linkedin.com/in/haojia-yu/",
  github: "https://github.com/yuhaojia",
};

const localizedNames: Record<Locale, string> = {
  en: "Haojia Yu",
  zh: "于昊加",
  ko: "우호가 (于昊加)",
};

const localeOptions: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
];

const sectionOrder: SectionKey[] = ["now", "learning", "collaborate", "needHelp", "ask", "fun"];

const localeContent: Record<
  Locale,
  {
    subtitle: string;
    summary: string;
    location: string;
    contactLabels: { email: string; linkedin: string; github: string };
    sections: Record<SectionKey, { title: string; items: string[] }>;
    quote: string;
    platformStatusLabel: string;
    updatedLabel: string;
    activeIncidentLabel: string;
    subscriptionCta: string;
    incidentHistoryLabel: string;
  }
> = {
  en: {
    subtitle: "Senior Software Engineer @ Tesla | Full-Stack Developer | Cloud & AI Enthusiast",
    summary:
      "Full-stack developer crafting Tesla OS across web, mobile, backend, and AI-powered surfaces.",
    location: "San Jose, CA",
    contactLabels: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    sections: {
      now: {
        title: "💼 What I’m Doing Now",
        items: [
          "Architecting open-source micro-frontend frameworks that unify legacy systems.",
          "Developing AI-driven assistants and UI modules that boost productivity.",
        ],
      },
      learning: {
        title: "🌱 I’m Currently Learning",
        items: [
          "Cloud-native architecture",
          "Next.js 15 for high-performance delivery",
          "LLM-powered automation and prompt-driven workflows",
        ],
      },
      collaborate: {
        title: "👯 I’m Looking to Collaborate On",
        items: [
          "Open-source micro-frontend tooling",
          "AI × Web projects (NLP, chatbots, internal assistants)",
          "Fun side projects like game bots and desktop apps",
        ],
      },
      needHelp: {
        title: "🤔 I’m Looking for Help With",
        items: [
          "Designing smarter CI/CD for large micro-frontend fleets",
          "Building an open-source template for enterprise frontends",
        ],
      },
      ask: {
        title: "💬 Ask Me About",
        items: [
          "Frontend architecture at scale (Angular 15 / React 18 / Micro-frontend)",
          "Scalable REST / GraphQL API design",
          "Cloud DevOps with Docker, Kubernetes, and CI/CD",
          "How software accelerates clean-energy innovation ⚡",
        ],
      },
      fun: {
        title: "⚡ Fun Fact",
        items: [
          "Trying to find motivation for my next workout",
          "Browsing 99 Ranch or Costco for new cooking ideas",
          "Debugging something at 2 AM — just because I can",
        ],
      },
    },
    quote: "“Code should empower people and accelerate progress — that’s what drives me every day.”",
    platformStatusLabel: "Platform Status",
    updatedLabel: "Updated 2 minutes ago",
    activeIncidentLabel: "Active Incident",
    subscriptionCta: "Subscribe for updates",
    incidentHistoryLabel: "Past 30 days · 3 public records",
  },
  zh: {
    subtitle: "特斯拉高级软件工程师｜全栈开发者｜云与 AI 爱好者",
    summary:
      "全栈开发者，在 Web、移动端、后台系统与 AI 体验中共同打造 Tesla OS。",
    location: "美国加州圣何塞",
    contactLabels: {
      email: "邮箱",
      linkedin: "领英",
      github: "GitHub",
    },
    sections: {
      now: {
        title: "💼 近期在做什么",
        items: [
          "构建开源微前端框架，把多个遗留系统整合成统一体验。",
          "打造 AI 助手与智能界面，帮助业务团队提升效率。",
        ],
      },
      learning: {
        title: "🌱 正在学习",
        items: ["云原生架构", "Next.js 15 高性能交付", "基于 LLM 的自动化与提示工程"],
      },
      collaborate: {
        title: "👯 希望合作的方向",
        items: [
          "面向微前端的开源工具",
          "AI × Web 集成项目（NLP、聊天机器人、内部助手）",
          "趣味副项目：游戏机器人与桌面应用",
        ],
      },
      needHelp: {
        title: "🤔 想获得的帮助",
        items: [
          "为大规模微前端编排设计更智能的 CI/CD",
          "打造可扩展企业前端的开源模板",
        ],
      },
      ask: {
        title: "💬 可以聊聊",
        items: [
          "大规模前端架构（Angular 15 / React 18 / 微前端）",
          "可扩展的 REST / GraphQL API 设计",
          "基于 Docker、Kubernetes、CI/CD 的云原生 DevOps",
          "软件如何加速清洁能源创新 ⚡",
        ],
      },
      fun: {
        title: "⚡ 有趣的小事",
        items: [
          "为下一次锻炼寻找动力",
          "在 99 大华或 Costco 探索新菜谱",
          "凌晨两点继续调试，只因为好奇",
        ],
      },
    },
    quote: "“代码应该赋能人们并加速进步——这是我每天前进的动力。”",
    platformStatusLabel: "平台状态",
    updatedLabel: "2 分钟前更新",
    activeIncidentLabel: "进行中的事件",
    subscriptionCta: "订阅更新",
    incidentHistoryLabel: "过去 30 天 · 3 条公开记录",
  },
  ko: {
    subtitle: "테슬라 시니어 소프트웨어 엔지니어 | 풀스택 개발자 | 클라우드 & AI 애호가",
    summary:
      "웹·모바일·백엔드·AI 전반에서 Tesla OS를 만들어 가는 풀스택 개발자입니다.",
    location: "미국 캘리포니아 산호세",
    contactLabels: {
      email: "이메일",
      linkedin: "링크드인",
      github: "깃허브",
    },
    sections: {
      now: {
        title: "💼 지금 하고 있는 일",
        items: [
          "여러 레거시 시스템을 하나로 통합하는 오픈소스 마이크로 프런트엔드를 설계합니다.",
          "생산성을 높이는 AI 기반 어시스턴트와 지능형 UI 모듈을 구축합니다.",
        ],
      },
      learning: {
        title: "🌱 요즘 배우는 것",
        items: [
          "클라우드 네이티브 아키텍처",
          "고성능 웹 제공을 위한 Next.js 15",
          "LLM 기반 자동화와 프롬프트 워크플로",
        ],
      },
      collaborate: {
        title: "👯 함께하고 싶은 주제",
        items: [
          "마이크로 프런트엔드 개발용 오픈소스 도구",
          "AI × Web 통합 프로젝트(NLP, 챗봇, 사내 어시스턴트)",
          "게임 봇·데스크톱 앱 같은 재미있는 사이드 프로젝트",
        ],
      },
      needHelp: {
        title: "🤔 도움이 필요한 부분",
        items: [
          "대규모 마이크로 프런트엔드 오케스트레이션을 위한 스마트한 CI/CD 설계",
          "확장형 엔터프라이즈 프런트엔드 오픈소스 템플릿 구축",
        ],
      },
      ask: {
        title: "💬 이런 이야기를 좋아해요",
        items: [
          "대규모 프런트엔드 아키텍처(Angular 15 / React 18 / 마이크로 프런트엔드)",
          "확장 가능한 REST / GraphQL API 설계",
          "Docker·Kubernetes·CI/CD 기반 클라우드 DevOps",
          "소프트웨어가 청정 에너지 혁신을 어떻게 가속하는지 ⚡",
        ],
      },
      fun: {
        title: "⚡ 재미있는 사실",
        items: [
          "다음 운동을 위한 동기 찾기",
          "99 Ranch나 Costco에서 새로운 요리 아이디어 탐색",
          "새벽 2시에 호기심으로 디버깅하기",
        ],
      },
    },
    quote: "“코드는 사람을 돕고 발전을 가속해야 합니다 — 그것이 내가 일하는 이유입니다.”",
    platformStatusLabel: "플랫폼 상태",
    updatedLabel: "2분 전 업데이트",
    activeIncidentLabel: "진행 중인 사고",
    subscriptionCta: "업데이트 구독",
    incidentHistoryLabel: "최근 30일 · 공개 기록 3건",
  },
};

const metricsCopy = {
  go: {
    en: "All systems go",
    zh: "系统稳定运行",
    ko: "모든 시스템 정상",
  },
  warn: {
    en: "Attention required",
    zh: "需要留意",
    ko: "점검 필요",
  },
};

const overallStatus: ServiceStatus = (() => {
  if (services.some((service) => service.status === "outage")) return "outage";
  if (services.some((service) => service.status === "degraded")) return "degraded";
  return "operational";
})();

const activeIncident = incidents.find((incident) => incident.status !== "resolved");

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

function LanguageToggle({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {localeOptions.map((option) => {
        const isActive = option.code === locale;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => onChange(option.code)}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
              isActive
                ? "border-sky-400 bg-sky-500/10 text-sky-100"
                : "border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default function StatusPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = localeContent[locale];
  const systemCopy =
    overallStatus === "operational"
      ? metricsCopy.go[locale]
      : metricsCopy.warn[locale];
  const displayName = localizedNames[locale];

  return (
    <div className="min-h-screen bg-slate-950 pb-12 pt-6">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/40 p-8 shadow-xl shadow-slate-950/50">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">👋 Hi</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">{displayName}</h1>
              <p className="mt-2 text-lg text-slate-200">{t.subtitle}</p>
              <p className="mt-4 text-base text-slate-300">{t.summary}</p>
              <div className="mt-6">
                <LanguageToggle locale={locale} onChange={setLocale} />
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <p>📍 {t.location}</p>
              <p>
                📧 {t.contactLabels.email}:{" "}
                <a className="text-sky-300 underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
              <p>
                🔗 {t.contactLabels.linkedin}:{" "}
                <a
                  className="text-sky-300 underline"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profile.linkedin.replace("https://", "")}
                </a>
              </p>
              <p>
                💻 {t.contactLabels.github}:{" "}
                <a
                  className="text-sky-300 underline"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profile.github.replace("https://", "")}
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
            {sectionOrder.map((key) => (
              <InfoCard key={key} title={t.sections[key].title} items={t.sections[key].items} />
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-400">⭐️ {t.quote}</p>
        </section>
      </main>
    </div>
  );
}
