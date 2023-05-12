import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { Component, useState } from "react";
import { DevIcon } from "@/icons/devicons";

export interface Page {
    text: string;
    media: { type: "img"; path: string } | { type: "video"; path: string };
    additionalMedia?: string[];
}

interface Props {
    title: string;
    pages: Page[];
    projectLink: string;
    technologies: string[] | null;
}

export default function ProjectCardPopup(props: Props) {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    return (
        <Card className="flex flex-row h-full shadow-xl rounded-lg bg-grey">
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedTab} // Set the active tab index here
                className=" bg-grey min-w-min"
                classes={{
                    indicator: "bg-primary", // Customize the indicator color here
                }}
                sx={{ borderRight: 1, borderColor: "divider" }}
                aria-label="Vertical tabs"
                style={{ position: "relative", left: 0 }} // Position the tabs on the right
            >
                {props.pages.map((page: Page, index: number) => (
                    <Tab
                        key={index}
                        classes={{
                            selected: "text-primary",
                        }}
                        label={"Page " + (index + 1)}
                        onClick={() => setSelectedTab(index)}
                    />
                ))}
            </Tabs>
            <CardContent className="p-4 justify-between h-full w-full">
                <div className="w-full lg:flex-row flex-col h-full flex overflow-auto">
                    {/** Text area */}
                    <div className="lg:w-2/5 w-full flex flex-col lg:h-full h-auto">
                        {/** Title */}
                        <Typography className="text-2xl">
                            {props.title}
                        </Typography>
                        {/** Icons */}
                        <div className="p-4 justify-center flex flex-row flex-wrap">
                            {props.technologies?.map((tech, index) => (
                                <div key={index} className="w-12 h-12 p-2">
                                    <DevIcon iconName={tech}></DevIcon>
                                </div>
                            ))}
                        </div>
                        {/** Description */}
                        <Typography
                            className="text-sm"
                            style={{ whiteSpace: "pre-line" }}
                        >
                            {props.pages[selectedTab].text}
                        </Typography>
                        <br />
                    </div>
                    {/** Picture area */}
                    <div className="lg:w-3/5 w-full flex lg:h-full h-96">
                        <div className="flex lg:flex-col flex-row w-full h-full">
                            {/** Main image or video */}
                            <div
                                className={`flex ${
                                    props.pages[selectedTab].additionalMedia ==
                                    undefined
                                        ? "h-full w-full"
                                        : "lg:h-3/4 h-full w-full"
                                }`}
                            >
                                {props.pages[selectedTab].media.type ==
                                    "img" && (
                                    <CardMedia
                                        className="flex w-full h-full border border-grey rounded-lg "
                                        component="img"
                                        image={
                                            props.pages[selectedTab].media.path
                                        }
                                        title="My Card Image"
                                    />
                                )}
                                {props.pages[selectedTab].media.type ==
                                    "video" && (
                                    <CardMedia
                                        className="flex w-full h-full border border-grey rounded-lg "
                                        component="iframe"
                                        src={
                                            props.pages[selectedTab].media.path
                                        }
                                    />
                                )}
                            </div>
                            {/** Additional pictures */}
                            {props.pages[selectedTab].additionalMedia !=
                                undefined && (
                                <div className="flex lg:flex-row flex-col lg:h-1/4 h-full lg:w-full w-1/2">
                                    {props.pages[
                                        selectedTab
                                    ].additionalMedia?.map(
                                        (path: string, index: number) => (
                                            <div
                                                className="flex flex-row lg:w-1/3 w-full lg:h-full h-1/3"
                                                key={index}
                                            >
                                                <CardMedia
                                                    className="flex w-full h-full  border border-grey rounded-lg"
                                                    component="img"
                                                    image={path}
                                                    title="My Card Image"
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
