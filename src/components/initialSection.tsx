import InitButton from "@/components/initButton";
import store, { STATES } from "@/state/reduxState";
import { connect } from "react-redux";
import { Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";
import OfficeScene from "./officeScene";

const mapStateToProps = (state: any) => ({ thisState: state.appState });

function InitialSection(props: any) {
    const clickStartButtonHandler = (pageRoute: string) => {
        store.dispatch({
            type: "start_zoom_in",
            args: { pageRoute: pageRoute },
        });
    };

    return (
        <div id="initial" className="relative flex flex-col w-screen h-screen">
            {/* 3JS scene */}
            <OfficeScene />
            {/* This is a gradient to make the text easier to read */}
            <div
                style={{
                    zIndex: 100,
                }}
                className="absolute w-full h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-60"
            />
            {/* UI content */}
            <AnimatePresence>
                <motion.div
                    style={{
                        zIndex: 100,
                    }}
                    className="absolute flex flex-col text-center justify-center items-center w-full h-full"
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{
                        duration: 1.5,
                    }}
                >
                    <h1 className="text-6xl font-bold text-white">
                        Randy Russell
                    </h1>
                    <h2 className="text-3xl font-bold text-white">
                        Software Developer
                    </h2>
                    {/* Buttons */}
                    <div
                        style={{
                            zIndex: 100,
                        }}
                    >
                        <InitButton
                            text="about"
                            onClick={() => clickStartButtonHandler("/about")}
                        />
                        <InitButton
                            text="projects"
                            onClick={() => clickStartButtonHandler("/projects")}
                        />
                        <InitButton
                            text="contact"
                            onClick={() => clickStartButtonHandler("/contact")}
                        />
                    </div>
                    {/* Scroll indicator */}
                    <motion.div className="w-20 h-20 bg-secondary">
                        <Typography className="text-white">
                            Scroll down
                        </Typography>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default connect(mapStateToProps)(InitialSection);
