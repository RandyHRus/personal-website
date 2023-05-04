import React from "react";
import { motion } from "framer-motion";

export default function InitButton(props: { text: string; onClick: any }) {
    return (
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-secondary to-quaternary"
            style={{
                color: "white",
                padding: "12px 24px",
                margin: "12px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                outline: "none",
                border: "none",
            }}
            onClick={props.onClick}
        >
            {props.text}
        </motion.button>
    );
}
