import React, {  useEffect, useState } from 'react'
import "./navbar.css";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = ({socket}) => {
    const [notification,setNotification] = useState([])
    const [open,setOpen] = useState(false)

    useEffect(() => {
        socket.on("getNotification",data=> {
            setNotification( (prev) => [...prev,data])
        })    
    },[socket])

    console.log(notification);

    const displayNotification = ({senderName, type}) => {
        let action;

        if(type===1){
            action = "liked"
        }else if(type===2){
            action="commented"
        }else{
            action = "shared"
        }
        return (
            <span className='notification'> {`${senderName} ${action} your post`}</span>
        )
    }

    const handleRead = () => {
        setNotification([]);
        setOpen(false);
    }

    return (
    <div className='navbar'>
        <span className="logo"> Kiel App </span>
        <div className='icons'>
            <div className='icon' onClick={() => setOpen(!open)}>
                <NotificationsIcon className='iconImg'/>
                {
                    notification.length > 0 &&
                <div className='counter'>{notification.length}</div>
                }
            </div>
            <div className='icon' onClick={() => setOpen(!open)} >
                <MessageIcon className='iconImg'/>
                <div className='counter'>2</div>
            </div>
            <div className='icon' onClick={() => setOpen(!open)}>
                <SettingsIcon className='iconImg'/>
                <div className='counter'>3</div>
            </div>
        </div>
        {open &&  (
            <div className='notifications'>
                {notification.map(n => (
                    displayNotification(n)
                ))}
                <button className='nButton' onClick={handleRead}>Mark as read</button>
            </div>

        )}

    </div>
  )
}

export default Navbar
