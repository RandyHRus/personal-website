import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

export enum STATES {
    DRIFT = "drift",
    ZOOM = "zoom",
}

export interface app_state {
    state: STATES;
    args: any;
}

interface app_action {
    type: "start_drift" | "end_drift";
    args: any;
}

function appStateReducer(
    state: app_state = { state: STATES.DRIFT, args: [] },
    action: app_action
): app_state | null {
    if (state === undefined) {
        return null;
    }
    console.log("appStateReducer action: ", action);
    switch (action.type) {
        case "start_drift":
            return { state: STATES.DRIFT, args: action.args };
        case "end_drift":
            return { state: STATES.ZOOM, args: action.args };
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
