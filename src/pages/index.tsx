import store from "@/reduxState";
import { Provider } from "react-redux";
import InitUI from "@/InitUI";
import ThreeCanvas from "@/ThreeCanvas";

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
