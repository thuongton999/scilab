import { lazy, useCallback, useEffect, useState } from "react";
import { getCurrentTask, tasks } from "../../../stores/pomodoro/tasks";
import "../../../styles/user/pomodoro/cycle.css";
import { useStore } from "@nanostores/react";
import { cycle, increaseCycle, resetCycle, ss } from "../../../stores/pomodoro/time";
const UserName = lazy(() => import("../UserName"));
const PomodoroClock = lazy(() => import("../pomodoro/PomodoroClock"));

const isNotEmpty = (list) => {
    return list.length > 0;
};

function PomodoroCycle(props) {
    const { class: astroClassName, className, ...childProps } = props;
    const [workTime, setWorkTime] = useState(true);
    const [startTime, setStartTime] = useState(Date.now());
    const userTasks = useStore(tasks);
    const pCycle = useStore(cycle);
    // const resetClock = useCallback(() => setWorkTime(!workTime), []);

    const getMinutes = () => {
        const currentTask = getCurrentTask().data;
        if (workTime) return currentTask.workminutes;
        return pCycle % currentTask.cycle === 0
            ? currentTask.breakminutes_long
            : currentTask.breakminutes_short;
    };

    const onFinish = () => {
        setWorkTime(!workTime);
        setStartTime(Date.now());
        if (!workTime) increaseCycle();
    }

    useEffect(() => {
        const curTask = getCurrentTask().data;
        if (pCycle % curTask.cycle === 0) resetCycle();
    }, [pCycle]);

    return (
        <div className={`cycle ${className || ""} ${astroClassName || ""}`}>
            {workTime ? (
                <h1>
                    Focus on your process, <UserName className="username" />
                </h1>
            ) : (
                <h1>Take a break</h1>
            )}
            {isNotEmpty(userTasks) ? (
                <PomodoroClock
                    className="cycle__clock"
                    startTime={startTime}
                    totalMins={getMinutes()}
                    onFinish={onFinish}
                />
            ) : undefined}
        </div>
    );
}

export default PomodoroCycle;
