import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
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

export default function ProjectCard(props: Props) {
    const [textIndex, setTextIndex] = useState(0);

    const imgPaths = props.imgPaths;

    const handleBack = () => {
        setTextIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const handleForward = () => {
        setTextIndex((prevIndex) =>
            prevIndex < props.text.length - 1 ? prevIndex + 1 : prevIndex
        );
    };

    return (
        <Card className="flex flex-col md:flex-row h-full shadow-xl rounded-lg  bg-tertiary">
            <div className="md:w-1/2">
                <div className="flex flex-wrap h-full">
                    <div className="w-full h-3/4">
                        <CardMedia
                            className="w-full h-full"
                            component="img"
                            image={imgPaths[0]}
                            title="My Card Image"
                        />
                    </div>
                    <div className="w-1/3 h-1/4">
                        <CardMedia
                            className="w-full h-full"
                            component="img"
                            image={imgPaths[1]}
                            title="My Card Image"
                        />
                    </div>
                    <div className="w-1/3 h-1/4">
                        <CardMedia
                            className="w-full h-full"
                            component="img"
                            image={imgPaths[2]}
                            title="My Card Image"
                        />
                    </div>
                    <div className="w-1/3 h-1/4">
                        <CardMedia
                            className="w-full h-full"
                            component="img"
                            image={imgPaths[3]}
                            title="My Card Image"
                        />
                    </div>
                </div>
            </div>
            <CardContent className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                <div>
                    <Typography variant="h5" component="h2" color="white">
                        My Card Title
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        className="mt-4"
                        color="white"
                    >
                        {props.text[textIndex]}
                    </Typography>
                </div>
                <div className="flex justify-between mt-8 ">
                    <IconButton aria-label="back" onClick={handleBack}>
                        <ArrowBackIos />
                    </IconButton>
                    <IconButton aria-label="forward" onClick={handleForward}>
                        <ArrowForwardIos />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
}
