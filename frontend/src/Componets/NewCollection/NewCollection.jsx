import React, { useEffect, useState } from 'react'
import './NewCollection.css'
import { Item } from '../Item/Item'

export const NewCollection = () => {

const [newCollection, setNewcollection] = useState([])

useEffect(()=>{
  fetch('http://localhost:4000/newcollection')
  .then((response)=>response.json())
  .then((data)=>setNewcollection(data))

},[])

  return (
    <div className="new-collection">
        <h1>NEW COLLECTION</h1>
        <hr/>
        <div className="new-collection-item">
            {newCollection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} 
                new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
