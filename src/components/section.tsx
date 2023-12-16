import { Typography } from "@mui/material";
import SectionHeading from "./text/sectionHeading";
import ParagraphText from "./text/paragraphText";
import { ReactNode } from "react";

export default function Section({
    id,
    heading,
    children,
}: {
    id: string;
    heading: string;
    children: ReactNode;
}) {
    return (
        <div
            id={id}
            className="relative flex flex-col w-screen h-screen z-30 bg-transparent"
        >
            <div className="flex m-10 h-full justify-center items-center flex-col space-y-12">
                <SectionHeading>{heading}</SectionHeading>
                {children}
            </div>
        </div>
    );
}
