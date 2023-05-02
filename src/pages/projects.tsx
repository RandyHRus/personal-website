import React, { useEffect, useState } from "react";
import { Toolbar } from "@mui/material";
import ResponsiveAppBar from "@/components/responsiveAppBar";
import store, { STATES } from "@/state/reduxState";
import PortfolioPageWrapper from "@/components/portfolioPageWrapper";

const projects = [
    {
        id: 1,
        title: "Project 1",
        image: "/images/project1.png",
        description: "This is the description for Project 1",
    },
    // add more projects here
];

export default function ProjectsPage() {
    return <PortfolioPageWrapper></PortfolioPageWrapper>;
}
