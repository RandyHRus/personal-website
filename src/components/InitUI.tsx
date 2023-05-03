import InitButton from "@/components/initButton";
import store, { STATES } from "@/state/reduxState";
import { connect } from "react-redux";
import { Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";

const mapStateToProps = (state: any) => ({ thisState: state.appState });

function InitUI(props: any) {
    //const [contentRoot, setContentRoot] = useState<ReactDOM.Root | null>(null);

    const clickStartButtonHandler = (pageRoute: string) => {
        store.dispatch({
            type: "start_zoom_in",
            args: { pageRoute: pageRoute },
        });
    };

    return (
        <div>
            {/* This is a gradient to make the text easier to read */}
            <div
                style={{
                    zIndex: 100,
                    display:
                        props.thisState.state == STATES.INIT ||
                        props.thisState.state == STATES.ZOOM_IN
                            ? "flex"
                            : "none",
                }}
                className="fixed left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-indigo-950 to-transparent opacity-60"
            />
            {/* Content */}
            <AnimatePresence>
                {props.thisState.state == STATES.INIT && (
                    <motion.div
                        style={{
                            zIndex: 100,
                        }}
                        className="fixed left-0 right-0 top-0 bottom-0 flex flex-col text-center justify-center items-center"
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
                        <div
                            style={{
                                zIndex: 100,
                            }}
                        >
                            <InitButton
                                text="about"
                                onClick={() =>
                                    clickStartButtonHandler("/about")
                                }
                            />
                            <InitButton
                                text="projects"
                                onClick={() =>
                                    clickStartButtonHandler("/projects")
                                }
                            />
                            <InitButton
                                text="contact"
                                onClick={() =>
                                    clickStartButtonHandler("/contact")
                                }
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default connect(mapStateToProps)(InitUI);
