import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        background: {
            default: "#424242",
        },
        text: {
            primary: "#ffffff",
        },

        primary: {
            light: "#6d6d6d",
            main: "#424242",
            dark: "#1b1b1b",
            contrastText: "#ffffff",
        },
        secondary: {
            light: "#ffffff",
            main: "#ffffff",
            dark: "#bdb9b9",
            contrastText: "#000000",
        },
    },
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        button: {
            textTransform: "none",
        },
    },
    components: {
        MuiList: {
            styleOverrides: {
                root: {
                    backgroundColor: "#6d6d6d",
                    color: "white",
                },
            },
        },

        //Scrollbar not visible for some reason? Added this as a quick fix
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: "#6b6b6b #2b2b2b",
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        backgroundColor: "#2b2b2b",
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: "#6b6b6b",
                        minHeight: 24,
                        border: "3px solid #2b2b2b",
                    },
                    "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                    {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                    {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                    {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                        backgroundColor: "#2b2b2b",
                    },
                },
            },
        },
    },
});