
import { useParams} from 'react-router-dom';
import type { ProductOffer, Product } from '../types';
import { fetchProduct } from '../api/product';
import { useEffect, useState } from 'react';
import OfferCard from '../components/OfferCard/OfferCard';
import { useMessage } from '../context/MessageContext';

export default function ProductPage() {
    const { id } = useParams();
    const [ product, setProduct ] = useState<Product>();
    const {showError} = useMessage();
    useEffect(()=>{
       fetchProduct(Number(id))
        .then((data)=>{setProduct(data)})
        .catch((error)=>{showError(String(error))});
    },[]);

    return <div className="product-page container">
            {product?(
                <>
                    {product.img_src? <img src={`/assets/${product.img_src}`}/>:""}
                    <h1>{product.title}</h1>
                    <div className="best-offer">Best price: {product.price} €</div>
                    {product.offers && product.offers.length > 0?
                    product.offers.map((productOffer : ProductOffer) => <OfferCard key={productOffer.offer_id} productOffer={productOffer}/>
                    )
                    
                    :"Pasiūlymų nėra"}

                    
                </>):""}
        </div>;
}