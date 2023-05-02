import store from "@/state/reduxState";
import { Provider } from "react-redux";
import InitUI from "@/components/InitUI";
import ThreeCanvas from "@/components/ThreeCanvas";

export default function Home(props: any) {
    return (
        <div style={{ position: "relative" }}>
            <Provider store={store}>
                <ThreeCanvas />
                <InitUI />
            </Provider>
        </div>
    );
}
