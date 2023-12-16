import React from "react";
import { Typography } from "@mui/material";
import SectionHeading from "../text/sectionHeading";
import ParagraphText from "../text/paragraphText";
import Section from "../section";

export default function WorkExperienceSection() {
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
        <Section id="workExperience" heading="Work experience">
            {workExperiences.map((experience, index) => (
                <div key={index} className="flex flex-row max-w-xl w-full">
                    <div className="flex flex-col w-1/2 items-start">
                        <ParagraphText>{experience.position}</ParagraphText>
                        <ParagraphText>{experience.company}</ParagraphText>
                    </div>
                    <div className="flex flex-col items-end w-1/2">
                        <ParagraphText>{experience.date}</ParagraphText>
                        <ParagraphText>{experience.location}</ParagraphText>
                    </div>
                </div>
            ))}
        </Section>
    );
}
