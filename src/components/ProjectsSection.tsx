import React, { useState } from "react";
import { Typography } from "@mui/material";
import store from "@/state/reduxState";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCardPopup from "@/components/projectCardPopup";
import ProjectCardSmall from "@/components/projectCardSmall";
import { Provider } from "react-redux";

interface Project {
    id: string;
    title: string;
    videoLink: string | null;
    mainImage: string;
    additionalImages: string[] | null;
    description: string;
    technologies: string[] | null;
}

const featuredProjects: Project[] = [
    {
        id: "1",
        title: "Compiler",
        videoLink: null,
        mainImage: "/images/compiler/compiler.png",
        additionalImages: null,
        description: "This is the description for Project 1",
        technologies: ["Racket", "x86-64"],
    },
    {
        id: "2",
        title: "Resort management game",
        videoLink: "https://www.youtube-nocookie.com/embed/2UwR6k8FrHo",
        mainImage: "/images/resorto/resorto1.png",
        additionalImages: [
            "/images/resorto/resorto2.png",
            "/images/resorto/resorto3.png",
            "/images/resorto/resorto4.png",
        ],
        description: "This is the description for Project 2",
        technologies: ["Unity", "C#"],
    },
    {
        id: "5",
        title: "Machine learning algorithms",
        videoLink: null,
        mainImage: "/images/ml/logRegGaussian.png",
        additionalImages: [
            "/images/ml/KNN.png",
            "/images/ml/kmeans_50.png",
            "/images/ml/robustLinearRegression.png",
        ],
        description: "This is the description for Project 2",
        technologies: ["Python", "NumPy", "Pandas"],
    },
];

const otherProjects: Project[] = [
    {
        id: "10",
        title: "Aquarium live wallpaper",
        videoLink: "https://www.youtube-nocookie.com/embed/qZtw3N-nGwg",
        mainImage: "/images/aquarium/aquarium4.png",
        additionalImages: [
            "/images/aquarium/aquarium4.png",
            "/images/aquarium/aquarium3.png",
            "/images/aquarium/aquarium1.png",
        ],
        description: "This is the description for Project 2",
        technologies: ["Unity", "C#", "AndroidStudio"],
    },
    {
        id: "4",
        title: "Mail server",
        videoLink: null,
        mainImage: "/images/mail/smtp.png",
        additionalImages: null,
        description: "This is the description for Project 2",
        technologies: ["C"],
    },
    {
        id: "6",
        title: "Star farm",
        videoLink: null,
        mainImage: "/images/starfarm/starFarm1.png",
        additionalImages: [
            "images/starfarm/starFarm2.png",
            "images/starfarm/starFarm3.png",
            "images/starfarm/starFarm4.png",
        ],
        description: "This is the description for Project 2",
        technologies: ["Unity", "C#"],
    },
    {
        id: "7",
        title: "Product management app",
        videoLink: null,
        mainImage: "/images/product/product1.png",
        additionalImages: [
            "images/product/product2.png",
            "images/product/product3.png",
            "images/product/product4.png",
        ],
        description: "This is the description for Project 2",
        technologies: [
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "CSS3",
            "Express.js",
            "Material-ui",
        ],
    },
    {
        id: "8",
        title: "Pinball",
        videoLink: null,
        mainImage: "/images/pinball/pinball1.png",
        additionalImages: null,
        description: "This is the description for Project 2",
        technologies: ["JavaScript", "HTML5", "CSS3"],
    },
    {
        id: "17",
        title: "Hoppy frog",
        videoLink: "https://www.youtube-nocookie.com/embed/4ACAoIvRd78",
        mainImage: "/images/frog/frog1.jpg",
        additionalImages: [
            "/images/frog/frog1.jpg",
            "/images/frog/frog2.png",
            "/images/frog/frog3.jpeg",
        ],
        description: "This is the description for Project 2",
        technologies: ["Unity", "C#"],
    },
    {
        id: "13",
        title: "DNS resolver",
        videoLink: null,
        mainImage: "/images/dns/dns.png",
        additionalImages: null,
        description: "This is the description for Project 2",
        technologies: ["Java"],
    },
    {
        id: "3",
        title: "Piano app",
        videoLink: null,
        mainImage: "/images/piano/piano.jpg",
        additionalImages: null,
        description: "This is the description for Project 2",
        technologies: [
            "React",
            "TypeScript",
            "CSS3",
            "Python",
            "AndroidStudio",
            "RaspberryPi",
        ],
    },
    {
        id: "9",
        title: "Cellular automata",
        videoLink: null,
        mainImage: "/images/cells/cell3.png",
        additionalImages: [
            "/images/cells/cell2.png",
            "/images/cells/cell3.png",
            "/images/cells/cell4.png",
        ],
        description: "This is the description for Project 2",
        technologies: ["Unity", "C#"],
    },
    {
        id: "11",
        title: "Space live wallpaper",
        videoLink: "https://www.youtube-nocookie.com/embed/eLy7Q9HsUw4",
        mainImage: "/images/space/space1.png",
        additionalImages: [
            "images/space/space2.png",
            "images/space/space3.png",
            "images/space/space4.png",
        ],
        description: "This is the description for Project 2",
        technologies: ["Unity", "C#", "AndroidStudio"],
    },
    {
        id: "12",
        title: "Course query app",
        videoLink: null,
        mainImage: "/images//query/query1.png",
        additionalImages: [
            "images/query/query2.png",
            "images/query/query3.png",
        ],
        description: "This is the description for Project 2",
        technologies: ["TypeScript"],
    },
    {
        id: "14",
        title: "Battlesnake",
        videoLink: null,
        mainImage: "/images/battlesnake/battlesnake.png",
        additionalImages: null,
        description: "This is the description for Project 2",
        technologies: ["JavaScript"],
    },
    {
        id: "16",
        title: "Robotics",
        videoLink: null,
        mainImage: "/images/robotics/robot3.jpeg",
        additionalImages: [
            "images/robotics/robot1.jpeg",
            "images/robotics/robot2.jpeg",
            "images/robotics/robot4.jpeg",
        ],
        description: "This is the description for Project 2",
        technologies: ["RaspberryPi"],
    },
    {
        id: "15",
        title: "Personal website",
        videoLink: null,
        mainImage: "/images/website/personal-website.png",
        additionalImages: null,
        description: "This is the description for Project 2",
        technologies: [
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "TailwindCSS",
            "CSS3",
            "Three.js",
            "Material-ui",
            "Redux",
        ],
    },
];

