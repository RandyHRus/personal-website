import React, { useState } from "react";
import { Typography } from "@mui/material";
import store from "@/state/reduxState";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCardPopup, { Page } from "@/components/projectCardPopup";
import ProjectCardSmall from "@/components/projectCardSmall";
import { Provider } from "react-redux";
import PinballPopup from "./pinballPopup";
import { useInView } from "react-intersection-observer";

const popupDelay = 0.3;

interface Project {
    id: string;
    title: string;
    mainImage: string;
    pages: Page[];
    technologies: string[] | null;
    button?: {
        action: () => void;
        text: string;
    };
}

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

export default function ProjectsSection(props: { projectId?: string }) {
    const featuredProjects: Project[] = [
        {
            id: "compiler",
            title: "Compiler",
            mainImage: "/images/compiler/compiler.png",
            pages: [
                {
                    text: `This compiler takes the Exprs-lang programming language (a fictional language) and converts it into x64 machine code. It utilizes a sequence of passes to translate the source language to the target language, progressing all the way to x64.\n
                 Each pass introduces a new feature that refines the capabilities of the target language. These passes cover a range of tasks, such as abstract variable declaration, register allocation, frame allocation, the inclusion of function calls and return values, the introduction of data types, support for algebraic expressions, the incorporation of if statements and control flows, a series of optimizations, etc.`,
                    media: {
                        type: "img",
                        path: "/images/compiler/compiler.png",
                    },
                },
            ],
            technologies: ["Racket", "x86-64"],
        },
        {
            id: "resorto",
            title: "Resort management game",
            mainImage: "/images/resorto/resorto1.png",
            pages: [
                {
                    text: `This is a resort management game I created. 
                    You play as a resort manager in charge of attracting tourists to a deserted island.\n
                    Click through the tabs on the left to read more on the game and watch videos.`,

                    media: {
                        type: "img",
                        path: "/images/resorto/resorto1.png",
                    },
                    additionalMedia: [
                        "/images/resorto/resorto2.png",
                        "/images/resorto/resorto3.png",
                        "/images/resorto/resorto4.png",
                    ],
                },
                {
                    text: `The island terrain is generated randomly using Perlin noise, with the darker areas of the noise representing hills and mountains and white areas representing the ocean.\n
                    The game uses a 2D array to store tile information like terrain, terrain height, zone, and structures on the tile. The player has the ability to modify the terrain and place structures.`,
                    media: {
                        type: "video",
                        path: "https://www.youtube-nocookie.com/embed/2UwR6k8FrHo",
                    }, // perlin noise source: https://gfycat.com/aggravatingthosearieltoucan
                    additionalMedia: [
                        "/images/resorto/perlinNoise.gif",
                        "/images/resorto/Island2.png",
                        "/images/resorto/Island3.png",
                    ],
                },
                {
                    text: `The game includes a variety of objects to place on the island.\n
                    There are furnitures, like tables, chairs, shelves, and carpets.\n
                    Lights can be used to light up areas at night.\n
                    Trees and plants can be used to decorate the island.`,
                    media: {
                        type: "video",
                        path: "https://www.youtube-nocookie.com/embed/nH0NGtH4Ijc",
                    },
                },
                {
                    text: `Docks can be placed on the water to create walkable platforms.\n`,
                    media: {
                        type: "video",
                        path: "https://www.youtube-nocookie.com/embed/GSKX2hoDvU4",
                    },
                },
                {
                    text: `The game includes UIs to manage the state of the island and view information.\n
                    The player can gather information like how happy the tourists are.\n
                    The player has an inventory to store items. Items can be moved around the inventory slots smoothly, and can also be moved to storages.\n
                    The player can customize their looks using the character customization menu, and cosmetic items like hats.`,
                    media: {
                        type: "video",
                        path: "https://www.youtube-nocookie.com/embed/M_kbjCvs5j0",
                    },
                    additionalMedia: [
                        "/images/resorto/Inventory.png",
                        "/images/resorto/TouristsList.png",
                        "/images/resorto/ColorWheel.png",
                    ],
                },
                {
                    text: `The tourists move around the island using A* pathfinding.\n
                    When a tourist decides where they want to go, the shortest path to the destination will be calculated while avoiding terrain, water, and obstacles.\n`,
                    media: {
                        type: "video",
                        path: "https://www.youtube-nocookie.com/embed/QfkvR2-PaTg",
                    },
                },
                {
                    text: `The player can create zones around the island to dedicate spaces for certain activities. For example, if a fishing zone is created, the tourists will only go to that zone to fish.\n`,
                    media: {
                        type: "video",
                        path: "https://www.youtube-nocookie.com/embed/QC4spd8WX-k",
                    },
                },
                {
                    text: `Fish randomly spawns around the ocean. The player and tourists can take part in fishing.\n
                    The fishing line animation is created using Bezier curves. The 3 points of the curve changes during different parts of the animation to create a natural-looking casting animation.\n
                    The fishing line can be charged to cast farther and can be cast in different directions. And the bezier line renderer will change the rendering accordingly.`,
                    media: {
                        type: "video",
                        path: "https://www.youtube-nocookie.com/embed/4MtmiCCbXwQ",
                    },
                    additionalMedia: ["/images/resorto/resorto4.png"],
                },
                {
                    text: `Each tourist will have different schedules. Like what time they go to bed, what day they leave the island, or when they eat.\n
                    A clock event system is set up so that it can be subscribed and unsubscribed to.\n
                    Tourists could subscribe to any given time, such as 7:32pm. And when that time is reached, all subscribers (tourists in this case) 
                    of that time will be notified that the time has reached, and they will start doing their scheduled activities.`,
                    media: {
                        type: "img",
                        path: "/images/resorto/Bed.png",
                    },
                },
            ],
            technologies: ["Unity", "C#"],
        },
        {
            id: "ml",
            title: "Machine learning algorithms",
            mainImage: "/images/ml/logRegGaussian.png",
            pages: [
                {
                    text: `I have gained proficiency in implementing machine learning algorithms utilising Python and popular libraries such as Numpy and Pandas. \n
                    During this process, we focused on writing the algorithms from scratch, without relying on frameworks like Scikit-learn.\n
                    Some algorithms implemented include k-means, k-nearest-neighbours, linear regression, logistic regression, naive Bayes, principal component analysis, stochastic gradient descent, and random forests.\n
                    I also gained proficiency using Scikit-learn as the performance of these algorithms were compared to the performance of the same algorithms in Scikit-learn.`,
                    media: {
                        type: "img",
                        path: "/images/ml/logRegGaussian.png",
                    },
                    additionalMedia: [
                        "/images/ml/KNN.png",
                        "/images/ml/kmeans_50.png",
                        "/images/ml/robustLinearRegression.png",
                    ],
                },
            ],
            technologies: ["Python", "NumPy", "Pandas"],
        },
    ];

    const otherProjects: Project[] = [
        {
            id: "aquarium",
            title: "Aquarium live wallpaper",
            mainImage: "/images/aquarium/aquarium4.png",
            pages: [
                {
                    text: "This is an android app that can turn your home and lock screen background into a aquarium themed live wallpaper. It was created using Unity, C#, Android Studio, and Gimp (for graphics).\n",
                    media: {
                        type: "video",
                        path: "https://www.youtube-nocookie.com/embed/qZtw3N-nGwg",
                    },
                    additionalMedia: [
                        "/images/aquarium/aquarium4.png",
                        "/images/aquarium/aquarium3.png",
                        "/images/aquarium/aquarium1.png",
                    ],
                },
            ],
            technologies: ["Unity", "C#", "AndroidStudio"],
        },
        {
            id: "mail",
            title: "Mail server",
            pages: [
                {
                    text: `Mail servers that utilise SMTP (Simple mail transfer protocol) and POP3 (Post office protocol).\n
                    Clients are able to connect to the SMTP server to compose and send mail.\n
                    Clients can connect to the POP3 server to retrieve incoming mail.\n
                    The POP3 server includes a client authentication feature to verify user identity.`,
                    media: { type: "img", path: "/images/mail/smtp.png" },
                },
            ],
            mainImage: "/images/mail/smtp.png",
            technologies: ["C"],
        },
        {
            id: "starfarm",
            title: "Star farm",
            pages: [
                {
                    text: `Game my team and I created during my time at the UBC game development club. Winning "Best Gameplay" and "Best game overall" awards.\n
                    For more info and a download link, visit: https://www.ubcgamedev.com/star-farm`,
                    media: {
                        type: "img",
                        path: "/images/starfarm/starFarm1.png",
                    },
                    additionalMedia: [
                        "images/starfarm/starFarm2.png",
                        "images/starfarm/starFarm3.png",
                        "images/starfarm/starFarm4.png",
                    ],
                },
            ],
            mainImage: "/images/starfarm/starFarm1.png",
            technologies: ["Unity", "C#"],
        },
        {
            id: "product",
            title: "Product management app",
            pages: [
                {
                    text: `A full-stack web application for managing products being worked on by the BC government.\n
                    Backend was built using Node.js with Express.js. REST API is used to get/create/update/delete products from data stored in the backend.\n
                    Frontend was built using Next.js and React.js. The frontend utilizes the api to get/create/update/delete products.\n
                    Click through the tabs on the left for more details on the app.`,
                    media: {
                        type: "img",
                        path: "/images/product/product1.png",
                    },
                },
                {
                    text: `Users can add/edit/delete products using the interface. If they try to save a product with invalid fields, they will be notified with an error.\n
                    If all form fields are filled in correctly and you hit "save", the new product will be added to the server, and changes will be displayed immediately`,
                    media: {
                        type: "img",
                        path: "/images/product/product2.png",
                    },
                },
                {
                    text: "Users can search through the products by filtering through fields.",
                    media: {
                        type: "img",
                        path: "/images/product/product3.png",
                    },
                },
                {
                    text: "The application includes a comprehensive API documentation created using Swagger.js",
                    media: {
                        type: "img",
                        path: "/images/product/product4.png",
                    },
                },
            ],
            mainImage: "/images/product/product1.png",
            technologies: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "CSS3",
                "Express.js",
                "Node.js",
                "Material-ui",
            ],
        },
        {
            id: "pinball",
            title: "Pinball",
            pages: [
                {
                    text: `A JavaScript game made using Matter.js 2D physics library. \n
                    Games I made using Unity is much better but I thought I'd try learning how to make a simple game that runs on a browser.\n`,
                    media: {
                        type: "img",
                        path: "/images/pinball/pinball1.png",
                    },
                },
            ],
            mainImage: "/images/pinball/pinball1.png",
            technologies: ["JavaScript", "HTML5", "CSS3"],
            button: {
                action: () => {
                    console.log("Opening pinball");
                    setPinballOpen(true);
                },
                text: "Play",
            },
        },
        {
            id: "frog",
            title: "Hoppy frog",
            pages: [
                {
                    text: "Casual phone game where you hop a frog on to lily pads while trying not to fall. Made with Unity, C#, and Gimp (For artwork).",
                    media: {
                        type: "video",
                        path: "https://www.youtube-nocookie.com/embed/4ACAoIvRd78",
                    },
                    additionalMedia: [
                        "/images/frog/frog1.jpg",
                        "/images/frog/frog2.png",
                        "/images/frog/frog3.jpeg",
                    ],
                },
            ],
            mainImage: "/images/frog/frog1.jpg",
            technologies: ["Unity", "C#"],
        },
        {
            id: "dns",
            title: "DNS resolver",
            pages: [
                {
                    text: `DNS resolver to resolve DNS names using iterative queries.\n
                    The app will first query the root name servers to find info about the top-level domain servers.\n
                    After that, it will iteratively query other name servers to find the ip address of the requested domain.`,
                    media: { type: "img", path: "/images/dns/dns.png" },
                },
            ],
            mainImage: "/images/dns/dns.png",
            technologies: ["Java"],
        },
        {
            id: "piano",
            title: "Piano app",
            pages: [
                {
                    text: `A react native application that displays keys being played on a piano.\n
                    The piano contains a raspberry pi running a python application that records keys being pressed and a Node.js server that receives the key presses.\n
                    The app communicates with the Node.js server using WebSocket to receive information to display on the screen.`,
                    media: { type: "img", path: "/images/piano/piano.jpg" },
                },
            ],
            mainImage: "/images/piano/piano.jpg",
            technologies: [
                "React",
                "TypeScript",
                "CSS3",
                "Python",
                "AndroidStudio",
                "RaspberryPi",
                "Node.js",
            ],
        },
        {
            id: "cells",
            title: "Cellular automata",
            pages: [
                {
                    text: `In Conway's game of life, a cell can be either dead or alive, and its next state is determined by how many cells are alive in its 8 neighbouring cells. 
                    In this cellular automata simulator I created in C#, a cell can take in any float between 0 and 1, and the value to be added or subtracted depends on how many neighbours are alive.\n
                    Rules can be created to either add or subtract some value from the cells depending on how many neighbouring cells are alive. Which neighbours to check can also be configured.\n
                    Go to next page for more info.`,
                    media: { type: "img", path: "/images/cells/cell3.png" },
                    additionalMedia: [
                        "/images/cells/cell3.png",
                        "/images/cells/cell4.png",
                    ],
                },
                {
                    text: `I also created a React app to configure rules. The neighbours and the color can be configured in the UI. The color of 
                    cells can be configured to be a gradient, such that the cell's value (between 0 and 1) corresponds to a certain gradient value,
                    and the simulator will show that color for that cell. The rule can be exported to json and loaded into the simulator.`,
                    media: { type: "img", path: "/images/cells/cell2.png" },
                },
            ],
            mainImage: "/images/cells/cell3.png",
            technologies: ["Unity", "C#", "React", "Material-ui", "TypeScript"],
        },
        {
            id: "space",
            title: "Space live wallpaper",
            pages: [
                {
                    text: `This is an android app that can turn your home and lock screen background into a space themed live wallpaper. It was created using Unity, C#, Android Studio, and Gimp (for graphics).\n
                    The app reached 1800 downloads on Google play store.`,
                    media: {
                        type: "video",
                        path: "https://www.youtube-nocookie.com/embed/eLy7Q9HsUw4",
                    },
                    additionalMedia: [
                        "images/space/space2.png",
                        "images/space/space3.png",
                        "images/space/space4.png",
                    ],
                },
            ],
            mainImage: "/images/space/space1.png",
            technologies: ["Unity", "C#", "AndroidStudio"],
        },
        {
            id: "course",
            title: "Course query app",
            pages: [
                {
                    text: `This is a full-stack application that is used to query UBC courses that match query fields.\n
                    The front-end is used to select query fields. Some fields include course title, department, how many students passed, name of instructor, etc. Look at the picture to the right for a more comprehensive view of the fields.\n
                    Go to next page for more info.`,
                    media: { type: "img", path: "/images//query/query1.png" },
                },
                {
                    text: `The selected fields are used to construct a query tree.\n
                    The front-end sends a GET request to the backend API with the constructed query tree.\n
                    The backend finds the matching courses from the database and sends the matching courses as a response.\n
                    The UI will then display the courses that match the query.`,
                    media: { type: "img", path: "images/query/query2.png" },
                },
            ],
            mainImage: "/images//query/query1.png",
            technologies: ["TypeScript", "Node.js"],
        },
        {
            id: "battlesnake",
            title: "Battlesnake",
            pages: [
                {
                    text: `Snake algorithm that I created for the battlesnake coding competition. \n
                    Battlesnake is similar to the classic snake game but with other players, and you code your Snake's AI.\n
                    At the start of each turn, the battlesnake API is used to retrieve the current state of the board like where other players' snakes are.\n
                    Using the board information, my algorithm finds the best next move for my snake to take, and sends the move to their server.`,
                    media: {
                        type: "img",
                        path: "/images/battlesnake/battlesnake.png",
                    },
                },
            ],
            mainImage: "/images/battlesnake/battlesnake.png",
            technologies: ["JavaScript", "Node.js"],
        },
        {
            id: "robotics",
            title: "Robotics",
            pages: [
                {
                    text: `I was part of a team that created underwater robots to complete a variety of tasks.\n
                    The robot was equipped with a variety of tools like cameras, an arm that was used to grab objects, and a laser to measure distance.\n
                    The motors and tools were controlled using a raspberry pi controller on the surface, which sent data to the arduino equipped on the robot connected to all of the actuators.`,
                    media: {
                        type: "img",
                        path: "/images/robotics/robot3.jpeg",
                    },
                    additionalMedia: [
                        "images/robotics/robot1.jpeg",
                        "images/robotics/robot2.jpeg",
                        "images/robotics/robot4.jpeg",
                    ],
                },
            ],
            mainImage: "/images/robotics/robot3.jpeg",
            technologies: ["RaspberryPi", "Arduino"],
        },
        {
            id: "personalwebsite",
            title: "Personal website",
            pages: [
                {
                    text: "This website was created using a variety of JavaScript frameworks.",
                    media: {
                        type: "img",
                        path: "/images/website/personal-website.png",
                    },
                    additionalMedia: [
                        "/images/website/website2.png",
                        "/images/website/website3.png",
                        "/images/website/website4.png",
                    ],
                },
            ],
            mainImage: "/images/website/personal-website.png",
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
    // construct a dictionary of project id to project
    const projectsDict: { [key: string]: Project } = {};
    featuredProjects.forEach((project) => {
        projectsDict[project.id] = project;
    });
    otherProjects.forEach((project) => {
        projectsDict[project.id] = project;
    });

    // TODO: refactor
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        props.projectId && projectsDict[props.projectId]
            ? projectsDict[props.projectId]
            : null
    );

    // TODO: refactor
    const [closingProject, setClosingProject] = useState<Project | null>(
        props.projectId && projectsDict[props.projectId]
            ? projectsDict[props.projectId]
            : null
    );

    function handlePopupClose() {
        if (pinballOpen) {
            setPinballOpen(false);
        } else {
            setClosingProject(selectedProject);
            setSelectedProject(null);
            setTimeout(() => {
                setClosingProject(null);
            }, popupDelay * 1000);
        }
    }

    const [pinballOpen, setPinballOpen] = useState<boolean>(false);

    const ProjectCardsList = (props: { projects: Project[] }) => {
        return (
            <div className="relative flex flex-row flex-wrap justify-center items-center ">
                {props.projects.map((item) => (
                    <motion.button
                        key={item.id}
                        layoutId={item.id}
                        onClick={() => setSelectedProject(item)}
                        className={`m-2 text-white ${
                            closingProject && closingProject.id === item.id
                                ? "z-10"
                                : ""
                        }`}
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        //animate={{ transitionEnd: { zIndex: 1 } }}
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
                    <div className="relative flex flex-col w-full h-auto p-12">
                        <ProjectCardsList projects={featuredProjects} />
                    </div>
                    <br />
                    <br />
                    {/** Other projects cards list */}
                    <Typography className="text-center text-3xl">
                        Other projects
                    </Typography>
                    <div className="flex relative w-screen h-auto justify-center">
                        <div className="relative flex flex-col w-screen max-w-[800px] h-auto p-12 ">
                            <ProjectCardsList projects={otherProjects} />
                        </div>
                    </div>
                </div>
            </div>
            {/** Project pop up*/}
            {selectedProject && (
                <div className="fixed flex flex-col items-center justify-center left-0 right-0 top-0 bottom-0 z-50">
                    {/**fade background */}
                    <motion.div
                        className="fixed flex left-0 right-0 top-0 bottom-0 z-10 bg-tertiary opacity-20"
                        onClick={() => handlePopupClose()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.75 }}
                        exit={{ opacity: 0 }}
                    />
                    {!pinballOpen && (
                        <motion.div
                            id="projectMotionDiv"
                            className=" w-4/5 h-4/5 z-30"
                            layoutId={selectedProject.id}
                            transition={{
                                duration: popupDelay,
                            }}
                        >
                            <ProjectCardPopup
                                title={selectedProject.title}
                                projectLink={""}
                                technologies={selectedProject.technologies}
                                pages={selectedProject.pages}
                                button={selectedProject.button}
                            />
                        </motion.div>
                    )}
                    {pinballOpen && (
                        <motion.div
                            id="projectMotionDiv"
                            className="w-[650px] max-w-[4/5] h-[750px] max-h-[4/5] z-30"
                            layoutId={selectedProject.id}
                            transition={{ duration: popupDelay }}
                        >
                            <PinballPopup />
                        </motion.div>
                    )}
                </div>
            )}
        </Provider>
    );
}
