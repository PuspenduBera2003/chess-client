import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    0.5: 'Terrible',
    1: 'Bad',
    1.5: 'Poor',
    2: 'Okay',
    2.5: 'Average',
    3: 'Good',
    3.5: 'Great',
    4: 'Excellent',
    4.5: 'Fantastic',
    5: 'Amazing',
};

export default function CommentStar(props) {

    const value = props.value;

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                name="text-feedback"
                value={value}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon htmlColor='gray' style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2 }}>
                <div className='text-black dark:text-white'>
                    {labels[value]}
                </div>
            </Box>
        </Box>
    );
}