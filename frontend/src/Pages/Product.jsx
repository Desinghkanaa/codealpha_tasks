import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import { Breadcrums } from '../Componets/Breadcrums/Breadcrums'
import { ProductDisplay } from '../Componets/ProductDisplay/ProductDisplay'
import { DescriptionBox } from '../Componets/DescriptionBox/DescriptionBox'
import { RelatedProduct } from '../Componets/RelatedProducts/RelatedProduct'

export const Product = () => {
  const {all_product} = useContext(ShopContext)
  const {productId} = useParams();
  const product = all_product.find((e) => e.id === Number(productId))

  return (
    <div>
        <Breadcrums product={product}/>
        <ProductDisplay product={product}/>
        <DescriptionBox/>
        <RelatedProduct/>
       
    </div>
  )
}
