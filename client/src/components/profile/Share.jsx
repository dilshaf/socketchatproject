import React from 'react'
import {
    FacebookIcon,
    FacebookShareButton,
    FacebookShareCount,
    HatenaShareCount,
    OKShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    VKShareCount,
  } from "react-share";

const Share = () => {

    
    const shareUrl="https://web.whatsapp.com/"
  return (
    <div>
        <FacebookShareButton url={shareUrl}
        hashtag={'#http://localhost:5173/home/posts'}>
 <FacebookIcon/>
</FacebookShareButton>
    </div>
  )
}

export default Share