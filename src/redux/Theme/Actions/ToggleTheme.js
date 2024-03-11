import { setTheme } from "./CurrentTheme"

const toggleTheme = (data) => {
    return{
        type: setTheme,
        payload: data
    }
}

export default toggleTheme