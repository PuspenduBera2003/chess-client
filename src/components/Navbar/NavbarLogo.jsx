import React from 'react'
import logo from '../../static/images/logo.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavbarLogo = () => {
    const currentTheme = useSelector((state) => state.Theme.currentTheme);

    const invertFilter = (currentTheme === "dark") ? 'invert(1)' : 'invert(0)';

    return (
        <div>
            <Link to='/' className='flex items-center justify-center'>
                <img
                    src={logo}
                    className="mr-1 h-6 sm:h-9"
                    alt="Chess Logo"
                    style={{ filter: invertFilter }}
                    loading='lazy'
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    CHESSHUB
                </span>
            </Link>
        </div>
    )
}

export default NavbarLogo
