
import { useState, type FormEvent } from "react";
import "./SearchBar.scss";
import type { Product } from "../../types";
import { fetchProducts } from "../../api/product";
import { Link, } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  // onChange: (text: string) => void;
  initialValue?: string;
}

export default function SearchBar({
  placeholder = "Search for games, gift cards, and more...",
  onSearch,
  // onChange,
  initialValue = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [products, setProducts] = useState<Product[]>([]);
  const onChange = async(text: string) => {
    setQuery(text)
    if(text!=""){
    await fetchProducts(text,10)
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
    }
    else{
      setProducts([])
    }
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="search-container">
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="10.8"
            cy="10.8"
            r="6.8"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M16 16L21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <input
        type="text"
        className="search-bar__input"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
      />
      
      {query && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          &times;
        </button>
      )}

      {/* <button type="submit" className="search-bar__button">
        Search
      </button> */}
      
    </form>
    {products&&query!=''?
    <div className="search-results">
      <div className="search-results-cont">
        {products.map((product)=>
          <Link to={"/products/"+product.id} key={product.id}>
            {product.title}
          </Link>)}
        <div style={{padding:'10px'}}><Link to={"/store/?search="+query} className="btn" >View all search results</Link></div>
      </div>
    </div>
    :""}
    </div>
  );
}
