import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import currentPendingRequest from '../../../../api/currentPendingRequest'
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast';
import PendingIndividual from './PendingIndividual';
import PendingSkeleton from './PendingSkeleton';

const Pending = () => {

    const userDetails = useSelector(state => state.Auth.userDetails);

    const dispatch = useDispatch();

    const [pending, setPending] = useState(null);

    const skeletons = [1, 2, 3];

    useEffect(() => {
        const apiCall = async () => {
            setPending(null);
            const response = await currentPendingRequest(userDetails.id);
            if (response.success) {
                setPending(response.pendingData)
            } else {
                dispatch(updateShowBotomToast({ show: true, type: 'failure', message: response.error }));
            }
        }
        apiCall();
    }, [])

    return (
        <div>
            <div className='flex items-center justify-center gap-4 flex-wrap'>
                {
                    pending
                        ?
                        pending.map((item) => (
                            <PendingIndividual key={item.id} details={item} />
                        ))
                        :
                        <div className='flex items-center justify-center gap-4 flex-wrap'>
                            {
                                skeletons.map((item) => (
                                    <PendingSkeleton key={item} />
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Pending
