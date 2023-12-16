import { Typography } from "@mui/material";

export default function SectionHeading(props: any) {
    return (
        <Typography
            variant="h2"
            className="text-white text-center font-normal "
        >
            {props.children}
        </Typography>
    );
}
