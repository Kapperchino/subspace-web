import { createLocalStorage } from "@macfja/svelte-persistent-store";
import { persisted } from "svelte-persisted-store";
import { writable } from "svelte/store";

export const theme = persisted("theme", "dark");
