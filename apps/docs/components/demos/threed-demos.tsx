"use client";

import * as React from "react";
import {
  ActivityHeatmap,
  AddressForm,
  AddressFormValue,
  AnimatedBeam,
  AnimatedChart,
  AudioVisualizer,
  AnimatedText,
  AnimatedTooltip,
  ApiKeyDisplay,
  AudioPlayer,
  Aurora,
  AuthCard,
  AuthCardSocial,
  Avatar,
  AvatarFallback,
  AvatarStack,
  BackgroundBeams,
  BackgroundBoxes,
  Badge,
  Banner,
  BentoGrid,
  BentoGridItem,
  Button,
  CardHoverEffect,
  CardStack,
  Carousel3D,
  ChatBubble,
  CodeRain,
  CoinFlip,
  CommentThread,
  CommentThreadNode,
  CookieBanner,
  CookieBannerCategory,
  ColorPicker,
  Confetti,
  type ConfettiHandle,
  Compare,
  ContextMenu,
  ComparisonTable,
  CopyButton,
  CountUpRing,
  CountdownTimer,
  Coverflow,
  Cube,
  CubeFace,
  CubeMatrix,
  CurrencyInput,
  CursorTrail,
  DataTable,
  DateRangePicker,
  DiceRoll,
  DirectionAwareHover,
  DotPattern,
  DotProgress,
  EmojiPicker,
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
  GlassCard,
  GlitchClip,
  Globe,
  GaugeMeter,
  GravityWell,
  HeartbeatMonitor,
  Helix,
  HoldToConfirm,
  HoloCard,
  HoloSlices,
  HoverBorderGradient,
  InfiniteMovingCards,
  InlineEdit,
  InvitePeople,
  Lamp,
  Lens,
  LogoCloud,
  KanbanBoard,
  MagicLayer,
  Magnet,
  MagneticButton,
  MentionInput,
  MeshGradient,
  Marquee3D,
  Meteors,
  MovingBorder,
  MultiStepLoader,
  NeonGlow,
  NeonPortal,
  NotificationBell,
  NotificationBellItem,
  NotificationStack,
  NumberFlip,
  NumberInput,
  NumberTicker,
  OnboardingChecklist,
  OrbitStack,
  OrbitalMenu,
  OrbitingCircles,
  PageCurl,
  PaperPlane,
  Parallax,
  ParallaxLayer,
  PasswordStrengthMeter,
  PaymentCard,
  PerspectiveBox,
  PhoneInput,
  PhoneMockup,
  Pin3D,
  PinBoard,
  PlanCard,
  PlasmaField,
  PortalRings,
  PricingCards,
  PricingSlider,
  PrismOrb,
  QuantumGrid,
  Resizable,
  RetroGrid,
  ReviewCard,
  Ripple,
  ScratchCard,
  ScrollProgress,
  SegmentedControl,
  SignaturePad,
  SignaturePadHandle,
  Sparkles as SparklesFx,
  SparklesText,
  Sparkline,
  SparklineVariant,
  SplitFlap,
  StatCard,
  StatRing,
  StatusDot,
  Spotlight,
  SwipeStack,
  TagInput,
  TaskCard,
  TestimonialQuote,
  ThemeSelector,
  ThemeSelectorValue,
  TextGenerateEffect,
  TextScramble,
  ThemeToggle,
  Tilt,
  TiltTiles,
  TimePicker,
  TwoFactorSetup,
  VideoPlayer,
  VoiceMessage,
  Toolbar,
  ToolbarButton,
  ToolbarToggle,
  ToolbarSeparator,
  ToolbarGroup,
  TracingBeam,
  TreeView,
  UsageBar,
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
 * AvatarStack — overlapping team avatars with a +N overflow chip.
 * ------------------------------------------------------------------ */
export function AvatarStackDemo() {
  const team = [
    { name: "Aiko Tanaka" },
    { name: "Ben Carter" },
    { name: "Chloe Diaz" },
    { name: "Dmitri Volkov" },
    { name: "Elena Rossi" },
    { name: "Farid Hassan" },
    { name: "Grace Kim" },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="flex flex-col items-center gap-3">
        <AvatarStack items={team} max={5} size={40} />
        <p className="text-xs font-medium uppercase tracking-wider text-foreground/55">
          7 collaborators on this project
        </p>
      </div>
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-neutral-950 py-2 pl-2 pr-4 text-white">
        <AvatarStack items={team.slice(0, 4)} max={3} size={30} />
        <span className="text-xs font-medium text-white/70">
          +4 people are viewing
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * ActivityHeatmap — GitHub-style contribution calendar.
 * Data is generated deterministically so server and client agree.
 * ------------------------------------------------------------------ */
export function ActivityHeatmapDemo() {
  const values = React.useMemo(() => {
    const out: { date: string; count: number }[] = [];
    const today = new Date();
    for (let i = 0; i < 182; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
      // Deterministic 0..1 from the day index — stable across renders.
      const seed = Math.sin(i * 12.9898) * 43758.5453;
      const r = seed - Math.floor(seed);
      const dow = d.getDay();
      const weekendDamp = dow === 0 || dow === 6 ? 0.35 : 1;
      const count = r < 0.16 ? 0 : Math.round(r * weekendDamp * 13);
      out.push({ date: iso, count });
    }
    return out;
  }, []);

  return (
    <div className="flex w-full items-center justify-center px-6 py-12">
      <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6">
        <p className="mb-4 text-sm font-semibold text-white">
          1,284 contributions in the last 6 months
        </p>
        <ActivityHeatmap values={values} weeks={26} accent="rgb(74, 222, 128)" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * GaugeMeter — KPI gauges with zoned color ramps.
 * ------------------------------------------------------------------ */
export function GaugeMeterDemo() {
  const greenAmberRed = [
    { stop: 0.6, color: "rgb(74, 222, 128)" },
    { stop: 0.85, color: "rgb(250, 204, 21)" },
    { stop: 1, color: "rgb(248, 113, 113)" },
  ];
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-10 px-6 py-12">
      <div className="rounded-2xl border border-white/10 bg-neutral-950 px-6 pb-4 pt-6">
        <GaugeMeter
          value={99.2}
          min={90}
          max={100}
          decimals={1}
          suffix="%"
          label="API uptime"
          accent="rgb(74, 222, 128)"
        />
      </div>
      <div className="rounded-2xl border border-white/10 bg-neutral-950 px-6 pb-4 pt-6">
        <GaugeMeter
          value={72}
          suffix="%"
          label="CPU load"
          zones={greenAmberRed}
        />
      </div>
      <div className="rounded-2xl border border-white/10 bg-neutral-950 px-6 pb-4 pt-6">
        <GaugeMeter
          value={428}
          max={600}
          suffix=" req/s"
          label="Throughput"
          accent="rgb(125, 211, 252)"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * ChatBubble — a short assistant conversation thread.
 * ------------------------------------------------------------------ */
export function ChatBubbleDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-[420px] flex-col gap-3 rounded-2xl border border-white/10 bg-neutral-950 p-5">
        <ChatBubble variant="incoming" name="Nova" showName>
          Hey! How can I help you ship today?
        </ChatBubble>
        <ChatBubble variant="outgoing" timestamp="9:41 AM" status="read">
          Summarize last week&apos;s signups for me.
        </ChatBubble>
        <ChatBubble variant="incoming" name="Nova">
          You added 1,284 new users — up 18% week over week. Pro conversions led
          the jump.
        </ChatBubble>
        <ChatBubble variant="incoming" name="Nova" typing />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * ComparisonTable — a pricing / feature comparison matrix.
 * ------------------------------------------------------------------ */
export function ComparisonTableDemo() {
  const plans = [
    { id: "starter", name: "Starter", price: "$0", tagline: "For tinkering" },
    {
      id: "pro",
      name: "Pro",
      price: "$29",
      tagline: "Per month",
      highlighted: true,
      cta: (
        <Button size="sm" className="w-full">
          Choose Pro
        </Button>
      ),
    },
    {
      id: "team",
      name: "Team",
      price: "$99",
      tagline: "Per month",
      cta: (
        <Button size="sm" variant="outline" className="w-full">
          Contact us
        </Button>
      ),
    },
  ];
  const features = [
    {
      group: "Core",
      features: [
        {
          label: "Projects",
          values: { starter: "3", pro: "Unlimited", team: "Unlimited" },
        },
        {
          label: "Team members",
          values: { starter: "1", pro: "10", team: "Unlimited" },
        },
        {
          label: "Analytics",
          values: { starter: true, pro: true, team: true },
        },
      ],
    },
    {
      group: "Advanced",
      features: [
        {
          label: "SSO & SAML",
          hint: "SAML 2.0, SCIM provisioning",
          values: { starter: false, pro: false, team: true },
        },
        {
          label: "Audit log",
          values: { starter: false, pro: true, team: true },
        },
        {
          label: "Priority support",
          values: { starter: false, pro: true, team: true },
        },
      ],
    },
  ];
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className="w-full max-w-[640px]">
        <ComparisonTable plans={plans} features={features} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * TagInput — token field with chips, dedup, and email validation.
 * ------------------------------------------------------------------ */
export function TagInputDemo() {
  const [tags, setTags] = React.useState<string[]>([
    "design",
    "react",
    "typescript",
  ]);
  const [emails, setEmails] = React.useState<string[]>(["ada@craftui.dev"]);
  const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12">
      <div className="w-full max-w-sm space-y-1.5">
        <p className="text-xs font-medium text-foreground/60">Topics</p>
        <TagInput value={tags} onChange={setTags} placeholder="Add a topic…" />
      </div>
      <div className="w-full max-w-sm space-y-1.5">
        <p className="text-xs font-medium text-foreground/60">
          Invite by email (validated)
        </p>
        <TagInput
          value={emails}
          onChange={setEmails}
          validate={isEmail}
          placeholder="name@company.com"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * NumberInput — quantity stepper and a currency field.
 * ------------------------------------------------------------------ */
export function NumberInputDemo() {
  const [qty, setQty] = React.useState<number | null>(2);
  const [price, setPrice] = React.useState<number | null>(19.99);
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-8 px-6 py-12">
      <div className="w-40 space-y-1.5">
        <p className="text-xs font-medium text-foreground/60">Quantity</p>
        <NumberInput value={qty} onChange={setQty} min={0} max={99} />
      </div>
      <div className="w-44 space-y-1.5">
        <p className="text-xs font-medium text-foreground/60">Unit price</p>
        <NumberInput
          value={price}
          onChange={setPrice}
          min={0}
          step={0.01}
          prefix="$"
        />
      </div>
      <div className="w-40 space-y-1.5">
        <p className="text-xs font-medium text-foreground/60">Weight</p>
        <NumberInput defaultValue={5} min={0} step={0.5} suffix="kg" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * ScrollProgress — tracks a scrollable container (not the page).
 * ------------------------------------------------------------------ */
export function ScrollProgressDemo() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div
        ref={ref}
        className="relative h-72 w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950 text-white"
      >
        <ScrollProgress target={ref} height={4} showLabel />
        <div className="space-y-4 p-6 pt-8">
          <h3 className="text-lg font-semibold">The making of CraftUI</h3>
          {Array.from({ length: 9 }).map((_, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/65">
              {i + 1}. Scroll this panel — the bar pinned to the top fills to
              match how far you&apos;ve read. ScrollProgress can also track the
              whole page when you omit the target prop. Smooth on every frame,
              and it recalculates when the content or viewport resizes.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Banner — announcement bars in several tones, with reset.
 * ------------------------------------------------------------------ */
export function BannerDemo() {
  const [seed, setSeed] = React.useState(0);
  return (
    <div className="w-full px-6 py-10">
      <div
        key={seed}
        className="mx-auto flex max-w-xl flex-col gap-3 overflow-hidden rounded-2xl border border-white/10"
      >
        <Banner
          variant="promo"
          action={
            <Button size="sm" variant="secondary">
              Upgrade
            </Button>
          }
        >
          <span className="font-medium">CraftUI Pro is here</span> — unlock 40+
          premium blocks.
        </Banner>
        <Banner variant="success">Your changes were published.</Banner>
        <Banner variant="warning">
          Your trial ends in 3 days. Add a payment method to keep access.
        </Banner>
      </div>
      <div className="mt-4 text-center">
        <Button size="sm" variant="outline" onClick={() => setSeed((s) => s + 1)}>
          Reset banners
        </Button>
      </div>
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

/* ------------------------------------------------------------------
 * KanbanBoard — drag cards between columns (uncontrolled).
 * ------------------------------------------------------------------ */
export function KanbanBoardDemo() {
  return (
    <div className="w-full px-6 py-10">
      <KanbanBoard
        columns={[
          { id: "todo", title: "To do", accent: "rgb(148, 163, 184)" },
          { id: "doing", title: "In progress", accent: "rgb(125, 211, 252)" },
          { id: "done", title: "Done", accent: "rgb(74, 222, 128)" },
        ]}
        defaultValue={{
          todo: [
            {
              id: "1",
              title: "Audit onboarding flow",
              tags: ["UX"],
              assignee: "AL",
            },
            {
              id: "2",
              title: "Draft Q3 roadmap",
              description: "Share with team leads",
              tags: ["Planning"],
            },
          ],
          doing: [
            {
              id: "3",
              title: "Build billing webhook",
              tags: ["API"],
              assignee: "JM",
            },
          ],
          done: [
            { id: "4", title: "Ship dark mode", tags: ["UI"], assignee: "RK" },
            { id: "5", title: "Fix CSV export", tags: ["Bug"] },
          ],
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * TreeView — a file explorer with selection.
 * ------------------------------------------------------------------ */
export function TreeViewDemo() {
  const [selected, setSelected] = React.useState("button.tsx");
  return (
    <div className="flex w-full justify-center px-6 py-10">
      <TreeView
        className="w-72"
        defaultExpanded={["src", "components", "ui"]}
        selectedId={selected}
        onSelect={(id) => setSelected(id)}
        data={[
          {
            id: "src",
            label: "src",
            children: [
              {
                id: "components",
                label: "components",
                children: [
                  {
                    id: "ui",
                    label: "ui",
                    children: [
                      { id: "button.tsx", label: "button.tsx" },
                      { id: "card.tsx", label: "card.tsx" },
                      { id: "tree-view.tsx", label: "tree-view.tsx" },
                    ],
                  },
                ],
              },
              { id: "app.tsx", label: "app.tsx" },
            ],
          },
          {
            id: "lib",
            label: "lib",
            children: [
              { id: "cn.ts", label: "cn.ts" },
              { id: "utils.ts", label: "utils.ts" },
            ],
          },
          { id: "package.json", label: "package.json" },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * ColorPicker — HSV picker driving a live preview.
 * ------------------------------------------------------------------ */
export function ColorPickerDemo() {
  const [color, setColor] = React.useState("#7dd3fc");
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-6 py-10">
      <div
        className="flex h-16 w-48 items-center justify-center rounded-xl border border-white/10 font-mono text-sm font-medium"
        style={{ backgroundColor: color, color: "#0a0a0a" }}
      >
        {color.toUpperCase()}
      </div>
      <ColorPicker value={color} onChange={setColor} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * Resizable — drag the divider between two panels.
 * ------------------------------------------------------------------ */
export function ResizableDemo() {
  return (
    <div className="w-full px-6 py-10">
      <Resizable
        defaultSize={38}
        min={20}
        max={75}
        className="mx-auto h-64 max-w-2xl"
      >
        <div className="flex h-full flex-col gap-2 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
            Files
          </p>
          {["index.tsx", "styles.css", "config.ts"].map((f) => (
            <div
              key={f}
              className="rounded-md bg-white/[0.04] px-3 py-2 text-sm text-white/75"
            >
              {f}
            </div>
          ))}
        </div>
        <div className="flex h-full flex-col p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
            Editor
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Drag the divider to resize the panels — or focus it and use the
            arrow keys. Double-click to reset. Resizable works for horizontal or
            vertical splits and stays dependency-free.
          </p>
        </div>
      </Resizable>
    </div>
  );
}

/* ------------------------------------------------------------------
 * DataTable — sortable, paginated, selectable rows.
 * ------------------------------------------------------------------ */
type DataTableRow = {
  id: string;
  name: string;
  role: string;
  mrr: number;
  status: "Active" | "Trial" | "Churned";
};

const DATA_TABLE_ROWS: DataTableRow[] = [
  { id: "1", name: "Ada Lovelace", role: "Owner", mrr: 4200, status: "Active" },
  { id: "2", name: "Grace Hopper", role: "Admin", mrr: 2800, status: "Active" },
  { id: "3", name: "Alan Turing", role: "Member", mrr: 990, status: "Trial" },
  { id: "4", name: "Katherine Johnson", role: "Member", mrr: 1500, status: "Active" },
  { id: "5", name: "Linus Torvalds", role: "Admin", mrr: 0, status: "Churned" },
  { id: "6", name: "Margaret Hamilton", role: "Member", mrr: 3100, status: "Active" },
  { id: "7", name: "Dennis Ritchie", role: "Member", mrr: 760, status: "Trial" },
];

const STATUS_TONE: Record<DataTableRow["status"], string> = {
  Active: "bg-emerald-400/15 text-emerald-300",
  Trial: "bg-sky-400/15 text-sky-300",
  Churned: "bg-white/10 text-white/50",
};

export function DataTableDemo() {
  const [selected, setSelected] = React.useState<string[]>(["2"]);
  return (
    <div className="w-full px-6 py-10">
      <DataTable<DataTableRow>
        className="mx-auto max-w-2xl"
        data={DATA_TABLE_ROWS}
        rowKey={(r) => r.id}
        pageSize={4}
        selectable
        selectedKeys={selected}
        onSelectionChange={setSelected}
        columns={[
          { key: "name", header: "Name", sortBy: (r) => r.name },
          { key: "role", header: "Role" },
          {
            key: "mrr",
            header: "MRR",
            align: "right",
            sortBy: (r) => r.mrr,
            accessor: (r) => `$${r.mrr.toLocaleString("en-US")}`,
          },
          {
            key: "status",
            header: "Status",
            accessor: (r) => (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_TONE[r.status]}`}
              >
                {r.status}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * ContextMenu — right-click the surface to open actions.
 * ------------------------------------------------------------------ */
export function ContextMenuDemo() {
  const [last, setLast] = React.useState<string | null>(null);
  return (
    <div className="flex w-full flex-col items-center gap-4 px-6 py-12">
      <ContextMenu
        items={[
          { type: "label", label: "Actions" },
          { label: "Open", shortcut: "⌘O", onSelect: () => setLast("Open") },
          { label: "Rename", shortcut: "⌘R", onSelect: () => setLast("Rename") },
          { label: "Duplicate", onSelect: () => setLast("Duplicate") },
          { type: "separator" },
          { label: "Share", disabled: true },
          {
            label: "Delete",
            shortcut: "⌫",
            destructive: true,
            onSelect: () => setLast("Delete"),
          },
        ]}
      >
        <div className="flex h-40 w-full max-w-md items-center justify-center rounded-xl border border-dashed border-white/15 bg-neutral-950 text-sm text-white/55">
          Right-click anywhere in this area
        </div>
      </ContextMenu>
      <p className="text-xs text-white/45">
        Last action:{" "}
        <span className="text-white/80">{last ?? "—"}</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * TimePicker — 24-hour and 12-hour variants.
 * ------------------------------------------------------------------ */
export function TimePickerDemo() {
  const [t1, setT1] = React.useState("09:30");
  const [t2, setT2] = React.useState("14:00");
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-8 px-6 py-12">
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-foreground/60">24-hour</p>
        <TimePicker value={t1} onChange={setT1} />
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-foreground/60">
          12-hour · 15-min steps
        </p>
        <TimePicker value={t2} onChange={setT2} use12Hour minuteStep={15} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Toolbar — a text-formatting action bar.
 * ------------------------------------------------------------------ */
function AlignIcon({ side }: { side: "left" | "center" | "right" }) {
  const lines: Record<typeof side, [number, number][]> = {
    left: [
      [3, 21],
      [3, 15],
      [3, 21],
    ],
    center: [
      [5, 19],
      [7, 17],
      [5, 19],
    ],
    right: [
      [3, 21],
      [9, 21],
      [3, 21],
    ],
  };
  const rows = lines[side];
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      {rows.map(([x1, x2], i) => (
        <line key={i} x1={x1} y1={6 + i * 6} x2={x2} y2={6 + i * 6} />
      ))}
    </svg>
  );
}

export function ToolbarDemo() {
  const [marks, setMarks] = React.useState({
    bold: true,
    italic: false,
    underline: false,
  });
  const [align, setAlign] = React.useState<"left" | "center" | "right">("left");
  return (
    <div className="flex w-full justify-center px-6 py-12">
      <Toolbar>
        <ToolbarGroup>
          <ToolbarToggle
            pressed={marks.bold}
            onPressedChange={(p) => setMarks((m) => ({ ...m, bold: p }))}
            aria-label="Bold"
          >
            <span className="font-bold">B</span>
          </ToolbarToggle>
          <ToolbarToggle
            pressed={marks.italic}
            onPressedChange={(p) => setMarks((m) => ({ ...m, italic: p }))}
            aria-label="Italic"
          >
            <span className="italic">I</span>
          </ToolbarToggle>
          <ToolbarToggle
            pressed={marks.underline}
            onPressedChange={(p) => setMarks((m) => ({ ...m, underline: p }))}
            aria-label="Underline"
          >
            <span className="underline">U</span>
          </ToolbarToggle>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          {(["left", "center", "right"] as const).map((a) => (
            <ToolbarToggle
              key={a}
              pressed={align === a}
              onPressedChange={() => setAlign(a)}
              aria-label={`Align ${a}`}
            >
              <AlignIcon side={a} />
            </ToolbarToggle>
          ))}
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarButton label="Link">
          <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07l-1 1" />
            <path d="M14 11a5 5 0 0 0-7.07 0L5.5 12.4a5 5 0 0 0 7.07 7.07l1-1" />
          </svg>
        </ToolbarButton>
      </Toolbar>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Confetti — fire a celebratory burst from a button.
 * ------------------------------------------------------------------ */
export function ConfettiDemo() {
  const confettiRef = React.useRef<ConfettiHandle>(null);
  return (
    <div className="flex w-full items-center justify-center px-6 py-12">
      <div className="relative flex h-64 w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
        <Confetti ref={confettiRef} />
        <button
          type="button"
          onClick={() => confettiRef.current?.fire({ origin: { x: 0.5, y: 0.65 } })}
          className="relative z-10 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-105 active:scale-95"
        >
          🎉 Celebrate
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * AnimatedBeam — beams connecting service nodes to a hub.
 * ------------------------------------------------------------------ */
export function AnimatedBeamDemo() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const hubRef = React.useRef<HTMLDivElement | null>(null);
  const aRef = React.useRef<HTMLDivElement | null>(null);
  const bRef = React.useRef<HTMLDivElement | null>(null);
  const cRef = React.useRef<HTMLDivElement | null>(null);
  const node =
    "flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-neutral-900 text-sm font-semibold text-white shadow-lg shadow-black/30";
  return (
    <div className="flex w-full items-center justify-center px-6 py-12">
      <div
        ref={containerRef}
        className="relative flex h-64 w-full max-w-lg items-center justify-between px-12"
      >
        <div className="flex flex-col gap-7">
          <div ref={aRef} className={node}>
            DB
          </div>
          <div ref={bRef} className={node}>
            API
          </div>
          <div ref={cRef} className={node}>
            CDN
          </div>
        </div>
        <div
          ref={hubRef}
          className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-400/15 text-lg font-bold text-sky-300 shadow-lg shadow-sky-500/20"
        >
          ★
        </div>
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={aRef}
          toRef={hubRef}
          curvature={40}
        />
        <AnimatedBeam containerRef={containerRef} fromRef={bRef} toRef={hubRef} />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={cRef}
          toRef={hubRef}
          curvature={-40}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * ScratchCard — scratch the foil to reveal a coupon code.
 * ------------------------------------------------------------------ */
export function ScratchCardDemo() {
  const [revealed, setRevealed] = React.useState(false);
  return (
    <div className="flex w-full flex-col items-center gap-3 px-6 py-12">
      <ScratchCard
        width={300}
        height={170}
        coverLabel="Scratch to reveal"
        onComplete={() => setRevealed(true)}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs uppercase tracking-widest text-white/40">
            Your code
          </span>
          <span className="font-mono text-2xl font-bold text-sky-300">
            CRAFT-2026
          </span>
          <span className="text-xs text-white/50">30% off your first year</span>
        </div>
      </ScratchCard>
      <p className="text-xs text-white/45">
        {revealed ? "Revealed! 🎁" : "Drag across the foil above"}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * RetroGrid — animated synthwave backdrop behind a hero.
 * ------------------------------------------------------------------ */
export function RetroGridDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <RetroGrid className="flex h-64 w-full max-w-lg items-center justify-center rounded-2xl border border-white/10 bg-neutral-950">
        <div className="px-6 text-center">
          <h3 className="bg-gradient-to-b from-white to-sky-200 bg-clip-text text-3xl font-bold text-transparent">
            Ship the future
          </h3>
          <p className="mt-1 text-sm text-white/55">
            A retro-futuristic backdrop for heroes and CTAs.
          </p>
        </div>
      </RetroGrid>
    </div>
  );
}

/* ------------------------------------------------------------------
 * PasswordStrengthMeter — live-scored password input + criteria checklist.
 * ------------------------------------------------------------------ */
export function PasswordStrengthMeterDemo() {
  const [value, setValue] = React.useState("");
  return (
    <div className="flex w-full items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm">
        <label className="text-[10px] uppercase tracking-widest text-white/45">
          Password
        </label>
        <div className="mt-1">
          <PasswordStrengthMeter value={value} onChange={setValue} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * DateRangePicker — analytics range with preset shortcuts.
 * ------------------------------------------------------------------ */
export function DateRangePickerDemo() {
  const [range, setRange] = React.useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  return (
    <div className="flex w-full items-center justify-center px-6 py-6">
      <DateRangePicker value={range} onChange={setRange} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * StatusDot — six tones lined up with labels.
 * ------------------------------------------------------------------ */
export function StatusDotDemo() {
  const tones: Array<{
    tone: "online" | "offline" | "away" | "busy" | "recording" | "syncing";
    label: string;
  }> = [
    { tone: "online", label: "Online" },
    { tone: "recording", label: "Recording" },
    { tone: "syncing", label: "Syncing" },
    { tone: "away", label: "Away" },
    { tone: "busy", label: "Do not disturb" },
    { tone: "offline", label: "Offline" },
  ];
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-md grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border border-white/10 bg-neutral-950 p-5">
        {tones.map((t) => (
          <StatusDot key={t.tone} tone={t.tone} label={t.label} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * InlineEdit — click-to-edit profile rows (text + textarea).
 * ------------------------------------------------------------------ */
export function InlineEditDemo() {
  const [name, setName] = React.useState("Alex Morgan");
  const [bio, setBio] = React.useState(
    "Engineering lead. Building product platforms for SaaS teams."
  );
  return (
    <div className="flex w-full items-start justify-center px-6 py-8">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-neutral-950 p-5">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/45">Name</p>
          <div className="mt-1 text-base font-semibold">
            <InlineEdit
              value={name}
              onSubmit={(next) => setName(next.trim() || name)}
              validate={(v) =>
                v.trim().length === 0 ? "Name can't be empty." : null
              }
            />
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/45">Bio</p>
          <div className="mt-1 text-sm text-white/75">
            <InlineEdit
              value={bio}
              variant="textarea"
              onSubmit={(next) => setBio(next)}
              placeholder="Tell us about yourself…"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * MeshGradient — animated multi-blob backdrop with hero copy on top.
 * ------------------------------------------------------------------ */
export function MeshGradientDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-8">
      <MeshGradient
        className="h-80 w-full max-w-2xl"
        radius={24}
      >
        <div className="flex h-80 flex-col items-center justify-center px-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
            v2.0 · Now in beta
          </p>
          <h3 className="mt-3 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold text-transparent">
            Ship something beautiful
          </h3>
          <p className="mt-2 max-w-md text-sm text-white/65">
            Drop CraftUI into any React project. Copy, paste, ship.
          </p>
          <div className="mt-5 flex gap-2">
            <Button>Get started</Button>
            <Button variant="outline">View on GitHub</Button>
          </div>
        </div>
      </MeshGradient>
    </div>
  );
}

/* ------------------------------------------------------------------
 * CountdownTimer — flip-clock countdown to a date 9 days out.
 * ------------------------------------------------------------------ */
export function CountdownTimerDemo() {
  // Compute target on mount once so SSR + client agree on the same date string.
  const [target] = React.useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 9);
    d.setHours(d.getHours() + 4);
    d.setMinutes(d.getMinutes() + 32);
    return d;
  });
  return (
    <div className="flex w-full flex-col items-center gap-4 px-6 py-10">
      <CountdownTimer target={target} cellHeight={56} />
      <p className="text-[11px] text-white/45">
        Launch day · {target.toLocaleDateString()}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * GlassCard — frosted glass on top of MeshGradient.
 * ------------------------------------------------------------------ */
export function GlassCardDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-8">
      <MeshGradient className="h-80 w-full max-w-xl" radius={24}>
        <div className="flex h-80 items-center justify-center px-6">
          <GlassCard interactive className="w-72 p-5" radius={22}>
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-950"
                style={{ background: "linear-gradient(135deg, white, rgb(186,230,253))" }}
              >
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Pro tier unlocked</p>
                <p className="text-[11px] text-white/55">3 new features available</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { k: "API", v: "50k" },
                { k: "Seats", v: "20" },
                { k: "Storage", v: "1TB" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-lg bg-white/[0.05] p-2 text-center ring-1 ring-white/10"
                >
                  <p className="font-mono text-sm font-semibold text-white">{s.v}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/45">
                    {s.k}
                  </p>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" size="sm">
              Manage plan
            </Button>
          </GlassCard>
        </div>
      </MeshGradient>
    </div>
  );
}

/* ------------------------------------------------------------------
 * StatRing — three KPI rings side-by-side with trends.
 * ------------------------------------------------------------------ */
export function StatRingDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <StatRing
          value={86}
          unit="%"
          label="CSAT score"
          trend={4.2}
        />
        <StatRing
          value={42_580}
          max={50_000}
          label="API requests"
          trend={-2.1}
          formatValue={(v) => (v / 1000).toFixed(1) + "k"}
          color="rgb(244, 114, 182)"
        />
        <StatRing
          value={94.7}
          unit="%"
          label="Uptime SLA"
          trend={0}
          color="rgb(74, 222, 128)"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * UsageBar — quota indicators with warning / danger tones.
 * ------------------------------------------------------------------ */
export function UsageBarDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-8">
      <div className="w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-neutral-950 p-5">
        <UsageBar
          label="API requests"
          value={42_580}
          limit={50_000}
          unit="req"
          hint="Resets on the 1st"
        />
        <UsageBar
          label="Storage"
          value={9.4}
          limit={10}
          unit="GB"
        />
        <UsageBar
          label="Team seats"
          value={6}
          limit={Infinity}
          unit="seats"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * PlanCard — current-subscription widget for billing pages.
 * ------------------------------------------------------------------ */
export function PlanCardDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-8">
      <PlanCard
        plan="Pro"
        status="Active"
        statusTone="success"
        price="$20"
        priceSuffix="per seat / month"
        description="For growing teams that need advanced controls."
        renewalText="Renews on Jan 15, 2027 · 6 seats"
        usage={[
          { label: "API requests", value: 42_580, limit: 50_000, unit: "req" },
          { label: "Storage", value: 9.4, limit: 10, unit: "GB" },
          { label: "Seats", value: 6, limit: 10 },
        ]}
        primaryAction={{ label: "Upgrade plan" }}
        secondaryAction={{ label: "Manage billing" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * InvitePeople — team invite form with role picker + pending list.
 * ------------------------------------------------------------------ */
export function InvitePeopleDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-8">
      <InvitePeople
        pending={[
          {
            id: "1",
            email: "alex@acme.co",
            role: "admin",
            sentAt: "2d ago",
          },
          {
            id: "2",
            email: "riley@acme.co",
            role: "member",
            sentAt: "5d ago",
          },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * TaskCard — Linear-style task list with mixed statuses.
 * ------------------------------------------------------------------ */
export function TaskCardDemo() {
  return (
    <div className="flex w-full items-start justify-center px-6 py-8">
      <div className="w-full max-w-md space-y-2">
        <TaskCard
          id="ENG-204"
          title="Wire OAuth callback to session store"
          description="Persist the refresh token and pipe it through middleware."
          status="in_progress"
          priority="high"
          tags={["backend", "auth"]}
          subtasks={{ done: 3, total: 7 }}
          comments={4}
          due="Jun 8"
          assignee={{ name: "Alex Morgan" }}
        />
        <TaskCard
          id="DES-118"
          title="Redesign empty state for the inbox"
          status="in_review"
          priority="medium"
          tags={["design"]}
          comments={2}
          due="Jun 6"
          overdue
          assignee={{ name: "Sam Carter" }}
        />
        <TaskCard
          id="OPS-72"
          title="Roll out new logging pipeline to staging"
          status="done"
          priority="low"
          tags={["infra"]}
          subtasks={{ done: 5, total: 5 }}
          assignee={{ name: "Riley Park" }}
        />
        <TaskCard
          id="ENG-211"
          title="Investigate flaky billing webhook test"
          status="todo"
          priority="urgent"
          tags={["backend", "tests"]}
          assignee={{ name: "Jordan Kim" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * PaymentCard — credit card preview wired to a live form.
 * ------------------------------------------------------------------ */
export function PaymentCardDemo() {
  const [number, setNumber] = React.useState("4242424242424242");
  const [name, setName] = React.useState("ALEX MORGAN");
  const [expiry, setExpiry] = React.useState("12/27");
  const [cvv, setCvv] = React.useState("123");
  const [flipped, setFlipped] = React.useState(false);

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-300/50 focus:ring-2 focus:ring-sky-300/30";

  return (
    <div className="flex w-full flex-col items-center gap-6 px-6 py-8 md:flex-row md:items-start md:justify-center">
      <PaymentCard
        number={number}
        name={name}
        expiry={expiry}
        cvv={cvv}
        flipped={flipped}
      />
      <div className="grid w-full max-w-xs grid-cols-2 gap-2">
        <label className="col-span-2 text-[10px] uppercase tracking-widest text-white/45">
          Card number
          <input
            value={number.replace(/\D/g, "")}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="4242 4242 4242 4242"
            inputMode="numeric"
            className={`${inputCls} mt-1 font-mono`}
          />
        </label>
        <label className="col-span-2 text-[10px] uppercase tracking-widest text-white/45">
          Cardholder
          <input
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="FULL NAME"
            className={`${inputCls} mt-1`}
          />
        </label>
        <label className="text-[10px] uppercase tracking-widest text-white/45">
          Expiry
          <input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            className={`${inputCls} mt-1 font-mono`}
          />
        </label>
        <label className="text-[10px] uppercase tracking-widest text-white/45">
          CVV
          <input
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            onFocus={() => setFlipped(true)}
            onBlur={() => setFlipped(false)}
            placeholder="•••"
            inputMode="numeric"
            className={`${inputCls} mt-1 font-mono`}
          />
        </label>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * PricingSlider — interactive SaaS seat calculator.
 * ------------------------------------------------------------------ */
export function PricingSliderDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-8">
      <PricingSlider
        min={1}
        max={100}
        defaultValue={12}
        pricePerUnit={12}
        unit="seat"
        cadence="month"
        tiers={[
          { from: 10, discount: 0.1 },
          { from: 25, discount: 0.18 },
          { from: 50, discount: 0.25 },
        ]}
        cta={
          <Button className="w-full">Start free trial</Button>
        }
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * MentionInput — comment box with @ mention dropdown.
 * ------------------------------------------------------------------ */
export function MentionInputDemo() {
  const [value, setValue] = React.useState("Hey @alex can you review this? cc @sam");
  return (
    <div className="flex w-full items-start justify-center px-6 py-8">
      <div className="w-full max-w-md">
        <MentionInput
          value={value}
          onChange={setValue}
          users={[
            { id: "1", name: "Alex Morgan", handle: "alex", subtitle: "Engineering · Lead" },
            { id: "2", name: "Sam Carter", handle: "sam", subtitle: "Design · Senior" },
            { id: "3", name: "Riley Park", handle: "riley", subtitle: "Product · PM" },
            { id: "4", name: "Jordan Kim", handle: "jordan", subtitle: "Engineering" },
            { id: "5", name: "Taylor Reed", handle: "taylor", subtitle: "Marketing" },
          ]}
        />
        <p className="mt-2 text-[11px] text-white/45">
          Type <span className="font-mono text-white/65">@</span> in the box to mention someone.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * ApiKeyDisplay — masked secret with show / copy / rotate.
 * ------------------------------------------------------------------ */
export function ApiKeyDisplayDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-3 px-6 py-8">
      <ApiKeyDisplay
        label="Production secret key"
        badge="Live"
        badgeTone="success"
        value="demo_secret_EXAMPLE0000000000000000000000abcd"
        createdAt="2026-02-14"
        expiresAt="2027-02-14"
        onRotate={() => {}}
      />
      <ApiKeyDisplay
        label="Test publishable key"
        badge="Test"
        badgeTone="warning"
        value="demo_public_EXAMPLE0000000000000000000000abcd"
        createdAt="2026-01-03"
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * CodeRain — Matrix-style backdrop with a centered title.
 * ------------------------------------------------------------------ */
export function CodeRainDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <CodeRain className="h-72 w-full max-w-lg border border-white/10">
        <div className="rounded-xl bg-black/40 px-5 py-3 text-center backdrop-blur-sm ring-1 ring-white/10">
          <p className="text-xs uppercase tracking-widest text-sky-300">
            System
          </p>
          <p className="mt-1 text-xl font-semibold text-white">Initializing…</p>
        </div>
      </CodeRain>
    </div>
  );
}

/* ------------------------------------------------------------------
 * SplitFlap — vintage mechanical board.
 * ------------------------------------------------------------------ */
export function SplitFlapDemo() {
  const [value, setValue] = React.useState("ARRIVED");
  const options = ["BOARDING", "DELAYED", "ON TIME", "ARRIVED"];
  return (
    <div className="flex w-full flex-col items-center gap-4 px-6 py-8">
      <SplitFlap value={value} digits={8} cellHeight={52} />
      <div className="flex flex-wrap items-center justify-center gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setValue(opt)}
            className={
              opt === value
                ? "rounded-md bg-sky-300 px-2.5 py-1 text-[11px] font-medium text-neutral-950"
                : "rounded-md bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/75 hover:text-white"
            }
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * AudioVisualizer — bouncing equalizer bars + play/pause toggle.
 * ------------------------------------------------------------------ */
export function AudioVisualizerDemo() {
  const [playing, setPlaying] = React.useState(true);
  return (
    <div className="flex w-full flex-col items-center gap-4 px-6 py-10">
      <div className="flex w-full max-w-md items-end justify-center rounded-2xl border border-white/10 bg-neutral-950 p-6">
        <AudioVisualizer bars={40} height={96} playing={playing} />
      </div>
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className="rounded-md bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/85 hover:text-white"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------
 * HeartbeatMonitor — scrolling EKG line with BPM badge.
 * ------------------------------------------------------------------ */
export function HeartbeatMonitorDemo() {
  const [bpm, setBpm] = React.useState(72);
  return (
    <div className="flex w-full flex-col items-center gap-3 px-6 py-8">
      <HeartbeatMonitor bpm={bpm} className="w-full max-w-lg" />
      <div className="flex items-center gap-2">
        {[60, 72, 96, 128].map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBpm(b)}
            className={
              b === bpm
                ? "rounded-md bg-sky-300 px-2.5 py-1 text-[11px] font-medium text-neutral-950"
                : "rounded-md bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/75 hover:text-white"
            }
          >
            {b} bpm
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * CubeMatrix — wave field of small rotating 3D cubes.
 * ------------------------------------------------------------------ */
export function CubeMatrixDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-14">
      <CubeMatrix rows={5} cols={5} cubeSize={34} gap={10} duration={4.2} />
    </div>
  );
}

/* ------------------------------------------------------------------
 * DiceRoll — click the die to roll it. Shows the resting face.
 * ------------------------------------------------------------------ */
export function DiceRollDemo() {
  const [face, setFace] = React.useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  return (
    <div className="flex w-full flex-col items-center gap-6 px-6 py-12">
      <DiceRoll defaultFace={1} onRoll={(f) => setFace(f)} />
      <p className="text-xs text-white/55">
        Rolled <span className="font-mono text-sky-300">{face}</span> — click to roll again
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * PortalRings — concentric rings spinning around different axes.
 * ------------------------------------------------------------------ */
export function PortalRingsDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-8">
      <PortalRings size={300} rings={5}>
        <span className="rounded-full bg-neutral-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-sky-300 ring-1 ring-sky-300/30">
          Live
        </span>
      </PortalRings>
    </div>
  );
}

/* ------------------------------------------------------------------
 * PerspectiveBox — opened box with 4 inner flap panels.
 * ------------------------------------------------------------------ */
export function PerspectiveBoxDemo() {
  const Panel = ({
    label,
    icon,
  }: {
    label: string;
    icon: React.ReactNode;
  }) => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-center">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-300/15 text-sky-300">
        {icon}
      </span>
      <span className="text-[11px] font-medium text-white/85">{label}</span>
    </div>
  );
  return (
    <div className="flex w-full items-center justify-center px-6 py-6">
      <PerspectiveBox
        size={170}
        panelHeight={110}
        base={
          <div className="flex flex-col items-center gap-1 text-center">
            <Sparkles className="h-6 w-6 text-sky-300" />
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
              CraftUI
            </p>
            <p className="text-[10px] text-white/45">Hover to open</p>
          </div>
        }
        panels={[
          <Panel key="t" label="Components" icon={<Star className="h-4 w-4" />} />,
          <Panel key="r" label="Themes" icon={<Sun className="h-4 w-4" />} />,
          <Panel key="b" label="CLI" icon={<Zap className="h-4 w-4" />} />,
          <Panel key="l" label="Docs" icon={<FileText className="h-4 w-4" />} />,
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * OnboardingChecklist — Linear/Stripe-style getting-started widget.
 * ------------------------------------------------------------------ */
export function OnboardingChecklistDemo() {
  const [completedIds, setCompletedIds] = React.useState<string[]>([
    "account",
    "workspace",
  ]);
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <OnboardingChecklist
        title="Get started with CraftUI"
        description="Finish setup to unlock the full workspace"
        completedIds={completedIds}
        onCompletedChange={setCompletedIds}
        steps={[
          {
            id: "account",
            title: "Create your account",
            description: "Sign up with email or single sign-on.",
          },
          {
            id: "workspace",
            title: "Name your workspace",
            description: "Used in URLs and shared links.",
          },
          {
            id: "invite",
            title: "Invite your team",
            description: "Bring 2+ teammates to collaborate in real time.",
            action: { label: "Invite" },
          },
          {
            id: "integration",
            title: "Connect an integration",
            description: "Sync with GitHub, Linear, or Slack.",
            action: { label: "Connect" },
          },
          {
            id: "ship",
            title: "Ship your first component",
            description: "Use the CLI to install a component from the registry.",
            action: { label: "Open docs" },
          },
        ]}
      />
    </div>
  );
}



/* ----------------------------------------------------------------------- */
/* AudioPlayer                                                              */
/* ----------------------------------------------------------------------- */
export function AudioPlayerDemo() {
  const playlist = React.useMemo(
    () => [
      {
        title: "Midnight Drive",
        artist: "Polar Hues",
        src: "https://cdn.pixabay.com/audio/2023/02/28/audio_4babe9d0bf.mp3",
      },
      {
        title: "Glass Halls",
        artist: "Lior Aven",
        src: "https://cdn.pixabay.com/audio/2024/05/13/audio_e5cc2f3c7a.mp3",
      },
      {
        title: "Soft Static",
        artist: "Anjuna Bay",
        src: "https://cdn.pixabay.com/audio/2022/10/30/audio_347ea3f37e.mp3",
      },
    ],
    []
  );
  const [index, setIndex] = React.useState(0);
  const [log, setLog] = React.useState<string>("idle");
  const track = playlist[index] ?? playlist[0]!;

  const advance = (delta: number) => {
    setIndex((i) => (i + delta + playlist.length) % playlist.length);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <AudioPlayer
        src={track.src}
        title={track.title}
        artist={track.artist}
        onPlay={() => setLog("playing")}
        onPause={() => setLog("paused")}
        onEnded={() => {
          setLog("ended → next");
          advance(1);
        }}
        onNext={() => advance(1)}
        onPrev={() => advance(-1)}
      />
      <div className="flex items-center justify-between px-1 text-[11px] text-white/45">
        <span>
          Track {index + 1} of {playlist.length}
        </span>
        <span className="font-mono uppercase tracking-widest">{log}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => advance(-1)}>
          Prev
        </Button>
        <Button variant="outline" size="sm" onClick={() => advance(1)}>
          Next
        </Button>
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------
 * AuthCard — sign-in card with social logins, email/password, footer switch.
 * ------------------------------------------------------------------ */
export function AuthCardDemo() {
  const [variant, setVariant] = React.useState<"signin" | "signup">("signin");
  const [lastSubmission, setLastSubmission] = React.useState<string | null>(
    null
  );

  const socials: AuthCardSocial[] = [
    {
      id: "google",
      label: "Google",
      icon: (
        <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#EA4335"
            d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1a6.2 6.2 0 1 1 0-12.4c1.9 0 3.2.8 4 1.5l2.7-2.6C16.9 3.2 14.7 2.2 12 2.2 6.6 2.2 2.2 6.6 2.2 12S6.6 21.8 12 21.8c6.4 0 10.6-4.5 10.6-10.8 0-.7-.1-1.2-.2-1.8H12Z"
          />
        </svg>
      ),
      onClick: () => new Promise<void>((r) => setTimeout(r, 700)),
    },
    {
      id: "github",
      label: "GitHub",
      icon: (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.7.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5Z" />
        </svg>
      ),
      onClick: () => new Promise<void>((r) => setTimeout(r, 700)),
    },
  ];

  return (
    <div className="flex w-full items-start justify-center px-6 py-10">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <AuthCard
          variant={variant}
          socials={socials}
          logo={
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-300 to-sky-500 text-neutral-950">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7l8-4 8 4-8 4-8-4Zm0 5l8 4 8-4M4 17l8 4 8-4"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          }
          onForgotPassword={() => setLastSubmission("Sent reset email.")}
          onSubmit={async ({ email }) => {
            await new Promise((r) => setTimeout(r, 1000));
            setLastSubmission(
              `${variant === "signup" ? "Created" : "Signed in as"} ${email}`
            );
          }}
          onFooterAction={() =>
            setVariant((v) => (v === "signin" ? "signup" : "signin"))
          }
        />
        {lastSubmission ? (
          <p className="text-center text-[11px] text-white/45">
            {lastSubmission}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ----- CookieBanner ----- */
export function CookieBannerDemo() {
  const [open, setOpen] = React.useState(false);
  const [lastChoice, setLastChoice] = React.useState<string | null>(null);
  const [prefs, setPrefs] = React.useState<Record<string, boolean> | null>(
    null
  );

  const categories: CookieBannerCategory[] = [
    {
      id: "essential",
      label: "Essential",
      description: "Required for login, security, and core site features.",
      required: true,
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "Anonymous product metrics so we know what to improve.",
      defaultEnabled: true,
    },
    {
      id: "marketing",
      label: "Marketing",
      description: "Personalized ads and re-engagement campaigns.",
      defaultEnabled: false,
    },
  ];

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-neutral-900/40 px-6 py-16 ring-1 ring-white/[0.04]">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm text-white/70">
          Click the button to summon the consent banner.
        </p>
        <Button onClick={() => setOpen(true)} disabled={open}>
          {open ? "Banner shown" : "Show cookie banner"}
        </Button>
        {lastChoice ? (
          <p className="mt-2 text-xs text-white/55">
            Last action:{" "}
            <span className="font-mono text-white/80">{lastChoice}</span>
          </p>
        ) : null}
        {prefs ? (
          <pre className="mt-1 max-w-xs overflow-x-auto rounded-md bg-white/[0.04] px-3 py-2 text-left text-[11px] text-white/70">
            {JSON.stringify(prefs, null, 2)}
          </pre>
        ) : null}
      </div>

      <CookieBanner
        open={open}
        onOpenChange={setOpen}
        categories={categories}
        privacyHref="#privacy"
        description="We use cookies to keep CraftUI fast, measure how features perform, and personalize what you see. Tune your preferences any time."
        onAccept={(next) => {
          setPrefs(next);
          setLastChoice("accepted");
        }}
        onReject={() => {
          setPrefs({ essential: true, analytics: false, marketing: false });
          setLastChoice("rejected");
        }}
        className="absolute"
        style={{ position: "absolute" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * CurrencyInput — invoice line item editor with live total + selector.
 * ------------------------------------------------------------------ */
export function CurrencyInputDemo() {
  const [unitPrice, setUnitPrice] = React.useState<number | null>(1299.5);
  const [discount, setDiscount] = React.useState<number | null>(150);
  const [currency, setCurrency] = React.useState("USD");
  const [locale, setLocale] = React.useState("en-US");

  const subtotal = (unitPrice ?? 0) - (discount ?? 0);
  const tax = Math.max(0, subtotal) * 0.08;
  const total = Math.max(0, subtotal) + tax;

  const fmt = React.useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        currencyDisplay: "symbol",
      }),
    [locale, currency]
  );

  const localeOptions: { code: string; label: string }[] = [
    { code: "en-US", label: "en-US" },
    { code: "de-DE", label: "de-DE" },
    { code: "fr-FR", label: "fr-FR" },
    { code: "ja-JP", label: "ja-JP" },
  ];

  return (
    <div className="flex w-full items-start justify-center px-6 py-8">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/45">
              New invoice line
            </p>
            <h3 className="mt-0.5 text-base font-semibold text-white">
              Pro plan — annual
            </h3>
          </div>
          <div className="flex gap-1 rounded-md border border-white/10 bg-white/[0.03] p-0.5">
            {localeOptions.map((opt) => {
              const active = opt.code === locale;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLocale(opt.code)}
                  className={
                    "rounded px-2 py-1 text-[10px] font-medium tabular-nums transition-colors " +
                    (active
                      ? "bg-white/[0.08] text-white"
                      : "text-white/55 hover:text-white")
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-white/55">
              Unit price
            </label>
            <CurrencyInput
              value={unitPrice}
              onValueChange={setUnitPrice}
              currency={currency}
              onCurrencyChange={setCurrency}
              locale={locale}
              showCurrencySelector
              min={0}
              max={1_000_000}
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium text-white/55">
              Discount
            </label>
            <CurrencyInput
              value={discount}
              onValueChange={setDiscount}
              currency={currency}
              locale={locale}
              min={0}
            />
          </div>
        </div>

        <div className="mt-5 space-y-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs">
          <Row label="Subtotal" value={fmt.format(Math.max(0, subtotal))} />
          <Row label="Tax (8%)" value={fmt.format(tax)} />
          <div className="my-1 h-px bg-white/10" />
          <Row label="Total due" value={fmt.format(total)} bold />
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            className="flex-1"
            onClick={() => {
              setUnitPrice(0);
              setDiscount(0);
            }}
          >
            Reset
          </Button>
          <Button className="flex-1" variant="outline">
            Add line
          </Button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/55">{label}</span>
      <span
        className={
          "tabular-nums " + (bold ? "text-base font-semibold text-white" : "text-white/85")
        }
      >
        {value}
      </span>
    </div>
  );
}

/* ----------------------------------- ReviewCard ----------------------------------- */
export function ReviewCardDemo() {
  const [helpful, setHelpful] = React.useState(false);
  const [count, setCount] = React.useState(128);

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <ReviewCard
        rating={4.5}
        author="Maya Rodriguez"
        date="2 days ago"
        verified
        title="Punches well above its price"
        content="The build quality is genuinely surprising for a sub-$100 keyboard. Stabilizers came pre-lubed, the typing sound is creamy, and the software is finally usable on Mac."
        pros={["Pre-lubed stabilizers", "Hot-swap PCB", "Excellent typing sound"]}
        cons={["Software needs a Mac restart", "No wireless option"]}
        helpful={count}
        isHelpful={helpful}
        onHelpful={(next) => {
          setHelpful(next);
          setCount((c) => (next ? c + 1 : c - 1));
        }}
        footer={
          <Button className="h-7 px-3 text-[11px]">Reply</Button>
        }
      />

      <ReviewCard
        rating={3}
        author="Daniel Kim"
        date="1 week ago"
        title="Good, not great"
        content="Solid daily driver but the trackpad gestures feel inconsistent after the last update. Battery life is still excellent."
        helpful={12}
      />
    </div>
  );
}

/* ----------------------------- Sparkline ----------------------------- */
export function SparklineDemo() {
  const revenue = React.useMemo(
    () => [
      12, 14, 13, 18, 22, 19, 24, 27, 24, 31, 29, 35, 33, 38, 42, 40, 47, 51,
      48, 56,
    ],
    []
  );
  const signups = React.useMemo(
    () => [
      48, 46, 49, 44, 41, 45, 39, 42, 36, 38, 33, 30, 32, 28, 26, 29, 24, 22,
      25, 21,
    ],
    []
  );
  const latency = React.useMemo(
    () => [
      120, 118, 122, 116, 124, 119, 121, 117, 123, 120, 122, 118, 121, 119,
      122, 117, 120, 119, 121, 118,
    ],
    []
  );
  const traffic = React.useMemo(
    () => [
      4, 6, 5, 9, 7, 12, 10, 16, 14, 19, 22, 18, 26, 24, 31, 28, 34, 30, 38, 42,
    ],
    []
  );

  const series: Array<{
    label: string;
    value: string;
    delta: string;
    deltaTone: "up" | "down" | "flat";
    data: number[];
    variant: "line" | "area";
    color: string;
  }> = [
    {
      label: "Revenue",
      value: "$56.2k",
      delta: "+18.4%",
      deltaTone: "up",
      data: revenue,
      variant: "area",
      color: "rgb(125, 211, 252)",
    },
    {
      label: "Signups",
      value: "2,148",
      delta: "-9.1%",
      deltaTone: "down",
      data: signups,
      variant: "area",
      color: "rgb(244, 114, 182)",
    },
    {
      label: "p95 latency",
      value: "118ms",
      delta: "±0.4%",
      deltaTone: "flat",
      data: latency,
      variant: "line",
      color: "rgb(165, 180, 252)",
    },
    {
      label: "Traffic",
      value: "42k rpm",
      delta: "+24.0%",
      deltaTone: "up",
      data: traffic,
      variant: "area",
      color: "rgb(134, 239, 172)",
    },
  ];

  const toneClass = (tone: "up" | "down" | "flat") =>
    tone === "up"
      ? "text-emerald-300 bg-emerald-300/10"
      : tone === "down"
      ? "text-rose-300 bg-rose-300/10"
      : "text-white/55 bg-white/5";

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6">
      {/* KPI grid — sparklines inside stat cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {series.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-950 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-white/45">
                  {s.label}
                </p>
                <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-white">
                  {s.value}
                </p>
              </div>
              <span
                className={
                  "shrink-0 rounded-md px-2 py-0.5 font-mono text-[11px] tabular-nums " +
                  toneClass(s.deltaTone)
                }
              >
                {s.delta}
              </span>
            </div>
            <div className="mt-3">
              <Sparkline
                data={s.data}
                width={260}
                height={48}
                variant={s.variant}
                color={s.color}
                strokeWidth={1.8}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Inline-in-table row demo */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-950">
        <div className="grid grid-cols-[1fr,auto,140px,auto] items-center gap-4 border-b border-white/5 px-4 py-2 text-[11px] uppercase tracking-widest text-white/40">
          <span>Project</span>
          <span className="text-right">MRR</span>
          <span>Last 14d</span>
          <span className="text-right">Δ</span>
        </div>
        {[
          {
            name: "Lumen",
            mrr: "$8.4k",
            d: [3, 4, 5, 4, 6, 7, 6, 8, 7, 9, 11, 10, 12, 14],
            tone: "up" as const,
            delta: "+12%",
            color: "rgb(125, 211, 252)",
          },
          {
            name: "Halcyon",
            mrr: "$4.1k",
            d: [9, 9, 8, 8, 7, 7, 6, 7, 6, 5, 5, 5, 4, 4],
            tone: "down" as const,
            delta: "-7%",
            color: "rgb(244, 114, 182)",
          },
          {
            name: "Forge",
            mrr: "$12.7k",
            d: [10, 10, 11, 10, 11, 12, 11, 12, 13, 12, 13, 13, 14, 14],
            tone: "up" as const,
            delta: "+3%",
            color: "rgb(134, 239, 172)",
          },
        ].map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-[1fr,auto,140px,auto] items-center gap-4 border-b border-white/5 px-4 py-3 last:border-b-0"
          >
            <span className="truncate text-sm font-medium text-white">
              {row.name}
            </span>
            <span className="font-mono text-sm tabular-nums text-white/85">
              {row.mrr}
            </span>
            <Sparkline
              data={row.d}
              width={140}
              height={28}
              color={row.color}
              showDot
              strokeWidth={1.4}
            />
            <span
              className={
                "rounded-md px-2 py-0.5 text-right font-mono text-[11px] tabular-nums " +
                toneClass(row.tone)
              }
            >
              {row.delta}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end">
        <Button size="sm" variant="ghost">
          View all metrics
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * ThemeSelector — appearance settings card with Light / Dark / System.
 * ------------------------------------------------------------------ */
export function ThemeSelectorDemo() {
  const [theme, setTheme] = React.useState<ThemeSelectorValue>("system");
  return (
    <div className="flex w-full items-center justify-center px-6 py-8">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/45">
              Appearance
            </p>
            <h3 className="mt-1 text-base font-semibold text-white">
              Choose your theme
            </h3>
            <p className="mt-0.5 text-xs text-white/55">
              Sets how the interface looks across this workspace.
            </p>
          </div>
          <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70">
            {theme}
          </span>
        </div>

        <ThemeSelector value={theme} onChange={setTheme} />

        <div className="mt-5 flex items-center justify-end gap-2 border-t border-white/5 pt-4">
          <Button
            variant="ghost"
            onClick={() => setTheme("system")}
            disabled={theme === "system"}
          >
            Reset
          </Button>
          <Button onClick={() => setTheme(theme)}>Save changes</Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * TwoFactorSetup — full 2FA enrollment flow: QR + manual key, then a
 * 6-digit verification field with async verify and success animation.
 * ------------------------------------------------------------------ */
export function TwoFactorSetupDemo() {
  // A real app would mint this per-user on the server.
  const secret = "JBSWY3DPEHPK3PXP7VLQK4ZN";
  const [attempts, setAttempts] = React.useState(0);
  const [resetKey, setResetKey] = React.useState(0);

  // Pretend "123456" is the correct code so the demo is testable.
  const verify = async (code: string): Promise<boolean> => {
    setAttempts((n) => n + 1);
    await new Promise((r) => setTimeout(r, 700));
    return code === "123456";
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 px-6 py-8">
      <TwoFactorSetup
        key={resetKey}
        secret={secret}
        accountName="alex@acme.io"
        issuer="Acme"
        onVerify={verify}
        onComplete={() => {
          // Could navigate, toast, etc.
        }}
      />
      <div className="flex items-center gap-3 text-[11px] text-white/45">
        <span>
          Try code <span className="font-mono text-white/70">123456</span> · Attempts: {attempts}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setAttempts(0);
            setResetKey((k) => k + 1);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}


/* ---------- AddressForm ---------- */
export function AddressFormDemo() {
  const [value, setValue] = React.useState<AddressFormValue>({
    name: "Maya Rodriguez",
    line1: "440 Brannan St",
    line2: "Suite 300",
    city: "San Francisco",
    region: "CA",
    postalCode: "94107",
    country: "US",
  });
  const [savedAt, setSavedAt] = React.useState<string | null>(null);

  const handleSubmit = async (next: AddressFormValue) => {
    await new Promise((r) => setTimeout(r, 700));
    setSavedAt(
      new Date().toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    // eslint-disable-next-line no-console
    console.log("address saved", next);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <AddressForm
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        showName
        showCompany={false}
        title="Shipping address"
        description="Where should we send your order?"
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="h-8 px-3 text-xs"
          onClick={() =>
            setValue({
              line1: "",
              line2: "",
              city: "",
              region: "",
              postalCode: "",
              country: "",
              name: "",
            })
          }
        >
          Reset
        </Button>
        {savedAt ? (
          <span className="text-[11px] text-white/55">Saved at {savedAt}</span>
        ) : null}
      </div>
    </div>
  );
}

/* ----- CommentThread demo ----- */
export function CommentThreadDemo() {
  const [comments, setComments] = React.useState<CommentThreadNode[]>([
    {
      id: "c1",
      author: { name: "Maya Rodriguez", badge: "Author" },
      time: "3h",
      body: "Shipped the new pricing page today — would love a quick read before it goes live on Monday. Especially the comparison table at the bottom.",
      reactions: [
        { id: "fire", emoji: "🔥", count: 4, you: true },
        { id: "love", emoji: "❤️", count: 2 },
      ],
      replies: [
        {
          id: "c1-r1",
          author: { name: "Devon Park", badge: "Mod" },
          time: "2h",
          body: "Comparison table looks clean. One nit — the 'Most popular' badge on the middle tier disappears at the md breakpoint.",
          reactions: [{ id: "like", emoji: "👍", count: 3 }],
          replies: [
            {
              id: "c1-r1-r1",
              author: { name: "Maya Rodriguez", badge: "Author" },
              time: "1h",
              edited: true,
              body: "Good catch, pushed a fix — should be visible everywhere down to 360px now.",
            },
          ],
        },
        {
          id: "c1-r2",
          author: { name: "Priya Shah" },
          time: "1h",
          body: "Copy on the Enterprise tier reads a little dense. Want me to take a pass?",
        },
      ],
    },
    {
      id: "c2",
      author: { name: "Jordan Lee" },
      time: "yesterday",
      body: "How are we handling annual vs monthly pricing? I didn't see a toggle on the mock.",
      reactions: [{ id: "wow", emoji: "😮", count: 1 }],
    },
  ]);

  const currentUser = { name: "You" };

  // Deterministic id generator — no Math.random at render time.
  const nextIdRef = React.useRef(100);
  const newId = () => `c${++nextIdRef.current}`;

  // Walk the tree and update a node by id.
  const updateNode = (
    nodes: CommentThreadNode[],
    id: string,
    fn: (n: CommentThreadNode) => CommentThreadNode
  ): CommentThreadNode[] =>
    nodes.map((n) => {
      if (n.id === id) return fn(n);
      if (n.replies && n.replies.length > 0) {
        return { ...n, replies: updateNode(n.replies, id, fn) };
      }
      return n;
    });

  const deleteNode = (
    nodes: CommentThreadNode[],
    id: string
  ): CommentThreadNode[] =>
    nodes
      .filter((n) => n.id !== id)
      .map((n) =>
        n.replies && n.replies.length > 0
          ? { ...n, replies: deleteNode(n.replies, id) }
          : n
      );

  const handleReply = (parentId: string | null, body: string) => {
    const fresh: CommentThreadNode = {
      id: newId(),
      author: { name: currentUser.name },
      time: "just now",
      body,
    };
    if (parentId === null) {
      setComments((cs) => [...cs, fresh]);
      return;
    }
    setComments((cs) =>
      updateNode(cs, parentId, (n) => ({
        ...n,
        replies: [...(n.replies ?? []), fresh],
      }))
    );
  };

  const handleReact = (commentId: string, reactionId: string) => {
    const emojiOf: Record<string, string> = {
      like: "👍",
      love: "❤️",
      laugh: "😄",
      wow: "😮",
      sad: "😢",
      fire: "🔥",
    };
    setComments((cs) =>
      updateNode(cs, commentId, (n) => {
        const existing = n.reactions ?? [];
        const match = existing.find((r) => r.id === reactionId);
        if (match) {
          const nextCount = match.you ? match.count - 1 : match.count + 1;
          const nextYou = !match.you;
          const nextReactions = existing
            .map((r) =>
              r.id === reactionId
                ? { ...r, count: nextCount, you: nextYou }
                : r
            )
            .filter((r) => r.count > 0);
          return { ...n, reactions: nextReactions };
        }
        return {
          ...n,
          reactions: [
            ...existing,
            {
              id: reactionId,
              emoji: emojiOf[reactionId] ?? "•",
              count: 1,
              you: true,
            },
          ],
        };
      })
    );
  };

  const handleEdit = (commentId: string, body: string) => {
    setComments((cs) =>
      updateNode(cs, commentId, (n) => ({ ...n, body, edited: true }))
    );
  };

  const handleDelete = (commentId: string) => {
    setComments((cs) => deleteNode(cs, commentId));
  };

  return (
    <CommentThread
      comments={comments}
      currentUser={currentUser}
      onReply={handleReply}
      onReact={handleReact}
      onEdit={handleEdit}
      onDelete={handleDelete}
      canEdit
      canDelete
    />
  );
}

/* ------------------------------------------------------------------
 * EmojiPicker — categorized + searchable emoji picker for a chat composer.
 * ------------------------------------------------------------------ */
export function EmojiPickerDemo() {
  const [message, setMessage] = React.useState("Ship it ");
  const [recent, setRecent] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const insert = (emoji: string) => {
    setMessage((m) => m + emoji);
    setRecent((r) => {
      const next = [emoji, ...r.filter((e) => e !== emoji)];
      return next.slice(0, 6);
    });
    // Keep focus inside the composer so the next emoji keeps inserting cleanly.
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className="flex w-full items-start justify-center px-6 py-8">
      <div className="flex w-full max-w-3xl flex-col gap-4 md:flex-row md:items-start">
        {/* Composer */}
        <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl border border-white/10 bg-neutral-950 p-4">
          <p className="text-[10px] uppercase tracking-widest text-white/45">
            Send to #launches
          </p>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message…"
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            />
            <Button
              onClick={() => setMessage("")}
              className="h-7 px-3 text-[11px]"
              variant="outline"
            >
              Clear
            </Button>
          </div>
          {recent.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-widest text-white/35">
                Recent
              </span>
              {recent.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => insert(e)}
                  className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-base leading-none transition-transform hover:scale-110 hover:bg-white/[0.08]"
                  aria-label={`Insert ${e}`}
                >
                  {e}
                </button>
              ))}
            </div>
          ) : null}
          <p className="text-[11px] leading-relaxed text-white/45">
            Tip: press <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-white/70">/</kbd> inside the picker
            to focus the search, then arrow keys to navigate.
          </p>
        </div>

        {/* Picker */}
        <EmojiPicker
          onSelect={insert}
          defaultCategory="smileys"
          columns={8}
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* NotificationBell — top-bar bell + unread badge + recent activity panel.  */
/* ----------------------------------------------------------------------- */
export function NotificationBellDemo() {
  const seed = React.useMemo<NotificationBellItem[]>(
    () => [
      {
        id: "mention",
        title: (
          <>
            <span className="text-sky-300">@maya</span> mentioned you in
            {" "}
            <span className="font-mono text-[12px] text-white/80">#design-system</span>
          </>
        ),
        body: "Can you take a look at the new dropdown anchor before we ship?",
        time: "2m",
        icon: (
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 12a9 9 0 1 1-3.5-7.1M21 5v5h-5"
              stroke="rgb(125,211,252)"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        id: "deploy",
        title: "Deploy succeeded — production",
        body: "build #1842 · 312 files · 24s",
        time: "12m",
        icon: (
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12l5 5L20 7"
              stroke="rgb(134, 239, 172)"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        id: "invoice",
        title: "Invoice #INV-0241 paid",
        body: "Acme Industries · $2,400.00",
        time: "1h",
        icon: (
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 7h18v10H3zM3 11h18"
              stroke="rgb(253, 224, 71)"
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        id: "release",
        title: "v1.18 release notes are live",
        body: "Includes 9 new SaaS components and a fresh CLI.",
        time: "Yesterday",
        read: true,
        icon: (
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 12h13l-4-4M16 12l-4 4"
              stroke="rgb(192, 132, 252)"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        id: "digest",
        title: "Weekly digest is ready",
        body: "Activity across 4 workspaces summarized for you.",
        time: "Mon",
        read: true,
      },
    ],
    []
  );

  const [items, setItems] = React.useState<NotificationBellItem[]>(seed);
  const [log, setLog] = React.useState<string>("ready");

  const markAllRead = () => {
    setItems((cur) => cur.map((n) => ({ ...n, read: true })));
    setLog("marked all read");
  };
  const markRead = (id: string) => {
    setItems((cur) => cur.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };
  const ping = () => {
    setItems((cur) => [
      {
        id: `evt-${Date.now()}`,
        title: "New activity",
        body: "Someone just joined your workspace.",
        time: "now",
      },
      ...cur,
    ]);
    setLog("new notification");
  };
  const reset = () => {
    setItems(seed);
    setLog("reset");
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-neutral-950 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="block h-6 w-6 rounded-md bg-gradient-to-br from-sky-300 to-violet-400"
          />
          <p className="text-[13px] font-semibold text-white">Acme HQ</p>
        </div>
        <NotificationBell
          notifications={items}
          onMarkAllRead={markAllRead}
          onMarkRead={markRead}
          onClickItem={(item) => setLog(`opened ${item.id}`)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 px-1">
        <Button size="sm" onClick={ping}>
          Send new notification
        </Button>
        <Button variant="outline" size="sm" onClick={markAllRead}>
          Mark all read
        </Button>
        <Button variant="outline" size="sm" onClick={reset}>
          Reset
        </Button>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-white/45">
          {log}
        </span>
      </div>
    </div>
  );
}

/* ----- PhoneInputDemo ----- */
export function PhoneInputDemo() {
  const [value, setValue] = React.useState("+14155550134");
  const [country, setCountry] = React.useState("US");

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] uppercase tracking-widest text-white/40">
          Mobile number
        </label>
        <PhoneInput
          value={value}
          onValueChange={setValue}
          onCountryChange={setCountry}
          defaultCountry="US"
          placeholder="(415) 555 0134"
        />
        <div className="flex items-center justify-between font-mono text-[10px] tabular-nums text-white/45">
          <span>Country: {country}</span>
          <span>Emits: {value || " "}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] uppercase tracking-widest text-white/40">
          Uncontrolled (defaultCountry=&quot;IN&quot;)
        </label>
        <PhoneInput defaultCountry="IN" placeholder="98765 43210" />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button
          className="h-8 px-3 text-xs"
          onClick={() => setValue("+447911123456")}
        >
          Set UK number
        </Button>
        <Button
          className="h-8 bg-white/[0.06] px-3 text-xs text-white/80 hover:bg-white/[0.1]"
          onClick={() => setValue("")}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SignaturePadDemo                                                           */
/* -------------------------------------------------------------------------- */
export function SignaturePadDemo() {
  const padRef = React.useRef<SignaturePadHandle | null>(null);
  const [saved, setSaved] = React.useState<string | null>(null);
  const [isEmpty, setIsEmpty] = React.useState(true);

  return (
    <div className="flex w-full max-w-[520px] flex-col gap-4">
      <SignaturePad
        ref={padRef}
        width={480}
        height={180}
        penColor="#fff"
        penWidth={2.2}
        placeholder="Sign here"
        onChange={(_, empty) => setIsEmpty(empty)}
        onClear={() => setSaved(null)}
        onSave={(dataUrl) => setSaved(dataUrl)}
      />

      <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-neutral-950 p-3 text-white">
        <div className="min-w-0">
          <p className="text-xs font-medium text-white/85">Acme Master Service Agreement</p>
          <p className="mt-0.5 text-[11px] text-white/45">
            {saved
              ? "Signature captured — ready to submit."
              : isEmpty
              ? "Awaiting signature from authorized signatory."
              : "Drawing in progress…"}
          </p>
        </div>
        <Button
          className="h-8 px-3 text-[11px]"
          onClick={() => padRef.current?.clear()}
        >
          Reset
        </Button>
      </div>

      {saved ? (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-300/20 bg-emerald-300/5 p-3 text-xs text-emerald-200">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-300/20 text-emerald-200">
            ✓
          </span>
          <span className="truncate font-mono text-[10px]">
            {saved.slice(0, 64)}…
          </span>
        </div>
      ) : null}
    </div>
  );
}

/* ----- VideoPlayerDemo ----- */
export function VideoPlayerDemo() {
  const clips = React.useMemo(
    () => [
      {
        title: "Designing for motion",
        subtitle: "Fable Studio · 4:32",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        poster:
          "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
        captionsSrc:
          "https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679957b8083e061177/raw/e19399fbccbc069a2af4266e5120ae6bad62699a/sample.vtt",
      },
      {
        title: "Inside the dashboard rebuild",
        subtitle: "Polar Hues · 6:18",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        poster:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    []
  );
  const [index, setIndex] = React.useState(0);
  const clip = clips[index] ?? clips[0]!;

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <VideoPlayer
        src={clip.src}
        poster={clip.poster}
        title={clip.title}
        subtitle={clip.subtitle}
        captionsSrc={clip.captionsSrc}
        onEnded={() => setIndex((i) => (i + 1) % clips.length)}
      />
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-white/55">
          Clip {index + 1} of {clips.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 px-3 text-[11px]"
            onClick={() =>
              setIndex((i) => (i - 1 + clips.length) % clips.length)
            }
          >
            Previous
          </Button>
          <Button
            className="h-8 px-3 text-[11px]"
            onClick={() => setIndex((i) => (i + 1) % clips.length)}
          >
            Next clip
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * VoiceMessage — a chat voice / audio message bubble with waveform,
 * play/pause, and a click-to-seek playhead. Two-message thread demo.
 * ------------------------------------------------------------------ */
export function VoiceMessageDemo() {
  // Hand-shaped waveform so the bubbles read like real speech instead of noise.
  const incomingWave = [
    0.18, 0.22, 0.38, 0.52, 0.65, 0.74, 0.7, 0.58, 0.46, 0.4, 0.55, 0.7, 0.82,
    0.92, 0.88, 0.74, 0.6, 0.5, 0.42, 0.36, 0.42, 0.55, 0.72, 0.86, 0.78, 0.6,
    0.46, 0.38, 0.32, 0.28, 0.34, 0.44, 0.56, 0.5, 0.4, 0.32, 0.26, 0.2, 0.16,
    0.14,
  ];

  const outgoingWave = [
    0.24, 0.36, 0.5, 0.42, 0.34, 0.46, 0.62, 0.78, 0.88, 0.74, 0.6, 0.5, 0.42,
    0.56, 0.72, 0.86, 0.92, 0.8, 0.66, 0.54, 0.46, 0.38, 0.44, 0.58, 0.72, 0.66,
    0.54, 0.42, 0.34, 0.4, 0.52, 0.66, 0.78, 0.7, 0.56, 0.44, 0.36, 0.3, 0.24,
    0.18,
  ];

  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-[420px] flex-col gap-3 rounded-2xl border border-white/10 bg-neutral-950 p-5">
        <VoiceMessage
          variant="incoming"
          avatar="https://i.pravatar.cc/72?img=47"
          avatarFallback="NV"
          src="https://www.soundjay.com/buttons/sounds/beep-07.mp3"
          duration={14}
          waveform={incomingWave}
          timestamp="9:41 AM"
        />
        <VoiceMessage
          variant="outgoing"
          avatarFallback="ME"
          src="https://www.soundjay.com/buttons/sounds/beep-09.mp3"
          duration={9}
          waveform={outgoingWave}
          timestamp="9:42 AM · Read"
        />
        <div className="mt-1 flex justify-end">
          <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px] text-white/55">
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
