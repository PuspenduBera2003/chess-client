import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import whiteKing from '../../../../../static/images/white-chess-king.png'
import blackKing from '../../../../../static/images/black-chess-king.png'
import SelfCaptured from '../Captured/SelfCaptured';
// import CapturedPiece from '../CapturedPiece/CapturedPiece';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
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

const SelfDetails = () => {

    const userDetails = useSelector(state => state.Auth.userDetails);

    const boardOrientation = useSelector(state => state.Auth.boardOrientation);

    return (
        <div className='flex justify-between items-center'>
            <div className='flex flex-row flex-wrap justify-start items-center gap-2'>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    {
                        (userDetails && userDetails.profile_photo) ?
                            (
                                <Avatar className={` ring-2 ring-blue-900 dark:ring-blue-600`} sx={{ width: 50, height: 50 }} alt={userDetails.username} src={userDetails.profile_photo} />
                            )
                            :
                            (
                                (boardOrientation === 'white') ?
                                    (
                                        <div className={`rounded-full bg-gray-600 dark:bg-gray-900 `}>
                                            <img src={whiteKing} className={` w-12 h-12 bg-inherit ring-2 ring-blue-900 dark:ring-blue-600 rounded-full`} alt="white king" />
                                        </div>
                                    ) :
                                    (
                                        <div className={`rounded-full bg-gray-400 dark:bg-gray-700 `}>
                                            <img src={blackKing} className={` w-12 h-12 bg-inherit ring-2 ring-blue-900 dark:ring-blue-600 rounded-full`} alt="white king" />
                                        </div>
                                    )
                            )
                    }
                </StyledBadge>
                {
                    userDetails ?
                        (
                            <div className='text-gray-800 dark:text-gray-200 text-sm font-semibold'>
                                {userDetails.username}
                            </div>
                        )
                        :
                        (
                            <div className='text-gray-800 dark:text-gray-200 text-sm font-semibold'>
                                Guest
                            </div>
                        )
                }
                <div style={{ maxWidth: 200 }}>
                    <SelfCaptured />
                </div>
            </div>
        </div>
    )
}

export default SelfDetails
