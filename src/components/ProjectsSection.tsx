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
        title: "Compiler",
        image: "/images/frog.jpg",
        description: "This is the description for Project 1",
    },
    {
        id: "2",
        title: "Resorto",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "3",
        title: "Piano app",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "4",
        title: "Mail server",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "5",
        title: "Machine learning",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "6",
        title: "UBC game dev",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "7",
        title: "App manager",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "8",
        title: "Pinball",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "9",
        title: "Cellular automata",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "10",
        title: "Aquarium live wallpaper",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "11",
        title: "Space Live wallpaper",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "12",
        title: "Database query system",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "13",
        title: "DNS resolver",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "14",
        title: "Battlesnake",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "15",
        title: "Personal website",
        image: "/images/frog.jpg",
        description: "This is the description for Project 2",
    },
    {
        id: "16",
        title: "Robotics",
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
                className="relative flex flex-col w-screen h-auto z-30 bg-white skew-y-6"
                id="projects"
            >
                <div className="-skew-y-6">
                    {/** app bar spacer */}
                    <div className=" h-16" />
                    <Typography
                        variant="h1"
                        className="text-primary text-center"
                    >
                        Projects
                    </Typography>
                    {/** Project cards list */}
                    <div className="relative flex flex-col w-screen h-auto p-12">
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
            </div>
            {/** Pop up*/}
            <AnimatePresence>
                {selectedProject && (
                    <div>
                        <div className="fixed flex flex-col items-center justify-center left-0 right-0 top-0 bottom-0 z-50">
                            {/**fade background */}
                            <div
                                className="fixed flex left-0 right-0 top-0 bottom-0 z-10 bg-primary opacity-20"
                                onClick={() => setSelectedProject(null)}
                            />
                            <motion.div
                                id="projectMotionDiv"
                                className=" w-2/3 h-2/3 z-30"
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
                    </div>
                )}
            </AnimatePresence>
        </Provider>
    );
}
