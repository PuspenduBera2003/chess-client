import { setTheme } from "../Actions/CurrentTheme";

const themeChecker = () => {
    const theme = localStorage.getItem('theme');
    if(!theme) {
        return 'dark'
    }
    return theme
}

const initialState = {
    currentTheme: themeChecker()
}

const ThemeReducer = (state = initialState, action) => {
    switch (action.type) {
        case setTheme:
            return {
                ...state,
                currentTheme: action.payload
            }
        default:
            return state
    }
}

export default ThemeReducer