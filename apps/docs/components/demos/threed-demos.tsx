"use client";

import * as React from "react";
import {
  AnimatedChart,
  AnimatedText,
  AnimatedTooltip,
  Aurora,
  Avatar,
  AvatarFallback,
  BackgroundBeams,
  BackgroundBoxes,
  Badge,
  BentoGrid,
  BentoGridItem,
  Button,
  CardHoverEffect,
  CardStack,
  Carousel3D,
  CoinFlip,
  Compare,
  CopyButton,
  CountUpRing,
  Coverflow,
  Cube,
  CubeFace,
  CursorTrail,
  DirectionAwareHover,
  DotPattern,
  DotProgress,
  EvervaultCard,
  FeatureCard,
  FluxPanels,
  FlipCard,
  FocusCards,
  FlipCardBack,
  FlipCardFront,
  FlipWords,
  FloatingDock,
  FoldOut,
  FollowingPointer,
  GlitchClip,
  Globe,
  GravityWell,
  Helix,
  HoldToConfirm,
  HoloCard,
  HoloSlices,
  HoverBorderGradient,
  InfiniteMovingCards,
  Lamp,
  Lens,
  LogoCloud,
  MagicLayer,
  Magnet,
  MagneticButton,
  Marquee3D,
  Meteors,
  MovingBorder,
  MultiStepLoader,
  NeonGlow,
  NeonPortal,
  NotificationStack,
  NumberFlip,
  NumberTicker,
  OrbitStack,
  OrbitalMenu,
  OrbitingCircles,
  PageCurl,
  PaperPlane,
  Parallax,
  ParallaxLayer,
  PhoneMockup,
  Pin3D,
  PinBoard,
  PlasmaField,
  PricingCards,
  PrismOrb,
  QuantumGrid,
  Ripple,
  SegmentedControl,
  Sparkles as SparklesFx,
  SparklesText,
  StatCard,
  Spotlight,
  SwipeStack,
  TestimonialQuote,
  TextGenerateEffect,
  TextScramble,
  ThemeToggle,
  Tilt,
  TiltTiles,
  TracingBeam,
  VoteWidget,
  WaveGrid,
  WavyBackground,
  WavyText,
  WorldMap,
} from "@craftui/ui";
import {
  ArrowUpRight,
  Bell,
  Camera,
  Clock as ClockIcon,
  Cloud,
  Compass,
  CreditCard,
  Crown,
  Disc3,
  FileText,
  Github,
  Globe as GlobeIcon,
  Headphones,
  Heart,
  Image as ImageIcon,
  Mail,
  Map as MapIcon,
  MessageCircle,
  Mountain,
  Music,
  Phone,
  Plane,
  Plus,
  Quote,
  Send,
  Settings,
  Share2,
  ShoppingBag,
  Rocket,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
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
    <div className="pt-28">
      <Pin3D
        label={
          <span className="inline-flex items-center gap-1.5">
            View on GitHub <ArrowUpRight className="h-3 w-3" />
          </span>
        }
        pinOffset={56}
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
    </div>
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
  { name: "Notion", icon: GlobeIcon },
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
function OrbitTile({
  icon: Icon,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
}) {
  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-gradient-to-b from-card to-card/85 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-sm transition-transform duration-300 hover:scale-110"
      style={{ color: tone }}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}

const INNER_ITEMS = [
  { icon: Github, tone: "#1f2937" },
  { icon: Plane, tone: "#0ea5e9" },
  { icon: Music, tone: "#ec4899" },
  { icon: GlobeIcon, tone: "#10b981" },
];
const OUTER_ITEMS = [
  { icon: Rocket, tone: "#f97316" },
  { icon: Sparkles, tone: "#a855f7" },
  { icon: Star, tone: "#f59e0b" },
  { icon: Zap, tone: "#eab308" },
  { icon: Disc3, tone: "#14b8a6" },
  { icon: Crown, tone: "#8b5cf6" },
];

export function OrbitingCirclesDemo() {
  const inner = INNER_ITEMS.map((it, i) => (
    <OrbitTile key={i} icon={it.icon} tone={it.tone} />
  ));
  const outer = OUTER_ITEMS.map((it, i) => (
    <OrbitTile key={i} icon={it.icon} tone={it.tone} />
  ));

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient backdrop glow so the rings feel alive */}
      <span
        aria-hidden
        className="pointer-events-none absolute h-[360px] w-[360px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,0.18), rgba(168,85,247,0.10) 55%, transparent 75%)",
        }}
      />
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
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 animate-ping rounded-2xl bg-foreground/10"
                  style={{ animationDuration: "3s" }}
                />
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground to-foreground/80 text-background shadow-[0_18px_36px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)]"
                >
                  <Sparkles className="h-7 w-7" />
                </div>
              </div>
            }
          />
        }
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * Sparkles — starfield demo using the new shape="dot" mode.
 * ------------------------------------------------------------------ */
