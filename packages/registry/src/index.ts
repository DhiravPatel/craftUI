import type { Registry, RegistryEntry } from "./types";

import accordion from "./components/accordion.json";
import activityHeatmap from "./components/activity-heatmap.json";
import addressForm from "./components/address-form.json";
import alert from "./components/alert.json";
import alertDialog from "./components/alert-dialog.json";
import animatedBeam from "./components/animated-beam.json";
import animatedChart from "./components/animated-chart.json";
import animatedText from "./components/animated-text.json";
import animatedTooltip from "./components/animated-tooltip.json";
import apiKeyDisplay from "./components/api-key-display.json";
import audioPlayer from "./components/audio-player.json";
import audioVisualizer from "./components/audio-visualizer.json";
import aurora from "./components/aurora.json";
import authCard from "./components/auth-card.json";
import avatar from "./components/avatar.json";
import avatarStack from "./components/avatar-stack.json";
import backgroundBeams from "./components/background-beams.json";
import backgroundBoxes from "./components/background-boxes.json";
import badge from "./components/badge.json";
import banner from "./components/banner.json";
import bentoGrid from "./components/bento-grid.json";
import breadcrumb from "./components/breadcrumb.json";
import button from "./components/button.json";
import calendar from "./components/calendar.json";
import card from "./components/card.json";
import cardHoverEffect from "./components/card-hover-effect.json";
import cardStack from "./components/card-stack.json";
import carousel3d from "./components/carousel-3d.json";
import chatBubble from "./components/chat-bubble.json";
import checkbox from "./components/checkbox.json";
import codeRain from "./components/code-rain.json";
import coinFlip from "./components/coin-flip.json";
import combobox from "./components/combobox.json";
import command from "./components/command.json";
import contextMenu from "./components/context-menu.json";
import compare from "./components/compare.json";
import comparisonTable from "./components/comparison-table.json";
import colorPicker from "./components/color-picker.json";
import commentThread from "./components/comment-thread.json";
import cookieBanner from "./components/cookie-banner.json";
import confetti from "./components/confetti.json";
import copyButton from "./components/copy-button.json";
import countUpRing from "./components/count-up-ring.json";
import countdownTimer from "./components/countdown-timer.json";
import coverflow from "./components/coverflow.json";
import cube from "./components/cube.json";
import cubeMatrix from "./components/cube-matrix.json";
import currencyInput from "./components/currency-input.json";
import cursorTrail from "./components/cursor-trail.json";
import dataTable from "./components/data-table.json";
import datePicker from "./components/date-picker.json";
import dateRangePicker from "./components/date-range-picker.json";
import diceRoll from "./components/dice-roll.json";
import dialog from "./components/dialog.json";
import directionAwareHover from "./components/direction-aware-hover.json";
import dotPattern from "./components/dot-pattern.json";
import dotProgress from "./components/dot-progress.json";
import drawer from "./components/drawer.json";
import dropdownMenu from "./components/dropdown-menu.json";
import emojiPicker from "./components/emoji-picker.json";
import emptyState from "./components/empty-state.json";
import evervaultCard from "./components/evervault-card.json";
import featureCard from "./components/feature-card.json";
import fileUpload from "./components/file-upload.json";
import flipCard from "./components/flip-card.json";
import flipWords from "./components/flip-words.json";
import floatingDock from "./components/floating-dock.json";
import fluxPanels from "./components/flux-panels.json";
import focusCards from "./components/focus-cards.json";
import foldOut from "./components/fold-out.json";
import followingPointer from "./components/following-pointer.json";
import footer from "./components/footer.json";
import form from "./components/form.json";
import gaugeMeter from "./components/gauge-meter.json";
import glassCard from "./components/glass-card.json";
import glitchClip from "./components/glitch-clip.json";
import globe from "./components/globe.json";
import gravityWell from "./components/gravity-well.json";
import helix from "./components/helix.json";
import holdToConfirm from "./components/hold-to-confirm.json";
import holoCard from "./components/holo-card.json";
import holoSlices from "./components/holo-slices.json";
import hoverBorderGradient from "./components/hover-border-gradient.json";
import heartbeatMonitor from "./components/heartbeat-monitor.json";
import hoverCard from "./components/hover-card.json";
import infiniteMovingCards from "./components/infinite-moving-cards.json";
import input from "./components/input.json";
import inlineEdit from "./components/inline-edit.json";
import inputOtp from "./components/input-otp.json";
import invitePeople from "./components/invite-people.json";
import kanbanBoard from "./components/kanban-board.json";
import kbd from "./components/kbd.json";
import label from "./components/label.json";
import lamp from "./components/lamp.json";
import layout from "./components/layout.json";
import lens from "./components/lens.json";
import logoCloud from "./components/logo-cloud.json";
import magicLayer from "./components/magic-layer.json";
import magnet from "./components/magnet.json";
import magneticButton from "./components/magnetic-button.json";
import marquee3d from "./components/marquee-3d.json";
import mentionInput from "./components/mention-input.json";
import meshGradient from "./components/mesh-gradient.json";
import meteors from "./components/meteors.json";
import movingBorder from "./components/moving-border.json";
import multiStepLoader from "./components/multi-step-loader.json";
import navbar from "./components/navbar.json";
import neonGlow from "./components/neon-glow.json";
import neonPortal from "./components/neon-portal.json";
import notificationBell from "./components/notification-bell.json";
import notificationStack from "./components/notification-stack.json";
import numberFlip from "./components/number-flip.json";
import numberInput from "./components/number-input.json";
import numberTicker from "./components/number-ticker.json";
import onboardingChecklist from "./components/onboarding-checklist.json";
import orbitStack from "./components/orbit-stack.json";
import orbitalMenu from "./components/orbital-menu.json";
import orbitingCircles from "./components/orbiting-circles.json";
import pageCurl from "./components/page-curl.json";
import pagination from "./components/pagination.json";
import paperPlane from "./components/paper-plane.json";
import parallax from "./components/parallax.json";
import passwordStrengthMeter from "./components/password-strength-meter.json";
import paymentCard from "./components/payment-card.json";
import perspectiveBox from "./components/perspective-box.json";
import phoneInput from "./components/phone-input.json";
import phoneMockup from "./components/phone-mockup.json";
import pin3d from "./components/pin-3d.json";
import planCard from "./components/plan-card.json";
import pinBoard from "./components/pin-board.json";
import plasmaField from "./components/plasma-field.json";
import prismOrb from "./components/prism-orb.json";
import popover from "./components/popover.json";
import portalRings from "./components/portal-rings.json";
import pricingCards from "./components/pricing-cards.json";
import pricingSlider from "./components/pricing-slider.json";
import progress from "./components/progress.json";
import quantumGrid from "./components/quantum-grid.json";
import radioGroup from "./components/radio-group.json";
import rating from "./components/rating.json";
import resizable from "./components/resizable.json";
import retroGrid from "./components/retro-grid.json";
import reviewCard from "./components/review-card.json";
import ripple from "./components/ripple.json";
import scratchCard from "./components/scratch-card.json";
import scrollArea from "./components/scroll-area.json";
import scrollProgress from "./components/scroll-progress.json";
import segmentedControl from "./components/segmented-control.json";
import select from "./components/select.json";
import separator from "./components/separator.json";
import sheet from "./components/sheet.json";
import sidebar from "./components/sidebar.json";
import signaturePad from "./components/signature-pad.json";
import skeleton from "./components/skeleton.json";
import slider from "./components/slider.json";
import sparkles from "./components/sparkles.json";
import sparklesText from "./components/sparkles-text.json";
import sparkline from "./components/sparkline.json";
import spinner from "./components/spinner.json";
import splitFlap from "./components/split-flap.json";
import spotlight from "./components/spotlight.json";
import stat from "./components/stat.json";
import statCard from "./components/stat-card.json";
import statRing from "./components/stat-ring.json";
import statusDot from "./components/status-dot.json";
import stepper from "./components/stepper.json";
import swipeStack from "./components/swipe-stack.json";
import switchEntry from "./components/switch.json";
import table from "./components/table.json";
import tabs from "./components/tabs.json";
import tagInput from "./components/tag-input.json";
import taskCard from "./components/task-card.json";
import testimonialQuote from "./components/testimonial-quote.json";
import textGenerateEffect from "./components/text-generate-effect.json";
import textScramble from "./components/text-scramble.json";
import textarea from "./components/textarea.json";
import themeProvider from "./components/theme-provider.json";
import themeSelector from "./components/theme-selector.json";
import themeToggle from "./components/theme-toggle.json";
import tilt from "./components/tilt.json";
import tiltTiles from "./components/tilt-tiles.json";
import timePicker from "./components/time-picker.json";
import timeline from "./components/timeline.json";
import toast from "./components/toast.json";
import toggle from "./components/toggle.json";
import toggleGroup from "./components/toggle-group.json";
import toolbar from "./components/toolbar.json";
import tooltip from "./components/tooltip.json";
import tracingBeam from "./components/tracing-beam.json";
import treeView from "./components/tree-view.json";
import twoFactorSetup from "./components/two-factor-setup.json";
import usageBar from "./components/usage-bar.json";
import videoPlayer from "./components/video-player.json";
import voiceMessage from "./components/voice-message.json";
import voteWidget from "./components/vote-widget.json";
import waveGrid from "./components/wave-grid.json";
import wavyBackground from "./components/wavy-background.json";
import wavyText from "./components/wavy-text.json";
import worldMap from "./components/world-map.json";

