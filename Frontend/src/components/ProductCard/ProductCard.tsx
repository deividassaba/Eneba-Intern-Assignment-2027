
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={"/products/"+product.id}>
        <div className="card">
        
        {product.img_src? <img className="card-img" src={`/assets/${product.img_src}`}/>:""}
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <p className="region">{product.region} </p>
          <p className="card-price">{product.price /*.toFixed(2)*/} € </p>
        </div>
        </div>
    </Link>
  );
}