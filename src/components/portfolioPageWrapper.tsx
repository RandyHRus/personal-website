import React, { useEffect, useState } from "react";
import { Toolbar } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";
import MovingGradient from "./movingGradient";
import { Provider } from "react-redux";

export default function PortfolioPageWrapper(props: any) {
    // on page load
    useEffect(() => {
        store.dispatch({ type: "end_zoom_in" });
    }, []);

    return (
        <Provider store={store}>
            <div className="h-screen w-screen" id="root">
                <MovingGradient />
                <div className="h-full flex flex-col">
                    <ResponsiveAppBar></ResponsiveAppBar>
                    <Toolbar hidden /> {/*Make content appear below toolbar.*/}
                    {/*flex-1 to fill remaining space.*/}
                    <div className="flex-1 bg-transparent p-32">
                        {props.children}
                    </div>
                </div>
            </div>
        </Provider>
    );
}
