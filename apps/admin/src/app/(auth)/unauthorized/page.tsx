"use client";

import { useAuth } from "@clerk/nextjs";

const Page = () => {
	const { signOut } = useAuth();

	return (
		<div className="">
			<h1>You do not have an access to this page.</h1>
			<button className="cursor-pointer" onClick={() => signOut()}>Sign out</button>
		</div>
	);
};

export default Page;
