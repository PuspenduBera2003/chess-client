import { useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import './PassPlay.css';
import { requestFullscreen, handleFullscreenChange, exitFullscreen } from "../../../utils/toggleFullScreen";
import Board from "./Board";
import gameSituation from '../../../redux/OfflinePlay/Actions/PassPlayGame';
import updateRightClickedSquares from '../../../redux/OfflinePlay/Actions/PassPlayRightClickedSquares';
import updateOptionSquares from '../../../redux/OfflinePlay/Actions/PassPlayOptionSquare';
import updatePlayer from '../../../redux/OfflinePlay/Actions/PassPlayPlayer';
import updateMoveSquare from "../../../redux/OfflinePlay/Actions/PassPlayMoveSquare";
import updateOpenResultModal from "../../../redux/OfflinePlay/Actions/OpenResultModal";
import updateStartTime from "../../../redux/OfflinePlay/Actions/PassPlayStartTime";
import updateRotation from "../../../redux/OfflinePlay/Actions/PassPlayRotation";
import updateOrientation from "../../../redux/OfflinePlay/Actions/PassPlayOrientation";


export default function PassPlay() {

  const theme = useSelector(state => state.Theme.currentTheme);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const boardOpacity = (isMenuOpen) ? 0.3 : 1

  const navGradient = (theme === "dark")
    ? 'dark-mode-passplay-nav'
    : 'light-mode-game-menu light-mode-passplay-nav';

  const navBorderClasses = (theme === "dark")
    ? 'dark-mode-nav-border'
    : 'light-mode-nav-border'

  const fullscreenDivRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const gameFromStore = useSelector(state => state.PassPlay.game);

  const isGameEnd = useSelector(state => state.PassPlay.gameEnd);

  const currentTheme = useSelector(state => state.Theme.currentTheme);

  const [game, setGame] = useState(gameFromStore);

  const player = useSelector(state => state.PassPlay.player)

  const rotate = useSelector(state => state.PassPlay.rotate)

  const dispatch = useDispatch();

  const handleFullscreenChangeWrapper = () => handleFullscreenChange(setIsFullscreen);

  const isGameInInitialState = game.fen() === "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
    dispatch(gameSituation(game));
  }

  const [isRotationEnabled, setIsRotationEnabled] = useState(false);

  const handleToggleChange = () => {
    setIsRotationEnabled(!isRotationEnabled);
    if (player === "w") {
      dispatch(updateRotation(360));
      dispatch(updateOrientation("white"));
    }
    else if (!isRotationEnabled) {
      dispatch(updateRotation(180));
      dispatch(updateOrientation("black"));
    }
    else {
      dispatch(updateRotation(0));
      dispatch(updateOrientation("white"));
    }
  };

  const gradientClasses = (currentTheme === "dark")
    ? 'dark-mode-landing-page'
    : 'light-mode-landing-page';

  const navMenuBorder = (currentTheme === "dark")
    ? 'dark-menu-border'
    : 'light-menu-border';

  return (
    <div className={`chessboard-layout text-gray-900 bg-gradient-to-r ${gradientClasses} py-2`} ref={fullscreenDivRef} >
      <div
      className="flex flex-wrap items-center justify-center"
        style={{
          width: '400px',
        }}>
          <div>
        <Board isFullscreen={isFullscreen} isRotationEnabled={isRotationEnabled} opacity={boardOpacity} />
          </div>
        <div
          className="navbar absolute"
          onClick={openMenu}>
          <div
            className="p-2 fixed bottom-0 right-0">
            <button type="button" className={`inline-flex rounded-lg flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${navMenuBorder}`}>
              <svg className="w-5 h-5 m-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
              </svg>
              <span className="sr-only">Settings</span>
            </button>
          </div>
          <ul className={`passplay-menu font-semibold dark:border-gray-600 dark:text-white ${isMenuOpen ? 'open' : ''} bg-gradient-to-r ${navGradient}`}>
            <li
              className={`${navBorderClasses} flex items-center justify-center ${isGameInInitialState ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
              onClick={() => {
                safeGameMutate((game) => {
                  game.reset();
                });
                dispatch(updateMoveSquare({}));
                dispatch(updateOptionSquares({}));
                dispatch(updateRightClickedSquares({}));
                dispatch(updatePlayer("w"));
                dispatch(updateOpenResultModal({ open: false, data: {} }));
                dispatch(updateStartTime(new Date()));
                dispatch(updateRotation(0));
                dispatch(updateOrientation("white"))
              }}
              disabled={isGameInInitialState}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                Reset
              </span>
            </li>
            <li
              disabled={isGameEnd | isGameInInitialState}
              onClick={() => {
                safeGameMutate((game) => {
                  game.undo();
                });
                dispatch(updateMoveSquare({}));
                dispatch(updateOptionSquares({}));
                dispatch(updateRightClickedSquares({}));
                dispatch(updatePlayer((player === "w" ? "b" : "w"))); // Switch player
                if (isRotationEnabled) {
                  dispatch(updateRotation(rotate - 180));
                  dispatch(updateOrientation(player === "w" ? "black" : "white"))
                }
              }}
              className={`${navBorderClasses} flex items-center justify-center ${(isGameEnd | isGameInInitialState) ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                Undo
              </span>
            </li>
            <li className={`${navBorderClasses} flex items-center justify-center`}>
              <label className="flex flex-col items-center justify-center gap-2 cursor-pointer m-2">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={isRotationEnabled}
                  onChange={handleToggleChange} />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  Rotation
                </span>
              </label>
            </li>
            <li
              onClick={() => {
                if (isFullscreen) {
                  exitFullscreen(setIsFullscreen);
                } else {
                  requestFullscreen(fullscreenDivRef.current, setIsFullscreen, handleFullscreenChangeWrapper);
                }
              }}
              className={`${navBorderClasses} flex items-center justify-center cursor-pointer`}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                {
                  isFullscreen ?
                    <i className="fa-solid fa-minimize"></i> :
                    <i className="fa-solid fa-maximize"></i>
                }
              </span>
              <span className="sr-only">Toggle FullScreen</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}