import store, { STATES } from "@/reduxState";
import StartButton from "@/components/startButton";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => ({ thisState: state.appState });

function MonitorScreen(props: any) {
    const clickGoBackButtonHandler = () => {
        store.dispatch({ type: "start_zoom_out" });
    };

    console.log(props.thisState.state);

    return (
        <div
            className="center"
            style={{
                zIndex: 100,
                display:
                    props.thisState.state == STATES.MONITOR ? "flex" : "none",
            }}
        >
            <StartButton onClick={() => clickGoBackButtonHandler()} />
        </div>
    );
}

const ConnectedMonitorScreen = connect(mapStateToProps)(MonitorScreen);

export default ConnectedMonitorScreen;
