import React from 'react'
import Card from './Card';
import smesjson from './smes'
import './style.css';

const SMEScreen = () => {
  return (
    <>
    <h1 className='heading'>SMEs</h1>
    <hr/>
    <div className='allcards'>


{smesjson.map((smes)=>(
   
    <Card smes={smes}/>
   
))}

</div>
    </>
  )
}

export default SMEScreen