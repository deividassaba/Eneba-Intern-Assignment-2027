import type { Product } from "../types";
import ProductCard from "../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/product";

export default function StorePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchParams] = useSearchParams();

    const search = searchParams.get("search") || "";

    useEffect(() => {
        fetchProducts(search)
            .then((data) => setProducts(data))
            .catch((error) =>
                console.error("Error fetching products:", error)
            );
    }, [search]);

    return (
        <section className="card-container container">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                "No products"
            )}
        </section>
    );
}