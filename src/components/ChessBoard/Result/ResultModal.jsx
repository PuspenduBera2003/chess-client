import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import { useRef, useState } from 'react';
import { Backdrop, Box, Modal, Fade, IconButton } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from 'react-redux';
import MoveHistory from './MoveHistory';
import FullScreenResult from './FullScreenResult';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto',
};

const ResultModal = (props) => {
    const { isFullscreen } = props;

    const [open, setOpen] = useState(false);
    const [warning, setWarning] = useState(false);
    
    const modalData = useSelector(state => state.PassPlay.modalData);

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const historyWithColor = modalData.history.map((move, index) => {
        const color = index % 2 === 0 ? 'WHITE' : 'BLACK';
        return { color, move };
    });

    const handleOpen = () => {
        if (isFullscreen) {
            setWarning(true);
            return;
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const modalButtonRef = useRef();


    const gradientClasses = (currentTheme === "dark")
        ? 'dark-mode-landing-page'
        : 'from-teal-200 to-lime-200';

    const resultItemGradient = (currentTheme === "dark")
        ? 'dark-mode-feature-card'
        : 'from-lime-200 via-lime-400 to-lime-500';

    return (
        <>
            {
                warning && <FullScreenResult setWarning={setWarning} history={historyWithColor} />
            }
            <button
                ref={modalButtonRef}
                onClick={handleOpen}
                className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Show Result
                </span>
            </button>
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
                <Fade in={open}>
                    <Box sx={style} className={`text-gray-900 bg-gradient-to-r ${gradientClasses}`}>
                        <div className='sticky top-0 z-50 bg-gray-100 dark:bg-gray-700 w-10 border border-black mb-2' style={{ borderRadius: '50%' }}>
                            <IconButton onClick={handleClose} className='dark:text-white'>
                                <CancelIcon />
                            </IconButton>
                        </div>
                        <div className="text-center">
                            <div className={`p-1 mb-1 rounded border border-gray-300 text-gray-900 bg-gradient-to-r  shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-gray-600 ${resultItemGradient}`}>
                                <h3 className='underline text-lg font-bold text-gray-950 dark:text-gray-300'>
                                    Result
                                </h3>
                                <p className='font-semibold text-black dark:text-white'>
                                    {modalData.result}
                                </p>
                            </div>
                            <div className={`p-1 mb-1 rounded border border-gray-300 text-gray-900 bg-gradient-to-r shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-gray-600 ${resultItemGradient}`}>
                                <h3 className='underline text-lg font-bold text-gray-950 dark:text-gray-300'>
                                    Runtime
                                </h3>
                                <p className='font-semibold text-black dark:text-white'>
                                    {modalData.matchRuntime.hours}:{modalData.matchRuntime.minutes}:{modalData.matchRuntime.seconds}
                                </p>
                            </div>
                            <div className='rounded'>
                                <Accordion collapseAll>
                                    <AccordionPanel>
                                        <AccordionTitle className={`rounded border border-gray-300 bg-gradient-to-r text-gray-900 font-bold underline text-lg ${resultItemGradient}`}>
                                            Moves
                                        </AccordionTitle>
                                        <AccordionContent>
                                            <MoveHistory history={historyWithColor} />
                                        </AccordionContent>
                                    </AccordionPanel>
                                </Accordion>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default ResultModal
