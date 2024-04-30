import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast';
import { resultConclusion, resultDescriptor } from '../../../../utils/resultDescriptor';
import uploadGameHistory from '../../../../api/uploadGameHistory';

const ResultUploader = () => {

    const dispatch = useDispatch()

    const gameId = useSelector(state => state.MultiPlayer.gameId);
    const result = useSelector(state => state.MultiPlayer.gameResult);
    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);
    const opponentDetails = useSelector(state => state.MultiPlayer.opponentDetails);
    const [uploaded, setUploaded] = React.useState(false);
    const userDetails = useSelector(state => state.Auth.userDetails);
    const gameHistory = useSelector(state => state.MultiPlayer.gameHistory);

    React.useEffect(() => {
        const resultChecker = async () => {
            if (uploaded) {
                return;
            }
            if (result.has(gameId)) {
                if (result.get(gameId) === 'NC') {
                    return;
                }
                if (userDetails && opponentDetails && boardOrientation === 'white') {
                    if (gameHistory.length === 0) {
                        return;
                    }
                    const resultDesc = result.get(gameId);
                    const message = resultDescriptor(resultDesc);
                    const conclusion = resultConclusion(resultDesc);
                    dispatch(updateShowBotomToast({ show: true, type: 'loading', message: 'Uploading Game Details' }))
                    const response = await uploadGameHistory(gameId, userDetails.id, opponentDetails.id, gameHistory, message, conclusion);
                    if (response.success) {
                        dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Game Details Uploaded Successfully' }));
                    } else {
                        if (response.error && response.error.code === "23505") {
                            return;
                        } else {
                            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: response.error.message }))
                        }
                    }
                }
                setUploaded(true)
            }
        }
        !uploaded && resultChecker();
    }, [])

    return

}

export default ResultUploader
