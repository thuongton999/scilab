import { persistentAtom } from '@nanostores/persistent';

export const tasks = new persistentAtom('tasks', [], {
    encode: JSON.stringify,
    decode: JSON.parse
});

export const addTask = (newTask) => tasks.set([...getTasks(), newTask]);
export const getTasks = () => tasks.get();
export const setTask = (i, value) => tasks.get()[i] = value;

export const currentTaskIndex = new persistentAtom('currentTaskIdx', 0);
export const getCurrentTaskIndex = () => parseInt(currentTaskIndex.get());
export const increaseTaskIndex = (i) => {
    const length = getTasks().length;
    return (getCurrentTaskIndex()+i) % length;
}
export const nextTask = () => currentTaskIndex.set(increaseTaskIndex(1));
export const resetTask = () => currentTaskIndex.set(0);
export const getCurrentTask = () => getTasks()[getCurrentTaskIndex()];