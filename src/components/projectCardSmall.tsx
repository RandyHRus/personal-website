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
    imgPath: string;
}

export default function ProjectCardSmall(props: Props) {
    return (
        <Card className="flex flex-col w-48 h-48 shadow-lg rounded-lg">
            <div className="flex">
                <CardMedia
                    component="img"
                    image={props.imgPath}
                    title="My Card Image"
                />
            </div>
            <CardContent className="flex w-full flex-col bg-white">
                <div>
                    <Typography variant="h5" component="h2">
                        {props.title}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}
