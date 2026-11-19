import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import type { Product } from "../types";
import { fetchProducts } from "../api/product";

export default function HomePage() {
    const [ products, setProducts ] = useState<Product[]>([])
    useEffect(() => {
        fetchProducts(undefined,5)
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
        }, []);
        
    return <>
        <div className="container section">
            <h2 className="section-title">Recommended for you</h2>
            <div className="card-container">
                {products.length > 0 ? (
                products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))
                ):"No products"}
            </div>
        </div>
        <div className="bg-secondary">
            <div className="container section">
            <h2 className="section-title">Top Games</h2>
            <div className="card-container">
            {products.length > 0 ? (
                products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))
                ):"No products"}
            </div>
            </div>
        </div>
        <div className="container section">
            <h2 className="section-title">Upcoming games</h2>
            <div className="card-container">
            {products.length > 0 ? (
                products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))
                ):"No products"}
            </div>

        </div>
    </>;
}