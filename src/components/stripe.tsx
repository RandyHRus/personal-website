import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";
import MovingGradient from "./movingGradient";

export default function AboutSection() {
    return (
        <div className="relative flex flex-col w-screen h-10 z-50 bg-secondary skew-y-6 animated-gradient"></div>
    );
}
