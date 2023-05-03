import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
    styled,
} from "@mui/material";
import { Component, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface Props {
    title: string;
    imgPaths: string[];
    text: string[];
    projectLink: string;
    technologies: Component[] | null;
}

const MyCard = styled(Card)({
    display: "flex",
    flexDirection: "column",
    width: "192px",
    height: "192px",
    "--tw-shadow":
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    "--tw-shadow-colored":
        "0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color)",
    boxShadow:
        "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
    borderRadius: "0.5rem",
});

const MyCardContent = styled(CardContent)({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#1f2937",
});

export default function ProjectCardSmall(props: {
    imgPath: string;
    title: string;
}) {
    return (
        <MyCard>
            <div className="flex">
                <CardMedia
                    component="img"
                    image={props.imgPath}
                    title="My Card Image"
                />
            </div>
            <MyCardContent>
                <div>
                    <Typography variant="h5" component="h2" color="white">
                        {props.title}
                    </Typography>
                </div>
            </MyCardContent>
        </MyCard>
    );
}
