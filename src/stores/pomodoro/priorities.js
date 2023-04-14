import { atom, map } from 'nanostores';
export const priorityById = map({});

export const getPriority = (id) => priorityById.get()[id];
export const setPriority = (id, priority) => priorityById.setKey(id, priority);
export const removeTask = (id) => priorityById.setKey(id, undefined);

export const getPriorities = () => getTaskIds().map(taskId => {
    return {taskId: taskId, priority: getPriority(taskId)};
});
export const getTaskIds = () => {
    const dict = priorityById.get();
    if (!dict) return [];
    return Object.keys(dict);
};

export const isEmpty = () => !(getTaskIds().length);
export const isNotEmpty = () => getTaskIds().length;