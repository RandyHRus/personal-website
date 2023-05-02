import store from "@/reduxState";
import { Provider } from "react-redux";
import ThreeCanvas from "./ThreeCanvas";
import InitUI from "./InitUI";
import ConnectedMonitorScreen from "./monitorScreen";

export default function Home(props: any) {
    return (
        <div style={{ position: "relative" }}>
            <Provider store={store}>
                <ThreeCanvas />
                <InitUI />
                <ConnectedMonitorScreen></ConnectedMonitorScreen>
            </Provider>
        </div>
    );
}
