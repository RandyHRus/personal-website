import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { motion } from "framer-motion";
import Link from "next/link";

const pages = [
    {
        name: "About",
        link: "#about",
    },
    {
        name: "Projects",
        link: "#projects",
    },
    { name: "Contact", link: "#contact" },
];

function ResponsiveAppBar() {
    return (
        <AppBar
            className="fixed top-0 w-full bg-center"
            style={{ backgroundColor: "rgba(27, 23, 52, 0.2)" }}
        >
            <Container>
                <Toolbar disableGutters>
                    {/*logo*/}
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            className=" p-3"
                            href="/"
                            sx={{
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <AdbIcon />
                        </Typography>
                    </motion.div>
                    {/*page navigation buttons*/}
                    <Box
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        {pages.map((page) => (
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                className=" p-3"
                                key={page.name}
                            >
                                <Link href={page.link}>{page.name}</Link>
                            </motion.button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
