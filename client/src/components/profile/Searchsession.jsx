import React from 'react'
import './Searchsession.css'
import Button from 'react-bootstrap/Button';
import PostSession from '../profile/PostSession';



const Searchsession = () => {
  return (
    <div className='main'>
       
        <div className='boximg'>
            <img src='https://media.istockphoto.com/id/1445326229/photo/cardboard-tone-vintage-texture-background-cream-paper-old-grunge-retro-rustic-for-wall.webp?b=1&s=612x612&w=0&k=20&c=Aah9BDE0Y-5EBnWDyPqNm6UVCy2UbJdrP2XbIlAhVKI=' alt='' style={{width:"11%",height:"25%",borderRadius:"12rem"}}/>
          <input style={{padding:"10px"}} type="text" placeholder='search' className='input' />
            {/* <hr style={{color:"green"}}/> */}
            </div>
            <hr/>
        <div style={{display:"flex" ,justifyContent:"space-between", marginTop:"2rem"}}>
           
            <div style={{display:"flex",gap:"10px"}}>
                <i className="fa-solid fa-camera"></i>
                <i className="fa-solid fa-photo-film"></i>
                
            </div>
          

            <div>
            <Button as="input" type="reset" value="Post" />
            </div>
            <div>

            <PostSession/>
            </div>





           

            </div>


    </div>
  )
}

export default Searchsession