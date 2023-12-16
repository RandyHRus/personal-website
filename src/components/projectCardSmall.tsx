import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
    title: string;
    imgPath: string;
}

let inViewTriggered = false; // Global to ensure that animation only runs once.

export default function ProjectCardSmall(props: any) {
    const [ref, inView] = useInView({});

    if (inView) inViewTriggered = true;

    return (
        <motion.div
            ref={ref}
            animate={inView || inViewTriggered ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: "20%" },
                visible: { opacity: 1, y: "0%" },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Card className="flex flex-col w-48 h-56 shadow-lg rounded-lg">
                <CardMedia
                    component="img"
                    className="h-2/3"
                    image={props.imgPath}
                    title="My Card Image"
                />
                <CardContent className="flex justify-center items-center align-middle h-1/3 bg-grey">
                    <Typography className=" text-lg ">{props.title}</Typography>
                </CardContent>
            </Card>
        </motion.div>
    );
}
