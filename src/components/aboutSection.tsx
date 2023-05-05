import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";

export default function AboutSection() {
    return (
        <div
            id="about"
            className="relative flex flex-col w-screen h-screen z-50 bg-transparent"
        >
            {/** app bar spacer */}
            <div className=" h-16" />
            {/**Content */}
            <Typography variant="h1" className="text-white text-center">
                About
            </Typography>
            <div className=" flex items-center h-full justify-center ">
                <Typography className="text-white text-center text-xl w-1/3 ">
                    Hi, I'm Randy. I'm a software developer with a B.SC in
                    Computer Science from the University of British Columbia.
                    <br />
                    <br />I have experience with full-stack web development,
                    game development, and desktop application development.
                </Typography>
            </div>
        </div>
    );
}