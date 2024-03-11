import React from 'react'
import './MobileUserNav.css'
import { Home, Key, Message, Person2, QuestionMark, Settings } from '@mui/icons-material'
import { useSelector } from 'react-redux'

const MobileUserNav = () => {

	const currentTheme = useSelector(state => state.Theme.currentTheme)
    const usernavClasses = (currentTheme === 'dark') ?
        'dark-user-nav-mobile' :
        'light-user-nav'

	return (
		<div className={`fixed bottom-0 w-full bg-gradient-to-r ${usernavClasses}`}>
			<nav className="nav" data-nav>
				<ul className="nav__items">
					<li className="nav__item">
						<a href="/" className="nav__item-btn dark:text-white" data-nav-item="1">
							<svg className="nav__item-icon" width="24px" height="24px" viewBox="0 0 24 24">
								<g className='icon1' fill="none" stroke="currentColor" strokeWidth="2">
									<Home />
								</g>
							</svg>
							<span className="nav__item-text">Home</span>
						</a>
					</li>	
					<li className="nav__item">
						<a href="/" className="nav__item-btn dark:text-white" data-nav-item="5">
							<svg className="nav__item-icon" width="24px" height="24px" viewBox="0 0 24 24">
								<g fill="none" stroke="currentColor" strokeWidth="2">
									<g className="icon5">
										<Person2 />
									</g>
								</g>
							</svg>
							<span className="nav__item-text">Profile</span>
						</a>
					</li>
					<li className="nav__item">
						<a href="/" className="nav__item-btn dark:text-white" data-nav-item="3">
							<svg className="nav__item-icon" width="24px" height="24px" viewBox="0 0 24 24">
								<g className="icon3" fill="currentColor">
									<Message />
								</g>
							</svg>
							<span className="nav__item-text">Message</span>
						</a>
					</li>
					<li className="nav__item">
						<a href="/" className="nav__item-btn dark:text-white" data-nav-item="4">
							<svg className="nav__item-icon" width="24px" height="24px" viewBox="0 0 24 24">
								<g fill="none" className='icon7' stroke="currentColor" strokeWidth="2">
									<Key />
								</g>
							</svg>
							<span className="nav__item-text">Password</span>
						</a>
					</li>
					<li className="nav__item">
						<a href="/" className="nav__item-btn dark:text-white" data-nav-item="3">
							<svg className="nav__item-icon" width="24px" height="24px" viewBox="0 0 24 24">
								<g className="icon1" fill="currentColor">
									<QuestionMark />
								</g>
							</svg>
							<span className="nav__item-text">FAQ</span>
						</a>
					</li>
					<li className="nav__item">
						<a href="/" className="nav__item-btn dark:text-white" data-nav-item="2">
							<svg className="nav__item-icon" width="24px" height="24px" viewBox="0 0 24 24">
								<g className="icon6" fill="none" stroke="currentColor" strokeWidth="2">
									<Settings />
								</g>
							</svg>
							<span className="nav__item-text">Settings</span>
						</a>
					</li>
				</ul>
				<div id="current" hidden>Current page</div>
			</nav>
		</div>
	)
}

export default MobileUserNav
