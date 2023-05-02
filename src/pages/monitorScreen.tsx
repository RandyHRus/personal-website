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
            className="bg-white fill-white"
            style={{
                zIndex: 100,
                display:
                    props.thisState.state == STATES.MONITOR ? "flex" : "none",
            }}
        >
            <PortfolioPage />
        </div>
    );
}

const ConnectedMonitorScreen = connect(mapStateToProps)(MonitorScreen);

export default ConnectedMonitorScreen;
