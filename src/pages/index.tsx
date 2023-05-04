import store from "@/state/reduxState";
import { Provider } from "react-redux";
import ProjectsSection from "@/components/ProjectsSection";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import ContactSection from "@/components/contactSection";
import InitialSection from "@/components/InitialSection";
import AboutSection from "@/components/aboutSection";
import Link from "next/link";

export default function Home() {
    return (
        <div style={{ position: "relative" }} id="root">
            <Provider store={store}>
                <ResponsiveAppBar />
                <InitialSection />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </Provider>
        </div>
    );
}
