import React, { useEffect, useState } from "react";
import { Toolbar } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";

const projects = [
    {
        id: 1,
        title: "Project 1",
        image: "/images/project1.png",
        description: "This is the description for Project 1",
    },
    // add more projects here
];

export default function PortfolioPage() {
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
                    <div className="flex-1 bg-indigo-900 p-32">
                        {/*flex-1 to fill remaining space.*/}
                    </div>
                </div>
            </div>
        </div>
    );
}
