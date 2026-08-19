# Theme Contract — এক-ফাইল থিমিং

`system_design_simulation`-এর সব ভিজ্যুয়াল সিদ্ধান্ত CSS-এ থাকে, কম্পোনেন্টে নয়।

## থিম বদলানো

```css
/* app/globals.css — লাইন ৯ */
@import "./themes/control-room.css";
```

**এই একটা লাইনই** পুরো অ্যাপের চেহারা ঠিক করে। বিদ্যমান থিম একটাই: `control-room.css`। (`tactile`, `editorial`, `terminal` সরানো হয়েছে — দরকার হলে git history-তে আছে।)

**নতুন থিম লিখতে:** `app/themes/<name>.css`-এ একটা `:root {}` ব্লক, নিচের সব `--t-*` ভেরিয়েবল সেট করে। তারপর উপরের লাইনটা বদলান। **কম্পোনেন্টে কখনো হাত দেবেন না।**

---

## অলঙ্ঘনীয় নিয়ম

1. **কম্পোনেন্টে কোনো ভিজ্যুয়াল সিদ্ধান্ত নয়।** রঙ তো নয়ই — `rounded-*`, `shadow-*`, `border-2`, `uppercase`, `tracking-*`, `font-bold` কোনোটাই না। এগুলো role class-এ থাকে।
2. **Tailwind শুধু লেআউটের জন্য** — `flex`, `grid`, `gap`, `w-`, `min-h-`, `truncate`, `overflow-*`। চেহারার জন্য নয়।
3. **কম্পোনেন্ট বলে *কী*, থিম বলে *কেমন*।** `data-active`, `aria-selected`, `aria-pressed`, `data-state` — অবস্থা জানায়; সেটা দেখতে কেমন হবে তা CSS ঠিক করে।
4. **ডেটা ফাইলে রঙ নেই।** `lib/simulations/*` শুধু অর্থ বলে (`particleColor: "success"`)।
5. **নতুন ভিজ্যুয়াল দরকার হলে আগে কনট্র্যাক্টে টোকেন যোগ করুন**, তারপর সব থিম ফাইলে ভ্যালু দিন।

---

## Role classes (`app/globals.css`)

| শ্রেণি | ক্লাস |
|---|---|
| Surface | `surface-app` `surface-panel` `surface-raised` `surface-well` |
| Text | `t-title` `t-label` `t-body` `t-caption` `t-mono` `t-strong` `t-accent` `t-muted` `t-ok` `t-quote` |
| Seam | `seam` `seam-b` `seam-b-heavy` `seam-t` |
| Control | `control` + `control--primary` `control--alert` `control--quiet`; `segment-group` / `segment` |
| Chip | `chip` + `chip--accent` `chip--alert` `chip--ok` |
| Callout | `callout` + `callout--accent` `callout--alert` |
| Content | `payload` (literal JSON/SQL/HTTP নমুনা) · `option` (trade-off-এর একটা শাখা) |
| Canvas | `unit` `ornament-mark` `lamp` `terminal` `edge-tag` `wire` `packet-core` `packet-halo` |
| Nav | `tab` `row` `progress-mark` `overlay` |

### State attributes

| অ্যাট্রিবিউট | কোথায় | অর্থ |
|---|---|---|
| `data-active` / `data-animated` | `.unit` | এই ধাপে সক্রিয় / চলমান |
| `data-selected` | `.unit` | ইউজার সিলেক্ট করেছে |
| `data-lit` / `data-blink` | `.lamp` | জ্বলছে / জ্বলে-নেভে |
| `data-state` (`done`/`current`/`todo`) + `data-live` | `.progress-mark` | ধাপের অগ্রগতি |
| `aria-selected` | `.tab` | নির্বাচিত ফেজ |
| `aria-pressed` | `.segment` | নির্বাচিত সেগমেন্ট |
| `aria-current` | `.row` | বর্তমান লিস্ট আইটেম |
| `data-chosen` | `.option` | trade-off-এ এই শাখাটাই নেওয়া হয়েছে |
| `data-static` | `.control` | খোলার কিছু নেই — disabled হলেও প্লেট হিসেবে পুরো স্পষ্ট থাকে |
| `data-corner` (`tl`/`tr`/`bl`/`br`) | `.ornament-mark` | কোন কোণা |

---

## থিম টোকেন (`--t-*`)

নতুন থিম ফাইলে এগুলো সব সেট করতে হবে। রেফারেন্স হিসেবে `themes/control-room.css` দেখুন।

