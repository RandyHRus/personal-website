import React, { useEffect, useState } from "react";
import { Toolbar } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";
import PortfolioPageWrapper from "@/components/portfolioPageWrapper";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/projectCard";
import ProjectCardSmall from "@/components/projectCardSmall";

interface Project {
    id: string;
    title: string;
    image: string;
    description: string;
}

const projects: Project[] = [
    {
        id: "1",
        title: "Project 1",
        image: "/images/frog.jpg",
        description: "This is the description for Project 1",
    },
    {
        id: "2",
        title: "Project 2",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "3",
        title: "Project 2",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "4",
        title: "Project 2",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "5",
        title: "Project 2",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "6",
        title: "Project 2",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
];

export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    return (
        <PortfolioPageWrapper>
            <div
                className="flex flex-row flex-wrap justify-center items-center "
                style={{
                    zIndex: 100,
                }}
            >
                {projects.map((item) => (
                    <motion.button
                        layoutId={item.title}
                        onClick={() => setSelectedProject(item)}
                        key={item.id}
                        className="  m-2 text-white"
                        whileHover={{ scale: 1.2 }}
                    >
                        <ProjectCardSmall
                            imgPath={item.image}
                            title={item.title}
                        />
                    </motion.button>
                ))}
            </div>
            <AnimatePresence>
                {selectedProject && (
                    <motion.div className="fixed">
                        <ProjectCard
                            title={selectedProject.title}
                            imgPaths={[
                                selectedProject.image,
                                selectedProject.image,
                                selectedProject.image,
                                selectedProject.image,
                            ]}
                            text={[selectedProject.description]}
                            projectLink={""}
                            technologies={null}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </PortfolioPageWrapper>
    );
}
