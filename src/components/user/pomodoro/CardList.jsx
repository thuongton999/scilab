import "../../../styles/user/pomodoro/cardlist.css";
import { Suspense, lazy, useEffect } from "react";
import Loading from "../../Loading";
import { getTaskIds, isNotEmpty, priorityById } from "../../../stores/pomodoro/priorities";
import {
    tasks,
    getCurrentTaskIndex,
    increaseTaskIndex,
    currentTaskIndex,
} from "../../../stores/pomodoro/tasks";
import { useStore } from "@nanostores/react";
const Card = lazy(() => import("./Card"));

function CardList(props) {
    const { className } = props;
    const userTasks = useStore(tasks);
    const priorityDict = useStore(priorityById);
    const _ = useStore(currentTaskIndex);

    const activeList = () => [
        getCurrentTaskIndex(),
        increaseTaskIndex(1),
        increaseTaskIndex(2),
    ];
    const isActive = (i) => activeList().includes(i);

    const sortByPriority = (list) => {
        if (list.length === 0) return [];
        return list.sort((a, b) => priorityDict[a.id] - priorityDict[b.id]);
    };

    useEffect(() => {
        if (getTaskIds().length === 0) return;
        tasks.set(sortByPriority(userTasks));
    }, [priorityDict]);


    return (
        <Suspense fallback={<Loading />}>
            <div className={`cardlist ${className || ""}`}>
                {isNotEmpty()
                    ? userTasks.map((userTask, idx) => (
                          <Card
                              className={
                                  isActive(idx) &&
                                  `card--active card__idx${activeList().indexOf(
                                      idx
                                  )}`
                              }
                              name={userTask?.data.name}
                              priority={priorityDict[userTask?.id]}
                              deadline={userTask?.data.deadline}
                              isCurrent={idx == activeList()[0]}
                              key={idx}
                          />
                      ))
                    : undefined}
            </div>
        </Suspense>
    );
}

export default CardList;
