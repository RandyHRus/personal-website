import InitButton from "@/components/initButton";
import store, { STATES } from "@/state/reduxState";
import { connect } from "react-redux";
import { Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";
import OfficeScene from "./officeScene";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
            <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-quaternary to-transparent opacity-60 z-20" />
            {/* UI content middle */}
            <AnimatePresence>
                <motion.div
                    className="absolute flex flex-col text-center justify-center items-center w-full h-full z-40"
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
                    <h2 className="text-3xl text-white">Software Developer</h2>
                </motion.div>
            </AnimatePresence>
            {/* Scroll indicator */}
            <motion.div className="absolute flex flex-col text-center items-center bottom-0 z-40 align-middle right-0 left-0">
                <Typography className="text-lg text-white">
                    Scroll down
                </Typography>
                <KeyboardArrowDownIcon className="text-white w-20 h-20" />
            </motion.div>
        </div>
    );
}

export default connect(mapStateToProps)(InitialSection);
