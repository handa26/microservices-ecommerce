"use client";

import { useState } from "react";
import { useCheckout, PaymentElement } from "@stripe/react-stripe-js";
import { ConfirmError } from "@stripe/stripe-js";

import { ShippingFormInputs } from "@repo/types";

const CheckoutForm = ({
	shippingForm,
}: {
	shippingForm: ShippingFormInputs;
}) => {
	const checkout = useCheckout();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ConfirmError | null>(null);

	const handleClick = async () => {
		setLoading(true);

		await checkout.updateEmail(shippingForm.email);
		await checkout.updateShippingAddress({
			name: "shipping_address",
			address: {
				line1: shippingForm.address,
				line2: shippingForm.city,
				country: "ID",
			},
		});

		const res = await checkout.confirm();
		if (res.type === "error") {
			setError(res.error);
		}
		setLoading(false);
	};

	return (
		<form>
			<PaymentElement options={{ layout: "accordion" }} />
			<button disabled={loading} onClick={handleClick}>
				{loading ? <div className="animate-pulse">Loading...</div> : "Pay"}
			</button>

			{error && <div className="">{error.message}</div>}
		</form>
	);
};

export default CheckoutForm;