export const registry: Registry = [
  accordion,
  activityHeatmap,
  addressForm,
  alert,
  alertDialog,
  animatedBeam,
  animatedChart,
  animatedText,
  animatedTooltip,
  apiKeyDisplay,
  audioPlayer,
  audioVisualizer,
  aurora,
  authCard,
  avatar,
  avatarStack,
  backgroundBeams,
  backgroundBoxes,
  badge,
  banner,
  bentoGrid,
  breadcrumb,
  button,
  calendar,
  card,
  cardHoverEffect,
  cardStack,
  carousel3d,
  chatBubble,
  checkbox,
  codeRain,
  coinFlip,
  combobox,
  command,
  contextMenu,
  compare,
  comparisonTable,
  colorPicker,
  commentThread,
  cookieBanner,
  confetti,
  copyButton,
  countUpRing,
  countdownTimer,
  coverflow,
  cube,
  cubeMatrix,
  currencyInput,
  cursorTrail,
  dataTable,
  datePicker,
  dateRangePicker,
  diceRoll,
  dialog,
  directionAwareHover,
  dotPattern,
  dotProgress,
  drawer,
  dropdownMenu,
  emojiPicker,
  emptyState,
  evervaultCard,
  featureCard,
  fileUpload,
  flipCard,
  flipWords,
  floatingDock,
  fluxPanels,
  focusCards,
  foldOut,
  followingPointer,
  footer,
  form,
  gaugeMeter,
  glassCard,
  glitchClip,
  globe,
  gravityWell,
  helix,
  holdToConfirm,
  holoCard,
  holoSlices,
  hoverBorderGradient,
  heartbeatMonitor,
  hoverCard,
  infiniteMovingCards,
  input,
  inlineEdit,
  inputOtp,
  invitePeople,
  kanbanBoard,
  kbd,
  label,
  lamp,
  layout,
  lens,
  logoCloud,
  magicLayer,
  magnet,
  magneticButton,
  marquee3d,
  mentionInput,
  meshGradient,
  meteors,
  movingBorder,
  multiStepLoader,
  navbar,
  neonGlow,
  neonPortal,
  notificationBell,
  notificationStack,
  numberFlip,
  numberInput,
  numberTicker,
  onboardingChecklist,
  orbitStack,
  orbitalMenu,
  orbitingCircles,
  pageCurl,
  pagination,
  paperPlane,
  parallax,
  passwordStrengthMeter,
  paymentCard,
  perspectiveBox,
  phoneInput,
  phoneMockup,
  pin3d,
  pinBoard,
  planCard,
  plasmaField,
  prismOrb,
  popover,
  portalRings,
  pricingCards,
  pricingSlider,
  progress,
  quantumGrid,
  radioGroup,
  rating,
  resizable,
  retroGrid,
  reviewCard,
  ripple,
  scratchCard,
  scrollArea,
  scrollProgress,
  segmentedControl,
  select,
  separator,
  sheet,
  sidebar,
  signaturePad,
  skeleton,
  slider,
  sparkles,
  sparklesText,
  sparkline,
  spinner,
  splitFlap,
  spotlight,
  stat,
  statCard,
  statRing,
  statusDot,
  stepper,
  swipeStack,
  switchEntry,
  table,
  tabs,
  tagInput,
  taskCard,
  testimonialQuote,
  textGenerateEffect,
  textScramble,
  textarea,
  themeProvider,
  themeSelector,
  themeToggle,
  tilt,
  tiltTiles,
  timePicker,
  timeline,
  toast,
  toggle,
  toggleGroup,
  toolbar,
  tooltip,
  tracingBeam,
  treeView,
  twoFactorSetup,
  usageBar,
  videoPlayer,
  voiceMessage,
  voteWidget,
  waveGrid,
  wavyBackground,
  wavyText,
  worldMap,
] as Registry;

export function getRegistryEntry(name: string): RegistryEntry | undefined {
  return registry.find((e) => e.name === name);
}

export function listRegistry(): RegistryEntry[] {
  return [...registry].sort((a, b) => a.name.localeCompare(b.name));
}

export type { Registry, RegistryEntry, RegistryFile } from "./types";