- **Type:** `font-sans` `font-mono` `title-family|weight|tracking|transform` `label-family|size|weight|tracking|transform` `control-family|weight|tracking|transform`
- **App:** `app-bg` `app-bg-image` `app-bg-size` `select-bg|fg` `overlay-bg|filter` `hover-fill` `selected-bg|fg` `accent` `ok` `ok-soft` `disabled-opacity` `ease`
- **Text:** `text-title|body|label|muted|faint` `quote-style` `payload-fg`
- **Surfaces:** `panel-*` `raised-*` `well-*` (প্রতিটির `bg` `border` `border-width` `radius` `shadow`)
- **Seams:** `seam` `seam-width` `seam-heavy` `seam-heavy-width`
- **Controls:** `control-bg|border|fg|shadow|radius|border-width` + hover/press ভ্যারিয়েন্ট; `primary-*` `alert-*`
- **Chips/Callouts:** `chip-*` `callout-*`
- **Unit:** `unit-bg|border|border-width|radius|shadow`, `unit-selected-border`, `unit-active-bg|border|border-width|shadow|animation`
- **Ornament:** `ornament-display|size|inset|radius|fill|color|stroke|shadow`
- **Lamp:** `lamp-size|radius|off-fill|glow|blink-animation`
- **Terminal:** `terminal-size|radius|fill|border|fill-hover`
- **Wire/Packet:** `wire-dormant|dormant-width|dormant-dash`, `wire-live-width|live-dash|live-filter`, `wire-dash-speed`, `wire-corner-radius`, `packet-size|rx`, `packet-halo-size|halo-rx|halo-opacity`, `edge-tag-bg`
- **Tabs/Progress/Canvas/Scrollbar:** `tab-*` `progress-*` `canvas-dot|gap|dot-size` `scrollbar-*`
- **Categories:** `cat-client|compute|storage|network|security|queue|analytics`
- **Signals:** `signal-request|write|read|success|cache|event|error|meta`

### সংখ্যা-টোকেন

কয়েকটা ভ্যালু React-কে সংখ্যা হিসেবে পাস করতে হয় (SVG geometry, canvas grid)। সেগুলো থিমেই থাকে, `useThemeNumber()` হুক রানটাইমে পড়ে নেয় — `wire-corner-radius`, `packet-size`, `packet-halo-size`, `canvas-gap`, `canvas-dot-size`।

---

## গতি ও `prefers-reduced-motion`

`globals.css`-এর শেষে একটাই global ব্রেক: reader OS-এ motion কমাতে বললে সব CSS animation ও transition কার্যত থেমে যায়। **হাইলাইট থাকে** — অর্থটা ওটাই বহন করে; কেবল নড়াচড়া বন্ধ হয়। নতুন কোনো লুপিং animation থিমে যোগ করলে আলাদা কিছু করতে হয় না, ওই নিয়মেই ঢাকা পড়বে।

ব্যতিক্রম একটাই: travelling packet-টা `<animateMotion>` (SMIL), যেটা CSS-এর নাগালের বাইরে — `AnimatedEdge` `usePrefersReducedMotion()` দেখে ওটাকে render-ই করে না।

## ফন্ট

`app/layout.tsx`-এ চারটে ফ্যামিলি একবার লোড করা: `--font-grotesk` (Archivo), `--font-display` (Archivo Black), `--font-condensed` (Barlow Semi Condensed), `--font-mono-family` (JetBrains Mono)। থিম শুধু বেছে নেয়:

```css
--t-font-sans: var(--font-condensed), ui-sans-serif, sans-serif;
--t-title-family: var(--font-display), var(--t-font-sans);
```

**এই তালিকার বাইরের ফন্ট লাগলে — কেবল তখনই — `layout.tsx`-এ হাত পড়বে।** এটাই এক-ফাইল প্রতিশ্রুতির একমাত্র ব্যতিক্রম।

---

## বিদ্যমান থিমের চরিত্র

**`control-room`** — র‍্যাকে বসানো যন্ত্রের প্যানেল। উষ্ণ চারকোল, মেশিনড বেজেল (inset হাইলাইট + নিচে shadow), খোদাই করা mono লেবেল, অ্যাম্বার সিগন্যাল ল্যাম্প। *একমাত্র ল্যাম্পই আলো ছড়ায়।* Ornament = চারটি বেজেল স্ক্রু।
