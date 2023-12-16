import { Typography } from "@mui/material";

export default function SubSectionHeading(props: any) {
    return (
        <Typography className={`text-center text-3xl ${props.color}`}>
            {props.children}
        </Typography>
    );
}
