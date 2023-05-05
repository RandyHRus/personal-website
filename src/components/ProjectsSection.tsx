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
    {
        id: "7",
        title: "Project 2",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "8",
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
                className="relative flex flex-col w-screen h-screen z-30 bg-primary"
                id="projects"
            >
                {/** app bar spacer */}
                <div className=" h-16" />
                <Typography variant="h1" className="text-white text-center">
                    Projects
                </Typography>
                {/** Project cards list */}
                <div className="relative flex flex-col w-screen h-screen p-12 z-50">
                    <div className="relative flex flex-row flex-wrap justify-center items-center ">
                        {projects.map((item) => (
                            <motion.button
                                layoutId={item.id}
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
                </div>
            </div>
            {/** Pop up*/}
            <AnimatePresence>
                {selectedProject && (
                    <div
                        className="fixed flex flex-col items-center justify-center z-50 left-0 right-0 top-0 bottom-0"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            id="projectMotionDiv"
                            className="w-2/3 h-2/3"
                            layoutId={selectedProject.id}
                            transition={{ duration: 0.3 }}
                        >
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
                    </div>
                )}
            </AnimatePresence>
        </Provider>
    );
}
