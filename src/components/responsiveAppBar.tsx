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
        name: "Experience",
        link: "/experience",
    },
    {
        name: "Projects",
        link: "/projects",
    },
    { name: "Contact", link: "/contact" },
];

function ResponsiveAppBar() {
    return (
        <AppBar
            position="static"
            className="fixed top-0 w-full bg-gray-800 bg-center bg-transparent "
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/*logo*/}
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <AdbIcon
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    mr: 1,
                                }}
                            />
                        </Typography>
                    </motion.div>
                    {/*page navigation buttons*/}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
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