export function SparklesStarfieldDemo() {
  return (
    <div className="relative h-[300px] w-[480px] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-[#070b1f] via-[#0a1338] to-[#1a1a4a] text-white">
      <SparklesFx
        shape="dot"
        count={150}
        speed={[2, 5]}
        color="rgb(255,255,255)"
        glow
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          Galaxy · v2
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">
          Reach further than you thought.
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
          A drop-in twinkling starfield via{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 text-xs">
            shape=&quot;dot&quot;
          </code>
          . Pure CSS, no canvas, no battery drain.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Sparkles — sparkle particles around a hero headline.
 * ------------------------------------------------------------------ */
export function SparklesDemo() {
  return (
    <div className="relative h-[260px] w-[480px] overflow-hidden rounded-2xl border border-border/60 bg-slate-950 text-white">
      <SparklesFx
        count={36}
        size={[2, 4]}
        speed={[1.5, 4]}
        color="rgb(245, 208, 110)"
      />
      <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-200/80">
          The future of UI
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight">
          Built for{" "}
          <AnimatedText variant="gradient" className="font-semibold">
            designers
          </AnimatedText>
          .
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * InfiniteMovingCards — auto-scrolling testimonial row.
 * ------------------------------------------------------------------ */
const TESTIMONIAL_QUOTES = [
  {
    author: "Sasha Lee",
    role: "Eng Lead, Linear",
    quote: "Replaced three component libraries. Bundle dropped 40 KB.",
  },
  {
    author: "Diego Alvarez",
    role: "Founder, Stack",
    quote: "The CLI is what shadcn promised — but better.",
  },
  {
    author: "Mira Patel",
    role: "Staff Eng, Atlas",
    quote: "Tiny PRs, zero version-bump anxiety. Changes how the team thinks.",
  },
  {
    author: "Jonas Reyes",
    role: "Designer, Portal",
    quote: "Even the empty states feel premium. Defaults are the design.",
  },
  {
    author: "Aiko Tanaka",
    role: "Eng, Sequel",
    quote: "Owning the source means I never wait on a maintainer.",
  },
];

export function InfiniteMovingCardsDemo() {
  const cards = TESTIMONIAL_QUOTES.map((t, i) => (
    <div
      key={i}
      className="flex h-[140px] w-[300px] flex-col justify-between rounded-xl border border-border/60 bg-card p-5 text-card-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
    >
      <Quote className="h-4 w-4 text-muted-foreground" />
      <p className="text-sm font-medium leading-snug">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-2">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="text-[10px]">
            {t.author
              .split(" ")
              .map((s) => s[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <p className="text-xs font-semibold">{t.author}</p>
          <p className="text-[11px] text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <InfiniteMovingCards
      className="w-full max-w-2xl"
      items={cards}
      duration={28}
      gap={20}
    />
  );
}

/* ------------------------------------------------------------------
 * HoverBorderGradient — border lights up where the cursor hovers.
 * ------------------------------------------------------------------ */
export function HoverBorderGradientDemo() {
  return (
    <HoverBorderGradient
      className="w-[320px]"
      borderWidth={1.5}
      radius={20}
      color="rgba(168, 85, 247, 0.9)"
    >
      <div className="flex flex-col gap-3 p-7">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-base font-semibold tracking-tight">CraftUI Pro</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Move the cursor over the edges. The border lights up where the
            pointer hovers — a flashlight-on-a-frame effect.
          </p>
        </div>
        <Button size="sm" className="mt-1 w-full" variant="outline">
          Learn more
        </Button>
      </div>
    </HoverBorderGradient>
  );
}

/* ------------------------------------------------------------------
 * Lamp — spotlight from above on a hero panel.
 * ------------------------------------------------------------------ */
export function LampDemo() {
  return (
    <Lamp
      className="h-[300px] w-[480px] rounded-2xl bg-slate-950 text-white"
      color="rgba(56, 189, 248, 0.9)"
      beamWidth={460}
      beamHeight={220}
    >
      <div className="flex h-[300px] flex-col items-center justify-end px-8 pb-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-200/70">
          Built for builders
        </p>
        <p className="mt-3 max-w-md text-3xl font-semibold tracking-tight">
          <AnimatedText
            variant="shiny"
            duration={3}
            shineColor="rgb(255,255,255)"
            baseColor="rgba(255,255,255,0.55)"
          >
            Light up your hero.
          </AnimatedText>
        </p>
        <p className="mt-3 max-w-md text-sm text-white/65">
          A drop-in lamp for that &ldquo;product launch&rdquo; vibe — set the
          beam color, width, and height to match your brand.
        </p>
      </div>
    </Lamp>
  );
}

/* ------------------------------------------------------------------
 * Magnet — buttons gravitate toward the cursor.
 * ------------------------------------------------------------------ */
export function MagnetDemo() {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Move your cursor near these buttons — they&apos;ll lean toward you.
      </p>
      <div className="flex items-center gap-12">
        <Magnet strength={20} range={120}>
          <Button>Get started</Button>
        </Magnet>
        <Magnet strength={28} range={140}>
          <Button variant="outline">Documentation</Button>
        </Magnet>
        <Magnet strength={20} range={120}>
          <Button variant="ghost">Pricing</Button>
        </Magnet>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * AnimatedText — single component, four variants in one panel.
 * ------------------------------------------------------------------ */
export function AnimatedTextDemo() {
  return (
    <div className="flex flex-col items-stretch gap-6 py-6">
      <div className="rounded-2xl border border-border/60 bg-card p-7 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          variant=&quot;shiny&quot;
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight">
          <AnimatedText
            variant="shiny"
            shineColor="hsl(var(--foreground))"
            baseColor="hsl(var(--foreground) / 0.4)"
          >
            Ship beautifully.
          </AnimatedText>
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-7 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          variant=&quot;gradient&quot;
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight">
          Components that{" "}
          <AnimatedText variant="gradient" className="font-semibold">
            spark joy
          </AnimatedText>
          .
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-7 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          variant=&quot;typewriter&quot;
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight">
          Build for{" "}
          <span className="text-violet-500">
            <AnimatedText
              variant="typewriter"
              phrases={["designers", "founders", "engineers", "the team"]}
              typeSpeed={80}
              deleteSpeed={45}
              pause={1400}
            />
          </span>
          .
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-7 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          variant=&quot;reveal&quot;
        </p>
        <p className="mt-3 text-2xl font-semibold tracking-tight">
          <AnimatedText variant="reveal" stagger={32} duration={600}>
            Build interfaces that feel inevitable.
          </AnimatedText>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * NumberTicker — animated stat counters.
 * ------------------------------------------------------------------ */
export function NumberTickerDemo() {
  return (
    <div className="grid grid-cols-3 gap-6 py-6">
      {[
        { label: "Components", value: 85 },
        { label: "Downloads", value: 124000 },
        { label: "Stars", value: 9482 },
      ].map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]"
        >
          <p className="text-4xl font-semibold tracking-tight tabular-nums">
            <NumberTicker value={s.value} duration={1800} />
          </p>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
 * NeonGlow — neon-sign style wrapper on a dark background.
 * ------------------------------------------------------------------ */
export function NeonGlowDemo() {
  return (
    <div className="flex h-[260px] w-[480px] items-center justify-center rounded-2xl bg-slate-950">
      <div className="flex items-center gap-6">
        <NeonGlow color="rgb(34, 211, 238)" radius={16} intensity={0.7}>
          <div className="px-5 py-3 text-sm font-semibold tracking-tight text-cyan-100">
            CYAN
          </div>
        </NeonGlow>
        <NeonGlow color="rgb(236, 72, 153)" radius={999} intensity={0.7}>
          <div className="px-5 py-3 text-sm font-semibold tracking-tight text-pink-100">
            PINK
          </div>
        </NeonGlow>
        <NeonGlow color="rgb(168, 85, 247)" radius={12} intensity={0.7}>
          <div className="px-5 py-3 text-sm font-semibold tracking-tight text-violet-100">
            VIOLET
          </div>
        </NeonGlow>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * BackgroundBeams — diagonal animated beams behind hero copy.
 * ------------------------------------------------------------------ */
export function BackgroundBeamsDemo() {
  return (
    <div className="relative h-[300px] w-[480px] overflow-hidden rounded-2xl border border-border/60 bg-slate-950 text-white">
      <BackgroundBeams count={14} color="rgba(99,102,241,0.55)" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.4),transparent_60%)]" />
      <div className="relative flex h-full flex-col justify-end p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          Beams · v1
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">
          Energy you can feel.
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
          Diagonal SVG beams streak across the panel at randomized speeds.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * BackgroundBoxes — skewed grid that highlights on hover.
 * ------------------------------------------------------------------ */
export function BackgroundBoxesDemo() {
  return (
    <div className="relative h-[320px] w-[520px] overflow-hidden rounded-2xl border border-border/60 bg-slate-950 text-white">
      <BackgroundBoxes
        rows={9}
        cols={18}
        cellSize={36}
        hoverColor="rgba(168, 85, 247, 0.85)"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(2,6,23,0.85)_75%)]" />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          Hover anywhere
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">
          Move the cursor across the grid.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * WavyBackground — drifting colored waves behind hero copy.
 * ------------------------------------------------------------------ */
export function WavyBackgroundDemo() {
  return (
    <WavyBackground
      className="h-[300px] w-[480px] rounded-2xl bg-slate-950 text-white"
      duration={14}
      blur={10}
    >
      <div className="relative flex h-[300px] flex-col justify-end p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/65">
          Atmosphere
        </p>
        <p className="mt-3 max-w-xs text-3xl font-semibold leading-tight tracking-tight">
          Quietly alive.
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
          Multi-color SVG waves drift behind your content with a soft blur.
        </p>
      </div>
    </WavyBackground>
  );
}

/* ------------------------------------------------------------------
 * FollowingPointer — custom cursor follower inside a wrapped panel.
 * ------------------------------------------------------------------ */
export function FollowingPointerDemo() {
  return (
    <FollowingPointer className="h-[260px] w-[480px] overflow-hidden rounded-2xl border border-border/60 bg-card">
      <div className="flex h-full flex-col justify-center px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Live preview
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">
          Move the cursor over this panel.
        </p>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          The system cursor disappears; a branded indicator follows the
          pointer. Replace the indicator with anything — avatar, icon, label.
        </p>
      </div>
    </FollowingPointer>
  );
}

/* ------------------------------------------------------------------
 * Compare — drag-to-compare for two code states (before / after).
 * ------------------------------------------------------------------ */
function CodePanel({
  variant,
}: {
  variant: "before" | "after";
}) {
  // Same shape both sides — different content. Manually colored spans simulate
  // syntax highlighting without bundling Shiki into the demo.
  const k = (s: string) => (
    <span className="text-fuchsia-400">{s}</span>
  );
  const fn = (s: string) => <span className="text-violet-300">{s}</span>;
  const v = (s: string) => <span className="text-sky-300">{s}</span>;
  const str = (s: string) => <span className="text-emerald-300">{s}</span>;
  const num = (s: string) => <span className="text-amber-300">{s}</span>;
  const cmt = (s: string) => (
    <span className="italic text-slate-500">{s}</span>
  );
  const id = (s: string) => <span className="text-cyan-200">{s}</span>;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b1020]">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
      </div>
      <pre className="px-5 pb-5 font-mono text-[12px] leading-relaxed text-slate-200">
        <code>
          {k("const")} {id("handleEnd")} = {fn("useCallback")}(() {fn("=>")}{" "}
          {`{`}
          {"\n  "}
          {variant === "before" ? (
            cmt("// Implement this")
          ) : (
            <>
              {k("if")} ({id("isDragging")}) {`{`}
              {"\n    "}
              {id("setIsDragging")}({v("false")});{"\n  "}
              {`}`}
            </>
          )}
          {"\n"}
          {`}, []);`}
          {"\n\n"}
          {k("const")} {id("handleMove")} = {fn("useCallback")}(
          {"\n  "}({id("e")}) {fn("=>")} {`{`}
          {"\n    "}
          {variant === "before" ? (
            cmt("// Implement this")
          ) : (
            <>
              {k("if")} (!{id("ref")}.{id("current")}) {k("return")};{"\n    "}
              {k("const")} {id("rect")} = {id("ref")}.{id("current")}.
              {fn("getBoundingClientRect")}();{"\n    "}
              {k("const")} {id("x")} = {id("e")}.{id("clientX")} - {id("rect")}.
              {id("left")};{"\n    "}
              {k("const")} {id("p")} = ({id("x")} / {id("rect")}.{id("width")})
              * {num("100")};{"\n    "}
              {id("setPos")}({fn("Math")}.{fn("max")}({num("0")}, {fn("Math")}.
              {fn("min")}({num("100")}, {id("p")})));
            </>
          )}
          {"\n  "}
          {`}`},{"\n  "}[{id("isDragging")}]{"\n"}
          {`);`}
          {"\n\n"}
          {k("const")} {id("handleStart")} = {fn("useCallback")}(({id("x")})
          {fn(" =>")} {`{`}
          {"\n  "}
          {variant === "before"
            ? cmt("// Implement this")
            : (
              <>
                {id("setIsDragging")}({v("true")});{"\n  "}
                {id("handleMove")}({str(`{ clientX: x }`)} {k("as")} {id("any")});
              </>
            )}
          {"\n"}
          {`}, [`}
          {id("handleMove")}
          {`]);`}
        </code>
      </pre>
    </div>
  );
}

export function CompareDemo() {
  return (
    <Compare
      className="h-[360px] w-[560px] border border-border/60 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]"
      defaultPosition={42}
      before={<CodePanel variant="before" />}
      after={<CodePanel variant="after" />}
    />
  );
}

/* ------------------------------------------------------------------
 * CardHoverEffect — grid of feature cards with sliding hover bg.
 * ------------------------------------------------------------------ */
export function CardHoverEffectDemo() {
  const items = [
    {
      id: 1,
      title: "Composable",
      description: "Every component is a single file you can edit, not a black box.",
      icon: <Zap className="h-5 w-5 text-violet-500" />,
    },
    {
      id: 2,
      title: "Themeable",
      description: "HSL CSS variables. Swap themes with a class.",
      icon: <Sparkles className="h-5 w-5 text-fuchsia-500" />,
    },
    {
      id: 3,
      title: "Accessible",
      description: "Built on Radix primitives. Keyboard and screen reader friendly.",
      icon: <Star className="h-5 w-5 text-amber-500" />,
    },
    {
      id: 4,
      title: "Tiny",
      description: "Tree-shakable. Pay for what you use, nothing more.",
      icon: <Rocket className="h-5 w-5 text-orange-500" />,
    },
    {
      id: 5,
      title: "Open source",
      description: "MIT-licensed. Fork it, ship it, make it yours.",
      icon: <Github className="h-5 w-5 text-slate-700" />,
    },
    {
      id: 6,
      title: "Modern",
      description: "Tailwind 3, React 18, Next.js 14, TypeScript everywhere.",
      icon: <GlobeIcon className="h-5 w-5 text-emerald-500" />,
    },
  ];
  return <CardHoverEffect items={items} columns={3} className="w-full max-w-4xl" />;
}

/* ------------------------------------------------------------------
 * SparklesText — hero text with glowing beam + falling particles.
 * ------------------------------------------------------------------ */
export function SparklesTextDemo() {
  return (
    <div className="flex h-[460px] w-full max-w-3xl items-stretch justify-center overflow-hidden rounded-2xl bg-black">
      <SparklesText
        className="w-full px-10 pt-24"
        beamColor="rgb(56, 189, 248)"
        particleCount={220}
        spread={82}
        beamGap={12}
      >
        <h1 className="text-center text-6xl font-bold tracking-tight text-white md:text-7xl">
          CraftUI
        </h1>
      </SparklesText>
    </div>
  );
}

/* ------------------------------------------------------------------
 * MultiStepLoader — click-to-open fullscreen step loader.
 * ------------------------------------------------------------------ */
const LOADER_STEPS = [
  { text: "Buying a condo" },
  { text: "Travelling in a flight" },
  { text: "Meeting Tyler Durden" },
  { text: "He makes soap" },
  { text: "We goto a bar" },
  { text: "Start a fight" },
  { text: "We like it" },
  { text: "Welcome to F**** C***" },
];

export function MultiStepLoaderDemo() {
  const [loading, setLoading] = React.useState(false);
  return (
    <div className="flex h-[200px] w-full items-center justify-center">
      <Button onClick={() => setLoading(true)}>Click to load</Button>
      <MultiStepLoader
        loading={loading}
        steps={LOADER_STEPS}
        duration={1800}
        loop
        onClose={() => setLoading(false)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * WorldMap — dotted continents + animated cyan arcs.
 * ------------------------------------------------------------------ */
const ROUTES = [
  // NYC → London → Delhi → Tokyo → Sydney + a couple of cross-Atlantic legs.
  { start: { lat: 40.71, lng: -74.0 }, end: { lat: 51.5, lng: -0.12 } },
  { start: { lat: 51.5, lng: -0.12 }, end: { lat: 28.61, lng: 77.21 } },
  { start: { lat: 28.61, lng: 77.21 }, end: { lat: 35.68, lng: 139.65 } },
  { start: { lat: 35.68, lng: 139.65 }, end: { lat: -33.86, lng: 151.21 } },
  { start: { lat: 40.71, lng: -74.0 }, end: { lat: -23.55, lng: -46.63 } },
  { start: { lat: 51.5, lng: -0.12 }, end: { lat: 30.04, lng: 31.23 } },
  { start: { lat: 37.77, lng: -122.42 }, end: { lat: 35.68, lng: 139.65 } },
];

export function WorldMapDemo() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-6 rounded-2xl bg-[#04060d] p-10 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Remote <span className="text-white/50">Connectivity</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
          Break free from traditional boundaries. Work from anywhere, at the
          comfort of your own studio apartment.
        </p>
      </div>
      <WorldMap
        className="aspect-[2/1] w-full"
        connections={ROUTES}
        lineColor="rgb(56, 189, 248)"
        duration={4}
        stagger={0.55}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * Globe — drag-to-rotate 3D dotted sphere with city markers.
 * ------------------------------------------------------------------ */
// Tailwind cyan-500 / blue-500 / indigo-500 — a "data-flowing" trio.
const ARC_PALETTE = ["#06b6d4", "#3b82f6", "#6366f1"];
const pickColor = (i: number) => ARC_PALETTE[i % ARC_PALETTE.length]!;

// City lat/lng pairs (factual geographic data).
const CITIES = {
  NYC: { lat: 40.7128, lng: -74.006 },
  LON: { lat: 51.5072, lng: -0.1276 },
  TYO: { lat: 35.6762, lng: 139.6503 },
  SYD: { lat: -33.8688, lng: 151.2093 },
  BOM: { lat: 19.076, lng: 72.8777 },
  GRU: { lat: -23.5505, lng: -46.6333 },
  HKG: { lat: 22.3193, lng: 114.1694 },
  SIN: { lat: 1.3521, lng: 103.8198 },
  CDG: { lat: 48.8566, lng: 2.3522 },
  BER: { lat: 52.52, lng: 13.405 },
  LAX: { lat: 34.0522, lng: -118.2437 },
  SFO: { lat: 37.7749, lng: -122.4194 },
  ICN: { lat: 37.5665, lng: 126.978 },
  DXB: { lat: 25.2048, lng: 55.2708 },
  DEL: { lat: 28.6139, lng: 77.209 },
  CPT: { lat: -33.9249, lng: 18.4241 },
  NBO: { lat: -1.2921, lng: 36.8219 },
  CAI: { lat: 30.0444, lng: 31.2357 },
} as const;

const GLOBE_MARKERS = [
  { ...CITIES.NYC, color: "#38bdf8", size: 8 },
  { ...CITIES.LON, color: "#60a5fa", size: 8 },
  { ...CITIES.TYO, color: "#3b82f6", size: 8 },
  { ...CITIES.SYD, color: "#38bdf8", size: 7 },
  { ...CITIES.BOM, color: "#6366f1", size: 7 },
  { ...CITIES.GRU, color: "#3b82f6", size: 7 },
  { ...CITIES.HKG, color: "#22d3ee", size: 7 },
  { ...CITIES.SIN, color: "#6366f1", size: 6 },
  { ...CITIES.CDG, color: "#22d3ee", size: 6 },
  { ...CITIES.LAX, color: "#3b82f6", size: 6 },
];

// 18 routes that span every continent so arcs are always coming and going.
const RAW_ROUTES: Array<[keyof typeof CITIES, keyof typeof CITIES, number]> = [
  ["NYC", "LON", 0.18],
  ["LON", "TYO", 0.32],
  ["TYO", "SYD", 0.22],
  ["LON", "DEL", 0.24],
  ["DEL", "SIN", 0.18],
  ["BOM", "LON", 0.26],
  ["GRU", "NYC", 0.22],
  ["GRU", "CPT", 0.4],
  ["NBO", "DXB", 0.16],
  ["CAI", "BER", 0.16],
  ["HKG", "SYD", 0.28],
  ["SIN", "TYO", 0.18],
  ["LAX", "TYO", 0.28],
  ["LAX", "ICN", 0.3],
  ["SFO", "CDG", 0.34],
  ["BER", "LAX", 0.34],
  ["CDG", "NYC", 0.18],
  ["DXB", "GRU", 0.5],
];

const GLOBE_CONNECTIONS = RAW_ROUTES.map(([from, to, alt], i) => ({
  start: CITIES[from],
  end: CITIES[to],
  color: pickColor(i),
  altitude: alt,
}));

export function GlobeDemo() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-6 rounded-2xl bg-black p-10 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          We sell soap worldwide
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
          This globe is interactive. Click + drag to rotate; let go and it
          auto-spins.
        </p>
      </div>
      <Globe
        size={520}
        dotCount={5200}
        dotColor="rgba(255, 255, 255, 0.78)"
        atmosphereColor="rgba(59, 130, 246, 0.45)"
        markers={GLOBE_MARKERS}
        connections={GLOBE_CONNECTIONS}
        arcDuration={2.8}
        arcStagger={0.35}
        arcDotSize={3.2}
        arcGlow={10}
        autoRotate
        autoRotateSpeed={4.5}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * TracingBeam — scroll-driven vertical progress line.
 * ------------------------------------------------------------------ */
export function TracingBeamDemo() {
  return (
    <div className="w-full max-w-2xl">
      <TracingBeam color="rgb(56, 189, 248)" contentPadding={36}>
        <div className="space-y-8 py-2">
          {[
            {
              kicker: "Chapter 1",
              title: "The Beam follows your reading",
              body: "Scroll the page and a glowing dot travels down the left rail. The portion above the dot lights up; the portion below stays dim — a quiet way to show progress through long-form content.",
            },
            {
              kicker: "Chapter 2",
              title: "Pure scroll math, no libraries",
              body: "The component computes its own bounding rect, subtracts the viewport, and maps to 0–1 via rAF. Drop it around any block of content — articles, changelogs, docs.",
            },
            {
              kicker: "Chapter 3",
              title: "Customizable everywhere",
              body: "Tune the line color, thickness, and inner padding. The dot inherits the color and adds a glow box-shadow automatically.",
            },
          ].map((s) => (
            <article
              key={s.kicker}
              className="rounded-xl border border-border/60 bg-card p-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {s.kicker}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}

/* ------------------------------------------------------------------
 * AnimatedTooltip — hover an avatar to lift it and reveal a tooltip.
 * ------------------------------------------------------------------ */
export function AnimatedTooltipDemo() {
  // pravatar.cc returns consistent portrait-style avatars per ?img= id.
  const team = [
    {
      id: 1,
      name: "Sasha Lee",
      designation: "Eng Lead",
      image: "https://i.pravatar.cc/120?img=47",
    },
    {
      id: 2,
      name: "Diego Alvarez",
      designation: "Founder",
      image: "https://i.pravatar.cc/120?img=12",
    },
    {
      id: 3,
      name: "Mira Patel",
      designation: "Staff Eng",
      image: "https://i.pravatar.cc/120?img=49",
    },
    {
      id: 4,
      name: "Jonas Reyes",
      designation: "Designer",
      image: "https://i.pravatar.cc/120?img=33",
    },
    {
      id: 5,
      name: "Aiko Tanaka",
      designation: "Eng",
      image: "https://i.pravatar.cc/120?img=44",
    },
    {
      id: 6,
      name: "Sam Okafor",
      designation: "PM",
      image: "https://i.pravatar.cc/120?img=68",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center gap-4 py-12">
      <p className="text-sm text-muted-foreground">Hover the avatars below.</p>
      <AnimatedTooltip items={team} size={56} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * BentoGrid — multi-size feature grid.
 * ------------------------------------------------------------------ */
export function BentoGridDemo() {
  return (
    <BentoGrid columns={3} rowHeight="11rem" className="w-full max-w-4xl">
      <BentoGridItem
        span="2x2"
        icon={
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-500">
            <Zap className="h-4 w-4" />
          </span>
        }
        title="Composable by default"
        description="Every component is a single file you own. Edit, fork, theme — without touching node_modules."
        background={
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 via-transparent to-transparent" />
        }
      />
      <BentoGridItem
        icon={<Star className="h-5 w-5 text-amber-500" />}
        title="Themeable"
        description="HSL CSS variables. Swap themes with a class."
      />
      <BentoGridItem
        icon={<Rocket className="h-5 w-5 text-rose-500" />}
        title="Tiny"
        description="Tree-shakable. Pay for what you use."
      />
      <BentoGridItem
        span="2x1"
        icon={<Sparkles className="h-5 w-5 text-fuchsia-500" />}
        title="Modern animations"
        description="3D effects, magnify docks, scroll beams — no Three.js, no framer-motion required."
      />
      <BentoGridItem
        icon={<Github className="h-5 w-5 text-foreground/80" />}
        title="MIT-licensed"
        description="Fork it, ship it."
      />
    </BentoGrid>
  );
}

/* ------------------------------------------------------------------
 * FloatingDock — macOS-style magnify-on-hover dock.
 * ------------------------------------------------------------------ */
export function FloatingDockDemo() {
  const items = [
    { icon: <GlobeIcon className="h-5 w-5 text-sky-500" />, label: "Browse" },
    { icon: <Music className="h-5 w-5 text-fuchsia-500" />, label: "Music" },
    { icon: <Github className="h-5 w-5 text-foreground" />, label: "GitHub" },
    { icon: <Disc3 className="h-5 w-5 text-emerald-500" />, label: "Records" },
    { icon: <Sparkles className="h-5 w-5 text-amber-500" />, label: "Spark" },
    { icon: <Plane className="h-5 w-5 text-cyan-500" />, label: "Travel" },
    { icon: <Crown className="h-5 w-5 text-violet-500" />, label: "Pro" },
  ];
  return (
    <div className="flex w-full items-end justify-center py-16">
      <FloatingDock items={items} baseSize={44} magnifySize={72} range={130} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * WavyText — per-character vertical wave.
 * ------------------------------------------------------------------ */
export function WavyTextDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-14 text-center">
      <p className="text-5xl font-semibold tracking-tight text-violet-500">
        <WavyText text="CraftUI" amplitude={10} duration={2.2} stagger={0.08} />
      </p>
      <p className="text-base text-muted-foreground">
        <WavyText
          text="Components that breathe, character by character."
          amplitude={4}
          duration={2.4}
          stagger={0.04}
        />
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * EvervaultCard — random character grid + cursor-tracked gradient.
 * ------------------------------------------------------------------ */
export function EvervaultCardDemo() {
  return (
    <div className="flex w-full justify-center py-6">
      <EvervaultCard
        className="h-[320px] w-[300px] text-white"
        colors={[
          "rgb(34, 211, 238)", // cyan
          "rgb(168, 85, 247)", // violet
          "rgb(236, 72, 153)", // pink
          "rgb(251, 146, 60)", // orange
        ]}
        radius={22}
        borderDuration={6}
        style={{
          // Inner card surface — dark so the cursor gradient sings.
          background: "transparent",
        }}
      >
        <div className="absolute inset-0 -z-10 rounded-[20px] bg-gradient-to-br from-slate-950 via-[#0b0d20] to-slate-950" />
        <div className="px-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
            Encrypted vault
          </p>
          <p className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl font-bold text-white shadow-[0_8px_24px_-8px_rgba(168,85,247,0.45)] backdrop-blur">
            CU
          </p>
          <p className="mx-auto mt-3 max-w-[14rem] text-xs text-white/70">
            Hover to decrypt — characters fade in behind the cursor while a
            cyan → violet → pink → orange gradient sweeps with the pointer.
          </p>
        </div>
      </EvervaultCard>
    </div>
  );
}

/* ------------------------------------------------------------------
 * FocusCards — image grid where hovering one card focuses it.
 * ------------------------------------------------------------------ */
const FOCUS_GALLERY = [
  {
    id: 1,
    src: "https://picsum.photos/seed/forest-fog/600/780",
    alt: "Foggy forest",
    title: "Quiet places to think.",
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/canyon-river/600/780",
    alt: "Canyon",
    title: "Carved by patience.",
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/aerial-coast/600/780",
    alt: "Coast from above",
    title: "Sala behta hi jayega.",
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/campfire-sparks/600/780",
    alt: "Campfire",
    title: "Warm hands, cold air.",
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/pine-trail/600/780",
    alt: "Pine trail",
    title: "Walks that fix things.",
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/late-night-coding/600/780",
    alt: "Late night coding",
    title: "Late nights, ship days.",
  },
];

export function FocusCardsDemo() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-black p-6">
      <FocusCards items={FOCUS_GALLERY} columns={3} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * DotPattern — dot grid background with cursor spotlight.
 * ------------------------------------------------------------------ */
export function DotPatternDemo() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-border/60 bg-slate-950 text-white">
      <DotPattern
        className="absolute inset-0"
        spacing={22}
        dotSize={1.2}
        dotColor="rgba(255,255,255,0.16)"
        glowColor="rgba(56, 189, 248, 0.95)"
        glowRadius={160}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          Move the cursor
        </p>
        <p className="mt-2 max-w-md text-2xl font-semibold tracking-tight">
          Dots that come alive where you point.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * TextGenerateEffect — words appear from blurred to focused.
 * ------------------------------------------------------------------ */
export function TextGenerateEffectDemo() {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-3 py-12 text-center">
      <p className="text-3xl font-semibold tracking-tight md:text-4xl">
        <TextGenerateEffect
          words="Build interfaces that feel inevitable."
          stagger={90}
          duration={650}
          blur={10}
        />
      </p>
      <p className="text-sm text-muted-foreground">
        <TextGenerateEffect
          words="Each word resolves from a soft blur, left to right, on scroll into view."
          stagger={50}
          duration={500}
          blur={6}
        />
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * FlipWords — single word cycles through a list with a 3D flip.
 * ------------------------------------------------------------------ */
export function FlipWordsDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-3 py-14 text-center">
      <p className="text-3xl font-semibold tracking-tight md:text-4xl">
        Build something{" "}
        <FlipWords
          className="font-semibold text-violet-500"
          words={["beautiful", "fast", "modern", "yours"]}
          duration={2200}
        />
      </p>
      <p className="text-sm text-muted-foreground">
        One word, infinite vibes.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Ripple — concentric pulsing rings around a center dot.
 * ------------------------------------------------------------------ */
export function RippleDemo() {
  return (
    <div className="flex h-[320px] w-full items-center justify-center rounded-2xl border border-border/60 bg-slate-950">
      <Ripple
        size={260}
        color="rgb(56, 189, 248)"
        count={4}
        duration={3.2}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * TextScramble — letters cycle then settle on the target text.
 * ------------------------------------------------------------------ */
export function TextScrambleDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-12 text-center">
      <p className="text-3xl font-semibold tracking-tight md:text-4xl">
        <TextScramble text="DECRYPTING SIGNAL" speed={45} loop />
      </p>
      <p className="text-sm text-muted-foreground">
        Hover the badge to re-scramble it.
      </p>
      <span className="rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em]">
        <TextScramble
          text="ACCESS GRANTED"
          speed={30}
          triggerOnHover
          whenInView={false}
        />
      </span>
    </div>
  );
}

// Per-demo photo backdrops — Picsum seeds give stable, varied images that
// upgrade the previously flat SVG-color background to something with real
// light, depth, and atmosphere.
const photoBackdrop = (seed: string): React.CSSProperties => ({
  backgroundImage: `linear-gradient(rgba(2,6,18,0.82), rgba(2,6,18,0.92)), url("https://picsum.photos/seed/${seed}/1200/720")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const STAGE_CLASS =
  "relative flex h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border/60";

// 9 portrait photos used by the image-supporting components below.
const PHOTO_GALLERY = [
  "https://picsum.photos/seed/aurora-tile-1/520/520",
  "https://picsum.photos/seed/aurora-tile-2/520/520",
  "https://picsum.photos/seed/aurora-tile-3/520/520",
  "https://picsum.photos/seed/aurora-tile-4/520/520",
  "https://picsum.photos/seed/aurora-tile-5/520/520",
  "https://picsum.photos/seed/aurora-tile-6/520/520",
  "https://picsum.photos/seed/aurora-tile-7/520/520",
  "https://picsum.photos/seed/aurora-tile-8/520/520",
  "https://picsum.photos/seed/aurora-tile-9/520/520",
];

/* ------------------------------------------------------------------
 * PrismOrb — spectral orb with rotating conic highlights.
 * ------------------------------------------------------------------ */
export function PrismOrbDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("prism-orb-bg")}>
      <PrismOrb size={220}>
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-white/15 shadow-[0_0_30px_rgba(255,255,255,0.45)] backdrop-blur" />
        </div>
      </PrismOrb>
    </div>
  );
}

/* ------------------------------------------------------------------
 * GravityWell — layered depth rings with pulsing motion.
 * ------------------------------------------------------------------ */
export function GravityWellDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("gravity-well-bg")}>
      <GravityWell size={240} depth={8} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * HoloSlices — translucent slices in 3D space, now backed by real photos.
 * ------------------------------------------------------------------ */
export function HoloSlicesDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("holo-slices-bg")}>
      <HoloSlices
        width={320}
        height={210}
        slices={5}
        radius={20}
        images={PHOTO_GALLERY.slice(0, 5)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * NeonPortal — rotating neon ring with pulsing core.
 * ------------------------------------------------------------------ */
export function NeonPortalDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("neon-portal-bg")}>
      <NeonPortal size={220} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * QuantumGrid — 3D pulsing tile grid.
 * ------------------------------------------------------------------ */
export function QuantumGridDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("quantum-grid-bg")}>
      <QuantumGrid size={260} columns={6} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * OrbitStack — stacked orbiting orbs in depth, now showing avatar bubbles.
 * ------------------------------------------------------------------ */
export function OrbitStackDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("orbit-stack-bg")}>
      <OrbitStack
        size={260}
        count={5}
        radius={100}
        orbSize={42}
        images={[
          "https://i.pravatar.cc/120?img=12",
          "https://i.pravatar.cc/120?img=33",
          "https://i.pravatar.cc/120?img=44",
          "https://i.pravatar.cc/120?img=47",
          "https://i.pravatar.cc/120?img=68",
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * PlasmaField — diffused plasma blobs.
 * ------------------------------------------------------------------ */
export function PlasmaFieldDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("plasma-field-bg")}>
      <PlasmaField size={260} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * TiltTiles — interactive 3D tiles, now backed by real photos.
 * ------------------------------------------------------------------ */
export function TiltTilesDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("tilt-tiles-bg")}>
      <TiltTiles
        size={280}
        columns={3}
        gap={10}
        radius={14}
        images={PHOTO_GALLERY}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * FluxPanels — layered translucent panels in 3D space, now real photos.
 * ------------------------------------------------------------------ */
export function FluxPanelsDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("flux-panels-bg")}>
      <FluxPanels
        width={320}
        height={210}
        panels={5}
        radius={18}
        images={PHOTO_GALLERY.slice(2, 7)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * Helix — two-strand DNA helix rotating around its vertical axis.
 * ------------------------------------------------------------------ */
export function HelixDemo() {
  return (
    <div
      className={STAGE_CLASS}
      style={{
        background:
          "radial-gradient(ellipse at center, rgb(13,18,38) 0%, rgb(3,5,14) 75%)",
      }}
    >
      <Helix
        height={300}
        radius={72}
        dotsPerStrand={26}
        twists={2.2}
        duration={9}
        strandColors={["rgb(125, 211, 252)", "rgb(244, 114, 182)"]}
        glow
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * PageCurl — wraps a card whose corner peels up on hover.
 * ------------------------------------------------------------------ */
export function PageCurlDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("page-curl-bg")}>
      <PageCurl
        curlSize={28}
        hoverCurlSize={108}
        radius={18}
        className="h-[260px] w-[380px] border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        <div className="relative h-full w-full overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `url("https://picsum.photos/seed/page-curl-card/640/440")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-75">
              Field notes
            </p>
            <p className="mt-1 text-lg font-semibold leading-tight">
              The cliffs at sunrise
            </p>
            <p className="mt-1 text-sm text-white/80">
              Hover the corner to peel
            </p>
          </div>
        </div>
      </PageCurl>
    </div>
  );
}

/* ------------------------------------------------------------------
 * SwipeStack — drag the top card left or right to dismiss.
 * ------------------------------------------------------------------ */
export function SwipeStackDemo() {
  const items = React.useMemo(
    () => [
      {
        id: 1,
        image: "https://picsum.photos/seed/swipe-1/640/840",
        title: "Aiko Tanaka",
        subtitle: "Photographer · Tokyo",
      },
      {
        id: 2,
        image: "https://picsum.photos/seed/swipe-2/640/840",
        title: "Marcus Lee",
        subtitle: "Architect · Seoul",
      },
      {
        id: 3,
        image: "https://picsum.photos/seed/swipe-3/640/840",
        title: "Sofia Reyes",
        subtitle: "Designer · Lisbon",
      },
      {
        id: 4,
        image: "https://picsum.photos/seed/swipe-4/640/840",
        title: "Noor Hassan",
        subtitle: "Writer · Cairo",
      },
    ],
    []
  );
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("swipe-stack-bg")}>
      <SwipeStack items={items} width={300} height={400} visibleDepth={3} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * MagneticButton — button content tracks the cursor with a soft glow.
 * ------------------------------------------------------------------ */
export function MagneticButtonDemo() {
  return (
    <div className={STAGE_CLASS} style={photoBackdrop("magnetic-button-bg")}>
      <div className="flex items-center gap-4">
        <MagneticButton strength={0.45} maxOffset={20}>
          <Heart className="h-4 w-4" />
          Follow
        </MagneticButton>
        <MagneticButton
          strength={0.35}
          maxOffset={14}
          className="bg-white text-neutral-900 hover:shadow-[0_22px_44px_-12px_rgba(0,0,0,0.45)]"
        >
          <ArrowUpRight className="h-4 w-4" />
          Get started
        </MagneticButton>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * CursorTrail — wrap an area to leave a fading dot trail behind the cursor.
 * ------------------------------------------------------------------ */
export function CursorTrailDemo() {
  return (
    <CursorTrail
      maxDots={26}
      size={22}
      color="rgba(125, 211, 252, 0.85)"
      className={STAGE_CLASS}
      style={photoBackdrop("cursor-trail-bg")}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70">
          Move your cursor
        </p>
        <p className="text-2xl font-semibold text-white">Leave a trace.</p>
      </div>
    </CursorTrail>
  );
}

/* ------------------------------------------------------------------
 * OrbitalMenu — center FAB whose satellites fan out along a half arc.
 * ------------------------------------------------------------------ */
export function OrbitalMenuDemo() {
  return (
    <div className={STAGE_CLASS}>
      <OrbitalMenu
        radius={84}
        arc={180}
        centerAngle={270}
        size={56}
        satelliteSize={42}
        trigger={<Plus className="h-5 w-5" />}
        items={[
          {
            id: "share",
            label: "Share",
            icon: <Share2 className="h-4 w-4" />,
          },
          {
            id: "send",
            label: "Send",
            icon: <Send className="h-4 w-4" />,
          },
          {
            id: "image",
            label: "Add image",
            icon: <ImageIcon className="h-4 w-4" />,
          },
          {
            id: "music",
            label: "Add audio",
            icon: <Music className="h-4 w-4" />,
          },
          {
            id: "love",
            label: "Like",
            icon: <Heart className="h-4 w-4" />,
          },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * WaveGrid — click anywhere on the grid to fire a 3D ripple.
 * ------------------------------------------------------------------ */
export function WaveGridDemo() {
  return (
    <div
      className={STAGE_CLASS}
      style={{
        background:
          "radial-gradient(ellipse at center, rgb(8,12,28) 0%, rgb(2,4,12) 80%)",
      }}
    >
      <WaveGrid
        columns={28}
        rows={16}
        dotSize={5}
        dotColor="rgb(125, 211, 252)"
        amplitude={32}
        className="absolute inset-0"
      />
      <div className="pointer-events-none relative flex flex-col items-center text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/70">
          Click anywhere
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * MagicLayer — hover to separate a stack of photo layers in 3D space.
 * ------------------------------------------------------------------ */
export function MagicLayerDemo() {
  const layers = [
    "https://picsum.photos/seed/magic-bg/720/480",
    "https://picsum.photos/seed/magic-mid/720/480",
    "https://picsum.photos/seed/magic-fg/720/480",
  ];
  return (
    <div className={STAGE_CLASS}>
      <MagicLayer
        width={360}
        height={230}
        spacing={48}
        tilt={12}
        radius={20}
        layers={layers.map((src, i) => (
          <div
            key={i}
            className="relative h-full w-full"
            style={{
              backgroundImage: `url("${src}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  i === layers.length - 1
                    ? "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)"
                    : "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)",
              }}
            />
            {i === layers.length - 1 ? (
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-75">
                  Layer
                </p>
                <p className="text-base font-semibold">Hover to peek</p>
              </div>
            ) : null}
          </div>
        ))}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * PaperPlane — a paper plane looping along a curved offset-path.
 * ------------------------------------------------------------------ */
export function PaperPlaneDemo() {
  return (
    <div
      className={STAGE_CLASS}
      style={{
        background:
          "linear-gradient(180deg, rgb(11,18,40) 0%, rgb(3,6,18) 100%)",
      }}
    >
      <PaperPlane
        width={460}
        height={250}
        duration={8}
        size={30}
        color="rgb(125, 211, 252)"
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * CoinFlip — click the coin to flip it; heads/tails shown on either face.
 * ------------------------------------------------------------------ */
export function CoinFlipDemo() {
  // Shared metallic gold gradient used as the "metal" of the coin face.
  const goldFace =
    "radial-gradient(circle at 32% 28%, rgb(254,243,199) 0%, rgb(234,179,8) 38%, rgb(161,98,7) 78%, rgb(101,67,8) 100%)";
  // Embossed text style: stacked text-shadows give the look of the letters
  // being struck into the metal — bright top edge + dark drop below.
  const emboss: React.CSSProperties = {
    color: "rgba(101, 67, 8, 0.85)",
    textShadow:
      "0 1px 0 rgba(255,240,180,0.85), 0 -1px 0 rgba(80,50,8,0.6), 0 2px 4px rgba(0,0,0,0.45)",
  };
  return (
    <div className={STAGE_CLASS}>
      <CoinFlip
        size={170}
        thickness={10}
        duration={0.8}
        heads={
          <div
            className="relative flex h-full w-full items-center justify-center"
            style={{ background: goldFace }}
          >
            {/* Inner concentric ring — looks like the milled border on a coin */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-3 rounded-full"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(101,67,8,0.4), inset 0 0 0 2px rgba(255,240,180,0.25)",
              }}
            />
            <span
              className="font-serif text-[44px] font-black leading-none tracking-tight"
              style={emboss}
            >
              C
            </span>
          </div>
        }
        tails={
          <div
            className="relative flex h-full w-full items-center justify-center"
            style={{ background: goldFace }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-3 rounded-full"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(101,67,8,0.4), inset 0 0 0 2px rgba(255,240,180,0.25)",
              }}
            />
            <span className="text-[44px] leading-none" style={emboss}>
              ★
            </span>
          </div>
        }
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * FoldOut — click the cover to swing the doors open.
 * ------------------------------------------------------------------ */
export function FoldOutDemo() {
  return (
    <div className={STAGE_CLASS}>
      <FoldOut
        width={360}
        height={220}
        radius={20}
        cover={
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              backgroundImage: `url("https://picsum.photos/seed/fold-cover/720/440")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">
                Field journal
              </p>
              <p className="mt-1 text-lg font-semibold leading-tight">
                Open me
              </p>
            </div>
          </div>
        }
        reveal={
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 text-center text-white">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">
              Inside
            </p>
            <p className="mt-2 text-2xl font-semibold leading-tight">
              Welcome.
            </p>
            <p className="mt-2 max-w-[260px] text-sm text-white/70">
              Click the cover again to fold it shut.
            </p>
          </div>
        }
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * PinBoard — drag the cards anywhere within the canvas.
 * ------------------------------------------------------------------ */
export function PinBoardDemo() {
  const items = React.useMemo(
    () => [
      {
        id: "todo",
        x: 30,
        y: 32,
        width: 168,
        rotate: -3,
        content: (
          <div className="p-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
              Today
            </p>
            <p className="mt-1 text-sm font-semibold">Ship 3D drop</p>
            <p className="mt-2 text-xs text-white/70">
              Wire up new components end to end.
            </p>
          </div>
        ),
      },
      {
        id: "photo",
        x: 220,
        y: 24,
        width: 156,
        rotate: 4,
        content: (
          <div className="overflow-hidden rounded-xl">
            <div
              className="h-24 w-full"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/pin-photo/520/320")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p className="px-3 py-2 text-xs text-white/80">Tokyo, last spring</p>
          </div>
        ),
      },
      {
        id: "quote",
        x: 60,
        y: 200,
        width: 200,
        rotate: 2,
        content: (
          <div className="p-4">
            <p className="text-sm italic text-white/85">
              &quot;Make it tactile, then make it fast.&quot;
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/50">
              Note to self
            </p>
          </div>
        ),
      },
      {
        id: "track",
        x: 380,
        y: 180,
        width: 168,
        rotate: -5,
        content: (
          <div className="flex items-center gap-3 p-3">
            <div
              className="h-10 w-10 shrink-0 rounded-md bg-gradient-to-br from-fuchsia-500 to-sky-500"
              aria-hidden
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Sundance</p>
              <p className="truncate text-[11px] text-white/60">
                Winter Tapes
              </p>
            </div>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div className={STAGE_CLASS} style={{ background: "rgb(13,15,24)" }}>
      <PinBoard
        items={items}
        width={620}
        height={300}
        pinColor="rgb(244, 114, 182)"
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * GlitchClip — hover the headline to split it into glitched slices.
 * ------------------------------------------------------------------ */
export function GlitchClipDemo() {
  return (
    <div
      className={STAGE_CLASS}
      style={{
        background:
          "radial-gradient(ellipse at center, rgb(13,16,28) 0%, rgb(3,5,14) 75%)",
      }}
    >
      <GlitchClip slices={14} intensity={16}>
        <div className="flex flex-col items-center gap-2 px-10 py-8 text-white">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/60">
            Hover to glitch
          </p>
          <p className="text-5xl font-bold tracking-tight">SIGNAL</p>
          <p className="text-xs text-white/55">
            Pure clip-path, no filters.
          </p>
        </div>
      </GlitchClip>
    </div>
  );
}

/* ------------------------------------------------------------------
 * PhoneMockup — phone frame mockup with a fake mobile-app screen.
 * ------------------------------------------------------------------ */
export function PhoneMockupDemo() {
  const ICON = 22; // px size of the lucide glyph inside each app tile
  // Apple-style colors (lifted from real iOS app icons) so the home screen
  // reads as authentic at first glance.
  const apps: Array<{
    name: string;
    bg: string;
    icon?: React.ReactNode;
    custom?: React.ReactNode;
  }> = [
    {
      name: "Calendar",
      bg: "white",
      custom: (
        <div className="flex h-full w-full flex-col overflow-hidden">
          <div className="h-1.5 bg-rose-600" />
          <div className="flex flex-1 items-center justify-center text-[18px] font-bold leading-none text-black">
            4
          </div>
        </div>
      ),
    },
    {
      name: "Camera",
      bg: "linear-gradient(180deg, rgb(60,60,60), rgb(20,20,20))",
      icon: <Camera size={ICON} color="white" strokeWidth={2.2} />,
    },
    {
      name: "Photos",
      bg: "conic-gradient(from 90deg at 50% 50%, rgb(245,158,11), rgb(34,197,94), rgb(56,189,248), rgb(168,85,247), rgb(244,63,94), rgb(245,158,11))",
      custom: (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="block h-6 w-6 rounded-full bg-white"
            aria-hidden
          />
        </div>
      ),
    },
    {
      name: "Maps",
      bg: "linear-gradient(180deg, rgb(228, 232, 220), rgb(195, 215, 195))",
      icon: <MapIcon size={ICON} color="rgb(220,38,38)" strokeWidth={2} />,
    },
    {
      name: "Notes",
      bg: "linear-gradient(180deg, rgb(255, 255, 255), rgb(254, 240, 138))",
      icon: <FileText size={ICON} color="rgb(202,138,4)" strokeWidth={2} />,
    },
    {
      name: "Reminders",
      bg: "white",
      icon: <Bell size={ICON} color="rgb(244,63,94)" strokeWidth={2.2} />,
    },
    {
      name: "Music",
      bg: "linear-gradient(180deg, rgb(252,165,165), rgb(225, 29, 72))",
      icon: <Music size={ICON} color="white" strokeWidth={2.4} />,
    },
    {
      name: "Podcasts",
      bg: "linear-gradient(180deg, rgb(216,180,254), rgb(124,58,237))",
      icon: <Headphones size={ICON} color="white" strokeWidth={2.2} />,
    },
    {
      name: "Weather",
      bg: "linear-gradient(180deg, rgb(56,189,248), rgb(37,99,235))",
      icon: <Sun size={ICON} color="white" strokeWidth={2.2} />,
    },
    {
      name: "Clock",
      bg: "rgb(0,0,0)",
      custom: (
        <div className="flex h-full w-full items-center justify-center">
          <ClockIcon size={ICON + 6} color="white" strokeWidth={1.6} />
        </div>
      ),
    },
    {
      name: "Wallet",
      bg: "linear-gradient(180deg, rgb(38,38,38), rgb(0,0,0))",
      icon: <CreditCard size={ICON} color="white" strokeWidth={2} />,
    },
    {
      name: "Health",
      bg: "white",
      icon: <Heart size={ICON} color="rgb(239,68,68)" fill="rgb(239,68,68)" />,
    },
    {
      name: "Stocks",
      bg: "rgb(0,0,0)",
      icon: <TrendingUp size={ICON} color="rgb(34,197,94)" strokeWidth={2.4} />,
    },
    {
      name: "Settings",
      bg: "linear-gradient(180deg, rgb(229,231,235), rgb(156,163,175))",
      icon: <Settings size={ICON} color="rgb(75,85,99)" strokeWidth={2} />,
    },
    {
      name: "Find My",
      bg: "linear-gradient(180deg, rgb(167,243,208), rgb(34,197,94))",
      icon: <Compass size={ICON} color="white" strokeWidth={2.2} />,
    },
    {
      name: "App Store",
      bg: "linear-gradient(180deg, rgb(125,211,252), rgb(37,99,235))",
      icon: <ShoppingBag size={ICON} color="white" strokeWidth={2.2} />,
    },
  ];

  const dock = [
    {
      name: "Phone",
      bg: "linear-gradient(180deg, rgb(74,222,128), rgb(22,163,74))",
      icon: <Phone size={22} color="white" strokeWidth={2.4} fill="white" />,
    },
    {
      name: "Safari",
      bg: "linear-gradient(180deg, rgb(255,255,255), rgb(186,230,253))",
      icon: <Compass size={24} color="rgb(37,99,235)" strokeWidth={2} />,
    },
    {
      name: "Messages",
      bg: "linear-gradient(180deg, rgb(74,222,128), rgb(22,163,74))",
      icon: (
        <MessageCircle
          size={22}
          color="white"
          strokeWidth={2.2}
          fill="white"
        />
      ),
    },
    {
      name: "Mail",
      bg: "linear-gradient(180deg, rgb(125,211,252), rgb(37,99,235))",
      icon: <Mail size={22} color="white" strokeWidth={2.4} />,
    },
  ];

  return (
    <div className="flex w-full items-center justify-center py-10">
      <PhoneMockup width={300} tilt={false}>
        {/* Wallpaper — abstract iOS-style bokeh gradient */}
        <div
          className="relative h-full w-full overflow-hidden text-white"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgb(56,72,180) 0%, transparent 55%), radial-gradient(circle at 80% 75%, rgb(199,77,151) 0%, transparent 55%), radial-gradient(circle at 50% 100%, rgb(255,140,80) 0%, transparent 50%), linear-gradient(180deg, rgb(11,15,40) 0%, rgb(2,4,18) 100%)",
          }}
        >
          {/* Status bar — flanks the dynamic island */}
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-2 text-[11px] font-semibold">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="flex items-end gap-[1.5px]">
                {[3, 5, 7, 9].map((h) => (
                  <span
                    key={h}
                    className="block w-[2.5px] rounded-sm bg-white"
                    style={{ height: h }}
                  />
                ))}
              </span>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                width={12}
                height={12}
                fill="white"
              >
                <path d="M12 5c4.4 0 8.4 1.6 11.5 4.3l-2.1 2.6C18.6 9.5 15.4 8 12 8s-6.6 1.5-9.4 3.9L0.5 9.3C3.6 6.6 7.6 5 12 5zm0 5c2.7 0 5.2 1 7.1 2.7l-2.1 2.6c-1.4-1.2-3.1-1.9-5-1.9s-3.6.7-5 1.9l-2.1-2.6C6.8 11 9.3 10 12 10zm0 5c1.1 0 2.1.4 2.9 1.1L12 19l-2.9-2.9C9.9 15.4 10.9 15 12 15z" />
              </svg>
              <span className="relative flex items-center">
                <span className="block h-[10px] w-[18px] rounded-[3px] border border-white/85">
                  <span className="block h-full w-[80%] rounded-[1.5px] bg-white" />
                </span>
                <span className="absolute -right-[2px] top-[3.5px] block h-[3px] w-[1.5px] rounded-r-sm bg-white/85" />
              </span>
            </div>
          </div>

          {/* App grid — 4 columns × 4 rows */}
          <div className="grid grid-cols-4 gap-x-3 gap-y-4 px-5 pt-12">
            {apps.map((app) => (
              <div
                key={app.name}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center overflow-hidden shadow-[0_4px_8px_-2px_rgba(0,0,0,0.35)]"
                  style={{
                    background: app.bg,
                    borderRadius: 12,
                  }}
                >
                  {app.custom ?? app.icon}
                </div>
                <span className="truncate text-[9.5px] font-medium leading-tight text-white drop-shadow-sm">
                  {app.name}
                </span>
              </div>
            ))}
          </div>

          {/* Page indicator dots */}
          <div className="absolute inset-x-0 bottom-[68px] flex justify-center gap-1.5">
            <span className="block h-[5px] w-[5px] rounded-full bg-white" />
            <span className="block h-[5px] w-[5px] rounded-full bg-white/40" />
            <span className="block h-[5px] w-[5px] rounded-full bg-white/40" />
          </div>

          {/* Dock — translucent rounded capsule with 4 pinned apps */}
          <div className="absolute inset-x-3 bottom-5 flex items-center justify-around rounded-[26px] bg-white/15 px-3 py-2.5 backdrop-blur-md">
            {dock.map((app) => (
              <div
                key={app.name}
                className="flex h-12 w-12 items-center justify-center overflow-hidden shadow-[0_4px_10px_-2px_rgba(0,0,0,0.45)]"
                style={{
                  background: app.bg,
                  borderRadius: 12,
                }}
              >
                {app.icon}
              </div>
            ))}
          </div>

          {/* Home indicator */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-1.5 mx-auto block h-1 w-28 rounded-full bg-white/85"
          />
        </div>
      </PhoneMockup>
    </div>
  );
}

/* ------------------------------------------------------------------
 * PricingCards — three tiers with the middle one elevated as featured.
 * ------------------------------------------------------------------ */
export function PricingCardsDemo() {
  return (
    <div
      className="relative flex h-[520px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border/60 px-4"
      style={{
        background:
          "radial-gradient(ellipse at top, rgb(13,18,38) 0%, rgb(3,5,14) 75%)",
      }}
    >
      <PricingCards
        cardWidth={200}
        className="!flex-nowrap !gap-3"
        tiers={[
          {
            id: "starter",
            name: "Starter",
            tagline: "For side projects",
            price: 0,
            features: ["1 project", "100 MB storage", "Community support"],
            ctaLabel: "Start free",
          },
          {
            id: "pro",
            name: "Pro",
            tagline: "For growing teams",
            price: 19,
            features: [
              "Unlimited projects",
              "10 GB storage",
              "Priority support",
              "Custom domain",
            ],
            featured: true,
            badge: "Popular",
            ctaLabel: "Upgrade to Pro",
          },
          {
            id: "scale",
            name: "Scale",
            tagline: "For larger orgs",
            price: null,
            features: [
              "SSO & SAML",
              "Audit log",
              "Dedicated success manager",
              "99.99% SLA",
            ],
          },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * LogoCloud — auto-scrolling marquee of fake brand wordmarks.
 * ------------------------------------------------------------------ */
export function LogoCloudDemo() {
  const wordmarks = [
    "Acme Corp",
    "Northwind",
    "Globex",
    "Initech",
    "Soylent",
    "Umbrella",
    "Wayne",
    "Stark",
  ];
  return (
    <div className={STAGE_CLASS}>
      <LogoCloud
        duration={26}
        gap={48}
        className="py-8"
        logos={wordmarks.map((name) => (
          <span
            key={name}
            className="select-none whitespace-nowrap font-serif text-2xl font-semibold tracking-tight text-foreground/80"
          >
            {name}
          </span>
        ))}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * TestimonialQuote — quote card with avatar, name, role, and source logo.
 * ------------------------------------------------------------------ */
export function TestimonialQuoteDemo() {
  return (
    <div className={STAGE_CLASS}>
      <TestimonialQuote
        width={400}
        quote={
          <>
            CraftUI shipped us a dashboard our customers actually use. The
            components feel tactile in a way most libraries don&apos;t —
            we&apos;ve had three users specifically call out the polish.
          </>
        }
        author={{
          name: "Aiko Tanaka",
          role: "Head of Design, Northwind",
          avatar: "https://i.pravatar.cc/120?img=47",
          logo: (
            <span className="text-xs font-semibold tracking-tight">
              Northwind
            </span>
          ),
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * StatCard — three metric cards with count-up + trend + sparkline.
 * ------------------------------------------------------------------ */
export function StatCardDemo() {
  return (
    <div className="relative flex w-full items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-[820px] grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Monthly active users"
          value={48200}
          suffix="+"
          change={12.4}
          accent="rgb(125, 211, 252)"
          sparkline={[8, 12, 10, 16, 14, 22, 26, 24, 32, 38, 34, 48]}
        />
        <StatCard
          label="Annual revenue"
          value={1.42}
          prefix="$"
          suffix="M"
          decimals={2}
          change={28.7}
          accent="rgb(74, 222, 128)"
          sparkline={[1.0, 1.05, 1.08, 1.04, 1.12, 1.22, 1.28, 1.35, 1.4, 1.42]}
        />
        <StatCard
          label="Churn rate"
          value={1.8}
          suffix="%"
          decimals={1}
          change={-3.2}
          accent="rgb(244, 114, 182)"
          sparkline={[3.4, 3.1, 2.9, 3.0, 2.6, 2.4, 2.2, 2.1, 1.9, 1.8]}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * AnimatedChart — area chart that draws itself on view.
 * ------------------------------------------------------------------ */
export function AnimatedChartDemo() {
  const series = [
    12, 18, 16, 22, 26, 24, 32, 30, 36, 42, 38, 46, 50, 48, 56, 60, 58, 66, 72,
    78,
  ];
  return (
    <div className="relative flex w-full items-center justify-center px-6 py-10">
      <div className="w-full max-w-[520px] rounded-2xl border border-white/10 bg-neutral-950 p-5 text-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.55)]">
        <div className="mb-3 flex items-baseline justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-white/55">
              Active sessions
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              12,840
              <span className="ml-2 text-sm font-medium text-emerald-400">
                +18%
              </span>
            </p>
          </div>
          <div className="flex gap-1.5">
            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-white/70">
              7d
            </span>
            <span className="rounded-md bg-white/15 px-2 py-1 text-[10px] font-semibold">
              30d
            </span>
          </div>
        </div>
        <AnimatedChart
          data={series}
          variant="area"
          color="rgb(125, 211, 252)"
          width={460}
          height={180}
          className="!w-full"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * FeatureCard — three feature blocks with gradient icon tiles.
 * ------------------------------------------------------------------ */
export function FeatureCardDemo() {
  const features = [
    {
      title: "Lightning-fast deploys",
      description:
        "Push to main and ship to global edge in under 30 seconds. Zero config.",
      icon: <Zap className="h-5 w-5" />,
      bg: "linear-gradient(135deg, rgb(250, 204, 21) 0%, rgb(234, 88, 12) 100%)",
    },
    {
      title: "End-to-end encryption",
      description:
        "All data is encrypted at rest and in transit with rotating keys.",
      icon: <Sparkles className="h-5 w-5" />,
      bg: "linear-gradient(135deg, rgb(125, 211, 252) 0%, rgb(99, 102, 241) 100%)",
    },
    {
      title: "Built for teams",
      description:
        "SSO, audit log, and granular permissions out of the box.",
      icon: <Crown className="h-5 w-5" />,
      bg: "linear-gradient(135deg, rgb(244, 114, 182) 0%, rgb(168, 85, 247) 100%)",
    },
  ];
  return (
    <div className="relative flex w-full items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-[640px] grid-cols-1 gap-3 sm:grid-cols-3">
        {features.map((f) => (
          <FeatureCard
            key={f.title}
            icon={f.icon}
            title={f.title}
            description={f.description}
            iconBackground={f.bg}
          />
        ))}
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------
 * NotificationStack — auto-cycling iOS-style push notifications.
 * ------------------------------------------------------------------ */
export function NotificationStackDemo() {
  const notifications = [
    {
      id: 1,
      icon: <MessageCircle className="h-4 w-4" fill="white" />,
      iconBackground:
        "linear-gradient(135deg, rgb(74, 222, 128), rgb(22, 163, 74))",
      source: "Messages",
      message: "Aiko: Sent the new design over",
      time: "now",
    },
    {
      id: 2,
      icon: <Heart className="h-4 w-4" fill="white" />,
      iconBackground:
        "linear-gradient(135deg, rgb(244, 114, 182), rgb(225, 29, 72))",
      source: "Health",
      message: "You hit your daily move goal.",
      time: "2m",
    },
    {
      id: 3,
      icon: <Mail className="h-4 w-4" />,
      iconBackground:
        "linear-gradient(135deg, rgb(125, 211, 252), rgb(37, 99, 235))",
      source: "Mail",
      message: "Stripe — Payout sent: $12,840.00",
      time: "5m",
    },
    {
      id: 4,
      icon: <Sparkles className="h-4 w-4" />,
      iconBackground:
        "linear-gradient(135deg, rgb(250, 204, 21), rgb(234, 88, 12))",
      source: "CraftUI",
      message: "New release v0.9.0 — 24 components added.",
      time: "8m",
    },
  ];
  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-border/60 px-6 py-10"
      style={{
        background:
          "radial-gradient(ellipse at center, rgb(13,18,38) 0%, rgb(3,5,14) 75%)",
      }}
    >
      <NotificationStack
        notifications={notifications}
        width={340}
        visible={3}
        interval={2.4}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * CopyButton — three variants: icon-only, with label, larger.
 * ------------------------------------------------------------------ */
export function CopyButtonDemo() {
  return (
    <div className="flex w-full items-center justify-center gap-4 px-6 py-12">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 font-mono text-xs text-white/85">
        <span className="opacity-70">$</span>
        <span>npx craftui add button</span>
        <CopyButton value="npx craftui add button" />
      </div>
      <CopyButton value="hello@craftui.dev" label="Email" />
      <CopyButton value="0xC0FFEE..." size={44} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * CountUpRing — three rings with different fills.
 * ------------------------------------------------------------------ */
export function CountUpRingDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-12 px-6 py-12">
      <div className="flex flex-col items-center gap-2">
        <CountUpRing
          value={87}
          suffix="%"
          color="rgb(125, 211, 252)"
          size={140}
        />
        <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
          Storage used
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CountUpRing
          value={4.9}
          max={5}
          decimals={1}
          color="rgb(74, 222, 128)"
          size={140}
        />
        <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
          Avg rating
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CountUpRing
          value={42}
          max={60}
          color="rgb(244, 114, 182)"
          size={140}
          label={
            <div className="text-center">
              <p className="text-2xl font-bold leading-none tabular-nums text-foreground">
                42
              </p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/55">
                of 60
              </p>
            </div>
          }
        />
        <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
          Tasks done
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * DotProgress — interactive stepped indicator.
 * ------------------------------------------------------------------ */
export function DotProgressDemo() {
  const [step, setStep] = React.useState(2);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12">
      <div className="rounded-2xl border border-white/10 bg-neutral-950 px-8 py-6 text-center text-white">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Step {step + 1} of 5
        </p>
        <p className="mt-1.5 text-base font-semibold leading-tight">
          {[
            "Welcome to CraftUI",
            "Install the CLI",
            "Add your first component",
            "Customize the theme",
            "You're all set.",
          ][step]}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-40"
            disabled={step === 0}
          >
            Back
          </button>
          <DotProgress
            steps={5}
            current={step}
            color="rgb(125, 211, 252)"
            onStepClick={setStep}
          />
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(4, s + 1))}
            className="rounded-md bg-sky-400 px-3 py-1.5 text-xs font-semibold text-neutral-950 transition-shadow hover:shadow-[0_12px_28px_-10px_rgba(56,189,248,0.6)] disabled:opacity-40"
            disabled={step === 4}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * ThemeToggle — sun/moon morph button at three sizes.
 * ------------------------------------------------------------------ */
export function ThemeToggleDemo() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12">
      <div className="flex items-center gap-6">
        <ThemeToggle size={32} theme={theme} onChange={setTheme} />
        <ThemeToggle size={44} theme={theme} onChange={setTheme} />
        <ThemeToggle size={64} theme={theme} onChange={setTheme} />
      </div>
      <p className="text-xs font-medium uppercase tracking-wider text-foreground/55">
        Currently: {theme}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * NumberFlip — odometer-style display. Increment to see digits flip.
 * ------------------------------------------------------------------ */
export function NumberFlipDemo() {
  const [value, setValue] = React.useState(48267);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12">
      <NumberFlip value={value} digits={6} size={56} />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() =>
            setValue((v) => Math.max(0, v - Math.floor(Math.random() * 50 + 10)))
          }
          className="inline-flex h-9 items-center rounded-md border border-foreground/15 bg-foreground/5 px-3.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/10"
        >
          − Decrement
        </button>
        <button
          type="button"
          onClick={() =>
            setValue((v) => v + Math.floor(Math.random() * 50 + 10))
          }
          className="inline-flex h-9 items-center rounded-md bg-sky-400 px-3.5 text-xs font-semibold text-neutral-950 transition-shadow hover:shadow-[0_12px_28px_-10px_rgba(56,189,248,0.6)]"
        >
          + Increment
        </button>
        <button
          type="button"
          onClick={() => setValue(Math.floor(Math.random() * 999999))}
          className="inline-flex h-9 items-center rounded-md border border-foreground/15 bg-foreground/5 px-3.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/10"
        >
          Randomize
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * HoldToConfirm — three variants for safety-critical actions.
 * ------------------------------------------------------------------ */
export function HoldToConfirmDemo() {
  const [confirmed, setConfirmed] = React.useState<string | null>(null);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <HoldToConfirm
          variant="danger"
          duration={1200}
          onConfirm={() => setConfirmed("Account deleted")}
        >
          Delete account
        </HoldToConfirm>
        <HoldToConfirm
          variant="primary"
          duration={900}
          color="rgb(56, 189, 248)"
          onConfirm={() => setConfirmed("Deployment shipped")}
        >
          Deploy to production
        </HoldToConfirm>
        <HoldToConfirm
          variant="subtle"
          duration={1400}
          color="rgb(168, 85, 247)"
          onConfirm={() => setConfirmed("Workspace archived")}
        >
          Archive workspace
        </HoldToConfirm>
      </div>
      <p className="h-4 text-xs font-medium uppercase tracking-wider text-foreground/55">
        {confirmed ?? "Hold any button to confirm"}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * VoteWidget — vertical (Reddit-style) and horizontal (HN-style).
 * ------------------------------------------------------------------ */
export function VoteWidgetDemo() {
  return (
    <div className="flex w-full flex-wrap items-stretch justify-center gap-6 px-6 py-12">
      {/* Vertical card */}
      <div className="flex w-[320px] gap-3 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4">
        <VoteWidget count={1284} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            Show HN: We rebuilt our docs in a weekend
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-foreground/65">
            Hot take — the bottleneck was content, not the framework. Here&apos;s
            what we ripped out and what stuck.
          </p>
          <p className="mt-2 text-[11px] text-foreground/50">
            Posted by craftui · 4 hours ago
          </p>
        </div>
      </div>
      {/* Horizontal */}
      <div className="flex w-[320px] flex-col gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4">
        <p className="text-sm font-semibold text-foreground">
          Add a roadmap section
        </p>
        <p className="text-xs text-foreground/65">
          Help users see what&apos;s shipping next.
        </p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[11px] text-foreground/50">12 comments</span>
          <VoteWidget count={42} orientation="horizontal" defaultVote="up" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * SegmentedControl — three variants: view mode, time range, size demo.
 * ------------------------------------------------------------------ */
export function SegmentedControlDemo() {
  const [view, setView] = React.useState<"grid" | "list" | "kanban">("grid");
  const [range, setRange] = React.useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [size, setSize] = React.useState<"sm" | "md" | "lg">("md");
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-6 py-12">
      <SegmentedControl
        size="md"
        value={view}
        onChange={setView}
        segments={[
          {
            value: "grid",
            label: "Grid",
            icon: (
              <svg
                viewBox="0 0 24 24"
                width={14}
                height={14}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            ),
          },
          {
            value: "list",
            label: "List",
            icon: (
              <svg
                viewBox="0 0 24 24"
                width={14}
                height={14}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <circle cx="4" cy="6" r="1" />
                <circle cx="4" cy="12" r="1" />
                <circle cx="4" cy="18" r="1" />
              </svg>
            ),
          },
          {
            value: "kanban",
            label: "Kanban",
            icon: (
              <svg
                viewBox="0 0 24 24"
                width={14}
                height={14}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="3" y="4" width="5" height="16" rx="1" />
                <rect x="9.5" y="4" width="5" height="11" rx="1" />
                <rect x="16" y="4" width="5" height="14" rx="1" />
              </svg>
            ),
          },
        ]}
      />
      <SegmentedControl
        size="sm"
        value={range}
        onChange={setRange}
        segments={[
          { value: "7d", label: "7d" },
          { value: "30d", label: "30d" },
          { value: "90d", label: "90d" },
          { value: "1y", label: "1y" },
        ]}
      />
      <SegmentedControl
        size={size}
        value={size}
        onChange={setSize}
        segments={[
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ]}
      />
    </div>
  );
}
