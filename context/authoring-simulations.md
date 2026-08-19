# নতুন সিমুলেশন / লেভেল লেখা

কোড নয়, ডেটার কাজ। আগে `app/lib/types.ts`-এর doc-comment পড়ুন; `url-shortener/functional.ts` সবচেয়ে ছোট রেফারেন্স।

## ধাপ

1. `app/lib/simulations/<system>/<level>.ts` — একটা `LevelConfig` export করুন।
2. `<system>/index.ts` — লেভেলগুলো জুড়ে `SimulationConfig` বানান (যতগুলো লেভেল সত্যিই কিছু শেখায় ততগুলোই; খালি ট্যাব না-থাকার চেয়ে খারাপ)।
3. `simulations/index.ts`-এর অ্যারেতে যোগ করুন। প্রথম এন্ট্রিতেই অ্যাপ খোলে।

## `LevelConfig`-এর অংশ

- `badge` / `tagline` / `conceptSummary` / `keyConcepts` — লেভেল ট্যাব ও DesignNotes-এ।
- `scaleEstimate` — এই কম্পোনেন্ট-সংখ্যাটাকে *ন্যায্য* প্রমাণ করে। সিস্টেম-নির্দিষ্ট সংখ্যা `extras`-এ, নতুন ফিল্ড নয়।
- `tradeOffs` — যে সিদ্ধান্তের কোনো হপ নেই ("301 না 302?")। `options` + `chosen` + `why`; পরের লেভেলে সিদ্ধান্তটা কেন ভেঙে পড়ে সেটাও `why`-তে বলুন।
- `nodes` / `edges` — React Flow-এর, তবে `data`-তে `category`, `emoji`, `analogy`, `description`, `techSpecs`। `position` হাতে দেওয়া।
- `flows` — প্রথমটাই ডিফল্ট। লেভেলে যেটা নেই সেই flow লিখবেন না (functional-এ cache নেই → `redirect-miss` নেই)।

## `SimulationStep` লেখার নিয়ম

- `activeNodeIds`-এর **প্রথম আইডিটাই** focused node — ক্রম গুরুত্বপূর্ণ।
- `activeEdgeIds` — কেবল এই হপে যে তারগুলো জ্বলবে।
- `edgeOverrides` — একই edge ভিন্ন ধাপে ভিন্ন অর্থ বহন করলে (`label`, `isReverse`, `particleColor`)।
- `nodeStatusMessages` — node-এর ওপর ক্ষণস্থায়ী টেক্সট ("cache miss")।
- `payloadSnippet` — ঐ হপে যাওয়া বাস্তব JSON/SQL/HTTP নমুনা।
- `particleColor` **অর্থ** বলে (`request` `write` `read` `success` `cache` `event` `error` `meta`) — রঙ নয়। রঙ থিমের।

## লেখার সুর

`whatHappens` — এক লাইনে, বাচ্চাকে বোঝানোর মতো। `whyItMatters` — কেন এই কম্পোনেন্টটা এখানে দরকার। `analogy` — emoji সহ বাস্তব উপমা। সবই বাংলা; পরিভাষা ইংরেজিই থাক (Load Balancer, cache hit)।

## নতুন ধরনের কিছু লাগলে

নতুন `FlowKind` / `FlowIcon` / `ComponentCategory` / `SignalKind` মানে `types.ts`-এ union বাড়ানো — সাথে সাথে **সব থিম ফাইলে** সংশ্লিষ্ট টোকেন (`--t-cat-*`, `--t-signal-*`) দিতে হবে, নইলে ঐ থিমে জিনিসটা বেরঙা হয়ে যাবে।
