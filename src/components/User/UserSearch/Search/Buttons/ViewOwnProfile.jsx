import React from 'react'
import { useNavigate } from 'react-router-dom'


const ViewOwnProfile = () => {

    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate('/user/dashboard/profile')
    }

    return (
        <button
            onClick={handleViewProfile}
            type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <span>View Profile</span>
            <i className="fa-solid fa-id-badge ml-2"></i>
        </button>
    )
}

export default ViewOwnProfile
