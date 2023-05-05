import React, { useEffect, useState } from "react";
import { Toolbar, Typography } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/projectCard";
import ProjectCardSmall from "@/components/projectCardSmall";
import { Provider } from "react-redux";

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

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    return (
        <Provider store={store}>
            <div
                className="relative flex flex-col w-screen h-screen z-50 bg-primary"
                id="projects"
            >
                {/** app bar spacer */}
                <div className=" h-16" />
                <Typography variant="h1" className="text-white text-center">
                    Projects
                </Typography>
                <div className="relative flex flex-col w-screen h-screen p-12 z-50">
                    <div className="relative flex flex-row flex-wrap justify-center items-center ">
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
                            <motion.div className="relative">
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
                </div>
            </div>
        </Provider>
    );
}
