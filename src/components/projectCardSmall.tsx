import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FadeIn from "./fadeIn";

export default function ProjectCardSmall(props: any) {
    return (
        <FadeIn>
            <Card className="flex flex-col w-48 h-56 shadow-xl rounded-lg">
                <CardMedia
                    component="img"
                    className="h-2/3"
                    image={props.imgPath}
                    title="My Card Image"
                />
                <CardContent className="flex justify-center items-center align-middle h-1/3 bg-white">
                    <Typography className=" text-lg ">{props.title}</Typography>
                </CardContent>
            </Card>
        </FadeIn>
    );
}
