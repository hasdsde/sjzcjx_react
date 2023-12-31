import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            spacing: {
                "1": "8px",
                "2": "12px",
                "3": "16px",
                "4": "24px",
                "5": "32px",
                "6": "48px",
            },
            backgroundImage: {
                'homePage': "url('https://img.hasdsd.cn/img/bg.jpg')",
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            screens: {
                sm: "480px",
                md: "768px",
                lg: "976px",
                xl: "1440px",
            },
            colors: {
                "blue": "#0B6BCB",
                "pink": "#ff49db",
                "orange": "#ff7849",
                "green": "#13ce66",
                "gray-dark": "#101418",
                "gray": "#FAFAFA",
                "gray-light": "#d3dce6",
            },
            extend: {
                aspectRatio: {//纵横比
                    "4/3": "4 / 3",
                },
            }
        },
    },
    plugins: [],
};
export default config;
