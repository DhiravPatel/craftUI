import type { Registry, RegistryEntry } from "./types";

import accordion from "./components/accordion.json";
import alert from "./components/alert.json";
import alertDialog from "./components/alert-dialog.json";
import avatar from "./components/avatar.json";
import badge from "./components/badge.json";
import breadcrumb from "./components/breadcrumb.json";
import button from "./components/button.json";
import calendar from "./components/calendar.json";
import card from "./components/card.json";
import checkbox from "./components/checkbox.json";
import combobox from "./components/combobox.json";
import command from "./components/command.json";
import datePicker from "./components/date-picker.json";
import dialog from "./components/dialog.json";
import drawer from "./components/drawer.json";
import dropdownMenu from "./components/dropdown-menu.json";
import form from "./components/form.json";
import input from "./components/input.json";
import label from "./components/label.json";
import layout from "./components/layout.json";
import navbar from "./components/navbar.json";
import pagination from "./components/pagination.json";
import popover from "./components/popover.json";
import progress from "./components/progress.json";
import radioGroup from "./components/radio-group.json";
import scrollArea from "./components/scroll-area.json";
import select from "./components/select.json";
import separator from "./components/separator.json";
import sidebar from "./components/sidebar.json";
import skeleton from "./components/skeleton.json";
import slider from "./components/slider.json";
import spinner from "./components/spinner.json";
import switchEntry from "./components/switch.json";
import table from "./components/table.json";
import tabs from "./components/tabs.json";
import textarea from "./components/textarea.json";
import themeProvider from "./components/theme-provider.json";
import toast from "./components/toast.json";
import tooltip from "./components/tooltip.json";

export const registry: Registry = [
  accordion,
  alert,
  alertDialog,
  avatar,
  badge,
  breadcrumb,
  button,
  calendar,
  card,
  checkbox,
  combobox,
  command,
  datePicker,
  dialog,
  drawer,
  dropdownMenu,
  form,
  input,
  label,
  layout,
  navbar,
  pagination,
  popover,
  progress,
  radioGroup,
  scrollArea,
  select,
  separator,
  sidebar,
  skeleton,
  slider,
  spinner,
  switchEntry,
  table,
  tabs,
  textarea,
  themeProvider,
  toast,
  tooltip,
] as Registry;

export function getRegistryEntry(name: string): RegistryEntry | undefined {
  return registry.find((e) => e.name === name);
}

export function listRegistry(): RegistryEntry[] {
  return [...registry].sort((a, b) => a.name.localeCompare(b.name));
}

export type { Registry, RegistryEntry, RegistryFile } from "./types";
