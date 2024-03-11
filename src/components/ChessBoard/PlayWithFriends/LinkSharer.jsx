import React from 'react';
import { EmailShareButton, FacebookMessengerShareButton, FacebookShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share';
import { WhatsApp, FacebookRounded, Email, Telegram } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const LinkSharer = (props) => {
    const { url } = props;

    const remainingTime = useSelector(state => state.MultiPlayer.remainingTime);

    return (
        <div>
            {
                remainingTime ?
                    <div className='flex items-center justify-center flex-row gap-4'>
                        <EmailShareButton body={'Play Chess at ChessHub'} subject={'Join me at ChessHub'} url={url}>
                            <Email className='text-gray-700 dark:text-gray-400' />
                        </EmailShareButton>
                        <WhatsappShareButton title={'Play Chess at ChessHub'} url={url}>
                            <WhatsApp sx={{ color: '#075e54' }} />
                        </WhatsappShareButton>
                        <FacebookShareButton hashtag='#chesshub' url={url}>
                            <FacebookRounded sx={{ color: '#1877F2' }} />
                        </FacebookShareButton>
                        <FacebookMessengerShareButton title={'Join me at ChessHub'} appId={process.env.REACT_APP_FACEBOOK_APP_ID} url={url}>
                            <i className="fa-brands fa-facebook-messenger" style={{ fontSize: '1.3rem', position: 'relative', top: 4, color: '#006AFF' }}></i>
                        </FacebookMessengerShareButton>
                        <TelegramShareButton title={'Join me at ChessHub'} url={url}>
                            <Telegram sx={{ color: '#0088cc', }} />
                        </TelegramShareButton>
                    </div>
                    : ""
            }
        </div>
    )
}

export default LinkSharer
