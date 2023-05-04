import React, { useEffect, useState } from "react";
import { Toolbar, Typography } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";

export default function AboutSection() {
    return (
        <div
            id="about"
            className="relative flex flex-col w-screen h-screen z-50 bg-transparent"
        >
            <Typography variant="h1" className="text-white">
                About
            </Typography>
        </div>
    );
}
