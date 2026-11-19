
import config from "../config";

export async function CreatePayPalOrder(
  orderId: number,
  token: string
): Promise<string> {
  const response = await fetch(
    `${config.apiBaseUrl}/api/payments/create/${orderId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not create payment");
  }

  return data.id;
}

export async function CapturePayPalOrder(
  orderId: number,
  paypalOrderId: string,
  token: string
): Promise<void> {
  const response = await fetch(
    `${config.apiBaseUrl}/api/payments/capture/${orderId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paypalOrderId,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Payment failed");
  }
}
