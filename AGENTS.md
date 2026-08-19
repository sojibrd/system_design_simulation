<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# system_design_simulation

সিস্টেম ডিজাইনের সমস্যাগুলো ধাপে ধাপে **অ্যানিমেটেড আর্কিটেকচার ডায়াগ্রাম** হিসেবে দেখানোর একটা শিক্ষামূলক অ্যাপ। ব্যাখ্যার ভাষা **বাংলা**, কোড ও পরিভাষা ইংরেজি।

## স্ট্যাক

Next.js 16 (App Router, `output: "export"` — পুরোটা static) · React 19 · TypeScript · Tailwind v4 · `@xyflow/react` (React Flow 12) · `lucide-react`।
`master`-এ push হলে GitHub Actions `out/` বানিয়ে GitHub Pages-এ ডিপ্লয় করে (`.github/workflows/deploy.yml`)। CI-তে `basePath` হয় `/system_design_simulation` — তাই কোনো asset পাথ হার্ডকোড করবেন না।

কমান্ড: `npm run dev` · `npm run build` · `npm run lint`। কোনো টেস্ট সেটআপ নেই।

## কাঠামোর তিন স্তর

| স্তর | জায়গা | দায়িত্ব |
|---|---|---|
| **ডেটা** | `app/lib/simulations/**` | কোন সিস্টেম, কোন লেভেল, কোন node/edge, কোন ধাপ — সব। কোনো JSX, কোনো রঙ নয়। |
| **ইঞ্জিন** | `app/hooks/useSimulation.ts` | playback state (step index, play/pause, speed, flow) এবং তা থেকে node/edge-এ derived flag বসানো। |
| **উপস্থাপন** | `app/components/**` + `app/globals.css` + `app/themes/*` | *কী* আছে তা কম্পোনেন্ট বলে; *কেমন দেখাবে* তা CSS বলে। |

একটা নতুন সিস্টেম যোগ করা **কেবল ডেটার কাজ** — কম্পোনেন্ট ছুঁতে হলে বুঝতে হবে কোথাও ভুল হচ্ছে।

## পড়ার নির্দেশ

- ভিজ্যুয়াল/স্টাইল/থিম-সংক্রান্ত যেকোনো কাজের আগে → [context/ui-tokens.md](context/ui-tokens.md)
- নতুন সিমুলেশন, লেভেল বা flow লেখার আগে → [context/authoring-simulations.md](context/authoring-simulations.md)
- ডোমেইন মডেল ও ডেটা-প্রবাহ বুঝতে → [context/architecture.md](context/architecture.md)

## অলঙ্ঘনীয় নিয়ম

1. **কম্পোনেন্টে কোনো ভিজ্যুয়াল সিদ্ধান্ত নয়** — রঙ, `rounded-*`, `shadow-*`, `border-2`, `font-bold` কিছুই না। Tailwind শুধু লেআউটের জন্য; বাকি সব role class + `--t-*` টোকেন।
2. **ডেটা ফাইলে রঙ নেই** — `particleColor: "success"` অর্থ বলে, রঙ নয়।
3. **সব ব্যাখ্যামূলক টেক্সট বাংলায়** (`whatHappens`, `whyItMatters`, `analogy`, `conceptSummary`, `tradeOffs`)। শুধু `name`/`label`/`keyConcepts`-এর পরিভাষা ইংরেজি।
4. **`app/lib/types.ts`-এর doc-comment গুলোই চুক্তি** — কোনো ফিল্ড যোগ/বদলের আগে সেগুলো পড়ুন, আর বদলালে comment-ও হালনাগাদ করুন।
5. **সব state client-side** — `output: "export"`, কাজেই কোনো server action, route handler বা রানটাইম ডেটা ফেচ নেই।
