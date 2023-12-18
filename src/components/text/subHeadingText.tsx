import { Typography } from "@mui/material";
import FadeIn from "../fadeIn";

export default function SubSectionHeading(props: any) {
    return (
        <FadeIn>
            <Typography className={`text-center text-3xl ${props.color}`}>
                {props.children}
            </Typography>
        </FadeIn>
    );
}
