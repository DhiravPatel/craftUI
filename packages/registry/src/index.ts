import type { Registry, RegistryEntry } from "./types";

import accordion from "./components/accordion.json";
import alert from "./components/alert.json";
import alertDialog from "./components/alert-dialog.json";
import animatedText from "./components/animated-text.json";
import animatedTooltip from "./components/animated-tooltip.json";
import aurora from "./components/aurora.json";
import avatar from "./components/avatar.json";
import backgroundBeams from "./components/background-beams.json";
import backgroundBoxes from "./components/background-boxes.json";
import badge from "./components/badge.json";
import bentoGrid from "./components/bento-grid.json";
import breadcrumb from "./components/breadcrumb.json";
import button from "./components/button.json";
import calendar from "./components/calendar.json";
import card from "./components/card.json";
import cardHoverEffect from "./components/card-hover-effect.json";
import cardStack from "./components/card-stack.json";
import carousel3d from "./components/carousel-3d.json";
import checkbox from "./components/checkbox.json";
import combobox from "./components/combobox.json";
import command from "./components/command.json";
import compare from "./components/compare.json";
import coverflow from "./components/coverflow.json";
import cube from "./components/cube.json";
import datePicker from "./components/date-picker.json";
import dialog from "./components/dialog.json";
import directionAwareHover from "./components/direction-aware-hover.json";
import drawer from "./components/drawer.json";
import dropdownMenu from "./components/dropdown-menu.json";
import emptyState from "./components/empty-state.json";
import evervaultCard from "./components/evervault-card.json";
import fileUpload from "./components/file-upload.json";
import flipCard from "./components/flip-card.json";
import floatingDock from "./components/floating-dock.json";
import focusCards from "./components/focus-cards.json";
import followingPointer from "./components/following-pointer.json";
import footer from "./components/footer.json";
import form from "./components/form.json";
import globe from "./components/globe.json";
import holoCard from "./components/holo-card.json";
import hoverBorderGradient from "./components/hover-border-gradient.json";
import hoverCard from "./components/hover-card.json";
import infiniteMovingCards from "./components/infinite-moving-cards.json";
import input from "./components/input.json";
import inputOtp from "./components/input-otp.json";
import kbd from "./components/kbd.json";
import label from "./components/label.json";
import lamp from "./components/lamp.json";
import layout from "./components/layout.json";
import lens from "./components/lens.json";
import magnet from "./components/magnet.json";
import marquee3d from "./components/marquee-3d.json";
import meteors from "./components/meteors.json";
import movingBorder from "./components/moving-border.json";
import multiStepLoader from "./components/multi-step-loader.json";
import navbar from "./components/navbar.json";
import neonGlow from "./components/neon-glow.json";
import numberTicker from "./components/number-ticker.json";
import orbitingCircles from "./components/orbiting-circles.json";
import pagination from "./components/pagination.json";
import parallax from "./components/parallax.json";
import pin3d from "./components/pin-3d.json";
import popover from "./components/popover.json";
import progress from "./components/progress.json";
import radioGroup from "./components/radio-group.json";
import rating from "./components/rating.json";
import scrollArea from "./components/scroll-area.json";
import select from "./components/select.json";
import separator from "./components/separator.json";
import sheet from "./components/sheet.json";
import sidebar from "./components/sidebar.json";
import skeleton from "./components/skeleton.json";
import slider from "./components/slider.json";
import sparkles from "./components/sparkles.json";
import sparklesText from "./components/sparkles-text.json";
import spinner from "./components/spinner.json";
import spotlight from "./components/spotlight.json";
import stat from "./components/stat.json";
import stepper from "./components/stepper.json";
import switchEntry from "./components/switch.json";
import table from "./components/table.json";
import tabs from "./components/tabs.json";
import textarea from "./components/textarea.json";
import themeProvider from "./components/theme-provider.json";
import tilt from "./components/tilt.json";
import timeline from "./components/timeline.json";
import toast from "./components/toast.json";
import toggle from "./components/toggle.json";
import toggleGroup from "./components/toggle-group.json";
import tooltip from "./components/tooltip.json";
import tracingBeam from "./components/tracing-beam.json";
import wavyBackground from "./components/wavy-background.json";
import wavyText from "./components/wavy-text.json";
import worldMap from "./components/world-map.json";

export const registry: Registry = [
  accordion,
  alert,
  alertDialog,
  animatedText,
  animatedTooltip,
  aurora,
  avatar,
  backgroundBeams,
  backgroundBoxes,
  badge,
  bentoGrid,
  breadcrumb,
  button,
  calendar,
  card,
  cardHoverEffect,
  cardStack,
  carousel3d,
  checkbox,
  combobox,
  command,
  compare,
  coverflow,
  cube,
  datePicker,
  dialog,
  directionAwareHover,
  drawer,
  dropdownMenu,
  emptyState,
  evervaultCard,
  fileUpload,
  flipCard,
  floatingDock,
  focusCards,
  followingPointer,
  footer,
  form,
  globe,
  holoCard,
  hoverBorderGradient,
  hoverCard,
  infiniteMovingCards,
  input,
  inputOtp,
  kbd,
  label,
  lamp,
  layout,
  lens,
  magnet,
  marquee3d,
  meteors,
  movingBorder,
  multiStepLoader,
  navbar,
  neonGlow,
  numberTicker,
  orbitingCircles,
  pagination,
  parallax,
  pin3d,
  popover,
  progress,
  radioGroup,
  rating,
  scrollArea,
  select,
  separator,
  sheet,
  sidebar,
  skeleton,
  slider,
  sparkles,
  sparklesText,
  spinner,
  spotlight,
  stat,
  stepper,
  switchEntry,
  table,
  tabs,
  textarea,
  themeProvider,
  tilt,
  timeline,
  toast,
  toggle,
  toggleGroup,
  tooltip,
  tracingBeam,
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
