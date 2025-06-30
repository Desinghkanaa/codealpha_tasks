import React from 'react'
import { Hero } from '../Componets/Hero/Hero'
import { Popular } from '../Componets/Popular/Popular'
import { Offers } from '../Componets/Offers/Offers'
import { NewCollection } from '../Componets/NewCollection/NewCollection'
import { NewsLetter } from '../Componets/NewsLetter/NewsLetter'


export const Shop = () => {
  return (
    <div>
       <Hero/>
       <Popular/>
       <Offers/>
       <NewCollection/>
       <NewsLetter/>
      
    </div>
  )
}
