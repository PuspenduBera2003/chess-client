import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import toggleTheme from "../redux/Theme/Actions/ToggleTheme";

export default function useDarkSide() {

    const dispatch = useDispatch();

    const storedTheme = localStorage.getItem("theme") || "dark";

    const [theme, setTheme] = useState(storedTheme);

    const colorTheme = theme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", theme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
        dispatch(toggleTheme(theme));
    }, [theme, colorTheme]);

    useEffect(() => {
        dispatch(toggleTheme(storedTheme));
    }, []);

    return [colorTheme, setTheme];
}