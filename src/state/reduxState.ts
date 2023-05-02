import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

export enum STATES {
    INIT = "init",
    ZOOM_IN = "zoom_in",
    MONITOR = "monitor",
    ZOOM_OUT = "zoom_out",
}

export interface app_state {
    state: STATES;
    args: any;
}

interface app_action {
    type: "start_zoom_in" | "end_zoom_in" | "start_zoom_out" | "end_zoom_out";
    args: any;
}

function appStateReducer(
    state: app_state = { state: STATES.INIT, args: [] },
    action: app_action
): app_state | null {
    if (state === undefined) {
        return null;
    }
    console.log("appStateReducer action: ", action);
    switch (action.type) {
        case "start_zoom_in":
            return { state: STATES.ZOOM_IN, args: action.args };
        case "end_zoom_in":
            return { state: STATES.MONITOR, args: action.args };
        case "start_zoom_out":
            return { state: STATES.ZOOM_OUT, args: action.args };
        case "end_zoom_out":
            return { state: STATES.INIT, args: action.args };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    appState: appStateReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
