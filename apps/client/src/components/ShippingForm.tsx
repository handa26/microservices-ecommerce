import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ArrowRight } from "lucide-react";

import { ShippingFormInputs, shippingFormSchema } from "@repo/types";

const ShippingForm = ({
	setShippingForm,
}: {
	setShippingForm: (data: ShippingFormInputs) => void;
}) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ShippingFormInputs>({
		resolver: zodResolver(shippingFormSchema as any),
	});

	const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
		setShippingForm(data);

		router.push("/cart?step=3");
	};

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={handleSubmit(handleShippingForm)}
		>
			{/* NAME */}
			<div className="flex flex-col gap-1">
				<label htmlFor="name" className="text-xs text-gray-500 font-medium">
					Name
				</label>
				<input
					className="border-b border-gray-200 py-2 outline-none text-sm"
					type="text"
					id="name"
					placeholder="John Doe"
					{...register("name")}
				/>
				{errors.name && (
					<p className="text-xs text-red-500">{errors.name.message}</p>
				)}
			</div>

			{/* EMAIL */}
			<div className="flex flex-col gap-1">
				<label htmlFor="email" className="text-xs text-gray-500 font-medium">
					Email
				</label>
				<input
					className="border-b border-gray-200 py-2 outline-none text-sm"
					type="email"
					id="email"
					placeholder="johndoe@email.com"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-xs text-red-500">{errors.email.message}</p>
				)}
			</div>

			{/* PHONE */}
			<div className="flex flex-col gap-1">
				<label htmlFor="phone" className="text-xs text-gray-500 font-medium">
					Phone
				</label>
				<input
					className="border-b border-gray-200 py-2 outline-none text-sm"
					type="text"
					id="phone"
					placeholder="(123) 456-7890"
					{...register("phone")}
				/>
				{errors.phone && (
					<p className="text-xs text-red-500">{errors.phone.message}</p>
				)}
			</div>

			{/* ADDRESS */}
			<div className="flex flex-col gap-1">
				<label htmlFor="address" className="text-xs text-gray-500 font-medium">
					Address
				</label>
				<input
					className="border-b border-gray-200 py-2 outline-none text-sm"
					type="text"
					id="address"
					placeholder="1234 street, city, state, country"
					{...register("address")}
				/>
				{errors.address && (
					<p className="text-xs text-red-500">{errors.address.message}</p>
				)}
			</div>

			{/* CITY */}
			<div className="flex flex-col gap-1">
				<label htmlFor="city" className="text-xs text-gray-500 font-medium">
					City
				</label>
				<input
					className="border-b border-gray-200 py-2 outline-none text-sm"
					type="text"
					id="city"
					placeholder="City"
					{...register("city")}
				/>
				{errors.city && (
					<p className="text-xs text-red-500">{errors.city.message}</p>
				)}
			</div>

			<button
				type="submit"
				className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
			>
				Continue
				<ArrowRight className="w-3 h-3" />
			</button>
		</form>
	);
};

export default ShippingForm;
