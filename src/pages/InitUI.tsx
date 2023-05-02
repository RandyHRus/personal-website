import StartButton from "@/components/startButton";
import store, { STATES } from "@/reduxState";
import { connect } from "react-redux";
import ConnectedMonitorScreen from "./monitorScreen";
import { Typography } from "@mui/material";

const mapStateToProps = (state: any) => ({ thisState: state.appState });

function InitUI(props: any) {
    const clickStartButtonHandler = () => {
        store.dispatch({ type: "start_zoom_in" });
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
            <div
                style={{
                    display:
                        props.thisState.state == STATES.INIT ? "flex" : "none",
                }}
            >
                <div
                    style={{
                        zIndex: 100,
                    }}
                    className="fixed left-0 right-0 top-0 bottom-0 flex flex-col text-center justify-center items-center"
                >
                    <Typography
                        variant="h1"
                        className="text-7xl font-bold text-white"
                    >
                        Randy Russell
                    </Typography>
                    <Typography
                        variant="h2"
                        className="text-4xl font-bold text-white"
                    >
                        Software Developer
                    </Typography>
                    <div
                        className="flex-row"
                        style={{
                            zIndex: 100,
                        }}
                    >
                        <StartButton
                            text="experience"
                            onClick={() => clickStartButtonHandler()}
                        />
                        <StartButton
                            text="projects"
                            onClick={() => clickStartButtonHandler()}
                        />
                        <StartButton
                            text="contact"
                            onClick={() => clickStartButtonHandler()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(InitUI);
