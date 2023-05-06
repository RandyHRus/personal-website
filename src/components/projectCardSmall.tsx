import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
    title: string;
    imgPath: string;
}

export default function ProjectCardSmall(props: Props) {
    return (
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
    );
}
