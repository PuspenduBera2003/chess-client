import { setAuthenticated, setShowBottomToast, setShowNotification, setSignUpInitialized, setUserDetails, setUserFriend, setUserRating } from "../Actions/ActionType/AuthTypes";
import { authChecker, getUserDetails } from "../../../api/authChecker";

const auth = async () => {
    const responseAuthChecker = await authChecker();
    if (responseAuthChecker.success) {
        localStorage.setItem('isAuthenticated', true);
        return true;
    } else {
        localStorage.setItem('isAuthenticated', false);
        return false;
    }
}

const user = async () => {
    const userDetails = await getUserDetails();
    if (!userDetails.success)
        return null;
    return userDetails.user
}

const initialState = {
    isAuthenticated: await auth(),
    signUpInitialized: {
        start: false, response: {
            success: false,
            serverReplied: true
        }, email: '', username: '', password: '', token: ''
    },
    showBottomToast: {
        show: false, type: '', message: ''
    },
    userDetails: await user(),
    userFriend: {},
    notification: {
        show: false, type: '', data: {}
    },
    userRating: 5
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case setAuthenticated:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        case setUserDetails:
            return {
                ...state,
                userDetails: action.payload
            }
        case setSignUpInitialized:
            return {
                ...state,
                signUpInitialized: { start: action.payload.start, response: action.payload.response, email: action.payload.email, username: action.payload.username, password: action.payload.password, token: action.payload.token }
            }
        case setShowBottomToast:
            return {
                ...state,
                showBottomToast: { show: action.payload.show, type: action.payload.type, message: action.payload.message }
            }
        case setUserFriend:
            return {
                ...state,
                userFriend: action.payload
            }
        case setShowNotification:
            return {
                ...state,
                notification: { show: action.payload.show, type: action.payload.type, data: action.payload.data }
            }
        case setUserRating:
            return {
                ...state,
                userRating: action.payload
            }
        default:
            return state
    }
}

export default AuthReducer