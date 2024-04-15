import React from 'react'
import HistoryBoard from './HistoryBoard'
import HistoryTable from './HistoryTable'
import SelfDetails from './PlayerDetails/SelfDetails'
import OpponentDetails from './PlayerDetails/OpponentDetails'
import MobileHistory from './MobileHistory'
import ControlsLayout from './ControlsLayout'
import MobileControlsLayout from './MobileControlsLayout'
import { useSelector } from 'react-redux'
import Result from './Result/Result'
import ResultBoard from './Result/ResultBoard'

const HistoryBoardUI = () => {

    const gameHistory = useSelector(state => state.Auth.moveHistory);
    const gameAnalyzer = useSelector(state => state.Auth.historyAnalyzer);

    return (
        <div className='flex flex-row flex-wrap items-center justify-center gap-5 mb-6 mt-2'>
            <div className="flex flex-col gap-2">
                <OpponentDetails />
                <div className={`${(gameHistory.length !== gameAnalyzer.length) ? 'block' : 'hidden'}`}>
                    <HistoryBoard />
                </div>
                <div className={`${(gameHistory.length === gameAnalyzer.length) ? 'block' : 'hidden'} relative`}>
                    <ResultBoard />
                    <Result />
                </div>
                <SelfDetails />
            </div>
            <div
                className='hidden md:flex items-center justify-center overflow-y-auto overflow-x-hidden p-2 rounded-lg relative' style={{ height: '80vh' }}>
                <HistoryTable />
                <ControlsLayout />
            </div>
            <div className='flex flex-col items-center justify-center gap-4 md:hidden overflow-x-auto rounded-lg p-2' style={{ maxWidth: '90vw' }}>
                <MobileHistory />
            </div>
            <div className='flex md:hidden'>
                <div style={{ flexGrow: 1, flexBasis: 0 }}>
                    <MobileControlsLayout />
                </div>
            </div>
        </div>
    )
}

export default HistoryBoardUI
