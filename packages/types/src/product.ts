import z from "zod";

import type { Product, Category } from "@repo/product-db";

export type ProductType = Product;

export type ProductsType = ProductType[];

export type StripeProductType = {
	id: string;
	name: string;
	price: number;
};

export type CategoryType = Category;

export const CategoryFormSchema = z.object({
	name: z
		.string({ message: "Category name is required!" })
		.min(4, { message: "Category name is required!" }),
	slug: z
		.string({ message: "Category slug is required!" })
		.min(4, { message: "Category slug is required!" }),
});
