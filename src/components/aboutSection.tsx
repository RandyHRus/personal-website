import React from "react";
import { Typography } from "@mui/material";

export default function AboutSection() {
    return (
        <div
            id="about"
            className="relative flex flex-col w-screen h-screen z-30 bg-transparent"
        >
            {/** app bar spacer */}
            <div className=" h-16" />
            {/**Content */}
            <Typography variant="h1" className="text-white text-center">
                About
            </Typography>
            <div className=" flex m-10 h-full justify-center ">
                <Typography className="text-white text-center text-xl max-w-md ">
                    Hi, I&apos;m Randy. I&apos;m a software developer and I hold
                    a B.Sc in Computer Science from the University of British
                    Columbia.
                    <br />
                    <br />
                    At SAP, I worked as a co-op full-stack web developer. I
                    helped develop a data wrangling microservice.
                    <br />
                    <br />
                    At Delta-Q Technologies, I worked as a co-op full-stack
                    developer. I developed desktop applications for battery
                    chargers used in electric vehicles.
                    <br />
                </Typography>
            </div>
        </div>
    );
}
