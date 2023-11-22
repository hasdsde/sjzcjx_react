"use client";
import {extendTheme} from "@mui/joy/styles";

export default extendTheme({
    colorSchemes: {
        light: {
            palette: {
                // affects all Joy components that has `color="primary"` prop.
                primary: {},
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
        display: "Inter,微软雅黑, var(--joy-fontFamily-fallback)",
        body: "Inter,黑体, var(--joy-fontFamily-fallback)",
    },
});