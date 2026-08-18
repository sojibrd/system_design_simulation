# UI Tokens — Control Room Design System

`system_design_simulation` প্রজেক্টের ভিজ্যুয়াল ভাষা: **Control Room / ইনস্ট্রুমেন্ট প্যানেল**।
অ্যাপটা একটা র‍্যাকে বসানো যন্ত্রের প্যানেল — উষ্ণ চারকোল চেসিস, মেশিনড বেজেল, খোদাই করা লেবেল,
আর সিগন্যাল ল্যাম্প যেগুলো সত্যিই কিছু ঘটলে তবেই জ্বলে।

## অলঙ্ঘনীয় নিয়ম

1. **সারফেস উষ্ণ চারকোল** (বাদামি-কালো) — নীলচে slate/zinc নয়। এটাই generic dark-dashboard থেকে আলাদা করে।
2. **গভীরতা = ফিজিক্যাল বেজেল** — উপরে inset হাইলাইট, নিচে shadow (`shadow-bezel`)। শূন্যে ভাসা blurred card নয়।
3. **Glow শুধু ল্যাম্পের** (জ্বলন্ত ল্যাম্প সত্যিই আলো ছড়ায়)। প্যানেল, বাটন, বর্ডার, টেক্সট — কখনো নয়। একমাত্র সরঞ্জাম `.lamp` ক্লাস, যা `currentColor`-এ আলো আঁকে।
4. **Gradient সাজসজ্জা নয়।** কেবল আলোকিত সারফেস মডেল করতে ব্যবহার্য।
5. **কম্পোনেন্টে কাঁচা Tailwind প্যালেট রঙ নিষিদ্ধ** (`zinc-800`, `cyan-500`…)। ভ্যালু না থাকলে আগে `app/globals.css`-এর `@theme`-এ টোকেন যোগ করুন।
6. **ডেটা ফাইলে রঙ থাকবে না।** `lib/simulations/*` শুধু *অর্থ* বলে (`particleColor: "success"`), রঙ নয়।

## টোকেন

### Chassis & panels
| টোকেন | ভ্যালু | ব্যবহার |
|---|---|---|
| `chassis` | `#17140f` | পেজ ব্যাকগ্রাউন্ড — যে র‍্যাকে প্যানেল বসানো |
| `panel` | `#211d18` | প্যানেলের মুখ |
| `panel-raised` | `#2b251f` | মুখ থেকে উঁচু কন্ট্রোল গ্রুপ, নোড, মোডাল |
| `panel-hi` | `#363029` | hover / pressed |
| `well` | `#100e0b` | ভেতরে বসানো readout স্ক্রিন, কোড ব্লক, ক্যানভাস |

### Bezels
`bezel` · `bezel-strong` · `bezel-hi` — প্যানেলের মেশিনড ধার।

### Readout (টেক্সট)
`readout` (প্রাইমারি) · `readout-soft` (বডি) · `readout-muted` (খোদাই লেবেল, ইউনিট) · `readout-faint` (off/disabled)

### Lamps — একমাত্র যা আলো ছড়াতে পারে
`lamp` `#ffb020` (প্রাইমারি, "running") · `lamp-dim` (নিভন্ত) · `lamp-soft` (backlit wash)
`lamp-green` + `lamp-green-soft` · `lamp-red` + `lamp-red-soft`

### Category lamps — আর্কিটেকচার কম্পোনেন্ট
`cat-client` `cat-compute` `cat-storage` `cat-network` `cat-security` `cat-queue` `cat-analytics`
নোডে এগুলো কেবল **স্ট্যাটাস ল্যাম্প + mono category লেবেল + emoji well** রঙ করে।
বর্ডার নয় — active-state-এর অ্যাম্বার রিং সংরক্ষিত।

### Signal lamps — ফ্লো/প্যাকেট
`signal-request` `signal-write` `signal-read` `signal-success` `signal-cache` `signal-event` `signal-error` `signal-meta`
`SignalKind` টাইপ (`app/lib/types.ts`) দিয়ে ডেটা ফাইল থেকে রেফার করা হয়; `AnimatedEdge` ল্যাম্প-রঙে রিজলভ করে।

### Shape / Depth / Motion
`rounded-panel` (6px) · `rounded-box` (4px) · `rounded-tick` (2px)
`shadow-bezel` (মাউন্টেড প্যানেল) · `shadow-raised` (উঁচু) · `shadow-well` (ভেতরে বসানো) · `shadow-key` (চাপার মতো বাটন)
`ease-instrument` — রিলে সুইচ করার মতো, bounce নয়।

### Type
`font-sans` = Barlow (শিল্প-সরঞ্জামের লেবেলের কনডেন্সড grotesk) · `font-mono` = JetBrains Mono
সব লেবেল, স্পেক, ব্যাজ, স্টেপ নম্বর, স্ট্যাটাস — **mono, uppercase, tracking `[0.12em]`–`[0.18em]`**।

## Primitives — `app/components/ui/`

| Primitive | কাজ |
|---|---|
| `Panel` / `PanelHeader` | র‍্যাকে মাউন্ট করা প্যানেল + খোদাই করা টাইটেল স্ট্রিপ (`tone`: raised/sunken/flat) |
| `Button` / `IconButton` | ফিজিক্যাল কী — চাপলে নিচে নামে (`variant`: primary/alert/outline/ghost) |
| `Badge` | খোদাই করা প্লেট (`tone`: neutral/accent/alert/confirm) — pill নয় |
| `Callout` | লেবেলযুক্ত readout ব্লক: রঙিন বাম ধার + mono ক্যাপশন (`tone`: note/accent/alert) |
| `Rule` / `BezelScrews` | প্যানেলের সিম; ফেসপ্লেট ধরে রাখা চারটি স্ক্রু (যা বক্সকে মাউন্টেড হার্ডওয়্যার বানায়) |

## Motion

| ক্লাস | কী |
|---|---|
| `animated-edge-active(-reverse)` | ড্যাশড ওয়্যার সিগন্যালের দিকে এগোয় |
| `node-pulse-active` | engaged ইউনিটের অ্যাম্বার রিং শ্বাস নেয় |
| `tick-sweep` | স্ট্যাটাস ল্যাম্প ব্লিংক |
| `.lamp` / `.lamp-off` | জ্বলন্ত / নিভন্ত ল্যাম্প (একমাত্র সরকারি glow) |
