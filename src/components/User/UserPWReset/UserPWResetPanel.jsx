import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import handleResetPassword from '../../../api/handleResetPassword'
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast'
import PasswordChanged from './PasswordChanged'

const successPlaceholderClasses = 'bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:border-green-500'

const errorPlaceholderClasses = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'

const successLabelClasses = 'text-green-700 dark:text-green-500'

const errorLabelClasses = 'text-red-700 dark:text-red-500'

const successMessageClasses = 'text-green-600 dark:text-green-500'

const errorMessageClasses = 'text-red-600 dark:text-red-500'

const normalTextClasses = 'text-black dark:text-white'

const UserPWResetPanel = () => {

    const [credentials, setCredentials] = useState({ op: '', np: '', cnp: '' });

    const [types, setTypes] = useState({ op: true, np: true, cnp: true });

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const dispatch = useDispatch();

    const widthPower = ["1%", "25%", "50%", "75%", "100%"];
    const colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];
    const [point, setPoint] = useState(0);
    const [oldPW, setOldPW] = useState(0);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [message, setMessage] = useState({ op: { show: false, type: '', message: '' }, np: { show: false, type: '', message: '' }, cnp: { show: false, type: '', message: '' } });
    const [clicked, setClicked] = useState(false);
    const [reqSend, setReqSend] = useState(false);
    const [pwChanged, setPwChanged] = useState(false);

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
        if (e.target.name === 'op') {
            let newPoint = 0;
            if (e.target.value.length >= 6) {
                if (/\d/.test(e.target.value)) newPoint++;
                if (/[a-z]/.test(e.target.value)) newPoint++;
                if (/[A-Z]/.test(e.target.value)) newPoint++;
                if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(e.target.value)) newPoint++;
            }
            setOldPW(newPoint);
            if (e.target.value === credentials.np) {
                if (credentials.np.length >= 5) {
                    setMessage({ ...message, np: { show: true, type: 'e', message: 'Old Password And New Password Cannot Be Same' } });
                } else {
                    return;
                }
            } else {
                if (credentials.np.length === 0) {
                    return
                } else {
                    if (widthPower[point] === "100%") {
                        setMessage({ ...message, np: { show: true, type: 's', message: 'Password Policy Followed' } });
                    } else {
                        setMessage({ ...message, np: { show: true, type: 'e', message: 'Please Follow Password Policy!' } });
                    }
                }
            }
        }
    }

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
            // Check if credentials.op and credentials.np are the same
            if (credentials.op === credentials.np) {
                setMessage({ ...message, np: { show: true, type: 'e', message: 'Old Password And New Password Cannot Be Same' } });
            } else {
                // Check if widthPower is "100%" and credentials.op and credentials.np are not the same
                if (widthPower[point] === "100%") {
                    // Additional check to ensure credentials.op and credentials.np are not the same
                    if (credentials.np === credentials.op) {
                        setMessage({ ...message, np: { show: true, type: 'e', message: 'Old Password And New Password Cannot Be Same' } });
                    } else {
                        setMessage({ ...message, np: { show: true, type: 's', message: 'Password Policy Followed' } });
                    }
                } else {
                    setMessage({ ...message, np: { show: true, type: 'e', message: 'Please Follow Password Policy!' } });
                }
            }
        };

        pwChecker();
    }, [credentials, oldPW, point]);

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
        const pwChecker = () => {
            if (widthPower[oldPW] === "100%") {
                setMessage({ ...message, op: { show: true, type: 's', message: 'Password Syntax Matched' } });
            } else {
                setMessage({ ...message, op: { show: true, type: 'e', message: 'Please Syntax Is Not Matching!' } });
            }
        }
        pwChecker();
    }, [oldPW, credentials.op])

    useEffect(() => {
        setShowSubmitButton((widthPower[point] === "100%") && passwordMatch && (widthPower[oldPW] === "100%") && (credentials.op !== credentials.np));
    }, [credentials, passwordMatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);
        setReqSend(true)
        dispatch(updateShowBotomToast({ show: true, type: 'loading', message: 'Updating Password' }));
        const response = await handleResetPassword(credentials.op, credentials.np);
        dispatch(updateShowBotomToast({ show: false, type: '', message: '' }));
        setReqSend(false)
        if (!response.success) {
            setMessage({ ...message, op: { show: true, type: 'e', message: response.error } });
        } else {
            setPwChanged(true);
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: "Password Updated Successfully" }))
        }
    }

    return (
        <div className='w-full m-4 flex flex-col items-center justify-center'>
            {
                !pwChanged ?
                    <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="op" className={`block mb-2 text-sm font-medium ${(message.op.type === 'e') ? errorLabelClasses : (message.op.type === 's') ? successLabelClasses : normalTextClasses}`}>Old Password</label>
                            <div className='relative'>
                                <input type={types.op ? 'password' : 'text'} id='op' name='op' onChange={handleChange} className={`text-sm rounded-lg block w-96 p-2.5 dark:bg-gray-700 ${(message.op.type === 'e') ? errorPlaceholderClasses : (message.op.type === 's') ? successPlaceholderClasses : normalTextClasses}`} placeholder="Old Password" autoComplete='off' />
                                {
                                    types.op ?
                                        <button
                                            type='button'
                                            onClick={() => handleTypeChange('op')}
                                            className='bg-gray-50 dark:bg-gray-800 px-2 rounded-md z-10 absolute right-2 top-2'>
                                            <i className={`fa-regular fa-eye ${(message.op.type === 'e') ? errorLabelClasses : (message.op.type === 's') ? successLabelClasses : normalTextClasses}`}></i>
                                        </button> :
                                        <button
                                            type='button'
                                            onClick={() => handleTypeChange('op')}
                                            className='bg-gray-50 dark:bg-gray-800 px-2 rounded-md z-10 absolute right-2 top-2'>
                                            <i className={`fa-regular fa-eye-slash ${(message.op.type === 'e') ? errorLabelClasses : (message.op.type === 's') ? successLabelClasses : normalTextClasses}`}></i>
                                        </button>
                                }
                            </div>
                            <p className={`mt-2 text-sm ${message.op.show && (message.op.type === 'e') ? errorMessageClasses : successMessageClasses}`}>
                                <span className="font-medium mr-1">{message.op.show && ((message.op.type === 'e') ? 'Ohh Snaps!' : 'Well Done!')}</span>
                                {message.op.show && message.op.message}
                            </p>
                        </div>
                        <div className='mb-6'>
                            <label htmlFor="np" className={`block mb-2 text-sm font-medium ${(message.np.type === 'e') ? errorLabelClasses : (message.np.type === 's') ? successLabelClasses : normalTextClasses}`}>New Password</label>
                            <div className='relative'>
                                <input type={types.np ? 'password' : 'text'} id='np' name='np' onChange={handleChange} className={`text-sm rounded-lg block w-96 p-2.5 dark:bg-gray-700 ${(message.np.type === 'e') ? errorPlaceholderClasses : (message.np.type === 's') ? successPlaceholderClasses : normalTextClasses}`} placeholder="New Password" autoComplete='off' />
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
                        <div>
                            <label htmlFor="cnp" className={`block mb-2 text-sm font-medium ${(message.cnp.type === 'e') ? errorLabelClasses : (message.cnp.type === 's') ? successLabelClasses : normalTextClasses}`}>Retype New Password</label>
                            <div className="relative">
                                <input type={types.cnp ? 'password' : 'text'} name='cnp' id='cnp' onChange={handleChange} className={`text-sm rounded-lg block w-96 p-2.5 dark:bg-gray-700 ${(message.cnp.type === 'e') ? errorPlaceholderClasses : (message.cnp.type === 's') ? successPlaceholderClasses : normalTextClasses}`} placeholder="Re-enter Password" autoComplete='off' />
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
                        <button type='submit' className={`auth-button text-white font-semibold text-sm uppercase mt-4 py-2.5 px-8 rounded-lg ${showSubmitButton ? 'sign-up-clickable' : 'sign-up-disabled pointer-events-none'} ${clicked ? 'sign-up-disabled pointer-events-none' : 'sign-up-clickable'}`} disabled={!showSubmitButton || clicked}>
                            Change Password
                        </button>
                    </form>
                    :
                    <PasswordChanged />
            }
        </div>
    )
}

export default UserPWResetPanel
