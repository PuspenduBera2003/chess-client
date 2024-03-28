import React from 'react'
import { useSelector } from 'react-redux'
import RandomPlayRequestCard from './RandomPlayRequestCard';


const RandomPlay = () => {

  const currentTheme = useSelector(state => state.Theme.currentTheme);

  const gradientClasses = (currentTheme === "dark")
    ? 'dark-mode-landing-page'
    : 'light-mode-landing-page';

  return (
    <div className={`w-full game flex items-center justify-center ${gradientClasses}`}>
      <RandomPlayRequestCard />
    </div>
  )
}

export default RandomPlay
