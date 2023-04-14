import Icon from "../../Icon";
import "../../../styles/user/pomodoro/card.css";
import { memo, useEffect, useMemo, useRef } from "react";
import { useStore } from "@nanostores/react";
import { getCurrentTask, nextTask } from "../../../stores/pomodoro/tasks";

const catpack = [
    "cat-ballon.svg",
    "cat-fish.svg",
    "cat-flag.svg",
    "cat-spaceship.svg",
    "cat-surfing.svg",
    "cat-travel.svg",
];

const randomCatIcon = (pack) => pack[Math.floor(Math.random() * pack.length)];

const getXY = (e) => {
    let x = 0,
        y = 0;
    if (
        e.type == "touchstart" ||
        e.type == "touchmove" ||
        e.type == "touchend" ||
        e.type == "touchcancel"
    ) {
        const touch = e.touches[0] || e.touches[0];
        x = touch.pageX;
        y = touch.pageY;
    } else if (
        e.type == "mousedown" ||
        e.type == "mouseup" ||
        e.type == "mousemove" ||
        e.type == "mouseover" ||
        e.type == "mouseout" ||
        e.type == "mouseenter" ||
        e.type == "mouseleave"
    ) {
        x = e.clientX;
        y = e.clientY;
    }
    return { x, y };
};

function Card({ className, name, deadline = null, priority = "?", isCurrent, ...props }) {
    const catIcon = useMemo(() => randomCatIcon(catpack), []);
    const cardRef = useRef(null);

    const boundX = () => window.innerWidth / 2;
    const mouseTranslateInit = { x: 0, y: 0 };
    let startSwiping = false;
    let startNext = false;

    const onStartMoving = (ev) => {
        const pos = getXY(ev);
        mouseTranslateInit.x = pos.x;
        mouseTranslateInit.y = pos.y;
        startSwiping = true;
        cardRef?.current.setAttribute("moving", "");
        cardRef?.current.setAttribute("style", `--mX:${0}px;--mY:${0}px;`);
    };
    const onMoving = (ev) => {
        if (!startSwiping) return;
        requestAnimationFrame(() => {
            const pos = getXY(ev);
            const x = pos.x - mouseTranslateInit.x;
            const y = pos.y - mouseTranslateInit.y;
            const disapear = 1 - Math.abs(x / boundX());
            cardRef?.current.setAttribute(
                "style",
                `--mX:${x}px;--mY:${y}px;--opc:${disapear};`
            );
            startNext = (disapear < 0);
        });
    };
    const onEndMoving = (ev) => {
        startSwiping = false;
        cardRef?.current.removeAttribute("moving");
        cardRef?.current.setAttribute("style", `--mX:${0}px;--mY:${0}px;`);
        if (startNext) nextTask();
    };

    useEffect(() => {
        if (!isCurrent) return;
        window.addEventListener("mousemove", onMoving);
        window.addEventListener("mouseup", onEndMoving);
        window.addEventListener("touchmove", onMoving);
        window.addEventListener("touchend", onEndMoving);
        return () => {
            window.removeEventListener("mousemove", onMoving);
            window.removeEventListener("mouseup", onEndMoving);
            window.removeEventListener("touchmove", onMoving);
            window.removeEventListener("touchend", onEndMoving);
        };
    });

    const getHref = () => {
        const currentTaskId = getCurrentTask()?.id;
        if (!currentTaskId) return '';
        const url = new URL(`pomodoro/${currentTaskId}`, window.location.origin)
        return isCurrent ? url.toString() : '';
    }

    return (
        <div
            className={`card ${className || ""}`}
            ref={cardRef}
            onMouseDown={isCurrent ? onStartMoving : undefined}
            onTouchStart={isCurrent ? onStartMoving : undefined}
            {...props}
        >
            <div className="card__icon">
                <a className="card__icon__settings" href={`${getHref()}`}>
                    <Icon name="alarm-outline" />
                </a>
                <Icon
                    className="card__icon__inner"
                    src={`/media/spacecat-pack/${catIcon}`}
                />
            </div>
            <div className="card__info">
                <h2 className="card__info__name">{name}</h2>
                <h3>
                    Deadline: <b className="card__info__deadline">{deadline}</b>
                </h3>
            </div>
            <div className="card__priority">
                Priority
                <span className="card__priority__number">{priority}</span>
            </div>
        </div>
    );
}

export default memo(Card);
