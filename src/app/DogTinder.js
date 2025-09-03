"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dogData from "../../../data/thedogapi_data.json";

function getRandomDog() {
	const idx = Math.floor(Math.random() * dogData.length);
	return dogData[idx];
}

export default function DogTinder() {
	const [dog, setDog] = useState(null);

	useEffect(() => {
		setDog(getRandomDog());
	}, []);

	const handleSwipe = () => {
		setDog(getRandomDog());
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 p-4">
			<h1 className="text-3xl font-bold mb-8 text-pink-700">Dog Tinder</h1>
			<div className="relative w-[350px] h-[450px] flex items-center justify-center">
				<div className="absolute inset-0 rounded-2xl shadow-lg bg-white flex flex-col items-center justify-center p-6">
					{dog ? (
						<>
							<Image src={dog.image?.url || ""} alt={dog.name} width={300} height={300} className="object-cover rounded-xl mb-4" />
							<h2 className="text-xl font-semibold mb-2 text-blue-700">{dog.name}</h2>
						</>
					) : (
						<div className="w-[300px] h-[300px] flex items-center justify-center">Loading...</div>
					)}
				</div>
			</div>
			<div className="flex gap-8 mt-8">
				<button onClick={handleSwipe} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200">
					Swipe Left
				</button>
				<button onClick={handleSwipe} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200">
					Swipe Right
				</button>
			</div>
		</div>
	);
}
