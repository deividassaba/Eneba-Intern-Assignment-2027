import config from "../config";
import type { Order, ProductOffer } from "../types";


export interface CompleteOrderResponse {
    success: boolean;
    message?: string;
    error?: string;
    orderId?: number;
    status?: string;
}

export async function CompleteOrder(
    orderId: number,
    token: string
): Promise<CompleteOrderResponse> {
    const response = await fetch(
        `${config.apiBaseUrl}/api/orders/${orderId}/complete`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    const data: CompleteOrderResponse = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to complete order.");
    }

    return data;
}


export async function GetOrders(token: string): Promise<Order[]> {
  const response = await fetch(`${config.apiBaseUrl}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error("Could not load orders.");
  }

  return response.json();
}


export async function GetOrder(id: number, token: string): Promise<Order> {
  const response = await fetch(`${config.apiBaseUrl}/api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load order.");
  }

  return response.json();
}

export async function SendOrder(productOffers: ProductOffer[], token : string): Promise<number> {

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const offerIds = productOffers.map((productOffer) => productOffer.offer_id);
  const response = await fetch(`${config.apiBaseUrl}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      offerIds,
    }),
  });
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create order");
  }

  return data.id;
}