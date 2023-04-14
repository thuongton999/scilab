import { Suspense, lazy, useEffect, useState } from "react";
import { getTasks } from "../../../stores/pomodoro/tasks";
import {
    startTask,
    updateTaskCache,
    updateTasksCache,
} from "../../../utils/user/pomodoro";
import { auth, onDocumentUpdate } from "../../../utils/firebase";
import Loading from "../../Loading";
import { taskConverter } from "./Task";
import { mm, ss } from "../../../stores/pomodoro/time";
const Page404 = lazy(() => import("../../404"));

const checkId = (id) => {
    const ids = getTasks().map((task) => task.id);
    return ids.includes(id);
};

function Timer({ id, ...props }) {
    const { className, children, class: astroClassName, ...childrenProps } = props;
    const [isTimerStart, setTimerStart] = useState(false);
    const [isValidId, setIsValidId] = useState(checkId(id));

    useEffect(() => {
        let unsub = null;
        return auth.onAuthStateChanged(async (user) => {
            if (!user) return;
            return await updateTasksCache(user.uid)
                .then(() => {
                    if (!checkId(id)) return;
                    unsub = onDocumentUpdate(
                        "tasks",
                        id,
                        () => updateTaskCache(id),
                        taskConverter
                    );
                })
                .then(() => {
                    startTask(id).then(() => {
                        setTimerStart(true);
                        setIsValidId(true);
                        ss.set(0);
                        mm.set(0);
                    });
                    return unsub;
                });
        });
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            {isValidId ? (
                isTimerStart ? (
                    <div
                        className={`${className||''} ${astroClassName||''}`}
                        {...childrenProps}
                    >
                        {children}
                    </div>
                ) : (<Loading />)
            ) : (<Page404 />)}
        </Suspense>
    );
}

export default Timer;
