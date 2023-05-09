import store from "@/state/reduxState";
import { Provider } from "react-redux";
import ProjectsSection from "@/components/ProjectsSection";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import ContactSection from "@/components/contactSection";
import AboutSection from "@/components/aboutSection";
import InitialSection from "@/components/initialSection";
import Stripe from "@/components/stripe";

export default function Home(props: { projectId?: string }) {
    return (
        <div style={{ position: "relative" }} id="root">
            <Provider store={store}>
                <ResponsiveAppBar />
                <InitialSection />
                {/**spacer to make sure that zoom completely ends before displaying further UI */}
                <div
                    className="relative flex flex-col w-screen h-"
                    style={{ height: "50vh" }}
                />
                <AboutSection />
                <Stripe />
                <ProjectsSection projectId={props.projectId} />
                <Stripe />
                <ContactSection />
            </Provider>
        </div>
    );
}
