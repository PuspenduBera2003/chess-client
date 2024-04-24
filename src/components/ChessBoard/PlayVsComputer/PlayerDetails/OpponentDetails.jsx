import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import botImg from '../../../../static/images/bot.jpg'
import OpponentCaptured from '../CapturedPiece/OpponentCaptured';
import bot1 from '../../../../static/images/bot1.jpg'
import bot2 from '../../../../static/images/bot2.jpg'
import bot3 from '../../../../static/images/bot3.jpeg'
import { useSelector } from 'react-redux';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#eb4034',
        color: '#eb4034',
        boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            content: '""',
        },
    },
}));

const OpponentDetails = () => {

    const [botName, setBotName] = useState('');
    const [botImg, setBotImg] = useState('');

    const botLevel = useSelector(state => state.Bot.botLevel);

    useEffect(() => {
        if (botLevel === 2) {
            setBotName('RookRover');
            setBotImg(bot1)
        } else if (botLevel === 8) {
            setBotName('BishopBrain');
            setBotImg(bot2)
        } else {
            setBotName('CheckWiz');
            setBotImg(bot3)
        }
    }, [botLevel])

    return (
        <div className='flex flex-row flex-wrap justify-end items-center gap-2'>
            <div className='flex flex-row flex-wrap justify-end items-center gap-2'>

                <div className='mr-3'>
                    <OpponentCaptured />
                </div>
                <div className='text-gray-800 dark:text-gray-200 text-sm font-semibold'>
                    {botName}
                </div>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >

                    <div className={`rounded-full bg-gray-600 dark:bg-gray-900`}>
                        <img src={botImg} className={`w-12 h-12 bg-inherit ring-2 ring-blue-900 dark:ring-blue-600 rounded-full`} alt="white king" />
                    </div>
                </StyledBadge>
            </div>
        </div>
    )
}

export default OpponentDetails
