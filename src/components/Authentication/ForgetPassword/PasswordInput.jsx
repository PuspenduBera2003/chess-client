import React, { useEffect, useState } from 'react'
import { successPlaceholderClasses, errorPlaceholderClasses, successLabelClasses, errorLabelClasses, successMessageClasses, errorMessageClasses, normalTextClasses } from './WarningClasses';
import { useDispatch, useSelector } from 'react-redux';
import { setNewPw } from '../../../api/forgetPassword';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import { useNavigate } from 'react-router-dom';

const PasswordInput = (props) => {

    const { token, email, otp } = props

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userDetails = useSelector(state => state.Auth.userDetails);

    const [message, setMessage] = useState({ np: { show: false, type: '', message: '' }, cnp: { show: false, type: '', message: '' } });
    const widthPower = ["1%", "25%", "50%", "75%", "100%"];
    const [point, setPoint] = useState(0);
    const [credentials, setCredentials] = useState({ np: '', cnp: '' });
    const [reqSend, setReqSend] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [types, setTypes] = useState({ np: true, cnp: true });
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];


    const passwordCheckerClasses = (currentTheme === "dark")
        ? 'dark-password-checker'
        : 'light-password-checker'

    const handleTypeChange = (target) => {
        if (types[target] === true) {
            setTypes({ ...types, [target]: false });
        } else {
            setTypes({ ...types, [target]: true });
        }
    };

    const handleChange = (e) => {
        if (!reqSend) {
            setClicked(false)
        }
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (e.target.name === 'np') {
            let newPoint = 0;
            if (e.target.value.length >= 6) {
                if (/\d/.test(e.target.value)) newPoint++;
                if (/[a-z]/.test(e.target.value)) newPoint++;
                if (/[A-Z]/.test(e.target.value)) newPoint++;
                if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(e.target.value)) newPoint++;
            }
            setPoint(newPoint);
        }
    }

    useEffect(() => {
        const cnfCrdeChecker = () => {
            if (passwordMatch && (credentials.np.length >= 6) && (credentials.cnp.length >= 6)) {
                setMessage({ ...message, cnp: { show: true, type: 's', message: 'Password Matches!' } });
            } else if ((credentials.np.length >= 5) && (credentials.cnp.length >= 5)) {
                setMessage({ ...message, cnp: { show: true, type: 'e', message: 'Password Is Not Matching!' } });
            } else {
                setMessage({ ...message, cnp: { show: false, type: '', message: '' } });
            }
        }
        cnfCrdeChecker();
    }, [passwordMatch, credentials])

    useEffect(() => {
        const pwChecker = () => {
            // Check if widthPower is "100%" and credentials.op and credentials.np are not the same
            if (widthPower[point] === "100%") {
                // Additional check to ensure credentials.op and credentials.np are not the same
                setMessage({ ...message, np: { show: true, type: 's', message: 'Password Policy Followed' } });
            } else {
                setMessage({ ...message, np: { show: true, type: 'e', message: 'Please Follow Password Policy!' } });
            }
        }

        pwChecker();
    }, [credentials, point]);

    useEffect(() => {
        if (credentials.np.length >= 5 && credentials.cnp.length >= 5) {
            if (credentials.np === credentials.cnp) {
                setPasswordMatch(true)
            } else {
                setPasswordMatch(false)
            }
        } else {
            setPasswordMatch(false)
        }
    }, [credentials])

    useEffect(() => {
        setShowSubmitButton((widthPower[point] === "100%") && passwordMatch && (credentials.np === credentials.cnp));
    }, [credentials, passwordMatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, token, otp, credentials.np)
        const response = await setNewPw(email, token, otp, credentials.np);
        dispatch(updateShowBotomToast({ show: false, type: '', message: '' }));
        setReqSend(false);
        if (!response.success) {
            setMessage({ ...message, np: { show: true, type: 'e', message: response.error } });
        } else {
            if (userDetails) {
                navigate('/user/dashboard')
            } else {
                navigate('/auth/signin');
            }
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: "Password Updated Successfully" }))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center pb-4'>
                <div className='mt-2 sm:w-96 xs:w-64 xxs:w-48 md:w-96'>
                    <label htmlFor="np" className={`block mb-2 text-sm font-medium ${(message.np.type === 'e') ? errorLabelClasses : (message.np.type === 's') ? successLabelClasses : normalTextClasses}`}>New Password</label>
                    <div className='relative'>
                        <input type={types.np ? 'password' : 'text'} id='np' name='np' onChange={handleChange} className={`text-sm rounded-lg block sm:w-96 xs:w-64 xxs:w-48 md:w-96 p-2.5 dark:bg-gray-700 ${(message.np.type === 'e') ? errorPlaceholderClasses : (message.np.type === 's') ? successPlaceholderClasses : normalTextClasses}`} placeholder="New Password" autoComplete='off' />
                        {
                            types.np ?
                                <button
                                    type='button'
                                    onClick={() => handleTypeChange('np')}
                                    className='bg-gray-50 dark:bg-gray-800 px-2 rounded-md z-10 absolute right-2 top-2'>
                                    <i className={`fa-regular fa-eye ${(message.np.type === 'e') ? errorLabelClasses : (message.np.type === 's') ? successLabelClasses : normalTextClasses}`}></i>
                                </button> :
                                <button
                                    type='button'
                                    onClick={() => handleTypeChange('np')}
                                    className='bg-gray-50 dark:bg-gray-800 px-2 rounded-md z-10 absolute right-2 top-2'>
                                    <i className={`fa-regular fa-eye-slash text-black dark:text-gray-300 ${(message.np.type === 'e') ? errorLabelClasses : (message.np.type === 's') ? successLabelClasses : normalTextClasses}`}></i>
                                </button>
                        }
                    </div>
                    <p className={`my-2 text-sm ${message.np.show && (message.np.type === 'e') ? errorMessageClasses : successMessageClasses}`}>
                        <span className="font-medium mr-1">{message.np.show && ((message.np.type === 'e') ? 'Ohh Snaps!' : 'Well Done!')}</span>
                        {message.np.show && message.np.message}
                    </p>
                    {
                        credentials.np &&
                        <div className={`power-container ${passwordCheckerClasses} mt-1`}>
                            <div
                                id="power-point"
                                style={{ width: widthPower[point], backgroundColor: colorPower[point] }}
                                className='h-2 rounded-lg'
                            ></div>
                        </div>
                    }
                </div>
                <div className='mt-2 sm:w-96 xs:w-64 xxs:w-48 md:w-96'>
                    <label htmlFor="cnp" className={`block mb-2 text-sm font-medium ${(message.cnp.type === 'e') ? errorLabelClasses : (message.cnp.type === 's') ? successLabelClasses : normalTextClasses}`}>Retype New Password</label>
                    <div className="relative">
                        <input type={types.cnp ? 'password' : 'text'} name='cnp' id='cnp' onChange={handleChange} className={`text-sm rounded-lg block sm:w-96 xs:w-64 xxs:w-48 md:w-96 p-2.5 dark:bg-gray-700 ${(message.cnp.type === 'e') ? errorPlaceholderClasses : (message.cnp.type === 's') ? successPlaceholderClasses : normalTextClasses}`} placeholder="Re-enter Password" autoComplete='off' />
                        {
                            types.cnp ?
                                <button
                                    type='button'
                                    onClick={() => handleTypeChange('cnp')}
                                    className='bg-gray-50 dark:bg-gray-800 px-2 rounded-md z-10 absolute right-2 top-2'>
                                    <i className={`fa-regular fa-eye ${(message.cnp.type === 'e') ? errorLabelClasses : (message.cnp.type === 's') ? successLabelClasses : normalTextClasses}`}></i>
                                </button> :
                                <button
                                    type='button'
                                    onClick={() => handleTypeChange('cnp')}
                                    className='bg-gray-50 dark:bg-gray-800 px-2 rounded-md z-10 absolute right-2 top-2'>
                                    <i className={`fa-regular fa-eye-slash ${(message.cnp.type === 'e') ? errorLabelClasses : (message.cnp.type === 's') ? successLabelClasses : normalTextClasses}`} ></i>
                                </button>
                        }
                    </div>
                    <p className={`mt-2 text-sm ${message.cnp.show && (message.cnp.type === 'e') ? errorMessageClasses : successMessageClasses}`}>
                        <span className="font-medium mr-1">{message.cnp.show && ((message.cnp.type === 'e') ? 'Ohh Snaps!' : 'Well Done!')}</span>
                        {message.cnp.show && message.cnp.message}
                    </p>
                </div>
                <button type='submit' className={`auth-button text-white font-semibold text-sm uppercase mt-2 py-2.5 px-8 rounded-lg ${showSubmitButton ? 'sign-up-clickable' : 'sign-up-disabled pointer-events-none'} ${clicked ? 'sign-up-disabled pointer-events-none' : 'sign-up-clickable'}`} disabled={!showSubmitButton || clicked}>
                    Change Password
                </button>
            </form>
        </div>
    )
}

export default PasswordInput
