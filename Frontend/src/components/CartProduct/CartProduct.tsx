import type { ProductOffer, Product } from "../../types";
import DeleteIcon from "../icons/DeleteIcon";

interface OfferCardProps {
    productOffer: ProductOffer;
    index: number;
    handleRemove: (index : number) => void
}

export default function CartProduct({ productOffer,index,handleRemove }: OfferCardProps) {

return <div
                className="cart-item"
                key={`${productOffer.seller_name}-${productOffer.seller_url}`}
              >
                <div className="cart-item__info">
                  {productOffer.img_src && (
                    <img
                      src={`/assets/${productOffer.img_src}`}
                      alt={productOffer.seller_name}
                    />
                  )}
                {productOffer.title}
                  <div>
                    <h3>{productOffer.seller_name}</h3>
                    <a
                      href={productOffer.seller_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View productOffer
                    </a>
                  </div>
                </div>

                <div className="cart-item__actions">
                  <span className="cart-item__price">
                    €{Number(productOffer.price).toFixed(2)}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    aria-label={`Remove ${productOffer.seller_name}`}
                    className="delete-icon-btn"
                  >
                    <DeleteIcon/>
                  </button>
                </div>
              </div>

}