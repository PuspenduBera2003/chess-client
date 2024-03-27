import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const PasswordPolicy = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <p className="flex items-center text-sm text-white">
                Password Policy
                <button
                    onClick={handleOpen}
                    data-popover-target="popover-description"
                    data-popover-placement="bottom-end"
                    type="button"
                >
                    <svg
                        className="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Show information</span>
                </button>
            </p>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open} className='bg-gray-300 dark:bg-gray-800'>
                    <Box sx={style}>
                        <h3 className="font-semibold text-lg text-center text-gray-900 dark:text-white mb-2">
                            Password Policy - ChessHub
                        </h3>
                        <p className="text-gray-900 text-center dark:text-white">
                            Password should be containing at least six characters including one uppercase letter, one lowercase letter, one numeric character, and one special character.
                        </p>
                    </Box>
                </Fade>
            </Modal>
        </div >
    )
}

export default PasswordPolicy