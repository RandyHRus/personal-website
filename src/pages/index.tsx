import store from "@/state/reduxState";
import { Provider } from "react-redux";
import ProjectsSection from "@/components/ProjectsSection";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import ContactSection from "@/components/contactSection";
import AboutSection from "@/components/aboutSection";
import Link from "next/link";
import InitialSection from "@/components/initialSection";

export default function Home() {
    return (
        <div style={{ position: "relative" }} id="root">
            <Provider store={store}>
                <ResponsiveAppBar />
                <InitialSection />
                {/**spacer to make sure that zoom completely ends before displaying further UI */}
                <div className="relative flex flex-col w-screen h-screen" />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </Provider>
        </div>
    );
}
