export class User {
    constructor(tasks={}) {
        this.tasks = tasks;
    }
    toString() {
        return `User(${this.tasks})`;
    }
}

// Firestore data converter
export const userConverter = {
    toFirestore: (user) => {
        return {
            tasks: user.tasks
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        const tasks = data.tasks;
        return new User(tasks);
    },
};