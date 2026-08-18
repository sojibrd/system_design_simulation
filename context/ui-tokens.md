# UI Tokens — Blueprint Design System

`system_design_simulation` প্রজেক্টের ভিজ্যুয়াল ভাষা: **light-only technical drafting (blueprint)**।
কাগজের ওপর কালিতে আঁকা আর্কিটেকচার ড্রয়িং — গ্রাফ-পেপার গ্রিড, পাতলা রুল লাইন, ধারালো কোণা, mono অ্যানোটেশন।

## অলঙ্ঘনীয় নিয়ম

1. **কম্পোনেন্টে কাঁচা Tailwind প্যালেট রঙ ব্যবহার করা যাবে না** (`zinc-800`, `cyan-500`, `emerald-400` …)। প্রয়োজনীয় ভ্যালু না থাকলে আগে `app/globals.css`-এর `@theme`-এ টোকেন যোগ করুন।
2. **কোনো glow নেই।** `shadow-[0_0_Npx_rgba(...)]`, neon ring, gradient বাটন — কিছুই নয়। এলিভেশন = স্তরে রাখা কাগজ (`shadow-sheet`, `shadow-lift`) বা আঁকা অফসেট (`shadow-drawn`)।
3. **কোণা ধারালো।** `rounded-xl`/`rounded-full` নয় — `rounded-sheet` (3px), `rounded-box` (2px), `rounded-tick` (1px)।
4. **Dark mode নেই।** ইচ্ছাকৃত সিদ্ধান্ত — blueprint-এর বিশ্বাসযোগ্যতা কাগজে। ভবিষ্যতে দরকার হলে `@theme`-এর টোকেন override করেই হবে, কম্পোনেন্টে নয়।
5. **ডেটা ফাইলে রঙ থাকবে না।** `lib/simulations/*` শুধু *অর্থ* বলে (`particleColor: "success"`), রঙ নয়।

## টোকেন

### Surfaces — কাগজ
| টোকেন | ভ্যালু | ব্যবহার |
|---|---|---|
| `paper` | `#f7f5ef` | পেজ ব্যাকগ্রাউন্ড (গ্রাফ-পেপার গ্রিডসহ) |
| `paper-raised` | `#fffdf8` | প্যানেল, নোড, মোডাল |
| `paper-sunken` | `#eae7dd` | কোড ব্লক, ইনসেট লিস্ট |
| `paper-wash` | `#e2ded1` | hover / pressed ফিল |

### Ink — টেক্সট
| টোকেন | ভ্যালু | ব্যবহার |
|---|---|---|
| `ink` | `#16213b` | হেডিং, প্রাইমারি টেক্সট, active বর্ডার |
| `ink-soft` | `#3b475f` | বডি টেক্সট |
| `ink-muted` | `#6d788d` | mono লেবেল, ক্যাপশন |
| `ink-faint` | `#9aa3b2` | disabled, placeholder |

### Rules — আঁকা রেখা
`rule` (hairline) · `rule-strong` (জোরালো) · `rule-heavy` (ইঙ্ক বর্ডার)
Grid: `grid-minor` 16px · `grid-major` 80px

### Accent / Alert / Confirm
`accent` `#1b4b8f` (ড্রাফটসম্যানের নীল পেন্সিল) + `accent-soft`, `accent-line`
`alert` `#b23b2c` (লাল কারেকশন পেন্সিল) + `alert-soft`
`confirm` `#1f7a5c` + `confirm-soft`

### Category inks — আর্কিটেকচার কম্পোনেন্ট
`cat-client` `cat-compute` `cat-storage` `cat-network` `cat-security` `cat-queue` `cat-analytics`
নোডে এগুলো কেবল **corner tick + mono category লেবেল + emoji বক্স** রঙ করে। বর্ডার নয় — বর্ডার active-state-এর সংরক্ষিত ভাষা।

### Signal inks — ফ্লো/প্যাকেট
`signal-request` `signal-write` `signal-read` `signal-success` `signal-cache` `signal-event` `signal-error` `signal-meta`
`SignalKind` টাইপ (`app/lib/types.ts`) দিয়ে ডেটা ফাইল থেকে রেফার করা হয়; `AnimatedEdge` রঙে রিজলভ করে।

### Shape / Elevation / Motion
`rounded-sheet|box|tick` · `shadow-sheet|lift|drawn` · `ease-plot`

### Type
`font-sans` = Archivo (grotesk, engineering lettering) · `font-mono` = JetBrains Mono
সব লেবেল, স্পেক, ব্যাজ, স্টেপ নম্বর, স্ট্যাটাস — **mono, uppercase, tracking `[0.12em]`–`[0.16em]`**।

## Primitives — `app/components/ui/`

| Primitive | কাজ |
|---|---|
| `Panel` / `PanelHeader` | কাগজের শিট + টাইটেল ব্লক (`tone`: raised/sunken/flat) |
| `Button` / `IconButton` | `variant`: primary (ইঙ্ক-ফিল + offset shadow, প্রেস করলে ঢুকে যায়), alert, outline, ghost |
| `Badge` | mono স্ট্যাম্প (`tone`: neutral/accent/alert/confirm) — pill নয় |
| `Callout` | মার্জিন নোট: ভারী বাম রুল + mono ক্যাপশন (`tone`: note/accent/alert) |
| `Rule` / `CornerTicks` | আঁকা বিভাজক রেখা; রেজিস্ট্রেশন টিক (যা বক্সকে টেকনিক্যাল ড্রয়িং বানায়) |

## Motion

| ক্লাস | কী |
|---|---|
| `animated-edge-active(-reverse)` | ড্যাশড লাইন প্লটারের মতো এগোয় |
| `node-pulse-active` | active নোডের অফসেট শ্যাডো ২px↔৩px — glow নয় |
| `tick-sweep` | লাইভ স্ট্যাটাস টিকের opacity সুইপ |