const TextAnimation = (props: { text: string }) => {
    return (
        <div className="flex flex-col text-center items-center">
            <div className="flex flex-row">
                {props.text.split("").map((char, index) => (
                    <motion.div
                        key={index}
                        animate={{
                            y: ["0%", "-30%", "0%"],
                            transition: {
                                duration: 0.4,
                                delay: 1 + 0.1 * index,
                                repeat: Infinity,
                                repeatDelay: 10,
                            },
                        }}
                    >
                        <Typography variant="h1" className=" text-primary">
                            {char}
                        </Typography>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    const ProjectCardsList = (props: { projects: Project[] }) => {
        return (
            <div className="relative flex flex-row flex-wrap justify-center items-center ">
                {props.projects.map((item) => (
                    <motion.button
                        layoutId={item.id}
                        onClick={() => setSelectedProject(item)}
                        key={item.id}
                        className="  m-2 text-white"
                        whileHover={{ scale: 1.2 }}
                    >
                        <ProjectCardSmall
                            imgPath={item.mainImage}
                            title={item.title}
                        />
                    </motion.button>
                ))}
            </div>
        );
    };

    return (
        <Provider store={store}>
            <div
                className="relative flex flex-col w-screen h-auto z-30 bg-white skew-y-6"
                id="projects"
            >
                <div className="-skew-y-6">
                    {/** app bar spacer */}
                    <div className=" h-16" />
                    {/** Title*/}
                    <TextAnimation text="Projects" />
                    <br />
                    <br />
                    <br />
                    {/** Featured project cards list */}
                    <Typography className="text-center text-3xl">
                        Featured projects
                    </Typography>
                    <div className="relative flex flex-col w-screen h-auto p-12">
                        <ProjectCardsList projects={featuredProjects} />
                    </div>
                    <br />
                    <br />
                    {/** Other projects cards list */}
                    <Typography className="text-center text-3xl">
                        Other projects
                    </Typography>
                    <div className="relative flex flex-col w-screen h-auto p-12">
                        <ProjectCardsList projects={otherProjects} />
                    </div>
                </div>
            </div>
            {/** Pop up*/}
            <AnimatePresence>
                {selectedProject && (
                    <div>
                        <div className="fixed flex flex-col items-center justify-center left-0 right-0 top-0 bottom-0 z-50">
                            {/**fade background */}
                            <motion.div
                                className="fixed flex left-0 right-0 top-0 bottom-0 z-10 bg-tertiary opacity-20"
                                onClick={() => setSelectedProject(null)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.75 }}
                                exit={{ opacity: 0 }}
                            />
                            <motion.div
                                id="projectMotionDiv"
                                className=" w-2/3 h-2/3 z-30"
                                layoutId={selectedProject.id}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectCardPopup
                                    title={selectedProject.title}
                                    additionalImgPaths={
                                        selectedProject.additionalImages
                                    }
                                    text={[selectedProject.description]}
                                    projectLink={""}
                                    technologies={selectedProject.technologies}
                                    main={{
                                        type: selectedProject.videoLink
                                            ? "video"
                                            : "img",
                                        path: selectedProject.videoLink
                                            ? selectedProject.videoLink
                                            : selectedProject.mainImage,
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </Provider>
    );
}
