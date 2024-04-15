import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import whiteKing from '../../../../static/images/white-chess-king.png'
import blackKing from '../../../../static/images/black-chess-king.png'
import OpponentCaptured from '../CapturedPiece/OpponentCaptured';
import OpponentTimer from '../Timer/OpponentTimer';

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

    const opponentDetails = useSelector(state => state.MultiPlayer.opponentDetails);

    const turn = useSelector(state => state.MultiPlayer.turn);

    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);

    const playingGame = useSelector(state => state.MultiPlayer.playingGame);

    return (
        <div className='flex flex-row flex-wrap justify-between items-center gap-2'>
            <div>
                <OpponentTimer />
            </div>
            <div className='flex flex-row flex-wrap justify-end items-center gap-2'>

                <div className='mr-3'>
                    <OpponentCaptured />
                </div>
                {
                    opponentDetails ?
                        (
                            <div className='text-gray-800 dark:text-gray-200 text-sm font-semibold'>
                                {opponentDetails.username}
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
                        (opponentDetails && opponentDetails.profile_photo) ?
                            (
                                <Avatar className={`${turn ? 'animate-none' : playingGame ? 'animate-pulse' : 'animate-none'} ring-2 ring-blue-900 dark:ring-blue-600`} sx={{ width: 50, height: 50 }} alt={opponentDetails.username} src={opponentDetails.profile_photo} />
                            )
                            :
                            (boardOrientation === 'black') ?
                                (
                                    <div className={`rounded-full bg-gray-600 dark:bg-gray-900 ${turn ? 'animate-none' : playingGame ? 'animate-pulse' : 'animate-none'}`}>
                                        <img src={whiteKing} className={`${turn ? 'animate-none' : playingGame ? 'animate-pulse' : 'animate-none'} w-12 h-12 bg-inherit ring-2 ring-blue-900 dark:ring-blue-600 rounded-full`} alt="white king" />
                                    </div>
                                )
                                :
                                (
                                    <div className={`rounded-full bg-gray-400 dark:bg-gray-700 ${turn ? 'animate-none' : playingGame ? 'animate-pulse' : 'animate-none'}`}>
                                        <img src={blackKing} className={`${turn ? 'animate-none' : playingGame ? 'animate-pulse' : 'animate-none'} w-12 h-12 bg-inherit ring-2 ring-blue-900 dark:ring-blue-600 rounded-full`} alt="white king" />
                                    </div>
                                )
                    }
                </StyledBadge>
            </div>
        </div>
    )
}

export default OpponentDetails
