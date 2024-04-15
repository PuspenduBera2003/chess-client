import React from 'react'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import botImg from '../../../../static/images/bot.jpg'
import OpponentCaptured from '../CapturedPiece/OpponentCaptured';

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

    return (
        <div className='flex flex-row flex-wrap justify-end items-center gap-2'>
            <div className='flex flex-row flex-wrap justify-end items-center gap-2'>

                <div className='mr-3'>
                    <OpponentCaptured />
                </div>
                <div className='text-gray-800 dark:text-gray-200 text-sm font-semibold'>
                    Bot
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
