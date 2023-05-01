import store, { STATES } from "@/reduxState";
import StartButton from "@/components/startButton";
import { connect } from "react-redux";
import PortfolioPage from "./portfolio page/portfolioPage";

const mapStateToProps = (state: any) => ({ thisState: state.appState });

function MonitorScreen(props: any) {
    const clickGoBackButtonHandler = () => {
        store.dispatch({ type: "start_zoom_out" });
    };

    return (
        <div
            className="center"
            style={{
                zIndex: 100,
                display:
                    props.thisState.state == STATES.MONITOR ? "flex" : "none",
            }}
        >
            <div
                className="startButton"
                style={{
                    backgroundColor: "rgba(29, 6, 48,1)",
                    width: "100%",
                    height: "100%",
                }}
            >
                <PortfolioPage />
            </div>
        </div>
    );
}

const ConnectedMonitorScreen = connect(mapStateToProps)(MonitorScreen);

export default ConnectedMonitorScreen;
