import React, { useEffect, useState } from "react";
import { Toolbar } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";
import PortfolioPageWrapper from "@/components/portfolioPageWrapper";
import { AnimatePresence, motion } from "framer-motion";

const projects = [
    {
        id: 1,
        title: "Project 1",
        image: "/images/project1.png",
        description: "This is the description for Project 1",
    },
    {
        id: 2,
        title: "Project 2",
        image: "/images/project1.png",
        description: "This is the description for Project 2",
    },
];

export default function ProjectsPage() {
    const [selectedId, setSelectedId] = useState<number>(-1);

    return (
        <PortfolioPageWrapper>
            {projects.map((item) => (
                <motion.div
                    layoutId={item.title}
                    onClick={() => setSelectedId(item.id)}
                    key={item.id}
                >
                    <motion.h5>{item.description}</motion.h5>
                    <motion.h2>{item.title}</motion.h2>
                </motion.div>
            ))}
            <AnimatePresence>
                {selectedId && (
                    <motion.div layoutId={"a"}>
                        <motion.h5>{"a"}</motion.h5>
                        <motion.h2>{"b"}</motion.h2>
                        <motion.button onClick={() => setSelectedId(0)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </PortfolioPageWrapper>
    );
}
