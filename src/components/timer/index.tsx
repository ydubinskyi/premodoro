import { FunctionalComponent, h } from "preact";
import { useEffect, useCallback, useReducer } from "preact/hooks";
import * as style from "./style.css";

import TimeText from "../time-text";
import CircleProgress from "../circle-progress";
import IconButton from "../icon-button";

enum TimerMode {
    POMODORO = "pomodoro",
    SHORT_BREAK = "short-break",
    LONG_BREAK = "long-break"
}

type ActionType =
    | "toggleTimer"
    | "resetTimer"
    | "setTime"
    | "changeTimerMode"
    | "switchToNextMode";

const initialState = {
    isRunning: false,
    timeLeft: 25 * 60,
    cyclesCount: 0,
    longBreakInterval: 4,
    activeMode: TimerMode.POMODORO,
    modesLength: {
        [TimerMode.POMODORO]: 25 * 60,
        [TimerMode.SHORT_BREAK]: 5 * 60,
        [TimerMode.LONG_BREAK]: 15 * 60
    }
};

const Timer: FunctionalComponent = () => {
    const [state, dispatch] = useReducer(
        (state, action: { type: ActionType; payload?: any }) => {
            switch (action.type) {
                case "toggleTimer":
                    return {
                        ...state,
                        isRunning: !state.isRunning
                    };
                case "setTime":
                    return {
                        ...state,
                        timeLeft: action.payload
                    };
                case "changeTimerMode":
                    const mode = action.payload as TimerMode;
                    return {
                        ...state,
                        isRunning: false,
                        activeMode: mode,
                        timeLeft: state.modesLength[mode]
                    };
                case "switchToNextMode":
                    const {
                        cyclesCount,
                        longBreakInterval,
                        activeMode,
                        modesLength
                    } = state;
                    let nextMode;
                    let nextCyclesCount = cyclesCount;

                    if (cyclesCount < longBreakInterval - 1) {
                        nextMode =
                            activeMode === TimerMode.POMODORO
                                ? TimerMode.SHORT_BREAK
                                : TimerMode.POMODORO;
                        nextCyclesCount =
                            activeMode === TimerMode.SHORT_BREAK
                                ? cyclesCount + 1
                                : cyclesCount;
                    } else {
                        nextMode = TimerMode.LONG_BREAK;
                        nextCyclesCount = 0;
                    }
                    return {
                        ...state,
                        activeMode: nextMode,
                        timeLeft: modesLength[nextMode],
                        cyclesCount: nextCyclesCount
                    };
                default:
                    throw new Error("Unexpected action");
            }
        },
        initialState
    );

    function toggle(): void {
        dispatch({ type: "toggleTimer" });
    }

    function changeTimerMode(mode: TimerMode): void {
        dispatch({ type: "changeTimerMode", payload: mode });
    }

    useEffect(() => {
        let interval: any = null;
        if (state.isRunning) {
            interval = setInterval(() => {
                if (state.timeLeft === 0) {
                    dispatch({ type: "switchToNextMode" });
                } else {
                    dispatch({ type: "setTime", payload: state.timeLeft - 1 });
                }
            }, 1000);
        } else if (!state.isRunning && state.timeLeft !== 0) {
            clearInterval(interval);
        }
        return (): void => clearInterval(interval);
    }, [state.isRunning, state.timeLeft]);

    const onPlayStopClick = useCallback(() => toggle(), []);

    const {
        isRunning,
        timeLeft,
        activeMode,
        cyclesCount,
        longBreakInterval,
        modesLength
    } = state;

    const timeNeeded = modesLength[activeMode];
    const progress = (timeLeft / timeNeeded) * 100;
    console.log({ progress });
    return (
        <section class={style.container}>
            <div class={style.timerModeSelectorContainer}>
                <button
                    onClick={(): void => changeTimerMode(TimerMode.POMODORO)}
                    class={`${style.timerModeSelector}
                    ${
                        activeMode === TimerMode.POMODORO
                            ? style.timerModeSelectorActive
                            : ""
                    }`}
                >
                    Pomodoro
                </button>
                <button
                    onClick={(): void => changeTimerMode(TimerMode.SHORT_BREAK)}
                    class={`${style.timerModeSelector}
                    ${
                        activeMode === TimerMode.SHORT_BREAK
                            ? style.timerModeSelectorActive
                            : ""
                    }`}
                >
                    Short break
                </button>
                <button
                    onClick={(): void => changeTimerMode(TimerMode.LONG_BREAK)}
                    class={`${style.timerModeSelector}
                    ${
                        activeMode === TimerMode.LONG_BREAK
                            ? style.timerModeSelectorActive
                            : ""
                    }`}
                >
                    Long break
                </button>
            </div>
            <TimeText time={timeLeft} />

            <CircleProgress stroke={4} radius={100} progress={progress} />

            <p>
                {cyclesCount + 1}/{longBreakInterval}
            </p>

            <div className="buttons">
                <IconButton
                    name={isRunning ? "pause" : "play"}
                    width="48"
                    onClick={onPlayStopClick}
                />
            </div>
        </section>
    );
};

export default Timer;
