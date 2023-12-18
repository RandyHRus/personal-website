import { Typography } from "@mui/material";
import { ReactNode } from "react";

export default function ParagraphText({ children }: { children: ReactNode }) {
    return (
        <Typography className="text-white text-center text-xl max-w-xl">
            {children}
        </Typography>
    );
}
