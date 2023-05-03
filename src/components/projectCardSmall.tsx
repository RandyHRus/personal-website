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
        <Card className="flex flex-col w-48 h-48 shadow-lg rounded-lg">
            <div className="flex">
                <CardMedia
                    component="img"
                    image={props.imgPath}
                    title="My Card Image"
                />
            </div>
            <CardContent className="flex w-full flex-col bg-quinary">
                <div>
                    <Typography variant="h5" component="h2" color="white">
                        {props.title}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}
