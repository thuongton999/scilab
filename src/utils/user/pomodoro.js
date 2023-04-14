import { Task, taskConverter } from '../../components/user/pomodoro/Task';
import { User, userConverter } from '../../components/user/User';
import {
    addDocument,
    createDocRef,
    deleteDocument,
    getCollectionRef,
    getDocument,
    setDocument,
    updateDocument
} from "../firebase";
import { tasks, getTasks as getCachedTasks, setTask } from '../../stores/pomodoro/tasks';
import { query, where, getDocs } from "firebase/firestore";

export const createTask = async (userId) => {
    const newTask = new Task(userId);
    return await addDocument("tasks", newTask, taskConverter);
};

export const getTasks = async (userId) => {
    const me = await getDocument("users", userId);
    return me?.tasks;
}

export const createUser = async (userId) => {
    const user = await getDocument('users', userId);
    if (user) return;
    setDocument('users', userId, new User({}), userConverter);
    return await createTask(userId)
        .then(docRef => {
            linkTaskToUser(docRef.id, userId);
        })
}

export const linkTaskToUser = async (taskId, userId) => {
    const docRef = createDocRef('tasks', taskId, taskConverter);
    const field = {};
    field[`tasks.${docRef.id}`] = 0;
    return await updateDocument('users', userId, field, userConverter)
        .then(() => docRef)
        .catch((error) => {
            console.error("Error retrieving document:", error);
        });
}

// export const unlinkTaskFromUser = async (taskId, userId) => {
//     const docRef = createDocRef('tasks', taskId, taskConverter);

// }

export const deleteTask = async (taskId) => {
    // unlinkTaskFromUser
    return await deleteDocument('tasks', taskId);
}

export const getAllTasks = async (userId) => {
    const tasksRef = getCollectionRef('tasks');
    const q = query(tasksRef, where('ownerId', '==', userId)).withConverter(taskConverter);
    return await getDocs(q);
}

export const setTaskPriority = async (taskId, userId, priority) => {
    const field = {};
    field[`tasks.${taskId}`] = priority;
    return await updateDocument('users', userId, field, userConverter)
        .catch((error) => {
            console.error("Error retrieving document:", error);
        });
}

export const startTask = async (taskId) => {
    return await updateDocument('tasks', taskId, {startTime: Date.now()}, taskConverter);
}

export const updateTasksCache = async (userId) => {
    return await getAllTasks(userId).then((snapshot) => {
        const userTasks = [];
        snapshot.forEach((docRef) =>
            userTasks.push({
                id: docRef.id,
                data: docRef.data(),
            })
        );
        tasks.set(userTasks);
    });
};

export const updateTaskCache = async (taskId) => {
    return await getDocument('tasks', taskId, taskConverter)
        .then(taskData => {
            if (!taskData) return;
            const idx = getCachedTasks().findIndex(task => task.id === taskId);
            if (idx < 0) return;
            setTask(idx, {
                id: taskId,
                data: taskData
            });
        })
}