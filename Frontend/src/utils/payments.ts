export async function SendMockPayment(
    orderId: number,
    result: 'success' | 'failure',
    token: string
) {
    const response = await fetch(
        `http://localhost:8000/api/payments/${orderId}/mock`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ result }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Payment failed');
    }

    return data;
}