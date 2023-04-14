import { useRef, useEffect, memo } from "react";
import { ss as secondCounter } from '../../../stores/pomodoro/time';
import "../../../styles/user/pomodoro/clock.css";

function PomodoroClock({startTime, totalMins, ...props}) {
    const { class: astroClassName, className, onFinish, ...childProps } = props;
    const clockRef = useRef(null);

    const totalMilis = totalMins*60*1000;

    const setTimeEllapsed = () => {
        const ellapsedTime = Date.now() - startTime;
        const seconds = Math.round(ellapsedTime / 1000);
        const ss = (seconds % 60).toString().padStart(2, '0');
        const mm = (Math.floor(seconds / 60)).toString().padStart(2, '0');
        secondCounter.set(seconds);
        
        clockRef.current.setAttribute('style', `--ss:'${ss}';--mm:'${mm}';--prc:${ellapsedTime / totalMilis * 100}%;`);
    };

    useEffect(() => {
        // const bound = clockRef.current.getBoundingClientRect();
        let interval = setInterval(() => {
            requestAnimationFrame(() => setTimeEllapsed());
        }, 1000);
        let timeout = setTimeout(onFinish, totalMilis);
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [startTime, totalMins]);

    return (
        <div
            ref={clockRef}            
            className={`pomodoro_clock ${className || ""} ${astroClassName || ""}`}
            {...childProps}
        >
            00:00
        </div>
    );
}

export default memo(PomodoroClock);
