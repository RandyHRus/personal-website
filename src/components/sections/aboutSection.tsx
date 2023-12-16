import React from "react";
import { Typography } from "@mui/material";
import SectionHeading from "../text/sectionHeading";
import ParagraphText from "../text/paragraphText";
import Section from "../section";

export default function AboutSection() {
    return (
        <Section id="about" heading="About">
            <ParagraphText>
                Hi, I&apos;m Randy. I&apos;m a software developer and I hold a
                B.Sc. in Computer Science from the University of British
                Columbia.
            </ParagraphText>
        </Section>
    );
}
