"use client";

import * as React from "react";
import {
  Aurora,
  Badge,
  Button,
  CardStack,
  Carousel3D,
  Coverflow,
  Cube,
  CubeFace,
  DirectionAwareHover,
  FlipCard,
  FlipCardBack,
  FlipCardFront,
  GlowingStars,
  HoloCard,
  Lens,
  Marquee3D,
  Meteors,
  MovingBorder,
  OrbitingCircles,
  Parallax,
  ParallaxLayer,
  Pin3D,
  Spotlight,
  Tilt,
} from "@craftui/ui";
import {
  ArrowUpRight,
  Cloud,
  Crown,
  Disc3,
  Github,
  Globe,
  Mountain,
  Music,
  Plane,
  Quote,
  Rocket,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------
 * Tilt — wraps a styled brand card. Move the cursor to feel the depth.
 * ------------------------------------------------------------------ */
export function TiltDemo() {
  return (
    <Tilt
      className="rounded-2xl"
      intensity={14}
      glare
    >
      <div className="relative h-[260px] w-[420px] overflow-hidden rounded-2xl bg-gradient-to-br from-foreground via-foreground/85 to-foreground/70 p-6 text-background shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider opacity-70">
              CraftUI · Pro
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight">
              Annual membership
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/15 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">
            Card holder
          </p>
          <p className="mt-0.5 text-sm font-medium">Pedro Duarte</p>
          <p className="mt-3 font-mono text-[11px] tracking-widest opacity-70">
            5412 · 8240 · 9001 · 2310
          </p>
        </div>
      </div>
    </Tilt>
  );
}

/* ------------------------------------------------------------------
 * FlipCard — pricing card. Hover to flip, see the feature list.
 * ------------------------------------------------------------------ */
export function FlipCardDemo() {
  return (
    <FlipCard className="h-[280px] w-[260px]">
      <FlipCardFront className="rounded-2xl border border-border/60 bg-card p-6 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)]">
        <Badge variant="secondary">Pro</Badge>
        <p className="mt-4 text-3xl font-semibold tracking-tight">$20</p>
        <p className="text-xs text-muted-foreground">per month, billed yearly</p>
        <p className="mt-6 text-sm text-muted-foreground">
          For solo developers shipping side projects.
        </p>
        <p className="absolute bottom-6 left-6 right-6 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Hover to see what&apos;s included
        </p>
      </FlipCardFront>
      <FlipCardBack className="rounded-2xl border border-border/60 bg-foreground p-6 text-background shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)]">
        <p className="text-xs font-medium uppercase tracking-wider opacity-60">
          Included
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            "Unlimited components",
            "Private registry",
            "Priority support",
            "Advanced themes",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-background/15">
                <Star className="h-2.5 w-2.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <Button
          size="sm"
          variant="secondary"
          className="absolute bottom-5 left-5 right-5"
        >
          Get Pro
        </Button>
      </FlipCardBack>
    </FlipCard>
  );
}

/* ------------------------------------------------------------------
 * Cube — testimonials on each side. Buttons rotate the cube.
 * ------------------------------------------------------------------ */
type Face = "front" | "right" | "back" | "left";
const FACES: Face[] = ["front", "right", "back", "left"];

const TESTIMONIALS: Record<
  Face,
  { quote: string; author: string; role: string }
> = {
  front: {
    quote: "CraftUI replaced three component libraries in our app.",
    author: "Sasha Lee",
    role: "Eng Lead, Linear",
  },
  right: {
    quote: "The CLI is what shadcn promised — but better.",
    author: "Diego Alvarez",
    role: "Founder, Stack",
  },
  back: {
    quote: "Our PR diffs are smaller because every component is just a file.",
    author: "Mira Patel",
    role: "Staff Eng, Atlas",
  },
  left: {
    quote: "Beautiful out of the box. Even the empty states feel premium.",
    author: "Jonas Reyes",
    role: "Designer, Portal",
  },
};

export function CubeDemo() {
  const [face, setFace] = React.useState<Face>("front");
  return (
    <div className="flex flex-col items-center gap-6">
      <Cube face={face} size={260}>
        {FACES.map((f) => {
          const t = TESTIMONIALS[f];
          return (
            <CubeFace
              key={f}
              face={f}
              className="flex flex-col justify-between rounded-xl border border-border/60 bg-card p-6 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)]"
            >
              <Quote className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm font-medium leading-snug">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </CubeFace>
          );
        })}
      </Cube>
      <div className="flex gap-1.5">
        {FACES.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFace(f)}
            aria-label={`Show ${f} face`}
            className={`h-1.5 w-6 rounded-full transition-colors ${
              f === face ? "bg-foreground" : "bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * CardStack — auto-cycling testimonial deck. Click the front to advance.
 * ------------------------------------------------------------------ */
export function CardStackDemo() {
  const items = React.useMemo(
    () =>
      [
        {
          author: "Sasha Lee",
          role: "Eng Lead",
          quote:
            "We replaced three libraries with CraftUI. Our bundle dropped 40 KB and the team is happier.",
        },
        {
          author: "Diego Alvarez",
          role: "Founder",
          quote:
            "I was a Radix purist. CraftUI's design language is the first thing that converted me.",
        },
        {
          author: "Mira Patel",
          role: "Staff Eng",
          quote:
            "Owning the source means tiny PRs and zero version-bump anxiety. It changes how the team thinks.",
        },
        {
          author: "Jonas Reyes",
          role: "Designer",
          quote:
            "The default shadows alone are reason enough. Everything feels considered.",
        },
      ].map((t, i) => ({
        id: i,
        content: (
          <div className="flex h-full flex-col justify-between">
            <Zap className="h-5 w-5 text-muted-foreground" />
            <p className="text-base font-medium leading-snug">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div>
              <p className="text-sm font-semibold">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ),
      })),
    []
  );

  return <CardStack className="h-[260px] w-[360px]" items={items} />;
}

/* ------------------------------------------------------------------
 * HoloCard — collectible-style card with iridescent shimmer + tilt.
 * ------------------------------------------------------------------ */
export function HoloCardDemo() {
  return (
    <HoloCard className="rounded-2xl" intensity={16}>
      <div className="relative h-[300px] w-[220px] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 p-5 text-white shadow-[0_24px_48px_-24px_rgba(80,40,160,0.6)]">
        <div className="flex items-start justify-between">
          <Crown className="h-5 w-5 text-amber-200" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
            001 / 100
          </span>
        </div>
        <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
            Founders
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">
            Limited Edition
          </p>
          <p className="mt-2 text-xs opacity-70">CraftUI · 2026</p>
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest opacity-70">
          <span>Holographic</span>
          <span>★ Mythic</span>
        </div>
      </div>
    </HoloCard>
  );
}

/* ------------------------------------------------------------------
 * Coverflow — playlist-style covers, click to bring one forward.
 * ------------------------------------------------------------------ */
const COVERS = [
  {
    id: 1,
    title: "Midnight Drive",
    artist: "Lo-fi · 32 tracks",
    photo: "https://picsum.photos/seed/midnight-drive/400/520",
  },
  {
    id: 2,
    title: "Deep Focus",
    artist: "Ambient · 51 tracks",
    photo: "https://picsum.photos/seed/deep-focus/400/520",
  },
  {
    id: 3,
    title: "Late Night Coding",
    artist: "Synthwave · 28 tracks",
    photo: "https://picsum.photos/seed/late-night-coding/400/520",
  },
  {
    id: 4,
    title: "Morning Run",
    artist: "Electronic · 19 tracks",
    photo: "https://picsum.photos/seed/morning-run/400/520",
  },
  {
    id: 5,
    title: "Acoustic Coffee",
    artist: "Folk · 24 tracks",
    photo: "https://picsum.photos/seed/acoustic-coffee/400/520",
  },
];

export function CoverflowDemo() {
  const items = React.useMemo(
    () =>
      COVERS.map((c) => ({
        id: c.id,
        content: (
          <div className="relative h-full w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.photo}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute left-5 right-5 top-5 flex items-start justify-between text-white">
              <Disc3 className="h-6 w-6 opacity-90 drop-shadow" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-base font-semibold leading-tight drop-shadow">
                {c.title}
              </p>
              <p className="mt-0.5 text-xs opacity-85 drop-shadow">
                {c.artist}
              </p>
            </div>
          </div>
        ),
      })),
    []
  );

  return (
    <Coverflow
      className="w-full max-w-3xl"
      items={items}
      defaultIndex={2}
      itemWidth={200}
      itemHeight={260}
    />
  );
}

/* ------------------------------------------------------------------
 * Parallax — layered hero scene. Move the cursor to feel the depth.
 * ------------------------------------------------------------------ */
export function ParallaxDemo() {
  return (
    <Parallax className="h-[300px] w-[480px] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-indigo-950 via-indigo-900 to-purple-900">
      {/* Stars (deepest layer) */}
      <ParallaxLayer depth={6} z={0}>
        <div className="absolute inset-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/70"
              style={{
                top: `${(i * 37) % 60}%`,
                left: `${(i * 53) % 100}%`,
                opacity: 0.4 + ((i * 17) % 60) / 100,
              }}
            />
          ))}
        </div>
      </ParallaxLayer>

      {/* Sun glow */}
      <ParallaxLayer depth={12} z={20}>
        <div className="absolute left-1/2 top-[30%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/40 blur-3xl" />
      </ParallaxLayer>

      {/* Distant clouds */}
      <ParallaxLayer depth={20} z={40} className="text-indigo-200/60">
        <Cloud className="absolute left-[10%] top-[18%] h-8 w-8" />
        <Cloud className="absolute right-[12%] top-[28%] h-6 w-6" />
        <Cloud className="absolute left-[40%] top-[12%] h-7 w-7" />
      </ParallaxLayer>

      {/* Mountains */}
      <ParallaxLayer depth={36} z={80} className="text-indigo-300/80">
        <Mountain className="absolute -bottom-2 left-[8%] h-32 w-32" />
        <Mountain className="absolute -bottom-3 left-[36%] h-40 w-40 text-indigo-200/90" />
        <Mountain className="absolute -bottom-2 right-[10%] h-28 w-28" />
      </ParallaxLayer>

      {/* Title (closest layer) */}
      <ParallaxLayer depth={56} z={120}>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">
            CraftUI · 2026
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">
            Move the cursor.
          </p>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
}

/* ------------------------------------------------------------------
 * Carousel3D — autoplay ring of testimonial cards.
 * ------------------------------------------------------------------ */
export function Carousel3DDemo() {
  const items = React.useMemo(
    () =>
      [
        {
          author: "Sasha Lee",
          role: "Eng Lead, Linear",
          quote: "Replaced three component libraries in a week.",
        },
        {
          author: "Diego Alvarez",
          role: "Founder, Stack",
          quote: "The CLI is what shadcn promised — but better.",
        },
        {
          author: "Mira Patel",
          role: "Staff Eng, Atlas",
          quote: "PR diffs are smaller because every component is a file.",
        },
        {
          author: "Jonas Reyes",
          role: "Designer, Portal",
          quote: "Beautiful out of the box. Even the empty states feel premium.",
        },
        {
          author: "Aiko Tanaka",
          role: "Eng, Sequel",
          quote: "Owning the source means I never wait on a maintainer.",
        },
        {
          author: "Sam Okafor",
          role: "Founder, Tally",
          quote: "First library where the defaults are the design.",
        },
      ].map((t, i) => ({
        id: i,
        content: (
          <div className="flex h-full flex-col justify-between p-5">
            <Quote className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm font-medium leading-snug">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div>
              <p className="text-sm font-semibold">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ),
      })),
    []
  );

  return (
    <Carousel3D
      items={items}
      radius={300}
      itemWidth={200}
      itemHeight={240}
      autoplay={3500}
    />
  );
}

/* ------------------------------------------------------------------
 * Pin3D — perspective pin reveal. Hover to lift the badge above.
 * ------------------------------------------------------------------ */
export function Pin3DDemo() {
  return (
    <Pin3D
      label={
        <span className="inline-flex items-center gap-1">
          View on GitHub <ArrowUpRight className="h-3 w-3" />
        </span>
      }
      pinOffset={72}
    >
      <div className="relative h-[280px] w-[260px] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.4)]">
        <div className="flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
            <Github className="h-4 w-4" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            v1.0
          </span>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-lg font-semibold tracking-tight">CraftUI</p>
          <p className="mt-1 text-xs leading-relaxed opacity-70">
            A modern, copy-paste component library. Open-source, themeable,
            owned by you.
          </p>
        </div>
      </div>
    </Pin3D>
  );
}

/* ------------------------------------------------------------------
 * Marquee3D — perspective-tilted scrolling logos / brand chips.
 * ------------------------------------------------------------------ */
const BRAND_ITEMS = [
  { name: "Linear", icon: Rocket },
  { name: "Stripe", icon: Sparkles },
  { name: "Vercel", icon: Plane },
  { name: "Figma", icon: Star },
  { name: "Notion", icon: Globe },
  { name: "Spotify", icon: Music },
  { name: "GitHub", icon: Github },
  { name: "Atlas", icon: Zap },
];

export function Marquee3DDemo() {
  const items = BRAND_ITEMS.map(({ name, icon: Icon }) => (
    <div
      key={name}
      className="flex h-16 w-44 items-center gap-3 rounded-xl border border-border/60 bg-card px-4 text-card-foreground shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium">{name}</span>
    </div>
  ));

  return (
    <Marquee3D
      className="h-[340px] w-full max-w-2xl"
      items={items}
      rows={4}
      duration={28}
      tiltX={45}
      rotateZ={-12}
    />
  );
}

/* ------------------------------------------------------------------
 * Spotlight — cursor-following spotlight on a hero panel.
 * ------------------------------------------------------------------ */
export function SpotlightDemo() {
  return (
    <Spotlight
      className="h-[280px] w-[480px] rounded-2xl border border-border/60 bg-slate-950 text-white"
      size={420}
      intensity={0.22}
    >
      <div className="relative flex h-full flex-col justify-end p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
          Introducing
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">
          Componentry that ships with you.
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
          Move your cursor anywhere in the panel — the light follows. Set the
          size, color, and intensity with a single prop.
        </p>
      </div>
    </Spotlight>
  );
}

/* ------------------------------------------------------------------
 * Lens — magnifier follows the cursor and zooms the underlying photo.
 * ------------------------------------------------------------------ */
export function LensDemo() {
  return (
    <Lens className="h-[280px] w-[420px] rounded-2xl" size={150} zoom={2}>
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/lens-inspect/840/560"
          alt="Inspect detail"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
          <p className="text-base font-semibold tracking-tight drop-shadow">
            Hover to inspect
          </p>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-80 drop-shadow">
            2× zoom
          </span>
        </div>
      </div>
    </Lens>
  );
}

/* ------------------------------------------------------------------
 * DirectionAwareHover — overlay slides in from the cursor entry edge.
 * ------------------------------------------------------------------ */
export function DirectionAwareHoverDemo() {
  return (
    <DirectionAwareHover
      className="h-[280px] w-[360px] rounded-2xl"
      hoverContent={
        <div className="flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white">
          <p className="text-xs font-medium uppercase tracking-wider opacity-70">
            Now playing
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight">
            Synthetic Dreams
          </p>
          <p className="mt-1 text-sm opacity-80">CraftUI Sessions · 04:21</p>
        </div>
      }
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/synthetic-dreams/720/560"
          alt="Album art"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-start p-6 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Music className="h-5 w-5" />
          </div>
        </div>
      </div>
    </DirectionAwareHover>
  );
}

/* ------------------------------------------------------------------
 * Meteors — meteor shower across a hero panel.
 * ------------------------------------------------------------------ */
export function MeteorsDemo() {
  return (
    <div className="relative h-[300px] w-[480px] overflow-hidden rounded-2xl border border-border/60 bg-slate-950 text-white">
      <Meteors count={24} speed={[3, 8]} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.5),transparent_60%)]" />
      <div className="relative flex h-full flex-col justify-end p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          Production · Live
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">
          Ship at the speed of light.
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
          Drop the Meteors layer into any container — hero, card, sign-up
          panel — for instant kinetic energy.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Aurora — animated aurora gradient hero.
 * ------------------------------------------------------------------ */
export function AuroraDemo() {
  return (
    <Aurora className="h-[300px] w-[480px] rounded-2xl bg-slate-950 text-white">
      <div className="relative flex h-[300px] flex-col justify-center p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/65">
          New · 2026
        </p>
        <p className="mt-3 max-w-xs text-3xl font-semibold leading-tight tracking-tight">
          Build with motion that breathes.
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
          Aurora drifts a soft blanket of color behind your hero copy. Tune the
          palette and tempo to match your brand.
        </p>
      </div>
    </Aurora>
  );
}

/* ------------------------------------------------------------------
 * MovingBorder — animated gradient border around a CTA.
 * ------------------------------------------------------------------ */
export function MovingBorderDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <MovingBorder duration={4} radius={20} className="w-[280px]">
        <div className="flex flex-col items-center gap-3 px-6 py-7">
          <Sparkles className="h-5 w-5 text-foreground" />
          <p className="text-base font-semibold tracking-tight">
            CraftUI Pro
          </p>
          <p className="text-center text-xs text-muted-foreground">
            Unlock premium components, themes, and priority support.
          </p>
          <Button size="sm" className="mt-2 w-full">
            Upgrade
          </Button>
        </div>
      </MovingBorder>

      <MovingBorder duration={6} radius={999} className="inline-block">
        <button
          type="button"
          className="rounded-full bg-foreground px-5 py-2 text-xs font-semibold text-background"
        >
          Subscribe
        </button>
      </MovingBorder>
    </div>
  );
}

/* ------------------------------------------------------------------
 * OrbitingCircles — items orbiting a central logo on two rings.
 * ------------------------------------------------------------------ */
function OrbitTile({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-card text-card-foreground shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)]">
      <Icon className="h-5 w-5" />
    </div>
  );
}

export function OrbitingCirclesDemo() {
  const inner = [Github, Plane, Music, Globe].map((Icon, i) => (
    <OrbitTile key={i} icon={Icon} />
  ));
  const outer = [Rocket, Sparkles, Star, Zap, Disc3, Crown].map((Icon, i) => (
    <OrbitTile key={i} icon={Icon} />
  ));

  return (
    <div className="relative">
      <OrbitingCircles
        items={outer}
        radius={150}
        duration={28}
        showPath
        center={
          <OrbitingCircles
            items={inner}
            radius={80}
            duration={18}
            reverse
            showPath
            center={
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background shadow-[0_12px_28px_-12px_rgba(0,0,0,0.4)]">
                <Sparkles className="h-7 w-7" />
              </div>
            }
          />
        }
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * GlowingStars — twinkling night sky as a hero background.
 * ------------------------------------------------------------------ */
export function GlowingStarsDemo() {
  return (
    <div className="relative h-[300px] w-[480px] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-[#070b1f] via-[#0a1338] to-[#1a1a4a] text-white">
      <GlowingStars count={140} speed={[2, 5]} />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          Galaxy · v2
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">
          Reach further than you thought.
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
          A drop-in twinkling starfield. Pure CSS — no canvas, no JS animation
          loop, no battery drain.
        </p>
      </div>
    </div>
  );
}
