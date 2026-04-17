"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Minus, Plus, ShoppingCart } from "lucide-react";

import { ProductType } from "@/types";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const ProductInteraction = ({
	product,
	selectedSize,
	selectedColor,
}: {
	product: ProductType;
	selectedSize: string;
	selectedColor: string;
}) => {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const [quantity, setQuantity] = useState(1);

	const { addToCart } = useCartStore();

	const handleTypeChange = (type: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(type, value);

		router.push(`${pathName}?${params.toString()}`, { scroll: false });
	};

	const handleChangeQuantity = (type: "increment" | "decrement") => {
		if (type === "increment") {
			setQuantity((prevState) => prevState + 1);
		} else {
			if (quantity > 1) {
				setQuantity((prevState) => prevState - 1);
			}
		}
	};

	const handleAddToCart = () => {
		addToCart({
			...product,
			quantity,
			selectedColor,
			selectedSize,
		});

		toast.success("Product added to cart");
	};

	return (
		<div className="flex flex-col gap-4 mt-4">
			{/* SIZE */}
			<div className="flex flex-col gap-2 text-xs">
				<span className="text-gray-500">Size</span>
				<div className="flex items-center gap-2">
					{product.sizes.map((size) => (
						<div
							className={`cursor-pointer border-1 p-[2px] ${
								selectedSize === size ? "border-gray-600" : "border-gray-300"
							}`}
							key={size}
							onClick={() => handleTypeChange("size", size)}
						>
							<div
								className={`w-6 h-6 font-bold text-center flex items-center justify-center ${
									selectedSize === size
										? "bg-black text-white"
										: "bg-white text-black"
								}`}
							>
								{size.toUpperCase()}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* COLOR */}
			<div className="flex flex-col gap-2 text-sm">
				<span className="text-gray-500">Color</span>
				<div className="flex items-center gap-2">
					{product.colors.map((color) => (
						<div
							className={`cursor-pointer border-1 p-[2px] ${
								selectedColor === color ? "border-gray-300" : "border-white"
							}`}
							key={color}
							onClick={() => handleTypeChange("color", color)}
						>
							<div className={`w-6 h-6`} style={{ backgroundColor: color }} />
						</div>
					))}
				</div>
			</div>

			{/* QUANTITY */}
			<div className="flex flex-col gap-2 text-sm">
				<span className="text-gray-500">Quantity</span>
				<div className="flex items-center gap-2">
					<button
						onClick={() => handleChangeQuantity("decrement")}
						className="cursor-pointer border-1 border-gray-300 p-1"
						disabled={quantity === 1}
					>
						<Minus className="w-4 h-4" />
					</button>
					<span>{quantity}</span>
					<button
						onClick={() => handleChangeQuantity("increment")}
						className="cursor-pointer border-1 border-gray-300 p-1"
					>
						<Plus className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* BUTTONS */}
			<button onClick={handleAddToCart} className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium">
				<Plus className="w-4 h-4" />
				Add to Cart
			</button>
			<button className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer text-sm font-medium">
				<ShoppingCart className="w-4 h-4" />
				Buy this Product
			</button>
		</div>
	);
};

export default ProductInteraction;
