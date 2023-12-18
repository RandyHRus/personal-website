import store from "@/state/reduxState";
import { connect } from "react-redux";
import { Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import OfficeScene from "../officeScene";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LiquidScene from "../liquidScene";
import SectionHeading from "../text/sectionHeading";
import ParagraphText from "../text/paragraphText";
import SubSectionHeading from "../text/subHeadingText";

const mapStateToProps = (state: any) => ({ thisState: state.appState });

function InitialSection(props: any) {
    return (
        <div id="initial" className="relative flex flex-col w-screen h-screen">
            {/* 3JS scene */}
            <LiquidScene />
            {/* This is a gradient to make the text easier to read */}
            <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-quaternary to-transparent opacity-40 z-40" />
            {/* UI content middle */}
            <AnimatePresence>
                <motion.div
                    className="absolute flex flex-col text-center justify-center items-center w-full h-full z-50"
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{
                        duration: 1.5,
                    }}
                >
                    <SectionHeading>Randy Russell</SectionHeading>
                    <SubSectionHeading color="text-white">
                        Software Developer
                    </SubSectionHeading>
                </motion.div>
            </AnimatePresence>
            {/* Scroll indicator */}
            <motion.div className="absolute flex flex-col text-center items-center bottom-0 z-50 align-middle right-0 left-0">
                <Typography className="text-lg text-white">
                    Scroll down
                </Typography>
                <KeyboardArrowDownIcon className="text-white w-20 h-20" />
            </motion.div>
        </div>
    );
}

export default connect(mapStateToProps)(InitialSection);
