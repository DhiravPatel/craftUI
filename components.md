# CraftUI components

> A copy-paste component library in a pnpm + turbo monorepo. **179 components** ship today.

## How to use this file

This file is an AI-friendly catalog of every component CraftUI ships. Each entry is **one line**:

`- **name** — one-line purpose. _keywords: a, b, c_`

Use Cmd/Ctrl-F to find a component by name, behavior, or keyword. Then install it from the registry:

```bash
npx craftui add <component-name>
```

Browse the live previews and full prop tables at the [docs site](./apps/docs).

## Alphabetical index

| | | | |
|---|---|---|---|
| [`accordion`](#accordion) | [`activity-heatmap`](#activity-heatmap) | [`alert`](#alert) | [`alert-dialog`](#alert-dialog) |
| [`animated-beam`](#animated-beam) | [`animated-chart`](#animated-chart) | [`animated-text`](#animated-text) | [`animated-tooltip`](#animated-tooltip) |
| [`api-key-display`](#api-key-display) | [`audio-visualizer`](#audio-visualizer) | [`aurora`](#aurora) | [`avatar`](#avatar) |
| [`avatar-stack`](#avatar-stack) | [`background-beams`](#background-beams) | [`background-boxes`](#background-boxes) | [`badge`](#badge) |
| [`banner`](#banner) | [`bento-grid`](#bento-grid) | [`breadcrumb`](#breadcrumb) | [`button`](#button) |
| [`calendar`](#calendar) | [`card`](#card) | [`card-hover-effect`](#card-hover-effect) | [`card-stack`](#card-stack) |
| [`carousel-3d`](#carousel-3d) | [`chat-bubble`](#chat-bubble) | [`checkbox`](#checkbox) | [`code-rain`](#code-rain) |
| [`coin-flip`](#coin-flip) | [`color-picker`](#color-picker) | [`combobox`](#combobox) | [`command`](#command) |
| [`compare`](#compare) | [`comparison-table`](#comparison-table) | [`confetti`](#confetti) | [`context-menu`](#context-menu) |
| [`copy-button`](#copy-button) | [`count-up-ring`](#count-up-ring) | [`countdown-timer`](#countdown-timer) | [`coverflow`](#coverflow) |
| [`cube`](#cube) | [`cube-matrix`](#cube-matrix) | [`cursor-trail`](#cursor-trail) | [`data-table`](#data-table) |
| [`date-picker`](#date-picker) | [`dialog`](#dialog) | [`dice-roll`](#dice-roll) | [`direction-aware-hover`](#direction-aware-hover) |
| [`dot-pattern`](#dot-pattern) | [`dot-progress`](#dot-progress) | [`drawer`](#drawer) | [`dropdown-menu`](#dropdown-menu) |
| [`empty-state`](#empty-state) | [`evervault-card`](#evervault-card) | [`feature-card`](#feature-card) | [`file-upload`](#file-upload) |
| [`flip-card`](#flip-card) | [`flip-words`](#flip-words) | [`floating-dock`](#floating-dock) | [`flux-panels`](#flux-panels) |
| [`focus-cards`](#focus-cards) | [`fold-out`](#fold-out) | [`following-pointer`](#following-pointer) | [`footer`](#footer) |
| [`form`](#form) | [`gauge-meter`](#gauge-meter) | [`glass-card`](#glass-card) | [`glitch-clip`](#glitch-clip) |
| [`globe`](#globe) | [`gravity-well`](#gravity-well) | [`heartbeat-monitor`](#heartbeat-monitor) | [`helix`](#helix) |
| [`hold-to-confirm`](#hold-to-confirm) | [`holo-card`](#holo-card) | [`holo-slices`](#holo-slices) | [`hover-border-gradient`](#hover-border-gradient) |
| [`hover-card`](#hover-card) | [`infinite-moving-cards`](#infinite-moving-cards) | [`input`](#input) | [`input-otp`](#input-otp) |
| [`invite-people`](#invite-people) | [`kanban-board`](#kanban-board) | [`kbd`](#kbd) | [`label`](#label) |
| [`lamp`](#lamp) | [`layout`](#layout) | [`lens`](#lens) | [`logo-cloud`](#logo-cloud) |
| [`magic-layer`](#magic-layer) | [`magnet`](#magnet) | [`magnetic-button`](#magnetic-button) | [`marquee-3d`](#marquee-3d) |
| [`mention-input`](#mention-input) | [`mesh-gradient`](#mesh-gradient) | [`meteors`](#meteors) | [`moving-border`](#moving-border) |
| [`multi-step-loader`](#multi-step-loader) | [`navbar`](#navbar) | [`neon-glow`](#neon-glow) | [`neon-portal`](#neon-portal) |
| [`notification-stack`](#notification-stack) | [`number-flip`](#number-flip) | [`number-input`](#number-input) | [`number-ticker`](#number-ticker) |
| [`onboarding-checklist`](#onboarding-checklist) | [`orbit-stack`](#orbit-stack) | [`orbital-menu`](#orbital-menu) | [`orbiting-circles`](#orbiting-circles) |
| [`page-curl`](#page-curl) | [`pagination`](#pagination) | [`paper-plane`](#paper-plane) | [`parallax`](#parallax) |
| [`payment-card`](#payment-card) | [`perspective-box`](#perspective-box) | [`phone-mockup`](#phone-mockup) | [`pin-3d`](#pin-3d) |
| [`pin-board`](#pin-board) | [`plan-card`](#plan-card) | [`plasma-field`](#plasma-field) | [`popover`](#popover) |
| [`portal-rings`](#portal-rings) | [`pricing-cards`](#pricing-cards) | [`pricing-slider`](#pricing-slider) | [`prism-orb`](#prism-orb) |
| [`progress`](#progress) | [`quantum-grid`](#quantum-grid) | [`radio-group`](#radio-group) | [`rating`](#rating) |
| [`resizable`](#resizable) | [`retro-grid`](#retro-grid) | [`ripple`](#ripple) | [`scratch-card`](#scratch-card) |
| [`scroll-area`](#scroll-area) | [`scroll-progress`](#scroll-progress) | [`segmented-control`](#segmented-control) | [`select`](#select) |
| [`separator`](#separator) | [`sheet`](#sheet) | [`sidebar`](#sidebar) | [`skeleton`](#skeleton) |
| [`slider`](#slider) | [`sparkles`](#sparkles) | [`sparkles-text`](#sparkles-text) | [`spinner`](#spinner) |
| [`split-flap`](#split-flap) | [`spotlight`](#spotlight) | [`stat`](#stat) | [`stat-card`](#stat-card) |
| [`stat-ring`](#stat-ring) | [`stepper`](#stepper) | [`swipe-stack`](#swipe-stack) | [`switch`](#switch) |
| [`table`](#table) | [`tabs`](#tabs) | [`tag-input`](#tag-input) | [`task-card`](#task-card) |
| [`testimonial-quote`](#testimonial-quote) | [`text-generate-effect`](#text-generate-effect) | [`text-scramble`](#text-scramble) | [`textarea`](#textarea) |
| [`theme-provider`](#theme-provider) | [`theme-toggle`](#theme-toggle) | [`tilt`](#tilt) | [`tilt-tiles`](#tilt-tiles) |
| [`time-picker`](#time-picker) | [`timeline`](#timeline) | [`toast`](#toast) | [`toggle`](#toggle) |
| [`toggle-group`](#toggle-group) | [`toolbar`](#toolbar) | [`tooltip`](#tooltip) | [`tracing-beam`](#tracing-beam) |
| [`tree-view`](#tree-view) | [`usage-bar`](#usage-bar) | [`vote-widget`](#vote-widget) | [`wave-grid`](#wave-grid) |
| [`wavy-background`](#wavy-background) | [`wavy-text`](#wavy-text) | [`world-map`](#world-map) |  |

## Form <small>(2)</small>

- <a id="invite-people"></a>**`invite-people`** — Team invite block for SaaS settings. Email field with inline validation, role dropdown, Send button, and a pending-invites list with Resend / Revoke per row. Fully callback-driven. _keywords: invite, team, members, settings, form, roles, saas_
- <a id="mention-input"></a>**`mention-input`** — A textarea with @ mention autocomplete. Type `@` to open the dropdown, filter by name or handle, navigate with arrow keys, and Enter to insert the mention at the cursor. Self-contained, no dependencies. _keywords: mention, input, textarea, autocomplete, comment, social_

## Display <small>(111)</small>

- <a id="activity-heatmap"></a>**`activity-heatmap`** — GitHub-style contribution calendar. Auto-bucketed intensity cells, month labels, an optional legend, a diagonal mount-in animation, and click-to-select. _keywords: heatmap, calendar, activity, contributions, chart, saas_
- <a id="animated-beam"></a>**`animated-beam`** — Draws a glowing gradient beam between two elements and sweeps light along it on a loop. Give it a positioned container plus refs to a from and to node; it measures their centers, draws a curved SVG path, and recomputes on resize. Perfect for connect-your-tools, integration maps, and architecture diagrams. The sweep uses SVG SMIL, so it runs without JavaScript once painted. _keywords: beam, animated, connect, integration, diagram, svg, gradient, network_
- <a id="animated-chart"></a>**`animated-chart`** — SVG line / area / bar chart that draws itself when scrolled into view, using stroke-dashoffset for line drawing and stagger for bars. _keywords: chart, svg, metrics, saas, animated_
- <a id="animated-text"></a>**`animated-text`** — Single text-effect component with four variants — `shiny` (gradient sweep), `gradient` (animated rainbow), `typewriter` (cycling phrases), and `reveal` (char/word stagger on scroll). _keywords: 3d, text, shimmer, gradient, typewriter, reveal_
- <a id="animated-tooltip"></a>**`animated-tooltip`** — Overlapping avatar group where hovering an avatar lifts and tilts it while a tooltip with name + role rises above. Useful for team rosters and 'people on this project'. _keywords: 3d, tooltip, avatar, team, hover_
- <a id="api-key-display"></a>**`api-key-display`** — Masked-secret row for dashboards (Stripe, Vercel, GitHub-style). Shows the key with all but the last few characters bulleted, a show/hide eye toggle, a copy button with confirmation, and an optional rotate action plus created/expires metadata. _keywords: api-key, secret, token, mask, copy, dashboard, settings_
- <a id="audio-visualizer"></a>**`audio-visualizer`** — A row of bars that bounce like an equalizer. Per-bar CSS animation durations and delays are derived deterministically from the index (SSR-safe). Toggle `playing` to freeze the bars when audio is paused. _keywords: audio, equalizer, visualizer, bars, music, podcast_
- <a id="aurora"></a>**`aurora`** — Animated aurora background. Multiple colored gradient blobs slowly drift and morph behind your content for a calming, premium feel. _keywords: 3d, aurora, background, gradient, hero_
- <a id="avatar"></a>**`avatar`** — User avatar with image + fallback and grouping. _keywords: avatar, user_
- <a id="avatar-stack"></a>**`avatar-stack`** — Overlapping avatars for teams, members, or viewers. Image or auto-colored initials fallback, a +N overflow chip, and a hover-spread interaction. _keywords: avatar, stack, group, team, users, saas_
- <a id="background-beams"></a>**`background-beams`** — Animated diagonal beams streaking across a hero panel. SVG + CSS — no canvas, no battery drain. _keywords: 3d, background, beams, hero, animation_
- <a id="background-boxes"></a>**`background-boxes`** — Skewed grid of cells that highlight as the cursor passes over them. Iconic Aceternity-style hero backdrop. _keywords: 3d, background, boxes, grid, hover_
- <a id="badge"></a>**`badge`** — A small status or count label with color variants. _keywords: badge, tag, pill_
- <a id="card"></a>**`card`** — A flexible compound container: Card, Header, Title, Description, Content, Footer. _keywords: card, container, panel_
- <a id="card-hover-effect"></a>**`card-hover-effect`** — Grid of feature cards with a sliding background pill behind the hovered card. Smooth, distraction-free way to give a card grid life. _keywords: 3d, card, grid, hover, feature_
- <a id="card-stack"></a>**`card-stack`** — Auto-cycling stack of layered cards with depth + parallax. Pause on hover, click the front card to advance manually. _keywords: 3d, stack, carousel, testimonial, deck_
- <a id="carousel-3d"></a>**`carousel-3d`** — Rotating 3D ring carousel. Items live on the surface of a virtual cylinder that rotates around the Y axis. Optional autoplay. _keywords: 3d, carousel, ring, rotate, showcase_
- <a id="chat-bubble"></a>**`chat-bubble`** — A single message in a conversation thread with optional avatar, sender name, timestamp, read receipts (sent/delivered/read), and a three-dot typing indicator. _keywords: chat, bubble, message, conversation, messaging, ai, saas_
- <a id="code-rain"></a>**`code-rain`** — Matrix-style digital rain rendered to a canvas: each column tracks its own falling head with a fading trail. DPR-aware, pauses when the page is hidden, and resizes to its container. Optional children render on top. _keywords: matrix, rain, code, canvas, background, hero, animated_
- <a id="coin-flip"></a>**`coin-flip`** — A 3D flipping coin with custom heads and tails faces and a real edge band visible at angles. _keywords: 3d, coin, flip, interactive, animated_
- <a id="compare"></a>**`compare`** — Drag-to-compare slider that reveals two layers — perfect for before/after image comparisons or theme previews. _keywords: 3d, compare, slider, before-after, image_
- <a id="comparison-table"></a>**`comparison-table`** — Plan / feature comparison matrix for pricing pages. Highlightable column with a Popular ribbon, grouped feature sections, and cells that accept booleans, text, or any node, plus an optional CTA row. _keywords: comparison, table, pricing, plans, features, saas_
- <a id="confetti"></a>**`confetti`** — A celebratory particle burst on a transparent canvas. Drop it inside a relative (or fixed inset-0) container and call fire() on its ref — on a successful payment, a finished onboarding step, a won game. Pieces fling in a cone, tumble under gravity, and fade out, then the animation stops on its own. Dependency-free and pointer-events-none. _keywords: confetti, celebration, particles, canvas, success, animation, reward_
- <a id="count-up-ring"></a>**`count-up-ring`** — Circular SVG progress ring that animates its fill from 0 to value/max on viewport entry, with a synchronized count-up label at the center. _keywords: progress, ring, metric, svg, animated_
- <a id="countdown-timer"></a>**`countdown-timer`** — Flip-clock-style countdown to a target date. Days / Hours / Minutes / Seconds rendered as paired digit cells with the recognizable horizontal seam. Each cell remounts on value change to retrigger its flip-in keyframe. Fires onComplete at zero. _keywords: countdown, timer, launch, event, flip-clock, deadline_
- <a id="coverflow"></a>**`coverflow`** — iTunes-style 3D linear carousel. Center item faces the viewer; sides are angled into the distance. Click to bring an item forward. _keywords: 3d, carousel, coverflow, gallery_
- <a id="cube"></a>**`cube`** — A 6-face 3D cube. Drive the visible face from props or animate through all six. Pure CSS transforms. _keywords: 3d, cube, rotate, carousel, perspective_
- <a id="cursor-trail"></a>**`cursor-trail`** — Wraps an area and renders a fading dot trail behind the cursor as it moves. _keywords: cursor, trail, pointer, interactive, animated_
- <a id="data-table"></a>**`data-table`** — A sortable, paginated table driven by a column config. Click a sortable header to cycle ascending / descending, pass pageSize to page the rows, and selectable to add a checkbox column with a header select-all. Cells render row[key] or a custom accessor. Controlled / uncontrolled selection, dependency-free. _keywords: data, table, datatable, sort, pagination, grid, rows, dashboard_
- <a id="direction-aware-hover"></a>**`direction-aware-hover`** — Hover card whose overlay slides in from the cursor's entry direction. Computes the nearest edge and animates accordingly — top/right/bottom/left. _keywords: 3d, hover, direction, card, reveal_
- <a id="dot-pattern"></a>**`dot-pattern`** — CSS-only dotted background that brightens dots near the cursor via a masked second layer. Pure background-image — no DOM dots, scales to any container. _keywords: 3d, background, dots, pattern, spotlight_
- <a id="dot-progress"></a>**`dot-progress`** — Stepped dot indicator with the active step rendered as a stretched pill. Useful for onboarding flows, multi-page forms, and carousels. _keywords: progress, dots, steps, onboarding, carousel_
- <a id="empty-state"></a>**`empty-state`** — A friendly placeholder for when there's no data — icon, title, description, and an optional call-to-action. _keywords: empty, placeholder, blank-slate, zero-state_
- <a id="evervault-card"></a>**`evervault-card`** — Card whose background fills with random characters that become visible behind a cursor-tracked colored gradient on hover. Inspired by the encrypted-storage-vault aesthetic. _keywords: 3d, card, hover, matrix, decrypt_
- <a id="feature-card"></a>**`feature-card`** — Feature block with a gradient icon tile, heading, description, hover lift, and a cursor-tracking glow. _keywords: feature, card, saas, landing_
- <a id="flip-card"></a>**`flip-card`** — A card with two faces that flips on hover or click. Pure CSS 3D, no animation libraries. _keywords: 3d, flip, card, reveal_
- <a id="flip-words"></a>**`flip-words`** — Drop into a sentence to cycle one word with a 3D rotateX flip and soft blur. Each word stays for `duration` ms, then the next slides in. _keywords: 3d, text, flip, rotate, cycle_
- <a id="flux-panels"></a>**`flux-panels`** — Layered translucent panels oscillating through 3D space. _keywords: 3d, panels, glass, animated, layers_
- <a id="focus-cards"></a>**`focus-cards`** — Image gallery grid where hovering one card keeps it sharp while the rest blur and dim. The focused card surfaces an optional caption overlay with a smooth fade. _keywords: 3d, gallery, focus, hover, blur, image_
- <a id="fold-out"></a>**`fold-out`** — A double-door card whose left and right halves swing open to reveal content behind them. _keywords: 3d, fold, origami, doors, reveal, interactive_
- <a id="following-pointer"></a>**`following-pointer`** — Custom cursor that follows the pointer inside a wrapped area. Hide the system cursor and replace it with a branded indicator (or any React node). _keywords: 3d, pointer, cursor, interactive, hover_
- <a id="gauge-meter"></a>**`gauge-meter`** — Half-circle KPI gauge with an animated sweep and count-up, optional zoned color stops (green/amber/red), tick marks, and a glow on the filled arc. _keywords: gauge, meter, kpi, dashboard, chart, saas_
- <a id="glass-card"></a>**`glass-card`** — A frosted-glass surface with a refracted edge. Backdrop-blurred translucent fill, a mask-stenciled gradient border that catches light like real glass, and a soft sheen that sweeps across once on mount. Works best layered over a colored or gradient backdrop. _keywords: glass, frosted, card, blur, glassmorphism, surface_
- <a id="glitch-clip"></a>**`glitch-clip`** — Wrapper that splits its content into horizontal slices on hover, each shifted by a small random offset for a digital-glitch effect. _keywords: glitch, clip-path, hover, slices, animated_
- <a id="globe"></a>**`globe`** — Drag-to-rotate 3D dotted globe. Auto-rotates when idle; click + drag to spin in any direction. Place markers at lat/lng to highlight cities. Pure CSS 3D — no Three.js. _keywords: 3d, globe, earth, rotate, interactive_
- <a id="gravity-well"></a>**`gravity-well`** — A layered 3D gravity well made from pulsating depth rings. _keywords: 3d, depth, rings, well, animated_
- <a id="heartbeat-monitor"></a>**`heartbeat-monitor`** — An SVG EKG / heart-rate monitor: a continuously scrolling pulse line on a faint grid, with a BPM badge and a heart icon that throbs in time. Pulse rate is derived from `bpm`, so the visual stays in sync with the displayed number. _keywords: ekg, heartbeat, monitor, pulse, health, vital, svg_
- <a id="helix"></a>**`helix`** — Two-strand rotating DNA helix built with pure CSS 3D transforms. _keywords: 3d, helix, dna, rotate, animated_
- <a id="holo-card"></a>**`holo-card`** — Holographic 3D card with iridescent conic shimmer and cursor-tracked highlight. Pure CSS — no Three.js. _keywords: 3d, holographic, shimmer, iridescent, tilt_
- <a id="holo-slices"></a>**`holo-slices`** — Floating holographic slices stacked in 3D space. _keywords: 3d, hologram, layers, glass, animated_
- <a id="hover-border-gradient"></a>**`hover-border-gradient`** — Border that lights up where the cursor hovers over the edge. A radial highlight follows the pointer, creating a sweeping flashlight effect on the border. _keywords: 3d, border, hover, gradient, interactive_
- <a id="infinite-moving-cards"></a>**`infinite-moving-cards`** — Auto-scrolling row of cards that loops forever. Pause on hover, choose direction, fade the edges. Perfect for testimonials and logo walls. _keywords: 3d, marquee, carousel, testimonials, logos_
- <a id="kanban-board"></a>**`kanban-board`** — A drag-and-drop task board. Cards live in columns keyed by id; drag a card to another column or reorder within one and the board emits the next state. Works controlled / uncontrolled, uses native HTML5 drag and drop (no dependencies), and supports custom card rendering. _keywords: kanban, board, drag, drop, tasks, trello, pipeline, dashboard_
- <a id="kbd"></a>**`kbd`** — Keyboard shortcut chip — for inline shortcut hints like ⌘K. _keywords: kbd, keyboard, shortcut, hotkey_
- <a id="lamp"></a>**`lamp`** — Spotlight lamp from above. A bright bar at the top edge cones light down across the panel. Iconic Aceternity-style hero treatment. _keywords: 3d, lamp, spotlight, hero, light_
- <a id="lens"></a>**`lens`** — Circular magnifier that follows the cursor and zooms into the underlying content. Glass-dome shading gives it a tactile 3D feel. _keywords: 3d, lens, zoom, magnifier, hover_
- <a id="logo-cloud"></a>**`logo-cloud`** — Infinite auto-scrolling logo marquee with soft edge fades and pause-on-hover. Perfect as a trust-signal strip. _keywords: marquee, logos, trust, saas, landing, animated_
- <a id="magic-layer"></a>**`magic-layer`** — Stack of layers that separates into discrete Z-depths on hover for an X-ray reveal effect. _keywords: 3d, layers, depth, xray, hover, tilt_
- <a id="magnet"></a>**`magnet`** — Element gravitates toward the cursor when nearby. Listens to window mousemove and translates within a configurable range. Snaps back when out of range. _keywords: 3d, magnet, cursor, interactive, hover_
- <a id="marquee-3d"></a>**`marquee-3d`** — Perspective-tilted marquee. Multiple rows scroll horizontally on a 3D-tilted plane, alternating direction for a parallax-y effect. Pure CSS animation. _keywords: 3d, marquee, scroll, perspective, infinite_
- <a id="mesh-gradient"></a>**`mesh-gradient`** — Stripe / Linear-style animated mesh-gradient backdrop. 3 to 6 softly drifting, heavily blurred color blobs over a dark canvas, with an optional grain overlay for a WebGL-mesh feel without WebGL. Each blob drifts on its own independent keyframe loop so motion never loops on a beat. _keywords: mesh-gradient, gradient, background, hero, animated, landing_
- <a id="meteors"></a>**`meteors`** — Animated meteor shower overlay. Drop into any container — meteors stream diagonally across with randomized speed and delay. _keywords: 3d, meteors, shower, animation, background_
- <a id="moving-border"></a>**`moving-border`** — Animated conic-gradient border that traces the perimeter. Wrap any content to add a premium, attention-grabbing edge. _keywords: 3d, border, gradient, animation, card_
- <a id="neon-glow"></a>**`neon-glow`** — Neon glow wrapper. Layers concentric box-shadows in a chosen color to make any element look like a neon sign — dark backgrounds make it pop. _keywords: 3d, neon, glow, border, premium_
- <a id="neon-portal"></a>**`neon-portal`** — A rotating neon portal ring with pulsing core. _keywords: 3d, portal, neon, ring, animated_
- <a id="notification-stack"></a>**`notification-stack`** — Auto-cycling stack of iOS-style push notifications. Each new alert slides in at the top while older ones translate down with a slight scale and opacity falloff. _keywords: notifications, stack, saas, landing, animated_
- <a id="number-flip"></a>**`number-flip`** — Odometer / split-flap-style numeric display. Each digit is a window into a stack of 0-9 glyphs that translates vertically when the value changes, so only the digit places that actually change animate. _keywords: number, odometer, flip, counter, animated_
- <a id="number-ticker"></a>**`number-ticker`** — Animated number counter that rolls from `from` to `value` with a cubic ease. Defaults to triggering when scrolled into view; supports custom formatting. _keywords: 3d, number, counter, stat, animation_
- <a id="onboarding-checklist"></a>**`onboarding-checklist`** — A SaaS getting-started widget with progress bar, animated checkmarks, collapsible body, dismiss button, and a celebration state when every step is done. Steps can carry descriptions and inline CTAs. _keywords: onboarding, checklist, saas, progress, getting-started, todo_
- <a id="orbit-stack"></a>**`orbit-stack`** — Stacked orbiting orbs spinning in 3D depth. _keywords: 3d, orbit, orbs, spin, animated_
- <a id="orbiting-circles"></a>**`orbiting-circles`** — Items orbit around a center on a circular path. Each item counter-rotates so it stays upright. Stack multiple instances for concentric rings. _keywords: 3d, orbit, circles, ring, rotate_
- <a id="page-curl"></a>**`page-curl`** — Wraps any card so its bottom-right corner peels up on hover, revealing a soft underside. _keywords: 3d, curl, peel, hover, card, animated_
- <a id="paper-plane"></a>**`paper-plane`** — An SVG paper plane that loops along a CSS offset-path with a dashed trail beneath it. _keywords: plane, path, offset-path, decorative, animated_
- <a id="parallax"></a>**`parallax`** — Compound mouse-tracked parallax. Wrap a scene in Parallax and stack ParallaxLayers with different depth values to create depth-on-hover. _keywords: 3d, parallax, depth, layers, hero_
- <a id="payment-card"></a>**`payment-card`** — Live-binding credit-card preview for checkout flows. Renders the cardholder's number (auto-formatted per brand), name, and expiry on the front, with a CSS-3D flip to reveal the back signature strip and CVV. Auto-detects Visa, Mastercard, Amex, and Discover from the number prefix. _keywords: payment, credit-card, checkout, billing, stripe, form_
- <a id="phone-mockup"></a>**`phone-mockup`** — Phone frame mockup with notch, hardware buttons, and a content slot, with optional 3D cursor tilt. _keywords: 3d, phone, mockup, saas, hero_
- <a id="pin-3d"></a>**`pin-3d`** — Perspective pin reveal with halo and connecting line. Card tilts back on hover; a label pops above with a vertical thread connecting the two. _keywords: 3d, pin, hover, reveal, perspective_
- <a id="pin-board"></a>**`pin-board`** — A canvas of draggable cards pinned at the top with a visible pin head and a tactile lift on grab. _keywords: pinboard, drag, canvas, card, interactive_
- <a id="plan-card"></a>**`plan-card`** — In-app current-subscription summary card with plan name, status pill, headline price, renewal date, and a stack of usage rows that recolor as they approach their limits. Distinct from PricingCards (the comparison grid) — this is the billing widget. _keywords: plan, subscription, billing, saas, usage, settings_
- <a id="plasma-field"></a>**`plasma-field`** — Animated plasma blobs with soft neon diffusion. _keywords: plasma, blobs, glow, animated, 3d_
- <a id="pricing-cards"></a>**`pricing-cards`** — Tiered pricing cards with one tier visually elevated, hover lift, and check-list features. _keywords: pricing, saas, tiers, card, landing_
- <a id="pricing-slider"></a>**`pricing-slider`** — Interactive seat / usage calculator for SaaS pricing pages. Drag the slider to set quantity; the total updates live with any tier discount applied. Includes a tier strip showing active and upcoming breakpoints. _keywords: pricing, slider, calculator, seats, saas, billing_
- <a id="prism-orb"></a>**`prism-orb`** — A spectral 3D orb with rotating conic highlights and glow. _keywords: 3d, orb, glow, gradient, animated_
- <a id="quantum-grid"></a>**`quantum-grid`** — A 3D pulsing grid that ripples like a quantum field. _keywords: 3d, grid, tiles, pulse, animated_
- <a id="retro-grid"></a>**`retro-grid`** — An animated synthwave horizon: an infinite perspective grid that scrolls toward the viewer, fading into the distance. Pure CSS (a tilted, looping background), so it's lightweight and runs without JavaScript once painted. Drop it behind a hero, a pricing CTA, or a 404 for an instant retro-futuristic backdrop; render content as children on top. _keywords: retro, grid, synthwave, perspective, background, 3d, horizon, animated_
- <a id="scratch-card"></a>**`scratch-card`** — A scratch-off foil over a hidden reward. Drag across it (mouse or touch) to erase the coating; once enough is cleared it auto-reveals the rest and fires onComplete. Great for promos, coupon codes, gamified onboarding, and reward reveals. Renders the prize as children, paints the foil on a canvas, dependency-free. _keywords: scratch, card, reveal, coupon, promo, canvas, gamified, reward_
- <a id="scroll-area"></a>**`scroll-area`** — Custom-styled scroll area with scrollbar. _keywords: scroll_
- <a id="separator"></a>**`separator`** — Visual or semantic divider (horizontal/vertical). _keywords: separator, divider, hr_
- <a id="sparkles"></a>**`sparkles`** — Sparkle particles overlay. Drop into any container — twinkling 4-pointed stars scatter across with randomized size, position, and timing. _keywords: 3d, sparkles, twinkle, decoration, background_
- <a id="sparkles-text"></a>**`sparkles-text`** — Hero text with a glowing horizontal beam and twinkling sparkle particles falling below — Aceternity-style 'Sparkles' headline. _keywords: 3d, text, sparkles, beam, hero_
- <a id="split-flap"></a>**`split-flap`** — A vintage mechanical split-flap display (airport / train-station board). Each cell flips through the charset before settling on its target, with a staggered start across cells. Pure CSS + setTimeout — no dependencies. _keywords: split-flap, counter, vintage, mechanical, board, animated_
- <a id="spotlight"></a>**`spotlight`** — Cursor-following spotlight overlay. Wraps a section to add a soft, depth-conveying light source that tracks the pointer. _keywords: 3d, spotlight, hover, glow, hero_
- <a id="stat"></a>**`stat`** — A purpose-built KPI card with label, value, trend delta, and optional helper text. _keywords: stat, metric, kpi, trend_
- <a id="stat-card"></a>**`stat-card`** — Polished metric card with animated count-up on view, optional trend indicator, and optional inline sparkline. _keywords: stat, metric, saas, landing, animated_
- <a id="stat-ring"></a>**`stat-ring`** — Circular KPI ring with a large central value, optional label and unit suffix, and an optional trend pill (auto-tinted green/red/neutral based on the delta). The arc draws from 0 to the target percentage on mount with a smooth CSS transition. _keywords: stat, kpi, ring, progress, circular, dashboard, trend_
- <a id="swipe-stack"></a>**`swipe-stack`** — Draggable Tinder-style card stack with rotation, dismiss threshold, and Like/Nope hint badges. _keywords: 3d, swipe, drag, card, tinder, stack, interactive_
- <a id="table"></a>**`table`** — Semantic HTML table with styled parts. _keywords: table, grid_
- <a id="task-card"></a>**`task-card`** — Linear / Asana-style task row card with an ID, title, description, status glyph (progress dots that visually match Linear), colored priority chip, tags, assignee avatar, subtask count, comment count, and due-date pill that goes danger when overdue. _keywords: task, card, linear, asana, kanban, project, issue_
- <a id="testimonial-quote"></a>**`testimonial-quote`** — Testimonial card with a decorative quotation mark, the quote, and an author block (avatar + name + role + optional logo). Tilts toward the cursor. _keywords: testimonial, quote, tilt, saas, landing_
- <a id="text-generate-effect"></a>**`text-generate-effect`** — Words appear from a blurred-out state to focus, staggered left-to-right. Reads as if the text is being 'generated' with a soft camera focus instead of plain typing. _keywords: 3d, text, blur, reveal, generate_
- <a id="text-scramble"></a>**`text-scramble`** — Letters cycle through random characters, then settle on the target text from left to right. Like a terminal 'decoding' effect. Optional hover-trigger and loop modes. _keywords: 3d, text, scramble, decode, terminal_
- <a id="tilt"></a>**`tilt`** — Mouse-tracking 3D tilt effect with optional glare highlight. Wraps any content. Pure CSS — no Three.js. _keywords: 3d, tilt, parallax, hover, perspective_
- <a id="tilt-tiles"></a>**`tilt-tiles`** — Interactive 3D tiles that tilt toward the pointer and float. _keywords: 3d, tiles, tilt, interactive, animated_
- <a id="timeline"></a>**`timeline`** — Vertical timeline of events with markers, connectors, titles, and timestamps. Compose for changelogs and activity feeds. _keywords: timeline, feed, activity, changelog_
- <a id="tracing-beam"></a>**`tracing-beam`** — Scroll-driven vertical progress line with a glowing dot that travels down as the user reads through the wrapped content. _keywords: 3d, scroll, progress, beam, article_
- <a id="tree-view"></a>**`tree-view`** — A collapsible hierarchical list for file explorers, nested navigation, or category pickers. Branches toggle on click, leaves fire selection, and rows fall back to folder / file glyphs when no icon is supplied. Expansion and selection are each controllable, keyboard accessible, and dependency-free. _keywords: tree, treeview, file, explorer, hierarchy, nested, folder, navigation_
- <a id="usage-bar"></a>**`usage-bar`** — Quota / usage indicator for billing and admin dashboards. A labelled progress bar that shifts from accent to amber to rose as usage crosses warn / danger thresholds, with current and limit values rendered alongside. Pass limit=Infinity for unlimited plans. _keywords: usage, quota, progress, billing, saas, limit_
- <a id="wave-grid"></a>**`wave-grid`** — A grid of dots that ripple in 3D when clicked. Multiple ripples sum and decay independently. _keywords: 3d, wave, ripple, grid, physics, interactive, animated_
- <a id="wavy-background"></a>**`wavy-background`** — Animated wavy SVG lines that drift behind your content. Multiple colored waves with blur — perfect for atmospheric heroes. _keywords: 3d, background, wavy, lines, hero_
- <a id="wavy-text"></a>**`wavy-text`** — Text whose characters oscillate vertically on a sine wave with a per-character delay, so the wave travels through the word. _keywords: 3d, text, wave, animation_
- <a id="world-map"></a>**`world-map`** — Dotted world map with animated cyan arcs that draw, hold, and erase between lat/lng coordinates — perfect for 'remote connectivity' or 'global reach' hero sections. _keywords: 3d, map, world, globe, connectivity, arcs_

## 3D & Animated <small>(4)</small>

- <a id="cube-matrix"></a>**`cube-matrix`** — A tilted grid of small 3D cubes that all rotate in unison with a radial delay, producing a rippling wave field. Pure CSS keyframes, dependency-free. _keywords: 3d, cube, matrix, grid, wave, background, animated_
- <a id="dice-roll"></a>**`dice-roll`** — An interactive 6-sided 3D die. Click (or press space/enter) to tumble in 3D for a configurable duration then settle on a random face. Pure CSS 3D, dependency-free. _keywords: 3d, dice, die, roll, interactive, random_
- <a id="perspective-box"></a>**`perspective-box`** — A 3D opened gift-box laid out with all four inner flaps fanned outward, each carrying its own content. Hover to spread the flaps further. Pure CSS 3D. _keywords: 3d, box, perspective, unbox, hero, feature_
- <a id="portal-rings"></a>**`portal-rings`** — Concentric rings rotated to different 3D angles, each spinning at its own speed, with a soft central core. A stargate / dimensional-portal backdrop for logos and heroes. _keywords: 3d, rings, portal, stargate, hero, animated_

## Layout <small>(4)</small>

- <a id="bento-grid"></a>**`bento-grid`** — Multi-size feature grid layout (compound: BentoGrid + BentoGridItem). Items can span multiple columns or rows for the Apple/Vercel-style 'bento' presentation. _keywords: layout, grid, bento, feature_
- <a id="footer"></a>**`footer`** — Site footer with a brand column, up to four link columns, and an optional giant watermark wordmark behind the content. _keywords: footer, layout, links, brand_
- <a id="layout"></a>**`layout`** — Layout primitives: Container, Stack, Grid, AspectRatio. _keywords: layout, stack, grid, container_
- <a id="resizable"></a>**`resizable`** — Two panels separated by a draggable handle. Drag the divider (mouse or touch) to repartition the space; sizes are a percent of the first panel, clamped to [min, max]. Supports horizontal / vertical splits, controlled / uncontrolled sizing, keyboard arrows, and double-click to reset. Dependency-free. _keywords: resizable, split, panel, splitter, pane, layout, drag, divider_

## Navigation <small>(11)</small>

- <a id="accordion"></a>**`accordion`** — Collapsible disclosure panels. _keywords: accordion, collapse_
- <a id="breadcrumb"></a>**`breadcrumb`** — Breadcrumb trail with ellipsis/collapse support. _keywords: breadcrumb, nav_
- <a id="command"></a>**`command`** — Command menu built on cmdk. _keywords: command, menu, cmdk, search_
- <a id="floating-dock"></a>**`floating-dock`** — macOS-style dock with magnify-on-hover. Tiles closest to the cursor scale up smoothly via cosine falloff; tooltip labels rise above the active tile. _keywords: dock, navigation, magnify, macos, hover_
- <a id="navbar"></a>**`navbar`** — Top-level site navigation header. _keywords: navbar, header_
- <a id="orbital-menu"></a>**`orbital-menu`** — Floating action button whose satellites fan out along a configurable arc when toggled. _keywords: fab, menu, radial, arc, interactive_
- <a id="pagination"></a>**`pagination`** — Pagination controls. _keywords: pagination_
- <a id="sidebar"></a>**`sidebar`** — Collapsible app sidebar with navigation items. _keywords: sidebar_
- <a id="stepper"></a>**`stepper`** — Multi-step progress indicator with completed / current / upcoming states. Horizontal or vertical. _keywords: stepper, wizard, progress, steps_
- <a id="tabs"></a>**`tabs`** — Accessible tab navigation. _keywords: tabs_
- <a id="toolbar"></a>**`toolbar`** — A compact action bar that groups buttons, toggles, separators, and groups onto a single rounded surface. Compose it from Toolbar, ToolbarButton, ToolbarToggle (a pressable state), ToolbarSeparator, and ToolbarGroup. Horizontal or vertical, dependency-free. _keywords: toolbar, actions, buttons, toggle, editor, controls, navigation_

## Overlay <small>(9)</small>

- <a id="alert-dialog"></a>**`alert-dialog`** — Confirmation dialog with destructive/cancel actions. _keywords: alert-dialog, confirm, modal_
- <a id="context-menu"></a>**`context-menu`** — Wraps any area and opens a menu at the cursor on right-click. Supports option rows (icons, shortcuts, disabled and destructive styles), separators, and section labels. Closes on selection, Escape, or an outside click, and clamps itself to stay inside the viewport. Dependency-free. _keywords: context, menu, right-click, contextmenu, actions, overlay_
- <a id="dialog"></a>**`dialog`** — Accessible modal dialog with portal and focus trap. _keywords: dialog, modal, popup_
- <a id="drawer"></a>**`drawer`** — Mobile-friendly bottom drawer (vaul). _keywords: drawer, sheet, mobile_
- <a id="dropdown-menu"></a>**`dropdown-menu`** — Accessible menu with sub-menus, radio/checkbox items. _keywords: dropdown, menu_
- <a id="hover-card"></a>**`hover-card`** — Rich content preview that appears on hover or focus. _keywords: hover, card, preview, tooltip_
- <a id="popover"></a>**`popover`** — Floating, anchored content (tooltip-like). _keywords: popover, floating_
- <a id="sheet"></a>**`sheet`** — Side-anchored slide-in panel (top, bottom, left, or right). _keywords: sheet, drawer, side-panel, off-canvas_
- <a id="tooltip"></a>**`tooltip`** — Text label that appears on hover/focus. _keywords: tooltip, hover_

## Feedback <small>(9)</small>

- <a id="alert"></a>**`alert`** — Inline status message with icon variants. _keywords: alert, banner, notification_
- <a id="banner"></a>**`banner`** — Full-width announcement bar for product updates, promos, or status notices. Five tones, an optional leading icon and trailing CTA, optional sticky position, and a dismiss button. Controlled or uncontrolled. _keywords: banner, announcement, notice, alert, promo, feedback_
- <a id="multi-step-loader"></a>**`multi-step-loader`** — Fullscreen overlay that auto-advances through a list of steps. Completed steps stack above the active one; upcoming steps queue below. Optional close button. _keywords: loader, steps, loading, overlay, fullscreen_
- <a id="progress"></a>**`progress`** — Determinate progress bar. _keywords: progress, bar, loader_
- <a id="ripple"></a>**`ripple`** — Concentric rings that scale from 0 to full size and fade out, staggered so a new ring starts as the outer one disappears. Sonar / radar pulse — useful for 'live', 'loading', or 'waiting' indicators. _keywords: 3d, ripple, pulse, loading, live_
- <a id="scroll-progress"></a>**`scroll-progress`** — Thin reading-progress bar that fills as the page or a given scroll container is scrolled. Smooth rAF updates, top or bottom placement, custom color/gradient, and an optional percentage label. _keywords: scroll, progress, reading, indicator, bar, feedback_
- <a id="skeleton"></a>**`skeleton`** — Placeholder shimmer for loading states. _keywords: skeleton, loading, placeholder_
- <a id="spinner"></a>**`spinner`** — Animated loading indicator with accessible label. _keywords: spinner, loading, loader_
- <a id="toast"></a>**`toast`** — Toast notifications with useToast hook and <Toaster /> component. _keywords: toast, notification_

## Forms <small>(15)</small>

- <a id="calendar"></a>**`calendar`** — Calendar built on react-day-picker, styled to match CraftUI. _keywords: calendar, date_
- <a id="checkbox"></a>**`checkbox`** — Accessible checkbox with indeterminate support. _keywords: checkbox, form_
- <a id="color-picker"></a>**`color-picker`** — An HSV color picker with a saturation / value square, a hue slider, a live preview, an editable hex field, and preset swatches. Drag inside the square or along the hue bar (mouse or touch) to dial in a color; the component emits a hex string. Works controlled / uncontrolled with no dependencies. _keywords: color, picker, hsv, hex, swatch, hue, palette, form_
- <a id="combobox"></a>**`combobox`** — Searchable select built on Popover + Command. _keywords: combobox, autocomplete, search_
- <a id="date-picker"></a>**`date-picker`** — Date picker using Calendar inside a Popover. _keywords: date, picker_
- <a id="form"></a>**`form`** — Form primitives integrated with react-hook-form + Zod. _keywords: form, validation, zod, react-hook-form_
- <a id="input-otp"></a>**`input-otp`** — Multi-cell one-time-password input with automatic focus and paste support. _keywords: otp, code, verification, input_
- <a id="label"></a>**`label`** — Accessible label built on @radix-ui/react-label. _keywords: label, form_
- <a id="number-input"></a>**`number-input`** — Numeric field with increment / decrement steppers, hold-to-repeat with acceleration, arrow-key nudging (×10 with Shift), clamping to min/max, precision rounding, and optional prefix / suffix. _keywords: number, input, stepper, quantity, spinner, form_
- <a id="radio-group"></a>**`radio-group`** — Accessible radio group. _keywords: radio, form_
- <a id="select"></a>**`select`** — Accessible select dropdown with grouping. _keywords: select, dropdown, form_
- <a id="slider"></a>**`slider`** — Range slider. _keywords: slider, range_
- <a id="switch"></a>**`switch`** — Toggle switch for boolean state. _keywords: switch, toggle_
- <a id="tag-input"></a>**`tag-input`** — Token field that turns typed text into removable chips. Commit with Enter or comma, remove the last with Backspace, or paste a delimited list. Supports controlled / uncontrolled use, a max, dedup, and a custom validator. _keywords: tag, input, tags, chips, tokens, multi, form_
- <a id="time-picker"></a>**`time-picker`** — A compact time field with a dropdown of scrollable hour and minute columns (plus an AM/PM toggle in 12-hour mode). Pick an hour and a minute; the component emits a 24-hour HH:mm string. Closes on outside click or Escape, works controlled / uncontrolled, dependency-free. _keywords: time, picker, timepicker, clock, hours, minutes, form_

## Input <small>(7)</small>

- <a id="copy-button"></a>**`copy-button`** — Icon button that copies a value to the clipboard, then cross-fades from a clipboard glyph to a check on success and resets after a delay. _keywords: copy, clipboard, button, icon, animated_
- <a id="file-upload"></a>**`file-upload`** — Drop / click upload zone with an animated grid backdrop, a central upload tile, and a dashed accent ring that smoothly fades in on hover or drag-over. Selected files appear as removable chips below. _keywords: file, upload, drag, drop, input_
- <a id="hold-to-confirm"></a>**`hold-to-confirm`** — Tactile safety button: the user must press AND hold for a duration while a circular progress ring fills. Releasing early cancels and drains the ring back to zero. _keywords: button, confirm, hold, destructive, animated_
- <a id="magnetic-button"></a>**`magnetic-button`** — Button whose inner content magnetically tracks the cursor, with an optional cursor-following glow. _keywords: button, magnetic, cursor, hover, interactive_
- <a id="segmented-control"></a>**`segmented-control`** — iOS-style segmented switcher with a single sliding pill that animates between segments when the selection changes. Supports icons, sizes, and full-width layouts. _keywords: tabs, segments, switcher, ios, animated_
- <a id="theme-toggle"></a>**`theme-toggle`** — Sun-to-moon morph button for toggling light / dark themes. Sun rays retract into the disc and a shadow disc shifts in to complete the crescent. _keywords: theme, toggle, dark-mode, morph, animated_
- <a id="vote-widget"></a>**`vote-widget`** — Up / down voting with an animated count that slides into place when the score changes. Supports controlled and uncontrolled state, and vertical or horizontal layouts. _keywords: vote, upvote, downvote, count, animated_

## Inputs <small>(6)</small>

- <a id="button"></a>**`button`** — A clickable button with variants, sizes, loading, and asChild support. _keywords: button, click, action, submit_
- <a id="input"></a>**`input`** — A styled input with error state and left/right element slots. _keywords: input, text, form_
- <a id="rating"></a>**`rating`** — Star rating control with hover preview and keyboard support. Click again to clear. _keywords: rating, star, review, feedback_
- <a id="textarea"></a>**`textarea`** — A multi-line text field with optional auto-resize. _keywords: textarea, text, form_
- <a id="toggle"></a>**`toggle`** — A two-state button that can be either on or off. _keywords: toggle, button, press_
- <a id="toggle-group"></a>**`toggle-group`** — Set of toggle buttons that can be selected as a single value or multiple values. _keywords: toggle, group, segmented_

## Theming <small>(1)</small>

- <a id="theme-provider"></a>**`theme-provider`** — Client-side theme provider with light/dark/system support. _keywords: theme, dark-mode_

---

_Generated from `packages/registry/src/components/*.json` by `scripts/generate-components-md.mjs`. Re-run after adding a component._
