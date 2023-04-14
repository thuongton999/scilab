class Task {
    constructor(
        ownerId,
        startTime=null,
        name='Task',
        cycle=4,
        workminutes=25,
        breakminutes=5,
        deadline=null
    ) {
        this.ownerId = ownerId;
        this.startTime=startTime;
        this.name = name;
        this.cycle = cycle;
        this.workminutes = workminutes;
        this.breakminutes_long = (breakminutes + workminutes) / 2;
        this.breakminutes_short = breakminutes;
        this.deadline = deadline;
    }
    toString() {
        return `Task(
            ${this.name},
            ${this.cycle},
            ${this.workminutes},
            ${this.breakminutes_long},
            ${this.breakminutes_short},
            ${this.deadline}) ~ ${this.ownerId} : (${this.startTime})`;
    }
}

// Firestore data converter
const taskConverter = {
    toFirestore: (task) => {
        return {
            ownerId: task.ownerId,
            startTime: task.startTime,
            name: task.name,
            cycle: task.cycle,
            workminutes: task.workminutes,
            breakminutes: task.breakminutes_short,
            deadline: task.deadline,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Task(
            data.ownerId,
            data.startTime,
            data.name,
            data.cycle,
            data.workminutes,
            data.breakminutes,
            data.deadline
        );
    },
};

export { Task, taskConverter };