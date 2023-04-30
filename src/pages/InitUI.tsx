import StartButton from "@/components/startButton";
import store, { STATES } from "@/reduxState";
import { connect } from "react-redux";
import ConnectedMonitorScreen from "./monitorScreen";

const mapStateToProps = (state: any) => ({ thisState: state.appState });

function InitUI(props: any) {
    const clickStartButtonHandler = () => {
        store.dispatch({ type: "start_zoom_in" });
    };

    return (
        <div>
            <div
                className="center"
                style={{
                    zIndex: 100,
                    display:
                        props.thisState.state == STATES.INIT ? "flex" : "none",
                }}
            >
                <StartButton onClick={() => clickStartButtonHandler()} />
            </div>
            <ConnectedMonitorScreen></ConnectedMonitorScreen>
        </div>
    );
}

export default connect(mapStateToProps)(InitUI);
