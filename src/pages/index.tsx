import store from "@/state/reduxState";
import { Provider } from "react-redux";
import InitUI from "@/components/InitUI";
import ThreeCanvas from "@/components/ThreeCanvas";
import { GetServerSideProps } from "next";

export default function Home() {
    return (
        <div style={{ position: "relative" }}>
            <Provider store={store}>
                <ThreeCanvas />
                <InitUI />
            </Provider>
        </div>
    );
}
