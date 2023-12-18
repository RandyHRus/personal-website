import { Typography } from "@mui/material";
import SectionHeading from "./text/sectionHeading";
import ParagraphText from "./text/paragraphText";
import { ReactNode } from "react";

export default function Section({
    id,
    heading,
    children,
    height,
}: {
    id: string;
    heading: string;
    children: ReactNode;
    height: "h-auto" | "h-screen";
}) {
    return (
        <div
            className={`relative flex flex-col w-screen z-30 bg-transparent my-32 px-10 justify-center items-center space-y-12 ${height}`}
        >
            <div className="h-24" id={id}></div> {/** Spacer for app bar */}
            <SectionHeading>{heading}</SectionHeading>
            {children}
        </div>
    );
}
