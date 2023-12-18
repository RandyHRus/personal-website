import store from "@/state/reduxState";
import { Provider } from "react-redux";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import ContactSection from "@/components/sections/contactSection";
import AboutSection from "@/components/sections/aboutSection";
import InitialSection from "@/components/sections/initialSection";
import Stripe from "@/components/stripe";
import ProjectsSection from "@/components/sections/projectsSection";

export default function Home(props: { projectId?: string }) {
    return (
        <div style={{ position: "relative" }} id="root">
            <Provider store={store}>
                <ResponsiveAppBar />
                <InitialSection />
                {/**spacer to make sure that zoom completely ends before displaying further UI */}
                <div
                    className="relative flex flex-col w-screen"
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
