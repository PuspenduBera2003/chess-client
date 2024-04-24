import React, { useEffect, useState } from 'react'
import { successPlaceholderClasses, errorPlaceholderClasses, successLabelClasses, errorLabelClasses, successMessageClasses, errorMessageClasses, normalTextClasses } from './WarningClasses';
import { checkOTP } from '../../../api/forgetPassword';
import { useDispatch } from 'react-redux';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import PasswordInput from './PasswordInput';

const OTPInput = (props) => {
    const [otp, setOtp] = useState('');
    const { token, email } = props;
    const [valid, setValid] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [message, setMessage] = useState({ show: false, type: '', message: '' });
    const [successResponse, setSuccessResponse] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const input = event.target.value;
        const numericInput = input.replace(/\D/g, ''); // Remove non-numeric characters
        const limitedInput = numericInput.slice(0, 4); // Limit to maximum 4 characters
        setOtp(limitedInput);
        setClicked(false)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);
        const response = await checkOTP(email, token, otp);
        if (!response.success) {
            setMessage({ show: true, type: 'e', message: response.error });
            setValid(false);
        } else {
            setMessage({ show: true, type: 's', message: 'OTP Verified' });
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'OTP Verified' }));
            setSuccessResponse(true);
        }
    }

    useEffect(() => {
        if (otp.length === 4) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [otp])

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <form className='sm:w-96 xs:w-64 xxs:w-48 md:w-96 mt-2 flex items-center justify-center flex-col' autoComplete='off'>
                <div className='w-full'>
                    <label htmlFor="otp" className={`block mb-2 text-sm font-medium ${(message.type === 'e') ? errorLabelClasses : (message.type === 's') ? successLabelClasses : normalTextClasses}`}>Enter OTP</label>
                    <input
                        type="password"
                        id="otp"
                        onChange={handleInputChange}
                        disabled={successResponse}
                        className={`text-sm rounded-lg block sm:w-96 xs:w-64 xxs:w-48 md:w-96 p-2.5 dark:bg-gray-700 ${successResponse && 'cursor-not-allowed'} ${(message.type === 'e') ? errorPlaceholderClasses : (message.type === 's') ? successPlaceholderClasses : normalTextClasses}`}
                        placeholder="Enter the four digit OTP"
                        value={otp}
                        onInput={handleInputChange}
                    />
                    <p className={`mt-2 text-sm ${message.show && (message.type === 'e') ? errorMessageClasses : successMessageClasses}`}>
                        <span className="font-medium mr-1">{message.show && ((message.type === 'e') ? 'Ohh Snaps!' : 'Well Done!')}</span>
                        {message.show && message.message}
                    </p>
                </div>
                {
                    !successResponse &&
                    <button type="submit" onClick={handleSubmit} className={`hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 mb-2 dark:hover:bg-blue-700 focus:outline-none  ${(!valid || clicked) ? 'bg-gray-200 dark:bg-gray-500 dark:focus:ring-gray-800 focus:ring-gray-300 pointer-events-none text-gray-500 dark:text-gray-300' : 'bg-blue-700 dark:bg-blue-600 pointer-events-auto text-white dark:focus:ring-blue-800 focus:ring-blue-300'}`}>
                        Submit OTP
                    </button>
                }
            </form>
            {
                successResponse &&
                <PasswordInput token={token} email={email} otp={otp} />
            }
        </div>
    )
}

export default OTPInput;
