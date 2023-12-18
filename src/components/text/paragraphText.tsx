import { Typography } from "@mui/material";
import { ReactNode } from "react";

export default function ParagraphText({
    textAlign = "text-center",
    children,
}: {
    textAlign?: "text-center" | "text-left" | "text-right";
    children: ReactNode;
}) {
    return (
        <Typography className={`text-white text-xl max-w-xl ${textAlign}`}>
            {children}
        </Typography>
    );
}
