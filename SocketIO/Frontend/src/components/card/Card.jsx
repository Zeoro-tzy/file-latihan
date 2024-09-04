import React, { useState } from 'react'
import "./card.css";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';import ShareIcon from '@mui/icons-material/Share';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const Card = ({post,socket,user}) => {
  const [liked,setLiked] = useState(false);

  const handleNotification = (type) => {
    setLiked(true);
    socket.emit("sendNotification",{
      senderName : user,
      receiverName : post.username,
      type,
    })
  }

  return (
    <div className='card'>
        <div className='info'>
          <img src={post.userImg} alt="" className='userImg'/>
          <span>{post.fullname}</span>
        </div>
          <img src={post.postImg} alt="" className='postImg'/>
        <div className='interaction'>
          {liked ? (
          <FavoriteOutlinedIcon className='cardIcon likeFilled'/>
          ) : (
            <FavoriteBorderOutlinedIcon className='cardIcon' onClick={() => handleNotification(1)} />
          )}
          <ChatBubbleOutlineOutlinedIcon className='cardIcon' onClick={() => handleNotification(2)}/>
          <ShareIcon className='cardIcon' onClick={() => handleNotification(3)}/>
          <InfoOutlinedIcon className='cardIcon infoIcon'/>

        </div>
    </div>
  )
}

export default Card
