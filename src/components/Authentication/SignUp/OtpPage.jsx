import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useSpring, animated } from 'react-spring';
import Countdown from 'react-countdown';
import handleSignUpSubmit from '../../../api/handleSignUpSubmit';
import AuthenticationAlert from '../AuthenticationAlert';
import updateIsAuthenticated from '../../../redux/Auth/Actions/IsAuthenticated';
import generateOTP from '../../../api/generateOtp';
import ResendOtpSuccess from './ResendOtpSuccess';
import updateSignUpInitialized from '../../../redux/Auth/Actions/signUpInitialized';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import updateUserDetails from '../../../redux/Auth/Actions/userDetails';

const OtpPage = (props) => {

    const signUpData = useSelector(state => state.Auth.signUpInitialized);

    const email = signUpData.email;

    const [secretValues, setSecretValues] = useState(['', '', '', '']);

    const [showCountDown, setShowCountDown] = useState(true);

    const [showResendBtn, setShowResendBtn] = useState(false);

    const [countdownDate, setCountdownDate] = useState(Date.now() + 30000);

    const [wrongSubmission, setWrongSubmission] = useState(0);

    const [otpResend, setOtpResend] = useState(false);

    const [data, setData] = useState(null)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [error, setError] = useState({ error: false, description: null });
    const [disabled, setDisabled] = useState(false)

    const handleCountDownComplete = () => {
        setShowResendBtn(true);
        setShowCountDown(false);
    }

    const handleResendButtonClick = async () => {
        setShowResendBtn(false);
        dispatch(updateShowBotomToast({ show: true, type: 'loading', message: 'Sending OTP...' }))
        const handleGenerateOTP = await generateOTP(signUpData);
        setCountdownDate(Date.now() + 30000);
        setOtpResend(true);
        setData("OTP Send Successfully");
        setTimeout(() => {
            setOtpResend(false);
        }, 5000);
        setShowCountDown(true);
        dispatch(updateSignUpInitialized({
            start: true, response: {
                success: true,
                serverReplied: true
            }, email: signUpData.email, password: signUpData.password, username: signUpData.username, token: handleGenerateOTP.token
        }));
    }

    const handleInputChange = (index, value) => {
        const newInputValues = [...secretValues];
        newInputValues[index] = value;

        // If the value is empty and the user presses backspace, move focus to the previous input box
        if (value === '' && index > 0) {
            const previousInput = document.getElementById(`otpInput-${index - 1}`);
            if (previousInput) {
                previousInput.focus();
            }
        }

        // If the value is not empty and the current input box is not the last one, move focus to the next input box
        if (value !== '' && index < secretValues.length - 1) {
            const nextInput = document.getElementById(`otpInput-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }

        setSecretValues(newInputValues);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = secretValues.join('');
        setDisabled(true);
        dispatch(updateShowBotomToast({ show: true, type: 'loading', message: 'Verifying OTP' }));
        const response = await handleSignUpSubmit(signUpData, otp);
        dispatch(updateShowBotomToast({ show: false, type: '', message: '' }));
        if (response.success) {
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Signed Up Successfully' }));
            dispatch(updateUserDetails(response.user));
            localStorage.setItem('isAuthenticated', true);
            dispatch(updateIsAuthenticated(true));
            navigate('/user/dashboard');
        } else {
            if (response.error && response.error.name) {
                if (response.error.name === "JsonWebTokenError") {
                    setError({ error: true, description: "Invalid OTP" });
                    setWrongSubmission((prevWrongSubmission) => {
                        const updatedWrongSubmission = prevWrongSubmission + 1;

                        if (updatedWrongSubmission === 3) {
                            dispatch(updateSignUpInitialized({
                                start: false, response: {
                                    success: false,
                                    serverReplied: false
                                }, email: '', password: '', username: '', token: ''
                            }));
                            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Too Many Attempts!' }));
                        }

                        return updatedWrongSubmission;
                    });

                }
                else if (response.error.name === "TokenExpiredError") {
                    setError({ error: true, description: "OTP Expired" });
                }
            } else {
                setError({ error: true, description: response.error })
            }
        }
        setDisabled(false)
    }

    const animationProps = useSpring({
        from: { opacity: 0, transform: 'translateX(450px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
    });

    return (
        <animated.div className="flex items-center justify-center rounded" style={{ ...animationProps, height: props.height, maxWidth: '768px' }}>
            <form style={{ maxWidth: 400 }} onSubmit={handleSubmit}>
                <h1 className="dark:text-gray-300 text-center font-semibold mb-4">Please enter the OTP send to {email}</h1>
                <div className="flex justify-center gap-2 mb-6">
                    {secretValues.map((value, index) => (
                        <input
                            key={index}
                            id={`otpInput-${index}`} // Unique ID for each input box
                            className="w-12 h-12 text-center rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-gray-200 dark:bg-gray-700 dark:text-white"
                            type="text"
                            maxLength="1"
                            pattern="[0-9]"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            required
                        />
                    ))}
                </div>
                <div className="flex items-center gap-4 justify-center">
                    <button type="submit" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" disabled={disabled}>
                        Verify
                    </button>
                    {
                        showCountDown &&
                        <Countdown date={countdownDate} className='dark:text-white' daysInHours onComplete={handleCountDownComplete}>
                        </Countdown>
                    }
                    {
                        showResendBtn &&
                        <button
                            type='button'
                            className="inline-block align-baseline font-bold text-sm text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 ml-4"
                            onClick={handleResendButtonClick}>
                            Resend OTP
                        </button>
                    }
                </div>
                {
                    error.error &&
                    <AuthenticationAlert error={error} setError={setError} />
                }
            </form>
            {
                otpResend && <ResendOtpSuccess open={setOtpResend} data={data} />
            }
        </animated.div>
    )
}

export default OtpPage