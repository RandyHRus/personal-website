import React from "react";
import { Typography } from "@mui/material";
import SectionHeading from "../text/sectionHeading";
import ParagraphText from "../text/paragraphText";
import Section from "../section";
import SubSectionHeading from "../text/subHeadingText";

export default function AboutSection() {
    const workExperiences = [
        {
            position: "Software Developer",
            company: "NexJ Health",
            location: "Vancouver, BC",
            date: "Aug 2023 - Dec 2023",
        },
        {
            position: "Software Developer (co-op)",
            company: "SAP",
            location: "Vancouver, BC",
            date: "Jan 2022 - Aug 2022",
        },
        {
            position: "Software Developer (co-op)",
            company: "Delta-Q Technologies",
            location: "Burnaby, BC",
            date: "Jan 2020 - Aug 2020",
        },
    ];
    return (
        <Section id="about" heading="about" height="h-auto">
            <div className="flex flex-col max-w-xl w-full space-y-24">
                <div className="flex flex-col max-w-xl w-full space-y-12">
                    <ParagraphText>
                        Hi, I&apos;m Randy. I&apos;m a Software Developer.
                    </ParagraphText>
                </div>
                <div className="flex flex-col max-w-xl w-full space-y-12">
                    <SubSectionHeading color="text-white">
                        Education
                    </SubSectionHeading>
                    <div className="flex flex-row max-w-xl w-full">
                        <div className="flex flex-col w-1/2 items-start">
                            <ParagraphText textAlign="text-left">
                                University of British Columbia
                            </ParagraphText>
                            <ParagraphText textAlign="text-left">
                                B.Sc. Computer Science
                            </ParagraphText>
                        </div>
                        <div className="flex flex-col items-end w-1/2">
                            <ParagraphText textAlign="text-right">
                                Sept 2018 - May 2023
                            </ParagraphText>
                            <ParagraphText textAlign="text-right">
                                Vancouver, BC
                            </ParagraphText>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col max-w-xl w-full space-y-12">
                    <SubSectionHeading color="text-white">
                        Work experience
                    </SubSectionHeading>
                    {workExperiences.map((experience, index) => (
                        <div
                            key={index}
                            className="flex flex-row max-w-xl w-full"
                        >
                            <div className="flex flex-col w-1/2 items-start">
                                <ParagraphText textAlign="text-left">
                                    {experience.position}
                                </ParagraphText>
                                <ParagraphText textAlign="text-left">
                                    {experience.company}
                                </ParagraphText>
                            </div>
                            <div className="flex flex-col items-end w-1/2">
                                <ParagraphText textAlign="text-right">
                                    {experience.date}
                                </ParagraphText>
                                <ParagraphText textAlign="text-right">
                                    {experience.location}
                                </ParagraphText>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
