import { atom } from "nanostores";

export const ss = atom(0);
export const mm = atom(0);

export const cycle = atom(1);
export const getCycle = () => cycle.get();
export const increaseCycle = () => cycle.set(getCycle()+1);
export const resetCycle = () => cycle.set(1);