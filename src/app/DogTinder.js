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
		<div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 p-4">
			<h1 className="text-3xl font-bold mb-8 text-neutral-100 tracking-tight">Dog Tinder</h1>
			<div className="relative w-[350px] h-[480px] flex items-center justify-center">
				<div className="absolute inset-0 rounded-xl shadow-md bg-neutral-800 flex flex-col items-center justify-center p-6 border border-neutral-700">
					{dog ? (
						<>
							<div className="relative mb-4">
								<Image src={dog.image?.url || ""} alt={dog.name} width={600} height={600} className="object-cover rounded-lg border border-neutral-700" />
								<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-wrap gap-2 justify-center">
									<span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-700 bg-opacity-80 border border-neutral-600 text-neutral-100 text-xs font-medium shadow">
										{/* <span className="mr-2" role="img" aria-label="lifespan">
											⏳
										</span> */}
										{dog.life_span}
									</span>
									<span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-700 bg-opacity-80 border border-neutral-600 text-neutral-100 text-xs font-medium shadow">
										{/* <span className="mr-2" role="img" aria-label="temperament">
											🧠
										</span> */}
										{dog.temperament.split(", ")[0]}
									</span>
									<span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-700 bg-opacity-80 border border-neutral-600 text-neutral-100 text-xs font-medium shadow">
										{/* <span className="mr-2" role="img" aria-label="weight">
											⚖️
										</span> */}
										{dog.weight?.metric} kg
									</span>
								</div>
							</div>
							<h2 className="text-xl font-semibold mb-4 text-neutral-100 text-center">{dog.name}</h2>
							<div className="flex gap-4 mt-2 w-full justify-center">
								<button onClick={handleSwipe} className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-2 px-5 rounded-lg shadow-sm transition-all duration-200 text-base">
									Swipe Left
								</button>
								<button onClick={handleSwipe} className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-medium py-2 px-5 rounded-lg shadow-sm transition-all duration-200 text-base">
									Swipe Right
								</button>
							</div>
						</>
					) : (
						<div className="w-[300px] h-[300px] flex items-center justify-center text-base text-neutral-500">Loading...</div>
					)}
				</div>
			</div>
		</div>
	);
}
