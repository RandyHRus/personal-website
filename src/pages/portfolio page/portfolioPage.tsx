import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Grid, Paper } from "@mui/material";
import ResponsiveAppBar from "./responsiveAppBar";

const projects = [
    {
        id: 1,
        title: "Project 1",
        image: "/images/project1.png",
        description: "This is the description for Project 1",
    },
    // add more projects here
];

export default function PortfolioPage() {
    const [selectedProject, setSelectedProject] = useState(projects[0]);

    const handleProjectClick = (project: any) => {
        setSelectedProject(project);
    };

    return (
        <div>
            <div className="w-full">
                <ResponsiveAppBar></ResponsiveAppBar>
            </div>
        </div>
    );
}
