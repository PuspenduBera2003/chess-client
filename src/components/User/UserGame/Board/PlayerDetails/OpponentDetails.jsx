import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import whiteKing from '../../../../../static/images/white-chess-king.png'
import blackKing from '../../../../../static/images/black-chess-king.png'
import OpponentCaptured from '../Captured/OpponentCaptured';

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

    const opponentDetails = useSelector(state => state.Auth.opponentDetails);

    const boardOrientation = useSelector(state => state.Auth.boardOrientation);

    return (
        <div className='flex flex-row flex-wrap justify-end items-center gap-2'>
            <div className='flex flex-row flex-wrap justify-end items-center gap-2'>
                <div className='mr-3'>
                    <OpponentCaptured />
                </div>
                {
                    opponentDetails ?
                        (
                            <div className='text-gray-800 dark:text-gray-200 text-sm font-semibold'>
                                {opponentDetails.opponent_name}
                            </div>
                        )
                        :
                        (
                            <div className='text-gray-800 dark:text-gray-200 text-sm font-semibold'>
                                Guest
                            </div>
                        )
                }
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    {
                        (opponentDetails && opponentDetails.opponent_photo) ?
                            (
                                <Avatar className={` ring-2 ring-blue-900 dark:ring-blue-600`} sx={{ width: 50, height: 50 }} alt={opponentDetails.opponent_name} src={opponentDetails.opponent_photo} />
                            )
                            :
                            (boardOrientation === 'black') ?
                                (
                                    <div className={`rounded-full bg-gray-600 dark:bg-gray-900 `}>
                                        <img src={whiteKing} className={` w-12 h-12 bg-inherit ring-2 ring-blue-900 dark:ring-blue-600 rounded-full`} alt="white king" />
                                    </div>
                                )
                                :
                                (
                                    <div className={`rounded-full bg-gray-400 dark:bg-gray-700 `}>
                                        <img src={blackKing} className={` w-12 h-12 bg-inherit ring-2 ring-blue-900 dark:ring-blue-600 rounded-full`} alt="white king" />
                                    </div>
                                )
                    }
                </StyledBadge>
            </div>
        </div>
    )
}

export default OpponentDetails