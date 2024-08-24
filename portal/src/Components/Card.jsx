import React from 'react'
import './style.css';
import { FaSlack } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";

const Card = ({smes}) => {
  return (
   //class="card-link"></a>
   <>
   
   <a href={smes.w3profile} className="profilecard">
   <div>
        <div className="cardheader">
      <img src={smes.img} alt="UserPhoto" className="profile-photo" />
      <h2 className="name">{smes.name}</h2>
      </div>
      <hr className="divider" />
      <div className="profilecard-content">
       
      <div className='details'>
      <MdOutlineEmail size={20}/>
      <a href="mailto:johndoe@example.com" className="detaillink">{smes.email}</a>
      </div>
      <div className='details'>
      <FaSlack size={20}/>
      <a href="tel:+1234567890" className="detaillink">{smes.username}</a>
      </div>
      <div className='details'>
      <IoVideocamOutline size={20}/>
      <a href="tel:+1234567890" className="detaillink">{smes.account}</a>

      </div>

      <div className='details'>
      <IoCallOutline size={20} />
      <div className="detaillink"> Mobile </div>
     
    
      <a href="tel:+1234567890" className="detaillink">{smes.phoneNumber}</a>
      </div>
      </div>

      <div className='cardfooter'>
      <div> {smes.location}</div>
      <div> {smes.profession}</div>
      </div>

      
      </div>
    </a>
    
    </>
  )
}

export default Card