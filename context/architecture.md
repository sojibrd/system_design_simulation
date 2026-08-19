# আর্কিটেকচার

## ফাইল-মানচিত্র

```
app/
  page.tsx                  একমাত্র রুট — simulation + level নির্বাচন, লেআউট
  layout.tsx                চারটে ফন্ট লোড (এর বাইরে হাত দেওয়ার দরকার নেই)
  globals.css               role class + theme import (context/ui-tokens.md দেখুন)
  themes/*.css              --t-* টোকেনের ভ্যালু
  lib/types.ts              পুরো ডোমেইন চুক্তি, doc-comment সহ
  lib/simulations/          ডেটা: index.ts → <system>/ → <level>.ts
  hooks/useSimulation.ts    playback ইঞ্জিন
  hooks/useThemeNumber.ts   CSS ভ্যারিয়েবল → number (SVG geometry-র জন্য)
  hooks/useMediaQuery.ts    media query → boolean (reduced-motion, breakpoint)
  components/simulation/    ডোমেইন কম্পোনেন্ট
  components/ui/            থিম-চালিত প্রিমিটিভ (Panel, Button, Badge, ...)
```

## ডোমেইন শ্রেণিবিন্যাস

`SimulationConfig` → `LevelConfig[]` → `FlowDefinition[]` → `SimulationStep[]`

- **Simulation** = একটা সিস্টেম ডিজাইন সমস্যা (যেমন URL Shortener)।
- **Level** = আর্কিটেকচারের একটা *প্রতিশ্রুতি*, কঠিনতার মাত্রা নয়: `functional` (কাজ করে) → `scalable` (লোড সহে) → `reliable` (মেশিন মরলেও সঠিক থাকে) → `global` (দূরত্ব সহে, ঐচ্ছিক)। প্রতিটি লেভেলের নিজস্ব `nodes`/`edges`।
- **Flow** = একটা দৃশ্যপট (`shorten`, `redirect`, `redirect-miss`, `failover`, `analytics`)। cache-hit ও cache-miss পরস্পরের *বিকল্প*, তাই আলাদা flow — এক টাইমলাইনে জোড়া লাগানো হয় না।
- **Step** = flow-এর একটা হপ: কোন node/edge সক্রিয় + বাংলা ব্যাখ্যা।

## ডেটার প্রবাহ

1. `page.tsx` → `currentSimulationId` + `currentLevelId` (দুটোই `useState`)। সিমুলেশন বদলালে level তার প্রথমটিতে ফিরে যায়; নির্বাচিত level না থাকলে fallback প্রথমটিতে।
2. `useSimulation(currentLevel)` → step index চালায়, আর প্রতিটি node/edge-এ `isActive` / `isFocused` / `isAnimated` + step-এর `edgeOverrides` / `nodeStatusMessages` মিশিয়ে দেয়।
3. `FlowDiagram` (React Flow) `SimulationNode` ও `AnimatedEdge` রেন্ডার করে — এরা কেবল flag-কে `data-*` অ্যাট্রিবিউটে অনুবাদ করে; চেহারা CSS ঠিক করে।

## যে নিয়মগুলো ভুলে ভাঙা সহজ

- `currentStepIndex === -1` মানে "শুরুর আগে" — শূন্যতম ধাপ নয়। auto-play শেষে আবার `-1`-এ ফেরে।
- `isFinished` (শেষ ধাপে থেমে থাকা) হাইলাইট রাখে কিন্তু সব motion বন্ধ করে দেয়।
- Level বদল render-এর সময়েই state রিসেট করে (effect-এ নয়), যাতে পুরোনো লেভেলের এক ফ্রেমও না আঁকা হয়। গার্ডটা `LevelConfig` **অবজেক্ট** মেলায়, `levelConfig.id` নয় — `LevelId` কেবল এক সিমুলেশনের ভেতরে unique, তাই দুটো সিস্টেম দুটোই `functional`-এ খুললে id-চেক ফাঁকি দিয়ে এক সিস্টেমের step index অন্যটায় চলে যেত।
- `FlowDiagram`-এ `key={simulation.id}-{levelId}` — React Flow-কে জোর করে নতুন করে mount করানোর জন্য।
- `output: "export"` — কোনো server component data fetch, route handler বা server action নেই।
- SSR-এ viewport বা reader-preference কিছুই জানা নেই, তাই `useMediaQuery` প্রথম render-এ সবসময় `false` — mount-এর পর একবার শুধরে নেয়।
- এক ধাপের ঘড়ি ধাপ বদলালেই কেবল শূন্য থেকে শুরু হয় — speed বদলানো বা pause/resume ইতিমধ্যে দেখা সময়টুকু জমা রাখে (`useSimulation`-এর `consumed` / `runningSince`)।
- `Sheet` compact স্ক্রিনে dialog, কিন্তু **modal নয়** — নিচের `ControlsBar` তখনো দেখা যায় ও কাজ করে, তাই Tab ট্র্যাপ বা `aria-modal={true}` দিয়ে ওটাকে কীবোর্ড/স্ক্রিন রিডারের কাছ থেকে কেড়ে নেওয়া চলবে না। যা আছে: `role="dialog"` + Escape + বন্ধ হলে ফোকাস opener-এ ফেরত (কেবল সত্যিকারের বন্ধে, রিসাইজে নয়)। প্রশস্ত স্ক্রিনে ওটা নিছক একটা কলাম, কোনো ARIA role নেই।
- Packet-টা `<animateMotion>` (SMIL), CSS animation নয় — `prefers-reduced-motion`-এর স্টাইলশিট নিয়ম ওটাকে ছুঁতে পারে না, তাই `AnimatedEdge` ওটাকে DOM থেকেই বাদ দেয়।
