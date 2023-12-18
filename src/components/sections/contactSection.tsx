import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import { IconButton, Link, Typography } from "@mui/material";
import React from "react";
import SectionHeading from "../text/sectionHeading";
import Section from "../section";

export default function ContactSection() {
    return (
        <div
            id="contact"
            className="relative flex flex-col w-screen pt-12 h-scren bg-tertiary z-30 skew-y-6"
        >
            <div className="-skew-y-6 h-full">
                <Section id="contact" heading="Contact" height="h-screen">
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex flex-row items-center p-5">
                            <IconButton className=" text-white w-12 h-12">
                                <Email className=" text-white w-12 h-12" />
                            </IconButton>
                            <Typography className="text-white p-2">
                                RandyHRus@gmail.com
                            </Typography>
                        </div>
                        <Link
                            href="https://github.com/RandyHRus"
                            className="flex flex-row items-center p-5"
                        >
                            <IconButton className=" text-white w-12 h-12">
                                <GitHub className=" text-white w-12 h-12" />
                            </IconButton>
                            <Typography className="text-white p-2">
                                https://github.com/RandyHRus
                            </Typography>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/randyhrus/"
                            className="flex flex-row items-center p-5"
                        >
                            <IconButton className=" text-white w-12 h-12">
                                <LinkedIn className=" text-white w-12 h-12" />
                            </IconButton>
                            <Typography className="text-white p-2">
                                https://www.linkedin.com/in/randyhrus/
                            </Typography>
                        </Link>
                    </div>
                </Section>
            </div>
        </div>
    );
}
