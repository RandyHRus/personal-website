import { Card } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

export default function PinballPopup() {
    return (
        <Card className="flex relative w-[650px] h-[750px]" id="root">
            <iframe
                className="flex relative w-[650px] h-[750px]"
                src="/pinball/Pinball-main/src/index.html"
            ></iframe>
        </Card>
    );
}
