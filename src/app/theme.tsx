"use client";
import {extendTheme} from "@mui/joy/styles";

export default extendTheme({
    colorSchemes: {
        light: {
            palette: {
                // affects all Joy components that has `color="primary"` prop.
                primary: {
                    50: "#fffbeb",
                    100: "#fef3c7",
                    200: "#fde68a",
                    // 300, 400, ..., 800,
                    900: "#78350f",
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    100: "rgb(16,20,24)"
                }
            }
        }
    },
    typography: {
        h1: {
            background:
                "linear-gradient(-30deg, var(--joy-palette-primary-700), var(--joy-palette-primary-400))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
        },
    },
    fontFamily: {
        display: "Inter, var(--joy-fontFamily-fallback)",
        body: "Inter, var(--joy-fontFamily-fallback)",
    },
});