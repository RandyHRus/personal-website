import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { Component, RefObject, useRef, useState } from "react";
import { DevIcon } from "@/icons/devicons";
import CancelIcon from "@mui/icons-material/Cancel";

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
    button?: { action: () => void; text: string };
    handleClose: () => void;
}

export default function ProjectCardPopup(props: Props) {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const scrollRef: RefObject<HTMLDivElement> = useRef(null);

    function tabChangeHandler(index: number) {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, 0); // Scroll to the top-left position
        }
        setSelectedTab(index);
    }

    return (
        <Card className="flex flex-col h-full shadow-xl rounded-lg bg-white">
            {/** Bar that contains the close card button. */}
            <div className="flex flex-col items-end justify-center bg-grey h-9">
                <IconButton onClick={() => props.handleClose()}>
                    <CancelIcon className="text-grey-400 w-5 h-5"></CancelIcon>
                </IconButton>
            </div>
            <div className="flex flex-row h-[calc(100%-36px)]">
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={selectedTab} // Set the active tab index here
                    className=" bg-white min-w-min"
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
                            onClick={() => tabChangeHandler(index)}
                        />
                    ))}
                </Tabs>
                <CardContent className="flex p-4 justify-between h-full w-full">
                    <div
                        ref={scrollRef}
                        className="flex w-full lg:flex-row flex-col h-full overflow-auto"
                    >
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
                            {/**  button */}
                            <div className="flex items-center flex-col">
                                {props.button && (
                                    <Button
                                        variant="contained"
                                        className=" flex relative w-min bg-primary text-white"
                                        onClick={() => props.button?.action()}
                                    >
                                        {props.button?.text}
                                    </Button>
                                )}
                                <br />
                            </div>
                        </div>
                        {/** Picture area */}
                        <div className="lg:w-3/5 w-full flex lg:h-full h-96">
                            <div className="flex flex-col w-full h-full">
                                {/** Main image or video */}
                                <div
                                    className={`flex ${
                                        props.pages[selectedTab]
                                            .additionalMedia == undefined
                                            ? "h-full w-full"
                                            : "lg:h-3/4 h-full w-full"
                                    }`}
                                >
                                    {props.pages[selectedTab].media.type ==
                                        "img" && (
                                        <CardMedia
                                            className="flex w-full h-full border border-grey rounded-lg object-center bg-grey"
                                            component="img"
                                            image={
                                                props.pages[selectedTab].media
                                                    .path
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
                                                props.pages[selectedTab].media
                                                    .path
                                            }
                                        />
                                    )}
                                </div>
                                {/** Additional pictures */}
                                {props.pages[selectedTab].additionalMedia !=
                                    undefined && (
                                    <div className="flex lg:flex-row flex-col lg:h-1/4 h-full w-full">
                                        {props.pages[
                                            selectedTab
                                        ].additionalMedia?.map(
                                            (path: string, index: number) => (
                                                <div
                                                    className="flex flex-row lg:w-1/3 w-full h-full lg:mt-0 mt-5"
                                                    key={index}
                                                >
                                                    <CardMedia
                                                        className="flex w-full h-full border border-grey rounded-lg"
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
            </div>
        </Card>
    );
}
