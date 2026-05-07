import { auth } from "@clerk/nextjs/server";

const testServiceAuth = async (token: string, baseUrl: string) => {
	const res = await fetch(`${baseUrl}/test`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await res.json();

	return data;
};

const TestPage = async () => {
	const { getToken } = await auth();
	const token = await getToken();

	const productService = await testServiceAuth(token as string, "http://localhost:8000");
	console.log(productService);

	const orderService = await testServiceAuth(token as string, "http://localhost:8001");
	console.log(orderService);

	const paymentService = await testServiceAuth(token as string, "http://localhost:8002");
	console.log(paymentService);

	return <div className="">TestPage</div>;
};

export default TestPage;
