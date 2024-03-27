import * as React from 'react';
import { useDispatch } from 'react-redux'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import updateUserRating from '../../../../redux/Auth/Actions/updateUserRating';

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

function getLabelText(value) {
  return `${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating(props) {

  const [value, setValue] = React.useState(props.rating);
  const [hover, setHover] = React.useState(-1);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(updateUserRating(props.rating))
  }, [])

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          dispatch(updateUserRating(newValue))
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon htmlColor='gray' style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>
          <div className='text-black dark:text-gray-100'>
            {labels[hover !== -1 ? hover : value]}
          </div>
        </Box>
      )}
    </Box>
  );
}