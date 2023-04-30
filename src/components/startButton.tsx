import React from "react";
import { Button, styled, keyframes } from "@mui/material";

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 12px #9b78c5;
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 16px #9b78c5;
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 12px #9b78c5;
  }
`;

const _StartButton = styled(Button)({
    margin: "1rem",
    borderRadius: "50%",
    backgroundColor: "rgba(145, 101, 235, 1)",
    width: "80px",
    height: "80px",
    boxShadow: "0 0 12px #b19cd9",
    color: "#fff",
    opacity: 1, // Set the opacity to 1 to make it non-transparent
    animation: `${pulseAnimation} 2s ease-in-out infinite`, // Run the animation continuously
    "&:hover": {
        backgroundColor: "#9b78c5",
        boxShadow: "0 0 16px #9b78c5", // Increase the box shadow on hover
        animation: `${pulseAnimation} 1s ease-in-out infinite`,
    },
});

export default function StartButton(props: any) {
    return (
        <_StartButton variant="contained" onClick={props.onClick}>
            Start
        </_StartButton>
    );
}
