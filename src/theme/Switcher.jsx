import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDispatch } from 'react-redux'
import useDarkSide from "../hooks/useDarkSide";
import toggleTheme from "../redux/Theme/Actions/ToggleTheme";

export default function Switcher() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "dark" ? true : false
    );

    const dispatch = useDispatch();

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
        dispatch(toggleTheme(colorTheme));
    };

    return (
        <>
            <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
                size={30}
                moonColor="black"
                sunColor="white"
            />
        </>
    );
}