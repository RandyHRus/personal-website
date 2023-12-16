import { Typography } from "@mui/material";

export default function ParagraphText(props: any) {
    return (
        <Typography className="text-white text-center text-xl max-w-xl">
            {props.children}
        </Typography>
    );
}
