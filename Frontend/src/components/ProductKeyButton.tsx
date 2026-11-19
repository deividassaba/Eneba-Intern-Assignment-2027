
import { useState } from "react";

interface ProductKeyButtonProps {
  product_key: string;
}

export default function ProductKeyButton({ product_key }: ProductKeyButtonProps) {
  const [toggleKey, setToggleKey] = useState<boolean>(false); 
  return (
    <div style={{display:'flex'}}>
    <button
      className="btn"
      type="button"
      onClick={()=>{setToggleKey(!toggleKey)}}
    >
      {toggleKey?"Hide Product Key":"Show Product Key"}
    </button>
    <div className="product_key">{toggleKey?product_key:"XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"}</div>

    </div>
  );
}
