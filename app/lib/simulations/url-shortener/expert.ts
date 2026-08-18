import { PhaseConfig } from "../../types";

export const expertConfig: PhaseConfig = {
  id: "expert",
  name: "Expert",
  badge: "🚀 Production Scale (বিলিয়ন স্কেল)",
  tagline: "Distributed ID generator, DB replication and an asynchronous analytics pipeline",
  componentCount: 12,
  conceptSummary:
    "বিলিয়ন বিলিয়ন ইউআরএল এবং প্রতি সেকেন্ডে লক্ষ লক্ষ ক্লিক হ্যান্ডেল করার জন্য বিশ্বমানের এন্টারপ্রাইজ আর্কিটেকচার। এখানে ডিস্ট্রিবিউটেড আইডি জেনারেটর (Twitter Snowflake), রিড-রাইট আলাদা করতে Primary ও Read Replicas ডাটাবেজ, এবং ইউজারের স্পিড না কমিয়ে ব্যাকগ্রাউন্ডে ক্লিক গোনার জন্য Kafka কিউ ব্যবহার করা হয়।",
  keyConcepts: [
    "Distributed Unique ID Generation (Twitter Snowflake)",
    "Database Replication (Master-Slave / Primary-Replica)",
    "Asynchronous Event-Driven Analytics (Apache Kafka)",
    "API Gateway Pattern (Routing, Auth, Telemetry)",
    "High Availability & Zero Downtime Failover",
  ],
  nodes: [
    {
      id: "node-client",
      type: "simulationNode",
      position: { x: 40, y: 400 },
      data: {
        label: "Global Clients",
        subLabel: "Mobile, Web, APIs",
        category: "client",
        emoji: "📱",
        analogy: "সারা পৃথিবীর কোটি কোটি মানুষ।",
        description: "বিশ্বের যেকোনো প্রান্ত থেকে আসা রিকোয়েস্ট।",
        techSpecs: "Anycast / HTTP/3",
      },
    },
    {
      id: "node-cdn",
      type: "simulationNode",
      position: { x: 500, y: 100 },
      data: {
        label: "Cloudflare CDN",
        subLabel: "Edge Network (200+ PoPs)",
        category: "network",
        emoji: "🌐",
        analogy: "প্রতিটি শহরে ছোট ছোট ডেলিভারি হাব — যাতে প্রধান অফিসে না গিয়ে পাশের হাব থেকেই উত্তর পাওয়া যায়।",
        description: "ব্যবহারকারীর নিকটতম লোকেশন থেকে স্ট্যাটিক পেজ ও ক্যাশড রিডাইরেক্ট করে।",
        techSpecs: "Edge Cache / GeoDNS",
      },
    },
    {
      id: "node-lb",
      type: "simulationNode",
      position: { x: 500, y: 400 },
      data: {
        label: "Global Load Balancer",
        subLabel: "AWS ALB / Cloud LB",
        category: "network",
        emoji: "⚖️",
        analogy: "আন্তর্জাতিক এয়ারপোর্টের আধুনিক ট্রাফিক কন্ট্রোল টাওয়ার।",
        description: "ট্রাফিক হেলথ ও রিজিয়ন অনুযায়ী নিখুঁতভাবে রাউট করে।",
        techSpecs: "Layer 7 / SSL Offloading",
      },
    },
    {
      id: "node-gw",
      type: "simulationNode",
      position: { x: 960, y: 400 },
      data: {
        label: "API Gateway",
        subLabel: "Kong / Envoy Gateway",
        category: "security",
        emoji: "🚪",
        analogy: "বিশাল ভবনের সেন্ট্রাল রিসেপশন — যেখানে নিরাপত্তা তল্লাশি, আইডি কার্ড চেক এবং ভেতরে যাওয়ার পাস দেওয়া হয়।",
        description: "অথেন্টিকেশন, সিকিউরিটি ফিল্টারিং, রেট লিমিট ও মেট্রিক্স ম্যানেজ করে।",
        techSpecs: "JWT Auth / Circuit Breaker",
      },
    },
    {
      id: "node-idgen",
      type: "simulationNode",
      position: { x: 960, y: 100 },
      data: {
        label: "Snowflake ID Gen",
        subLabel: "64-bit Distributed Unique ID",
        category: "compute",
        emoji: "🏷️",
        analogy: "অদ্বিতীয় টোকেন মেকার মেশিন — যা সেকেন্ডে লাখ লাখ টোকেন বানালেও কখনো দুটি টোকেনের নাম্বার এক হবে না!",
        description: "টাইমস্ট্যাম্প + মেশিন আইডি দিয়ে 64-বিট ইউনিক ইন্টিজার বানায়। ডাটাবেজ লক দরকার হয় না।",
        techSpecs: "Snowflake / 10k IDs/ms",
      },
    },
    {
      id: "node-server-1",
      type: "simulationNode",
      position: { x: 1420, y: 230 },
      data: {
        label: "App Cluster (S1)",
        subLabel: "Kubernetes Pod 1",
        category: "compute",
        emoji: "🖥️",
        analogy: "অফিসের এক্সপার্ট ইঞ্জিনিয়ার ১।",
        description: "অটো-স্কেলিং মাইক্রোসার্ভিস পড।",
        techSpecs: "Golang / gRPC",
      },
    },
    {
      id: "node-server-2",
      type: "simulationNode",
      position: { x: 1420, y: 505 },
      data: {
        label: "App Cluster (S2)",
        subLabel: "Kubernetes Pod 2",
        category: "compute",
        emoji: "🖥️",
        analogy: "অফিসের এক্সপার্ট ইঞ্জিনিয়ার ২।",
        description: "লোড বাড়লে আপনাআপনি নতুন পড চালু হয়।",
        techSpecs: "K8s Auto-scaled",
      },
    },
    {
      id: "node-cache",
      type: "simulationNode",
      position: { x: 1880, y: 60 },
      data: {
        label: "Redis Cluster",
        subLabel: "Multi-Node Sharded Cache",
        category: "storage",
        emoji: "⚡",
        analogy: "সুপারফাস্ট মেমোরি যা ডেটা হারিয়ে গেলে অন্য ব্যাকআপ নোড থেকে পলকে রিকভার করে।",
        description: "মাল্টি-রিজিওন রেপ্লিকেটেড ক্যাশ।",
        techSpecs: "Cluster Mode / < 1ms",
      },
    },
    {
      id: "node-primary-db",
      type: "simulationNode",
      position: { x: 1880, y: 320 },
      data: {
        label: "Primary DB (Write)",
        subLabel: "PostgreSQL Master (ACID)",
        category: "storage",
        emoji: "📦",
        analogy: "মূল হেড অফিসের প্রধান ডায়েরি — যেখানে শুধু নতুন লিংকগুলো লেখা (Write) হয়।",
        description: "সকল রাইট (Write) অপারেশন এখানে সম্পন্ন হয়।",
        techSpecs: "Master / WAL Replication",
      },
    },
    {
      id: "node-replica-db",
      type: "simulationNode",
      position: { x: 1880, y: 560 },
      data: {
        label: "Read Replicas",
        subLabel: "PostgreSQL Slaves (Read-Only)",
        category: "storage",
        emoji: "📚",
        analogy: "মূল ডায়েরির একাধিক অবিকল কপি — যেখান থেকে কোটি কোটি মানুষ একসাথে লিংক পড়তে পারে!",
        description: "রিড কুয়েরি হ্যান্ডেল করে যাতে প্রাইমারি ডাটাবেজের ওপর কোনো চাপ না পড়ে।",
        techSpecs: "Async Replicated / Read-Pool",
      },
    },
    {
      id: "node-queue",
      type: "simulationNode",
      position: { x: 1420, y: 765 },
      data: {
        label: "Kafka Queue",
        subLabel: "Distributed Event Stream",
        category: "queue",
        emoji: "📨",
        analogy: "চিঠির পোস্টবক্স — ইউজারকে রিডাইরেক্ট করে দিয়ে এই বক্সে একটি নোট ফেলে রাখা হয়: 'এই লিংকে অমুক দেশ থেকে একটা ক্লিক হয়েছে!'",
        description: "অ্যানালিটিক্স ইভেন্ট বাফার করে রাখে। কোনো রিকোয়েস্ট নষ্ট হয় না।",
        techSpecs: "Partitions / 100k events/s",
      },
    },
    {
      id: "node-worker",
      type: "simulationNode",
      position: { x: 1880, y: 765 },
      data: {
        label: "Analytics Engine",
        subLabel: "ClickHouse + Workers",
        category: "analytics",
        emoji: "📊",
        analogy: "ডাটা সায়েন্টিস্ট দল — যারা পোস্টবক্স থেকে চিঠি নিয়ে সুন্দর গ্রাফ ও ক্লিক কাউন্টার তৈরি করে।",
        description: "ব্যাকগ্রাউন্ডে ক্লিক কাউন্ট, দেশ, ব্রাউজার অ্যানালিটিক্স প্রসেস ও স্টোর করে।",
        techSpecs: "Columnar DB / Real-time OLAP",
      },
    },
  ],
  edges: [
    {
      id: "edge-client-to-cdn",
      type: "animatedFlowEdge",
      source: "node-client",
      sourceHandle: "r-s",
      target: "node-cdn",
      targetHandle: "l-t",
      data: {
        label: "0. GeoDNS Routing",
        particleColor: "request",
      },
    },
    {
      id: "edge-cdn-to-lb",
      type: "animatedFlowEdge",
      source: "node-cdn",
      sourceHandle: "b-s",
      target: "node-lb",
      targetHandle: "t-t",
      data: {
        label: "1. Edge Pass to LB",
        particleColor: "request",
      },
    },
    {
      id: "edge-client-to-lb",
      type: "animatedFlowEdge",
      source: "node-client",
      sourceHandle: "r-s",
      target: "node-lb",
      targetHandle: "l-t",
      data: {
        label: "1. Direct Ingress",
        particleColor: "request",
      },
    },
    {
      id: "edge-lb-to-gw",
      type: "animatedFlowEdge",
      source: "node-lb",
      sourceHandle: "r-s",
      target: "node-gw",
      targetHandle: "l-t",
      data: {
        label: "2. Gateway Ingress",
        particleColor: "request",
      },
    },
    {
      id: "edge-gw-to-s1",
      type: "animatedFlowEdge",
      source: "node-gw",
      sourceHandle: "r-s",
      target: "node-server-1",
      targetHandle: "l-t",
      data: {
        label: "3a. Pod-1 Route",
        particleColor: "request",
      },
    },
    {
      id: "edge-gw-to-s2",
      type: "animatedFlowEdge",
      source: "node-gw",
      sourceHandle: "r-s",
      target: "node-server-2",
      targetHandle: "l-t",
      data: {
        label: "3b. Pod-2 Route",
        particleColor: "request",
      },
    },
    {
      id: "edge-s1-to-idgen",
      type: "animatedFlowEdge",
      source: "node-server-1",
      sourceHandle: "t-s",
      target: "node-idgen",
      targetHandle: "b-t",
      data: {
        label: "4a. Fetch Snowflake ID",
        particleColor: "cache",
      },
    },
    {
      id: "edge-s1-to-primary",
      type: "animatedFlowEdge",
      source: "node-server-1",
      sourceHandle: "r-s",
      target: "node-primary-db",
      targetHandle: "l-t",
      data: {
        label: "5a. Write to Master",
        particleColor: "read",
      },
    },
    {
      id: "edge-s1-to-cache",
      type: "animatedFlowEdge",
      source: "node-server-1",
      sourceHandle: "r-s",
      target: "node-cache",
      targetHandle: "l-t",
      data: {
        label: "5b. Populate Cache",
        particleColor: "write",
      },
    },
    {
      id: "edge-primary-to-replica",
      type: "animatedFlowEdge",
      source: "node-primary-db",
      sourceHandle: "b-s",
      target: "node-replica-db",
      targetHandle: "t-t",
      data: {
        label: "Replicate WAL stream",
        particleColor: "meta",
      },
    },
    {
      id: "edge-s1-to-replica",
      type: "animatedFlowEdge",
      source: "node-server-1",
      sourceHandle: "r-s",
      target: "node-replica-db",
      targetHandle: "l-t",
      data: {
        label: "Read Query (Fallback)",
        particleColor: "success",
      },
    },
    {
      id: "edge-s1-to-queue",
      type: "animatedFlowEdge",
      source: "node-server-1",
      sourceHandle: "b-s",
      target: "node-queue",
      targetHandle: "t-t",
      data: {
        label: "Async Publish: click_event",
        particleColor: "event",
      },
    },
    {
      id: "edge-s2-to-queue",
      type: "animatedFlowEdge",
      source: "node-server-2",
      sourceHandle: "b-s",
      target: "node-queue",
      targetHandle: "t-t",
      data: {
        label: "Async Publish: click_event",
        particleColor: "event",
      },
    },
    {
      id: "edge-s2-to-cache",
      type: "animatedFlowEdge",
      source: "node-server-2",
      sourceHandle: "r-s",
      target: "node-cache",
      targetHandle: "l-t",
      data: {
        label: "Redis Lookup",
        particleColor: "write",
      },
    },
    {
      id: "edge-queue-to-worker",
      type: "animatedFlowEdge",
      source: "node-queue",
      sourceHandle: "r-s",
      target: "node-worker",
      targetHandle: "l-t",
      data: {
        label: "Batch Consume & Aggregate",
        particleColor: "error",
      },
    },
  ],
  // Every step below activates exactly one edge and its two endpoint nodes —
  // one hop per step, so the canvas never lights up a whole subgraph at once.
  flows: [
    {
      id: "shorten",
      name: "Shorten",
      icon: "link",
      steps: [
        {
          id: "e-s1",
          flowType: "shorten",
          stepNumber: 1,
          title: "Client → CDN Edge (ক্লায়েন্ট থেকে এজ নেটওয়ার্কে)",
          whatHappens:
            "ইউজারের রিকোয়েস্ট GeoDNS-এর মাধ্যমে তার সবচেয়ে কাছের Cloudflare এজ লোকেশনে পৌঁছালো।",
          whyItMatters:
            "সবচেয়ে কাছের এজ নোডে গেলে নেটওয়ার্ক দূরত্ব কমে, ফলে TLS হ্যান্ডশেকেই অনেকটা সময় বাঁচে।",
          analogy: "📍 পুরো দেশ পাড়ি না দিয়ে নিজের এলাকার ব্রাঞ্চ অফিসে যাওয়া।",
          activeNodeIds: ["node-client", "node-cdn"],
          activeEdgeIds: ["edge-client-to-cdn"],
          edgeOverrides: {
            "edge-client-to-cdn": { label: "1. GeoDNS Routing" },
          },
          nodeStatusMessages: {
            "node-client": "POST /api/v2/shorten",
            "node-cdn": "Nearest PoP selected (Dhaka)",
          },
          payloadSnippet: `POST /api/v2/shorten HTTP/2\nAuthorization: Bearer eyJhbGciOi...\nX-Request-Id: req_9fa8120c`,
        },
        {
          id: "e-s2",
          flowType: "shorten",
          stepNumber: 2,
          title: "CDN → Global Load Balancer (এজ থেকে লোড ব্যালেন্সারে)",
          whatHappens:
            "এটি একটি রাইট রিকোয়েস্ট, তাই CDN নিজে উত্তর দিতে পারলো না — রিকোয়েস্টটি গ্লোবাল লোড ব্যালেন্সারে ফরওয়ার্ড করলো।",
          whyItMatters:
            "CDN শুধু ক্যাশযোগ্য রিড সার্ভ করে; রাইট সবসময় origin-এ যায়, নইলে ডেটা অসামঞ্জস্য হয়ে যাবে।",
          analogy: "🚪 রিসেপশন নিজে সিদ্ধান্ত না নিয়ে ফাইলটা ভেতরের অফিসে পাঠিয়ে দিলো।",
          activeNodeIds: ["node-cdn", "node-lb"],
          activeEdgeIds: ["edge-cdn-to-lb"],
          edgeOverrides: {
            "edge-cdn-to-lb": { label: "2. Forward to Origin" },
          },
          nodeStatusMessages: {
            "node-cdn": "Non-cacheable (POST) -> Origin",
            "node-lb": "Healthy upstreams: 2/2",
          },
          payloadSnippet: `Cache-Control: no-store\nX-Forwarded-For: 203.0.113.195`,
        },
        {
          id: "e-s3",
          flowType: "shorten",
          stepNumber: 3,
          title: "Load Balancer → API Gateway (গেটওয়েতে প্রবেশ)",
          whatHappens:
            "লোড ব্যালেন্সার রিকোয়েস্টটি API Gateway-তে পাঠালো। গেটওয়ে JWT টোকেন যাচাই করলো এবং রেট লিমিট পরীক্ষা করলো।",
          whyItMatters:
            "সেন্ট্রালাইজড অথেন্টিকেশন ও রেট লিমিটিং থাকলে প্রতিটি মাইক্রোসার্ভিসকে আলাদাভাবে নিরাপত্তা কোড লিখতে হয় না।",
          analogy: "🏢 সিকিউরিটি চেকপয়েন্ট পার হয়ে বিশেষ পাস নিয়ে মূল ভবনে প্রবেশ।",
          activeNodeIds: ["node-lb", "node-gw"],
          activeEdgeIds: ["edge-lb-to-gw"],
          edgeOverrides: {
            "edge-lb-to-gw": { label: "3. Gateway Ingress" },
          },
          nodeStatusMessages: {
            "node-lb": "Routing to gateway pool",
            "node-gw": "JWT Validated | Rate: OK",
          },
          payloadSnippet: `HTTP 200 (auth ok)\nX-RateLimit-Remaining: 4998\nX-User-Id: 9012`,
        },
        {
          id: "e-s4",
          flowType: "shorten",
          stepNumber: 4,
          title: "API Gateway → App Pod 1 (অ্যাপ সার্ভারে ডেলিভারি)",
          whatHappens:
            "গেটওয়ে দেখলো Pod-1 সবচেয়ে কম ব্যস্ত, তাই রিকোয়েস্টটি সেখানেই পাঠিয়ে দিলো।",
          whyItMatters:
            "একটি রিকোয়েস্ট একবারে একটিমাত্র pod-এ যায়। অ্যাপ সার্ভারগুলো stateless হওয়ায় যেকোনো pod এই কাজ করতে পারতো।",
          analogy: "👉 'কাউন্টার ১ ফাঁকা আছে, ওখানে যান!'",
          activeNodeIds: ["node-gw", "node-server-1"],
          activeEdgeIds: ["edge-gw-to-s1"],
          edgeOverrides: {
            "edge-gw-to-s1": { label: "4. Route to Pod-1" },
          },
          nodeStatusMessages: {
            "node-gw": "Least-conn -> Pod-1",
            "node-server-1": "Pod-1 handling request",
          },
          payloadSnippet: `// Kubernetes Service routing\nselected pod: url-api-7d9c4-x2ml (least connections)`,
        },
        {
          id: "e-s5",
          flowType: "shorten",
          stepNumber: 5,
          title: "App Pod 1 → Snowflake ID Generator (ইউনিক আইডি চাওয়া)",
          whatHappens:
            "সার্ভার ডাটাবেজে লক না লাগিয়ে আলাদা 'Snowflake ID Generator' সার্ভিসের কাছে একটি ইউনিক ৬৪-বিট নাম্বার চাইলো।",
          whyItMatters:
            "ডাটাবেজ অটো-ইনক্রিমেন্ট আইডি ব্যবহার করলে মাল্টি-ডাটাবেজ সিস্টেমে কলিশন বা বটলনেক তৈরি হয়।",
          analogy: "🏷️ সেন্ট্রাল কিউতে না দাঁড়িয়ে নিজের বারকোড মেশিন থেকে নাম্বার নেওয়া।",
          activeNodeIds: ["node-server-1", "node-idgen"],
          activeEdgeIds: ["edge-s1-to-idgen"],
          edgeOverrides: {
            "edge-s1-to-idgen": { label: "5. Request Snowflake ID" },
          },
          nodeStatusMessages: {
            "node-server-1": "Requesting unique ID...",
            "node-idgen": "Generating from machine #04",
          },
          payloadSnippet: `// Twitter Snowflake 64-bit structure:\n// 1 bit unused | 41 bit timestamp | 10 bit machine ID | 12 bit sequence\nconst id = snowflake.nextId();`,
        },
        {
          id: "e-s6",
          flowType: "shorten",
          stepNumber: 6,
          title: "ID Generator → App Pod 1 (আইডি ফেরত এলো)",
          whatHappens:
            "জেনারেটর একটি ইউনিক আইডি (154892019482390144) ফেরত দিলো এবং সার্ভার সেটাকে Base62 কোডে ('9wK2pL') রূপান্তর করলো।",
          whyItMatters:
            "Base62 এনকোডিং ৬৪-বিট বড় নাম্বারকে মাত্র ৬-৭ অক্ষরের মানুষ-বান্ধব কোডে পরিণত করে।",
          analogy: "🔢 লম্বা সিরিয়াল নাম্বারকে ছোট, সহজে লেখা যায় এমন কোডে বদলে নেওয়া।",
          activeNodeIds: ["node-idgen", "node-server-1"],
          activeEdgeIds: ["edge-s1-to-idgen"],
          edgeOverrides: {
            "edge-s1-to-idgen": {
              label: "6. ID Returned",
              isReverse: true,
              particleColor: "cache",
            },
          },
          nodeStatusMessages: {
            "node-idgen": "Snowflake ID: 154892019482390144",
            "node-server-1": "Base62 Encoded -> '9wK2pL'",
          },
          payloadSnippet: `const id = 154892019482390144n;\nconst shortCode = base62Encode(id); // "9wK2pL"`,
        },
        {
          id: "e-s7",
          flowType: "shorten",
          stepNumber: 7,
          title: "App Pod 1 → Primary DB (মাস্টার ডাটাবেজে লেখা)",
          whatHappens:
            "সার্ভার প্রাইমারি (মাস্টার) ডাটাবেজে লিংকটি স্থায়ীভাবে সেভ করলো।",
          whyItMatters:
            "সব write একটিমাত্র primary-তে যায়, ফলে কোনো write কনফ্লিক্ট হয় না এবং ডেটার একটি নির্ভরযোগ্য উৎস থাকে।",
          analogy: "✍️ শুধুমাত্র মূল খাতাতেই কলম চলে — কপিগুলোতে নয়।",
          activeNodeIds: ["node-server-1", "node-primary-db"],
          activeEdgeIds: ["edge-s1-to-primary"],
          edgeOverrides: {
            "edge-s1-to-primary": { label: "7. Write to Master" },
          },
          nodeStatusMessages: {
            "node-server-1": "Committing transaction...",
            "node-primary-db": "MASTER WRITE SUCCESS",
          },
          payloadSnippet: `BEGIN TRANSACTION;\nINSERT INTO urls_sharded_04 (id, short_code, original_url, user_id)\nVALUES (154892019482390144, '9wK2pL', 'https://...', 9012);\nCOMMIT;`,
        },
        {
          id: "e-s8",
          flowType: "shorten",
          stepNumber: 8,
          title: "Primary DB → Read Replicas (রেপ্লিকেশন)",
          whatHappens:
            "প্রাইমারি ডাটাবেজ তার WAL স্ট্রিমের মাধ্যমে নতুন রেকর্ডটি সব রিড-রেপ্লিকায় ছড়িয়ে দিলো।",
          whyItMatters:
            "Write শুধু primary-তে যায়, কিন্তু কোটি কোটি read কোয়েরি রেপ্লিকাগুলো ভাগ করে নেয় (CQRS প্যাটার্ন)।",
          analogy: "📄 মূল খাতায় লেখার পরপরই সব ফটোকপি মেশিনে নতুন পৃষ্ঠার কপি তৈরি হয়ে যাওয়া।",
          activeNodeIds: ["node-primary-db", "node-replica-db"],
          activeEdgeIds: ["edge-primary-to-replica"],
          edgeOverrides: {
            "edge-primary-to-replica": { label: "8. Replicate WAL stream" },
          },
          nodeStatusMessages: {
            "node-primary-db": "Streaming WAL to 3 replicas",
            "node-replica-db": "WAL Stream Syncing (Lag: 0.2ms)",
          },
          payloadSnippet: `-- Replica status\nSELECT client_addr, state, replay_lag FROM pg_stat_replication;\n-- streaming | 0.2ms`,
        },
        {
          id: "e-s9",
          flowType: "shorten",
          stepNumber: 9,
          title: "App Pod 1 → Redis Cluster (ক্যাশ গরম করা)",
          whatHappens:
            "সার্ভার নতুন লিংকটি Redis ক্লাস্টারেও রেখে দিলো, যাতে একটু পরেই কেউ ক্লিক করলে ডাটাবেজে যেতে না হয়।",
          whyItMatters:
            "নতুন লিংকে ক্লিক আসার সম্ভাবনা প্রথম কয়েক ঘণ্টাতেই সবচেয়ে বেশি — তাই আগেভাগে ক্যাশ করা লাভজনক।",
          analogy: "📌 ডায়েরিতে লেখার পর সামনের নোটিস বোর্ডেও পিন মেরে রাখা।",
          activeNodeIds: ["node-server-1", "node-cache"],
          activeEdgeIds: ["edge-s1-to-cache"],
          edgeOverrides: {
            "edge-s1-to-cache": { label: "9. Populate Cache" },
          },
          nodeStatusMessages: {
            "node-server-1": "Warming cache...",
            "node-cache": "Redis Key Cached with TTL",
          },
          payloadSnippet: `REDIS_CLUSTER.SETEX("{url}:9wK2pL", 86400, "https://...");`,
        },
        {
          id: "e-s10",
          flowType: "shorten",
          stepNumber: 10,
          title: "App Pod 1 → API Gateway (রেসপন্স ফেরত)",
          whatHappens:
            "সব কাজ শেষ। সার্ভার HTTP 201 Created রেসপন্স গেটওয়েতে ফেরত পাঠালো।",
          whyItMatters:
            "রিকোয়েস্ট যে পথে এসেছিল, রেসপন্স ঠিক সেই পথেই ফেরত যায় — এটাই request/response সাইকেল।",
          analogy: "📤 ক্যাশিয়ার টোকেন স্লিপ রেজিস্টারে ফেরত জমা দিলো।",
          activeNodeIds: ["node-server-1", "node-gw"],
          activeEdgeIds: ["edge-gw-to-s1"],
          edgeOverrides: {
            "edge-gw-to-s1": {
              label: "10. 201 Created Response",
              isReverse: true,
              particleColor: "success",
            },
          },
          nodeStatusMessages: {
            "node-server-1": "HTTP 201 Created",
            "node-gw": "Receiving response from Pod-1",
          },
          payloadSnippet: `HTTP/2 201 Created\n{\n  "shortUrl": "https://link.co/9wK2pL",\n  "id": "154892019482390144"\n}`,
        },
        {
          id: "e-s11",
          flowType: "shorten",
          stepNumber: 11,
          title: "API Gateway → Load Balancer (রেসপন্স ফরওয়ার্ড)",
          whatHappens:
            "গেটওয়ে রেসপন্সে টেলিমেট্রি হেডার যোগ করে লোড ব্যালেন্সারে পাঠিয়ে দিলো।",
          whyItMatters:
            "গেটওয়ে ফেরার পথে latency ও status কোড রেকর্ড করে, যা পরে মনিটরিং ড্যাশবোর্ডে কাজে লাগে।",
          analogy: "🧾 বেরোনোর সময় গার্ড রেজিস্টারে সময়টা টুকে রাখলো।",
          activeNodeIds: ["node-gw", "node-lb"],
          activeEdgeIds: ["edge-lb-to-gw"],
          edgeOverrides: {
            "edge-lb-to-gw": {
              label: "11. Forward Response",
              isReverse: true,
              particleColor: "success",
            },
          },
          nodeStatusMessages: {
            "node-gw": "Telemetry logged (7.8ms)",
            "node-lb": "Response received",
          },
          payloadSnippet: `X-Response-Time: 7.8ms\nX-Gateway-Node: gw-ap-south-2`,
        },
        {
          id: "e-s12",
          flowType: "shorten",
          stepNumber: 12,
          title: "Load Balancer → Client (ইউজার লিংক পেলো)",
          whatHappens:
            "ইউজার মাত্র ৮ মিলিসেকেন্ডে তার ব্র্যান্ডেড শর্ট লিঙ্ক (https://link.co/9wK2pL) পেয়ে গেলো।",
          whyItMatters:
            "ডিস্ট্রিবিউটেড ইনফ্রাস্ট্রাকচারের অপ্টিমাইজেশনের ফলে ৯৯.৯৯% রিকোয়েস্ট সাব-১০ মিলিসেকেন্ডে শেষ হয়।",
          analogy: "✨ পলকের মধ্যে কাজ শেষ হওয়া।",
          activeNodeIds: ["node-lb", "node-client"],
          activeEdgeIds: ["edge-client-to-lb"],
          edgeOverrides: {
            "edge-client-to-lb": {
              label: "12. Return Short URL",
              isReverse: true,
              particleColor: "success",
            },
          },
          nodeStatusMessages: {
            "node-lb": "Delivering to client",
            "node-client": "Created: https://link.co/9wK2pL",
          },
          payloadSnippet: `{\n  "success": true,\n  "shortUrl": "https://link.co/9wK2pL",\n  "id": "154892019482390144",\n  "latencyMs": 7.8\n}`,
        },
      ],
    },
    {
      id: "redirect",
      name: "Redirect",
      icon: "redirect",
      steps: [
        {
          id: "e-r1",
          flowType: "redirect",
          stepNumber: 1,
          title: "Client → CDN Edge (ক্লিক থেকে এজ নেটওয়ার্কে)",
          whatHappens:
            "একজন ইউজার শর্ট লিংকে ক্লিক করলেন। রিকোয়েস্টটি তার কাছের CDN এজ নোডে পৌঁছালো।",
          whyItMatters:
            "রিডাইরেক্ট লেটেন্সি ইউজার সরাসরি অনুভব করে, তাই প্রথম hop যত ছোট হয় ততই ভালো।",
          analogy: "📍 কাছের ব্রাঞ্চেই আগে খোঁজ নেওয়া।",
          activeNodeIds: ["node-client", "node-cdn"],
          activeEdgeIds: ["edge-client-to-cdn"],
          edgeOverrides: {
            "edge-client-to-cdn": { label: "1. GeoDNS Routing" },
          },
          nodeStatusMessages: {
            "node-client": "GET /9wK2pL",
            "node-cdn": "Edge Cache Miss -> Origin",
          },
          payloadSnippet: `GET /9wK2pL HTTP/2\nHost: link.co`,
        },
        {
          id: "e-r2",
          flowType: "redirect",
          stepNumber: 2,
          title: "CDN → Global Load Balancer (এজ থেকে অরিজিনে)",
          whatHappens:
            "এই কোডটি এজ ক্যাশে ছিল না, তাই CDN রিকোয়েস্টটি গ্লোবাল লোড ব্যালেন্সারে পাঠালো।",
          whyItMatters:
            "Cache miss হলেও CDN কানেকশন reuse করে, ফলে origin-এ যাওয়ার খরচ অনেকটাই কমে।",
          analogy: "🚪 রিসেপশনে না পেয়ে ভেতরের অফিসে খোঁজ নিতে যাওয়া।",
          activeNodeIds: ["node-cdn", "node-lb"],
          activeEdgeIds: ["edge-cdn-to-lb"],
          edgeOverrides: {
            "edge-cdn-to-lb": { label: "2. Origin Fetch" },
          },
          nodeStatusMessages: {
            "node-cdn": "MISS -> forwarding",
            "node-lb": "Healthy upstreams: 2/2",
          },
          payloadSnippet: `CF-Cache-Status: MISS\nConnection: keep-alive (reused)`,
        },
        {
          id: "e-r3",
          flowType: "redirect",
          stepNumber: 3,
          title: "Load Balancer → API Gateway (গেটওয়েতে প্রবেশ)",
          whatHappens:
            "লোড ব্যালেন্সার রিকোয়েস্টটি API Gateway-তে পাঠালো, যেখানে রেট লিমিট ও রাউটিং নিয়ম প্রয়োগ হলো।",
          whyItMatters:
            "পাবলিক রিডাইরেক্ট এন্ডপয়েন্টেও রেট লিমিট দরকার, নইলে বট ট্রাফিক ব্যাকএন্ড ডুবিয়ে দিতে পারে।",
          analogy: "🏢 ভেতরে ঢোকার আগে গার্ডের চেকপয়েন্ট।",
          activeNodeIds: ["node-lb", "node-gw"],
          activeEdgeIds: ["edge-lb-to-gw"],
          edgeOverrides: {
            "edge-lb-to-gw": { label: "3. Gateway Ingress" },
          },
          nodeStatusMessages: {
            "node-lb": "Routing to gateway pool",
            "node-gw": "Rate: OK | Route: /:code",
          },
          payloadSnippet: `X-RateLimit-Remaining: 9987\nmatched route: GET /:shortCode`,
        },
        {
          id: "e-r4",
          flowType: "redirect",
          stepNumber: 4,
          title: "API Gateway → App Pod 2 (অ্যাপ সার্ভারে ডেলিভারি)",
          whatHappens:
            "গেটওয়ে এবার Pod-2-কে বেছে নিলো এবং রিকোয়েস্টটি সেখানে পাঠিয়ে দিলো।",
          whyItMatters:
            "লোড দুই pod-এর মধ্যে ভাগ হয়ে যায়, তাই একটির উপর চাপ পড়লে অন্যটি সামলে নেয়।",
          analogy: "👉 'এবার কাউন্টার ২ ফাঁকা, ওখানে যান!'",
          activeNodeIds: ["node-gw", "node-server-2"],
          activeEdgeIds: ["edge-gw-to-s2"],
          edgeOverrides: {
            "edge-gw-to-s2": { label: "4. Route to Pod-2" },
          },
          nodeStatusMessages: {
            "node-gw": "Least-conn -> Pod-2",
            "node-server-2": "Pod-2 handling request",
          },
          payloadSnippet: `selected pod: url-api-7d9c4-k8vt (least connections)`,
        },
        {
          id: "e-r5",
          flowType: "redirect",
          stepNumber: 5,
          title: "App Pod 2 → Redis Cluster (ক্যাশে খোঁজা)",
          whatHappens:
            "সার্ভার ডাটাবেজে যাওয়ার আগে ডিস্ট্রিবিউটেড Redis ক্লাস্টারে '9wK2pL' কোডটি খুঁজলো।",
          whyItMatters:
            "Cache-aside প্যাটার্নে সবসময় আগে ক্যাশ দেখা হয় — এতে ৯০%+ রিড ডাটাবেজে পৌঁছায়ই না।",
          analogy: "⚡ আলমারি খোলার আগে টেবিলের উপরের খাতাটা দেখে নেওয়া।",
          activeNodeIds: ["node-server-2", "node-cache"],
          activeEdgeIds: ["edge-s2-to-cache"],
          edgeOverrides: {
            "edge-s2-to-cache": { label: "5. Redis Lookup" },
          },
          nodeStatusMessages: {
            "node-server-2": "Checking Redis first...",
            "node-cache": "SHARD_02: searching key",
          },
          payloadSnippet: `REDIS_CLUSTER.GET("{url}:9wK2pL")`,
        },
        {
          id: "e-r6",
          flowType: "redirect",
          stepNumber: 6,
          title: "Redis Cluster → App Pod 2 (ক্যাশ হিট!)",
          whatHappens:
            "মাত্র ০.৪ মিলিসেকেন্ডেই Redis আসল লিংকটি ফেরত দিলো। ডাটাবেজে যাওয়ার দরকারই পড়লো না!",
          whyItMatters:
            "মেমোরি থেকে পড়া ডিস্ক থেকে পড়ার চেয়ে প্রায় ১০০ গুণ দ্রুত — এখানেই রিডাইরেক্টের আসল গতি।",
          analogy: "🎯 খাতা খুলতেই প্রথম পাতায় উত্তর পাওয়া।",
          activeNodeIds: ["node-cache", "node-server-2"],
          activeEdgeIds: ["edge-s2-to-cache"],
          edgeOverrides: {
            "edge-s2-to-cache": {
              label: "6. CACHE HIT (0.4ms)",
              isReverse: true,
              particleColor: "write",
            },
          },
          nodeStatusMessages: {
            "node-cache": "CACHE HIT (0.4ms)",
            "node-server-2": "Found in RAM! Bypassing DB.",
          },
          payloadSnippet: `=> "https://systemdesign.com/expert-deep-dive"\nLatency: 0.4ms [CACHE HIT]`,
        },
        {
          id: "e-r7",
          flowType: "redirect",
          stepNumber: 7,
          title: "App Pod 2 → API Gateway (301 রেসপন্স ফেরত)",
          whatHappens:
            "সার্ভার HTTP 301 Moved Permanently রেসপন্স তৈরি করে গেটওয়েতে ফেরত পাঠালো।",
          whyItMatters:
            "301 ব্যবহার করলে ব্রাউজার পরের বার নিজেই মনে রাখে — সার্ভারে দ্বিতীয়বার আসতেই হয় না।",
          analogy: "📤 'ঠিকানা বদলেছে' লেখা চিঠি ফেরত পাঠানো।",
          activeNodeIds: ["node-server-2", "node-gw"],
          activeEdgeIds: ["edge-gw-to-s2"],
          edgeOverrides: {
            "edge-gw-to-s2": {
              label: "7. 301 Response",
              isReverse: true,
              particleColor: "success",
            },
          },
          nodeStatusMessages: {
            "node-server-2": "301 Moved Permanently",
            "node-gw": "Receiving response from Pod-2",
          },
          payloadSnippet: `HTTP/2 301 Moved Permanently\nLocation: https://systemdesign.com/expert-deep-dive`,
        },
        {
          id: "e-r8",
          flowType: "redirect",
          stepNumber: 8,
          title: "API Gateway → Load Balancer (রেসপন্স ফরওয়ার্ড)",
          whatHappens:
            "গেটওয়ে রেসপন্সটি লোড ব্যালেন্সারে ফরওয়ার্ড করলো এবং latency মেট্রিক রেকর্ড করলো।",
          whyItMatters:
            "প্রতিটি hop-এর latency আলাদা করে মাপা থাকলে ধীর অংশটা সহজেই খুঁজে বের করা যায়।",
          analogy: "🧾 বেরোনোর সময় গার্ড সময়টা টুকে রাখলো।",
          activeNodeIds: ["node-gw", "node-lb"],
          activeEdgeIds: ["edge-lb-to-gw"],
          edgeOverrides: {
            "edge-lb-to-gw": {
              label: "8. Forward Response",
              isReverse: true,
              particleColor: "success",
            },
          },
          nodeStatusMessages: {
            "node-gw": "Telemetry logged (3.1ms)",
            "node-lb": "Response received",
          },
          payloadSnippet: `X-Response-Time: 3.1ms\nX-Cache-Layer: redis-hit`,
        },
        {
          id: "e-r9",
          flowType: "redirect",
          stepNumber: 9,
          title: "Load Balancer → Client (ব্রাউজার রিডাইরেক্ট হলো)",
          whatHappens:
            "ব্রাউজার 301 রেসপন্স পেয়ে সাথে সাথে আসল ওয়েবসাইটে চলে গেলো — ইউজার চোখের পলক ফেলার আগেই!",
          whyItMatters:
            "পুরো রিডাইরেক্ট সাইকেল ৩ মিলিসেকেন্ডে শেষ, কারণ কোথাও ডিস্ক পড়তে হয়নি।",
          analogy: "🚀 রকেটের মতো সঠিক গন্তব্যে পৌঁছে যাওয়া।",
          activeNodeIds: ["node-lb", "node-client"],
          activeEdgeIds: ["edge-client-to-lb"],
          edgeOverrides: {
            "edge-client-to-lb": {
              label: "9. Redirecting to Long URL",
              isReverse: true,
              particleColor: "success",
            },
          },
          nodeStatusMessages: {
            "node-lb": "Delivering 301 to client",
            "node-client": "Redirecting instantly (3.1ms)...",
          },
          payloadSnippet: `Location: https://systemdesign.com/expert-deep-dive\nTotal latency: 3.1ms`,
        },
        {
          id: "e-r10",
          flowType: "redirect",
          stepNumber: 10,
          title: "App Pod 2 → Kafka Queue (অ্যাসিনক্রোনাস ইভেন্ট)",
          whatHappens:
            "ইউজার চলে যাওয়ার পর ব্যাকগ্রাউন্ডে সার্ভার Kafka কিউতে একটি বার্তা ছুড়ে দিলো: 'এই লিংকে ১টি ক্লিক হয়েছে, ব্রাউজার Chrome, দেশ বাংলাদেশ'।",
          whyItMatters:
            "Fire-and-forget হওয়ায় ইউজারকে এক মুহূর্তও অপেক্ষা করতে হয় না (Non-blocking I/O)।",
          analogy: "📨 চিঠি পোস্টবক্সে ফেলে দিয়ে নিজের কাজে চলে যাওয়া — পোস্টম্যান পরে ডেলিভারি করবে।",
          activeNodeIds: ["node-server-2", "node-queue"],
          activeEdgeIds: ["edge-s2-to-queue"],
          edgeOverrides: {
            "edge-s2-to-queue": { label: "10. Async Publish: click_event" },
          },
          nodeStatusMessages: {
            "node-server-2": "Event fired (non-blocking)",
            "node-queue": "Kafka Topic: 'url-clicks' received event",
          },
          payloadSnippet: `kafkaProducer.send({\n  topic: 'url-clicks',\n  messages: [{ key: '9wK2pL', value: JSON.stringify({ ts: Date.now(), country: 'BD' }) }]\n});`,
        },
        {
          id: "e-r11",
          flowType: "redirect",
          stepNumber: 11,
          title: "Kafka Queue → Analytics Engine (অ্যানালিটিক্স সংরক্ষণ)",
          whatHappens:
            "অ্যানালিটিক্স ওয়ার্কার Kafka থেকে মেসেজটি তুলে নিয়ে ClickHouse টাইম-সিরিজ ডাটাবেজে স্টোর করলো।",
          whyItMatters:
            "কলামনার ডাটাবেজ (ClickHouse) প্রতি সেকেন্ডে লক্ষ লক্ষ ক্লিক ইভেন্ট এগ্রিগেট করতে পারে।",
          analogy: "📊 অফিসের পেছনের রুমে বসে হিসাবরক্ষকের খাতায় পাই-চার্ট আঁকা।",
          activeNodeIds: ["node-queue", "node-worker"],
          activeEdgeIds: ["edge-queue-to-worker"],
          edgeOverrides: {
            "edge-queue-to-worker": { label: "11. Batch Consume & Aggregate" },
          },
          nodeStatusMessages: {
            "node-queue": "Delivered to consumer group",
            "node-worker": "ClickHouse INSERT +1 click (Total: 4,192,051)",
          },
          payloadSnippet: `INSERT INTO click_analytics (short_code, clicked_at, country, browser)\nVALUES ('9wK2pL', NOW(), 'BD', 'Chrome 128');`,
        },
      ],
    },
  ],
};
