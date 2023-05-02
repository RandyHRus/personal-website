import React, { useEffect, useState } from "react";
import { Toolbar } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";

export default function PortfolioPageWrapper(props: any) {
    // on page load
    useEffect(() => {
        store.dispatch({ type: "end_zoom_in" });
    }, []);

    return (
        <div>
            <div className="h-screen w-screen">
                <div className="h-full flex flex-col">
                    <ResponsiveAppBar></ResponsiveAppBar>
                    <Toolbar hidden /> {/*Make content appear below toolbar.*/}
                    {/*flex-1 to fill remaining space.*/}
                    <div className="flex-1 bg-indigo-900 p-32">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}
