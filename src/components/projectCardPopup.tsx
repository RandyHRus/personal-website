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
import { DevIcon } from "@/icons/devicons";

interface Props {
    title: string;
    main: { type: "img" | "video"; path: string };
    additionalImgPaths: string[] | null;
    text: string[];
    projectLink: string;
    technologies: string[] | null;
}

export default function ProjectCardPopup(props: Props) {
    const [textIndex, setTextIndex] = useState(0);

    const handleBack = () => {
        setTextIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const handleForward = () => {
        setTextIndex((prevIndex) =>
            prevIndex < props.text.length - 1 ? prevIndex + 1 : prevIndex
        );
    };

    return (
        <Card className="flex flex-row h-full shadow-xl rounded-lg bg-grey">
            {/** Picture area */}
            <div className="w-3/5 flex h-full">
                <div className="flex flex-col h-full ">
                    {/** Main image or video */}
                    <div className="flex w-full flex-grow max-h-full ">
                        {props.main.type == "img" && (
                            <CardMedia
                                className="flex w-full h-full border border-grey rounded-lg "
                                component="img"
                                image={props.main.path}
                                title="My Card Image"
                            />
                        )}
                        {props.main.type == "video" && (
                            <CardMedia
                                className="flex w-full h-full border border-grey rounded-lg "
                                component="iframe"
                                src={props.main.path}
                            />
                        )}
                    </div>
                    {/** additonal images */}
                    {props.additionalImgPaths && (
                        <div className="flex flex-row h-1/4">
                            {props.additionalImgPaths.map((path, index) => (
                                <div
                                    className="flex flex-row w-1/3"
                                    key={index}
                                >
                                    <CardMedia
                                        className="flex w-full h-full  border border-grey rounded-lg"
                                        component="img"
                                        image={path}
                                        title="My Card Image"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/** Text area */}
            <CardContent className="w-2/5 p-4 flex flex-col justify-between">
                <div className="h-5/6">
                    <Typography variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" component="p" className="mt-4">
                        {props.text[textIndex]}
                    </Typography>
                </div>
                <div className="h-1/6 justify-center flex flex-row flex-wrap">
                    {props.technologies?.map((tech, index) => (
                        <div key={index} className="w-12 h-12 p-2">
                            <DevIcon iconName={tech}></DevIcon>
                        </div>
                    ))}
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
