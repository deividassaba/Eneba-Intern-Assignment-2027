
import { useMessage } from "../../context/MessageContext";
import type { ProductOffer } from "../../types";
import "./AddToCartButton.scss";

interface AddToCartProps {
  productOffer: ProductOffer;
}

export default function AddToCart({ productOffer }: AddToCartProps) {
  const {showError, showMessage} = useMessage()
  const handleAddToCart = () => {
    const cart: ProductOffer[] = JSON.parse(
      sessionStorage.getItem("cart") || "[]"
    );

    // Prevent duplicate offers
    const alreadyAdded = cart.some(
      (item) =>
        item.seller_name === productOffer.seller_name &&
        item.seller_url === productOffer.seller_url &&
        item.price === productOffer.price
    );

    if (!alreadyAdded) {
      cart.push(productOffer);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      showMessage("Item added")
    }
    else{
      showError("Already added")
    }
  };

  return (
    <button
      className="add-to-cart-btn"
      type="button"
      onClick={handleAddToCart}
    >
      Add to cart
    </button>
  );
}
