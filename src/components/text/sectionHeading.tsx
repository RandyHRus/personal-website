import { Typography } from "@mui/material";
import { ReactNode } from "react";

export default function SectionHeading({ children }: { children: ReactNode }) {
    return (
        <Typography variant="h2" className="text-white text-center font-normal">
            {children}
        </Typography>
    );
}
