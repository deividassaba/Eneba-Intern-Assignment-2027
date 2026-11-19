import type { Product } from "../types";
import { apiFetch } from "./client";

const endpoint = 'api/products';

export async function fetchProducts(
  search?: string,
  limit?: number
): Promise<Product[]> {
  const params = new URLSearchParams();
  const options : RequestInit ={
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
  if (search) params.set('search', search);
  if (limit) params.set('limit', String(limit));
  
  const query = params.toString();
  return apiFetch<Product[]>(
    `${endpoint}${query ? `?${query}` : ''}`, options
  );
}
export async function fetchProduct(
  id: number,
): Promise<Product> {
  return apiFetch<Product>(
    `${endpoint}/${id}`
  );
}
