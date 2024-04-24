import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { successPlaceholderClasses, errorPlaceholderClasses, successLabelClasses, errorLabelClasses, successMessageClasses, errorMessageClasses, normalTextClasses } from './WarningClasses';
import { sendOTP } from '../../../api/forgetPassword';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import OTPInput from './OTPInput';

function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const ForgetPassword = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const userDetails = useSelector(state => state.Auth.userDetails);

    const dispatch = useDispatch();

    const gradientClasses = (currentTheme === "dark")
        ? 'dark-mode-landing-page'
        : 'light-mode-landing-page';

    const [message, setMessage] = useState({ show: false, type: '', message: '' });
    const [emailInput, setEmailInput] = useState('');
    const [valid, setValid] = useState(false);
    const [successResponse, setSuccessResponse] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [token, setToken] = useState('');

    const onChange = (e) => {
        const validityCheck = isValidEmail(e.target.value);
        setEmailInput(e.target.value);
        if (!validityCheck) {
            setMessage({ show: true, type: 'e', message: 'Email Is Not Valid' });
            setValid(false)
        } else {
            setMessage({ show: true, type: 's', message: 'Email is valid' });
            setValid(true)
        }
    }

    const handleSubmit = async (e) => {
        setClicked(true);
        e.preventDefault();
        if(userDetails && userDetails.email) {
            if(userDetails.email !== emailInput) {
                setMessage({ show: true, type: 'e', message: "You can't change other user's password" });
                setClicked(false)
                return;
            }
        }
        dispatch(updateShowBotomToast({ show: true, type: 'loading', message: 'Checking Credentials' }));
        const response = await sendOTP(emailInput);
        dispatch(updateShowBotomToast({ show: false, type: '', message: '' }));
        setClicked(false);
        if (!response.success) {
            setMessage({ show: true, type: 'e', message: response.error });
            setValid(false);
        } else {
            setToken(response.token)
            setMessage({ show: true, type: 's', message: 'OTP Send Successfully' });
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'OTP Send Successfully' }));
            setSuccessResponse(true);
        }
    }

    return (
        <div className={`${gradientClasses} flex flex-col items-center justify-center w-full`} style={{ minHeight: 'calc(100vh - 3.75rem)' }}>
            <form className='sm:w-96 xs:w-64 xxs:w-48 md:w-96 m-2 flex items-center justify-center flex-col' autoComplete='off'>
                <div className="mx-2 w-full">
                    <label htmlFor="mail" className={`block mb-2 text-sm font-medium ${(message.type === 'e') ? errorLabelClasses : (message.type === 's') ? successLabelClasses : normalTextClasses}`}>Your Email</label>
                    <input type="email" disabled={successResponse} autoComplete='off' id="mail" onChange={onChange} className={`text-sm rounded-lg block sm:w-96 xs:w-64 xxs:w-48 md:w-96 p-2.5 dark:bg-gray-700 ${successResponse && 'cursor-not-allowed'} ${(message.type === 'e') ? errorPlaceholderClasses : (message.type === 's') ? successPlaceholderClasses : normalTextClasses}`} placeholder="Your Email" />
                    <p className={`mt-2 text-sm ${message.show && (message.type === 'e') ? errorMessageClasses : successMessageClasses}`}>
                        <span className="font-medium mr-1">{message.show && ((message.type === 'e') ? 'Ohh Snaps!' : 'Well Done!')}</span>
                        {message.show && message.message}
                    </p>
                </div>
                {
                    !successResponse &&
                    <button type="submit" onClick={handleSubmit} className={`hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 dark:hover:bg-blue-700 focus:outline-none  ${(!valid || clicked) ? 'bg-gray-200 dark:bg-gray-500 dark:focus:ring-gray-800 focus:ring-gray-300 pointer-events-none text-gray-500 dark:text-gray-300' : 'bg-blue-700 dark:bg-blue-600 pointer-events-auto text-white dark:focus:ring-blue-800 focus:ring-blue-300'}`}>
                        Submit Email
                    </button>
                }
            </form>
            {
                successResponse &&
                <OTPInput token={token} email={emailInput} />
            }
        </div>
    )
}

export default ForgetPassword
