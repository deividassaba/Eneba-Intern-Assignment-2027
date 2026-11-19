
import {
    PayPalScriptProvider,
    PayPalButtons,
} from "@paypal/react-paypal-js";
import type { ProductOffer } from "../types";
import { CompleteOrder, SendOrder } from "../api/order";
import { useState } from "react";
import { useMessage } from "../context/MessageContext";
import {
  CreatePayPalOrder,
  CapturePayPalOrder,
} from "../api/payments";
interface PayPalCheckoutProps {
    cart : ProductOffer[]
    token: string;
    onSuccess: () => void;
}

export default function PayPalCheckout({
    cart,
    token,
    onSuccess,
}: PayPalCheckoutProps) {
    const { showError } = useMessage();
    const [orderId, setOrderId] = useState<number | null>()
    return (
        <PayPalScriptProvider
            options={{
                clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                currency: "EUR",
                intent: "capture",
            }}
        >
            <PayPalButtons
                style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "pay",
                }}

                  createOrder={async () => {
                    try {
                    const oId = await SendOrder(cart, token);
                    setOrderId(oId);

                    return await CreatePayPalOrder(oId, token);
                    } catch (error) {
                    showError(
                        error instanceof Error ? error.message : "Could not create payment"
                    );
                    throw error;
                    }
                }}

                onApprove={async (data) => {
                    if (!orderId) return;

                    try {
                    await CapturePayPalOrder(orderId, data.orderID, token);

                    await CompleteOrder(orderId, token);
                    onSuccess();
                    } catch (error) {
                    showError(
                        error instanceof Error ? error.message : "Payment failed"
                    );
                    throw error;
                    }
                }}


                onError={(error) => {
                    showError(String(error));
                    console.error("PayPal error:", error);
                }}
            />
        </PayPalScriptProvider>
    );
}
