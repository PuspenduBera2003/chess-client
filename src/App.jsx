import PassPlay from './components/ChessBoard/PassPlay/PassPlay'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authentication from './components/Authentication/Authentication'
import NavigationBar from './components/Navbar/Navbar'
import LandingPage from './components/Home/LandingPage'
import './App.css'
import ProtectedRoute from './private/ProtectedRoute'
import User from './components/User/User'
import { useSelector, useDispatch } from 'react-redux'
import BottomToast from './components/BottomToast/BottomToast'
import SocketProvider from './socket/SocketProvider'
import GameOptions from './components/Game/GameOptions'
import PlayWithFriends from './components/ChessBoard/PlayWithFriends/PlayWithFriends'
import PWFGameReady from './components/ChessBoard/PlayWithFriends/GameReady/PWFGameReady'
import { useEffect } from 'react'
import checkFriends from './api/friendChecker'
import updateUserFriend from './redux/Auth/Actions/userFriend'

const App = () => {

  const dispatch = useDispatch();

  const showBottomToast = useSelector(state => state.Auth.showBottomToast);

  const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);

  const userDetails = useSelector(state => state.Auth.userDetails);

  useEffect(()=>{
    const friends = async () => {
      const friendList = await checkFriends(userDetails.id);
      if(friendList)
        dispatch(updateUserFriend(friendList.friends));
    }
    userDetails && friends();
  },[isAuthenticated, userDetails, dispatch])

  return (
    <BrowserRouter>
      <SocketProvider>
        <NavigationBar />
        <div style={{ marginTop: '3.75rem' }}>
          <Routes>
            <Route
              path='/'
              element={<LandingPage />}
            />
            <Route
              path="/auth/:path"
              element={<Authentication />}
            />
            <Route
              path='/game'
              element={<GameOptions />} />
            <Route
              path='/game/passplay'
              element={<PassPlay />}
            />
            <Route
              path='/game/play-with-friends'
              element={<PlayWithFriends />}
            />
            <Route
              path='/game/play-with-friends/:id'
              element={<PWFGameReady />}
            />
            <Route
              path="/user/dashboard" element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              } />
            <Route path="/user/dashboard/:tab" element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            } />
          </Routes>
          {
            showBottomToast.show && <BottomToast />
          }
        </div>
      </SocketProvider>
    </BrowserRouter>
  )
}

export default App