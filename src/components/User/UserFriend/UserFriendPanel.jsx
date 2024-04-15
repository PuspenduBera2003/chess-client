import React, { useState } from 'react'
import UserFriendNav from './UserFriendNav';
import Friends from './Friends/Friends';
import Pending from './Pending/Pending';

const UserFriendPanel = (props) => {
    const [activeTab, setActiveTab] = useState("friends");

    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-center'>
                <UserFriendNav setActiveTab={setActiveTab} activeTab={activeTab} top={props.top} />
            </div>
            <div className='w-full flex items-center justify-center mx-2' style={{ marginTop: 65 }}>
                {
                    activeTab === "friends" && <Friends />
                }
                {
                    activeTab === "pending" && <Pending />
                }
            </div>
        </div>
    )
}

export default UserFriendPanel
