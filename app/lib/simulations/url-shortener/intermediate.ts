import { PhaseConfig } from "../../types";

export const intermediateConfig: PhaseConfig = {
  id: "intermediate",
  name: "Intermediate",
  badge: "⚡ Scaled (মাঝারি স্কেল)",
  tagline: "Load balancer, rate limiter, caching and multiple servers",
  componentCount: 7,
  conceptSummary:
    "যখন লাখ লাখ মানুষ একসাথে সাইটে আসে, তখন একটি সার্ভার লোড নিতে পারে না। তাই আমরা সামনে একটি লোড ব্যালেন্সার বসিয়ে একাধিক সার্ভারে ট্র্যাফিক ভাগ করে দিই, রোবট আটকাতে রেট লিমিটার এবং ডাটাবেজের চাপ কমাতে মেমোরি ক্যাশ (Redis) ব্যবহার করি।",
  keyConcepts: [
    "Load Balancing (Round Robin / Least Conn)",
    "Rate Limiting (Token Bucket / Sliding Window)",
    "In-Memory Caching (Redis Cache-Aside)",
    "Horizontal Scaling (Stateless App Servers)",
    "Cache Hit vs Cache Miss",
  ],
  nodes: [
    {
      id: "node-client",
      type: "simulationNode",
      position: { x: 40, y: 290 },
      data: {
        label: "Client",
        subLabel: "Web & Mobile Users",
        category: "client",
        emoji: "📱",
        analogy: "হাজার হাজার গ্রাহক — যারা একসাথে লাইন ধরেছে।",
        description: "ব্যবহারকারীর ডিভাইস যেখান থেকে অনুরোধ আসে।",
        techSpecs: "HTTPS / REST",
      },
    },
    {
      id: "node-lb",
      type: "simulationNode",
      position: { x: 480, y: 290 },
      data: {
        label: "Load Balancer",
        subLabel: "NGINX / HAProxy",
        category: "network",
        emoji: "⚖️",
        analogy: "স্মার্ট ট্রাফিক পুলিশ — যে লাইন দেখে ঠিক করে কোন কাউন্টার ফাঁকা আছে এবং গ্রাহককে সেখানে পাঠায়।",
        description: "ইনকামিং ট্রাফিককে একাধিক অ্যাপ সার্ভারের মধ্যে সমানভাবে বণ্টন করে।",
        techSpecs: "Round-Robin / Health Check",
      },
    },
    {
      id: "node-limiter",
      type: "simulationNode",
      position: { x: 960, y: 50 },
      data: {
        label: "Rate Limiter",
        subLabel: "Token Bucket (Redis based)",
        category: "security",
        emoji: "🛡️",
        analogy: "নিরাপত্তার দারোয়ান — যদি কেউ এক সেকেন্ডে ১০০ বার বেল বাজায়, দারোয়ান তাকে বলে 'একটু পরে আসো!'",
        description: "অতিরিক্ত বা স্প্যাম রিকোয়েস্ট আটকে দেয় যাতে সার্ভার ক্র্যাশ না করে।",
        techSpecs: "Max 10 req/sec per IP",
      },
    },
    {
      id: "node-server-1",
      type: "simulationNode",
      position: { x: 960, y: 200 },
      data: {
        label: "App Server 1",
        subLabel: "Stateless Node.js",
        category: "compute",
        emoji: "🖥️",
        analogy: "কাউন্টার ১-এর ক্যাশিয়ার।",
        description: "লিংক শর্ট ও রিডাইরেক্ট লজিক প্রসেস করে।",
        techSpecs: "Worker Process 1",
      },
    },
    {
      id: "node-server-2",
      type: "simulationNode",
      position: { x: 960, y: 450 },
      data: {
        label: "App Server 2",
        subLabel: "Stateless Node.js",
        category: "compute",
        emoji: "🖥️",
        analogy: "কাউন্টার ২-এর ক্যাশিয়ার — প্রথম ক্যাশিয়ারের লোড কমাতে বসেছে।",
        description: "একই লজিক চালায়, কাজ ভাগ করে নেয়।",
        techSpecs: "Worker Process 2",
      },
    },
    {
      id: "node-cache",
      type: "simulationNode",
      position: { x: 1440, y: 130 },
      data: {
        label: "Cache (Redis)",
        subLabel: "In-Memory Key-Value",
        category: "storage",
        emoji: "⚡",
        analogy: "দেওয়ালে টাঙানো দ্রুত চিরকুট বোর্ড — সবচেয়ে বেশি ব্যবহৃত লিঙ্কগুলো এখানে থাকে, চোখের পলকে মিলবে!",
        description: "র‍্যামে ডাটা রাখে। ডাটাবেজে না গিয়েই < 2ms সময়ে লিঙ্ক রিটার্ন করে।",
        techSpecs: "RAM Cache / LRU Eviction",
      },
    },
    {
      id: "node-db",
      type: "simulationNode",
      position: { x: 1440, y: 420 },
      data: {
        label: "Database",
        subLabel: "PostgreSQL Primary",
        category: "storage",
        emoji: "📦",
        analogy: "স্থায়ী বড় ফাইল কেবিনেট — যেখানে কোটি কোটি লিংকের মূল রেকর্ড সুরক্ষিত।",
        description: "স্থায়ী ডিস্ক স্টোরেজ। ক্যাশে না পাওয়া গেলে এখান থেকে আনা হয়।",
        techSpecs: "SSD / Indexed Tables",
      },
    },
  ],
  edges: [
    {
      id: "edge-client-to-lb",
      type: "animatedFlowEdge",
      source: "node-client",
      target: "node-lb",
      data: {
        label: "1. Incoming Request",
        particleColor: "#06b6d4",
      },
    },
    {
      id: "edge-lb-to-limiter",
      type: "animatedFlowEdge",
      source: "node-lb",
      target: "node-limiter",
      data: {
        label: "2. Check IP Quota",
        particleColor: "#f59e0b",
      },
    },
    {
      id: "edge-lb-to-s1",
      type: "animatedFlowEdge",
      source: "node-lb",
      target: "node-server-1",
      data: {
        label: "3a. Forward to Server 1",
        particleColor: "#06b6d4",
      },
    },
    {
      id: "edge-lb-to-s2",
      type: "animatedFlowEdge",
      source: "node-lb",
      target: "node-server-2",
      data: {
        label: "3b. Forward to Server 2",
        particleColor: "#06b6d4",
      },
    },
    {
      id: "edge-s1-to-cache",
      type: "animatedFlowEdge",
      source: "node-server-1",
      target: "node-cache",
      data: {
        label: "4a. Cache Check / Set",
        particleColor: "#a855f7",
      },
    },
    {
      id: "edge-s1-to-db",
      type: "animatedFlowEdge",
      source: "node-server-1",
      target: "node-db",
      data: {
        label: "4b. DB Query",
        particleColor: "#3b82f6",
      },
    },
    {
      id: "edge-s2-to-cache",
      type: "animatedFlowEdge",
      source: "node-server-2",
      target: "node-cache",
      data: {
        label: "4c. Cache Check",
        particleColor: "#a855f7",
      },
    },
  ],
  flows: {
    shorten: [
      {
        id: "i-s1",
        flowType: "shorten",
        stepNumber: 1,
        title: "Client hits Load Balancer (লোড ব্যালেন্সারে রিকোয়েস্ট)",
        whatHappens:
          "ক্লায়েন্ট নতুন লিংক তৈরি করতে রিকোয়েস্ট পাঠালো। রিকোয়েস্টটি সরাসরি সার্ভারে না গিয়ে প্রথমে লোড ব্যালেন্সারে আসলো।",
        whyItMatters:
          "লোড ব্যালেন্সার সিঙ্গেল পয়েন্ট অফ এন্ট্রি হিসেবে কাজ করে এবং ব্যাকএন্ড সার্ভারগুলোর আসল আইপি আড়ালে রাখে।",
        analogy: "🏢 বড় ব্যাংকের সদর দরজায় গার্ডের কাছে যাওয়া।",
        activeNodeIds: ["node-client", "node-lb"],
        activeEdgeIds: ["edge-client-to-lb"],
        nodeStatusMessages: {
          "node-client": "POST /api/v1/shorten",
          "node-lb": "SSL Termination & Routing...",
        },
        payloadSnippet: `POST /api/v1/shorten HTTP/1.1\nHost: api.shortener.io\nX-Forwarded-For: 203.0.113.195`,
      },
      {
        id: "i-s2",
        flowType: "shorten",
        stepNumber: 2,
        title: "Rate Limiter checks user limit (রেট লিমিট ভেরিফিকেশন)",
        whatHappens:
          "রেট লিমিটার পরীক্ষা করলো — এই ইউজার কি সীমা অতিক্রম করেছে? উত্তর আসলো: 'সব ঠিক আছে, অনুমতি দেওয়া হলো!'",
        whyItMatters:
          "DDoS আক্রমণ এবং স্ক্র্যাপারদের অতিরিক্ত রিকোয়েস্ট ঠেকিয়ে সার্ভারকে নিরাপদ রাখে।",
        analogy: "🚦 সিগন্যালে গ্রিন লাইট জ্বলে ওঠা।",
        activeNodeIds: ["node-lb", "node-limiter"],
        activeEdgeIds: ["edge-lb-to-limiter"],
        nodeStatusMessages: {
          "node-limiter": "IP 203.0.113.195: 3/10 tokens used (ALLOWED)",
          "node-lb": "Rate limit PASSED",
        },
        payloadSnippet: `HTTP 200 OK\nX-RateLimit-Limit: 10\nX-RateLimit-Remaining: 7\nX-RateLimit-Reset: 1718000000`,
      },
      {
        id: "i-s3",
        flowType: "shorten",
        stepNumber: 3,
        title: "Forwarded to App Server 1 (সার্ভার ১-এ ডেলিভারি)",
        whatHappens:
          "লোড ব্যালেন্সার দেখলো সার্ভার ১ ফ্রি আছে, তাই রিকোয়েস্টটি সার্ভার ১-এ পাঠিয়ে দিলো। সার্ভার ১ একটি নতুন শর্ট কোড 'mR8vX1' তৈরি করলো।",
        whyItMatters:
          "Stateless আর্কিটেকচারের কারণে যেকোনো সার্ভার যেকোনো রিকোয়েস্ট হ্যান্ডেল করতে পারে।",
        analogy: "👉 'কাউন্টার ১ ফাঁকা আছে, ওখানে যান!'",
        activeNodeIds: ["node-lb", "node-server-1", "node-server-2"],
        activeEdgeIds: ["edge-lb-to-s1", "edge-lb-to-s2"],
        nodeStatusMessages: {
          "node-lb": "Round-Robin Balancing (S1 & S2)",
          "node-server-1": "Processing request... 'mR8vX1'",
          "node-server-2": "Processing concurrent request...",
        },
        payloadSnippet: `Generated Base62 ID: "mR8vX1" (Length: 6 chars)`,
      },
      {
        id: "i-s4",
        flowType: "shorten",
        stepNumber: 4,
        title: "Write to DB & warm the Redis Cache (ডাটাবেজ ও ক্যাশে সংরক্ষণ)",
        whatHappens:
          "সার্ভার ১ ডাটাবেজে লিংকটি স্থায়ীভাবে সেভ করলো এবং সাথে সাথে Redis ক্যাশেও রেখে দিলো যাতে একটু পরেই কেউ সার্চ করলে সাথে সাথে পাওয়া যায়!",
        whyItMatters:
          "Write-Through বা Cache Invalidation স্ট্র্যাটেজি নিশ্চিত করে যে ক্যাশ ও ডাটাবেজ সবসময় সিঙ্কে থাকে।",
        analogy: "📌 ডায়েরিতে লিখে একই সাথে সামনে নোটিস বোর্ডেও পিন মেরে রাখা।",
        activeNodeIds: ["node-server-1", "node-db", "node-cache"],
        activeEdgeIds: ["edge-s1-to-db", "edge-s1-to-cache"],
        nodeStatusMessages: {
          "node-db": "Persisted to table: urls (ID: 59302)",
          "node-cache": "SET 'url:mR8vX1' -> TTL 24h",
          "node-server-1": "Saved in DB & Cache!",
        },
        payloadSnippet: `// 1. Save to DB\nINSERT INTO urls (code, url) VALUES ('mR8vX1', 'https://...');\n\n// 2. Cache warm-up\nREDIS.SETEX("url:mR8vX1", 86400, "https://...");`,
      },
      {
        id: "i-s5",
        flowType: "shorten",
        stepNumber: 5,
        title: "App Server 1 responds to Load Balancer (সার্ভার ১ লোড ব্যালেন্সারে রেসপন্স প্রদান)",
        whatHappens:
          "অ্যাপ সার্ভার ১ শর্ট ইউআরএল তৈরি সম্পন্ন করে লোড ব্যালেন্সারে রেসপন্স ফেরত পাঠালো।",
        whyItMatters:
          "সার্ভার প্রসেসিং শেষ করে লোড ব্যালেন্সারের মাধ্যমে রেসপন্স রুটিং করে।",
        analogy: "📤 ক্যাশিয়ার টোকেন স্লিপ রেজিস্টারে ফেরত জমা দিলো।",
        activeNodeIds: ["node-server-1", "node-lb"],
        activeEdgeIds: ["edge-lb-to-s1"],
        edgeOverrides: {
          "edge-lb-to-s1": {
            label: "5. 201 Created Response",
            isReverse: true,
            particleColor: "#22c55e",
          },
        },
        nodeStatusMessages: {
          "node-server-1": "201 Created -> Returning to LB",
          "node-lb": "Receiving response from Server 1...",
        },
        payloadSnippet: `HTTP/1.1 201 Created\nContent-Type: application/json\n\n{\n  "code": "mR8vX1",\n  "shortUrl": "https://sho.rt/mR8vX1"\n}`,
      },
      {
        id: "i-s6",
        flowType: "shorten",
        stepNumber: 6,
        title: "Load Balancer returns Short URL to Client (ইউজারকে ছোট লিংক প্রদান)",
        whatHappens:
          "ইউজারের স্ক্রিনে সাথে সাথে 'https://sho.rt/mR8vX1' ভেসে উঠলো। পুরো প্রক্রিয়াটি মাত্র 15 মিলিসেকেন্ডে শেষ হলো!",
        whyItMatters:
          "হাই পারফরম্যান্স সিস্টেমের p95 latency < 50ms রাখা নিশ্চিত করা হয়েছে।",
        analogy: "🎉 সেকেন্ডের মধ্যে কাজ শেষ করে মুখে হাসি নিয়ে বিদায় জানানো।",
        activeNodeIds: ["node-lb", "node-client"],
        activeEdgeIds: ["edge-client-to-lb"],
        edgeOverrides: {
          "edge-client-to-lb": {
            label: "6. Return Short URL",
            isReverse: true,
            particleColor: "#22c55e",
          },
        },
        nodeStatusMessages: {
          "node-lb": "Delivering response to Client",
          "node-client": "Created! https://sho.rt/mR8vX1",
        },
        payloadSnippet: `{\n  "status": "success",\n  "shortUrl": "https://sho.rt/mR8vX1",\n  "latencyMs": 14.2\n}`,
      },
    ],
    redirect: [
      {
        id: "i-r1",
        flowType: "redirect",
        stepNumber: 1,
        title: "User clicks Short URL (লিংক ক্লিক ও লোড ব্যালেন্সার)",
        whatHappens:
          "একজন ইউজার 'https://sho.rt/mR8vX1' লিংকে ক্লিক করলেন। লোড ব্যালেন্সার রিকোয়েস্টটি গ্রহণ করে সার্ভার ১-এ পাঠালো।",
        whyItMatters:
          "HTTP GET রিকোয়েস্ট খুব দ্রুত প্রসেস করতে হবে কারণ রিডাইরেক্ট লেটেন্সি ব্যবহারকারী সরাসরি অনুভব করে।",
        analogy: "🚪 সদর দরজা দিয়ে দ্রুত ভেতরে ঢোকা।",
        activeNodeIds: ["node-client", "node-lb", "node-server-2"],
        activeEdgeIds: ["edge-client-to-lb", "edge-lb-to-s2"],
        nodeStatusMessages: {
          "node-client": "GET /mR8vX1",
          "node-lb": "Forwarding to App Server 2",
          "node-server-2": "Checking Redis Cache first...",
        },
        payloadSnippet: `GET /mR8vX1 HTTP/1.1\nHost: sho.rt`,
      },
      {
        id: "i-r2",
        flowType: "redirect",
        stepNumber: 2,
        title: "Cache Hit! Ultra-fast in-memory lookup (ক্যাশ হিট!)",
        whatHappens:
          "সার্ভার ডাটাবেজের কাছে যাওয়ার আগেই দ্রুত Redis ক্যাশ চেক করলো। ওয়াও! ক্যাশেই লিংকটি পাওয়া গেলো! ডাটাবেজে যাওয়ারই দরকার পড়লো না!",
        whyItMatters:
          "Cache-Aside প্যাটার্নে ৮০-৯০% রিড রিকোয়েস্ট ক্যাশ থেকে মেটানো হয়, যার ফলে ডাটাবেজ ওভারলোড হওয়া থেকে বাঁচে এবং লেটেন্সি ১-২ms এ নেমে আসে।",
        analogy: "⚡ টেবিলের উপরের খাতা থেকেই উত্তর পেয়ে যাওয়া — আলমারি খোলার প্রয়োজনই হলো না!",
        activeNodeIds: ["node-server-2", "node-cache"],
        activeEdgeIds: ["edge-s2-to-cache"],
        nodeStatusMessages: {
          "node-cache": "CACHE HIT! key='url:mR8vX1' (Time: 0.8ms)",
          "node-server-2": "Found in RAM! Bypassing Database.",
        },
        payloadSnippet: `REDIS.GET("url:mR8vX1")\n=> "https://example.com/system-design-intermediate"\nLatency: 0.8ms [CACHE HIT]`,
      },
      {
        id: "i-r3",
        flowType: "redirect",
        stepNumber: 3,
        title: "Immediate 301 Redirect to User (তাত্ক্ষণিক রিডাইরেক্ট)",
        whatHappens:
          "সার্ভার পলকের মধ্যে ব্রাউজারকে আসল ঠিকানায় পাঠিয়ে দিলো। ব্যবহারকারী চোখের পলক ফেলার আগেই আসল ওয়েবসাইট খুলে গেলো!",
        whyItMatters:
          "ক্যাশ থাকার কারণে সমগ্র রিডাইরেক্ট সাইকেল মাত্র ৫ মিলিসেকেন্ডে শেষ হলো।",
        analogy: "🚀 সুপারফাস্ট রকেটের মতো সঠিক গন্তব্যে পৌঁছে যাওয়া।",
        activeNodeIds: ["node-server-2", "node-lb", "node-client"],
        activeEdgeIds: ["edge-lb-to-s2", "edge-client-to-lb"],
        edgeOverrides: {
          "edge-lb-to-s2": {
            label: "3a. 301 Redirect Response",
            isReverse: true,
            particleColor: "#22c55e",
          },
          "edge-client-to-lb": {
            label: "3b. Redirecting to Long URL",
            isReverse: true,
            particleColor: "#22c55e",
          },
        },
        nodeStatusMessages: {
          "node-server-2": "301 Moved Permanently",
          "node-client": "Redirecting...",
        },
        payloadSnippet: `HTTP/1.1 301 Moved Permanently\nLocation: https://example.com/system-design-intermediate\nX-Cache: HIT`,
      },
    ],
  },
};
