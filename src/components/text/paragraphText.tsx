import { Typography } from "@mui/material";
import { ReactNode } from "react";
import FadeIn from "../fadeIn";

export default function ParagraphText({
    textAlign = "text-center",
    children,
}: {
    textAlign?: "text-center" | "text-left" | "text-right";
    children: ReactNode;
}) {
    return (
        <FadeIn>
            <Typography className={`text-white text-xl max-w-xl ${textAlign}`}>
                {children}
            </Typography>
        </FadeIn>
    );
}
