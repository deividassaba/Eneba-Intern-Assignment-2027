import type {  ProductOffer } from '../../types';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import './OfferCard.scss';

interface OfferCardProps {
    productOffer: ProductOffer;
}

export default function OfferCard({ productOffer }: OfferCardProps) {
    const formattedPrice = new Intl.NumberFormat('lt-LT', {
        style: 'currency',
        currency: 'EUR',
    }).format(productOffer.price);

    return (
        <div className="offer-card">
            <div className="offer-card__seller">
                <a
                    href={productOffer.seller_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="offer-card__seller-link"
                >
                    <img
                        className="offer-card__seller-image"
                        src={`/assets/${productOffer.seller_img_src}`}
                        alt={productOffer.seller_name}
                    />
                </a>

                <div className="offer-card__seller-info">
                    <h3>{productOffer.seller_name}</h3>
                    <span className="offer-card__rating">
                        <span>★</span> Verified seller
                    </span>
                </div>
            </div>

            <div className="offer-card__details">
                <div className="offer-card__price">
                    <strong>{formattedPrice}</strong>
                    <span>ⓘ</span>
                </div>

                <span className="offer-card__discount">
                    Special offer
                </span>
            </div>

            {productOffer.available?<AddToCartButton productOffer={productOffer} />:"Sold out"}
        </div>
    );
}