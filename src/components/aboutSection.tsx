import React, { useEffect, useState } from "react";
import { Toolbar } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";

export default function AboutSection() {
    return (
        <div
            id="about"
            className="relative flex flex-col w-screen h-screen"
        ></div>
    );
}
