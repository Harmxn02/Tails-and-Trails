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
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#ff6c5a] to-[#fe307a] p-4">
			<div className="relative w-[600px] h-[600px] flex items-center justify-center">
				<div className="absolute inset-0 shadow-2xl bg-neutral-800 flex flex-col items-center justify-center p-0">
					{dog ? (
						<>
							<div className="relative w-full h-full">
								<Image src={dog.image?.url || ""} alt={dog.name} fill sizes="360px" className="object-cover object-center" style={{ filter: "brightness(0.85)", zIndex: 0 }} />
								<div className="absolute bottom-0 left-0 w-full px-5 pb-6 flex flex-col gap-3 z-10">
									<h2 className="text-2xl font-bold text-neutral-100 mb-2 drop-shadow-lg">{dog.name}</h2>
									<div className="flex flex-wrap gap-2 justify-start">
										<span className="inline-flex items-center px-3 py-1 rounded-xl bg-neutral-700 bg-opacity-80 border border-neutral-600 text-neutral-100 text-xs font-medium shadow">
											<span className="mr-2" role="img" aria-label="lifespan">
												⏳
											</span>
											{dog.life_span}
										</span>
										<span className="inline-flex items-center px-3 py-1 rounded-xl bg-neutral-700 bg-opacity-80 border border-neutral-600 text-neutral-100 text-xs font-medium shadow">
											<span className="mr-2" role="img" aria-label="temperament">
												🧠
											</span>
											{dog.temperament.split(", ")[0]}
										</span>
										<span className="inline-flex items-center px-3 py-1 rounded-xl bg-neutral-700 bg-opacity-80 border border-neutral-600 text-neutral-100 text-xs font-medium shadow">
											<span className="mr-2" role="img" aria-label="weight">
												⚖️
											</span>
											{dog.weight?.metric} kg
										</span>
									</div>
									{/* <div className="flex gap-4 mt-4 w-full justify-center">
										<button onClick={handleSwipe} className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-2 px-5 rounded-xl shadow-sm transition-all duration-200 text-base">
											Swipe Left
										</button>
										<button onClick={handleSwipe} className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-medium py-2 px-5 rounded-xl shadow-sm transition-all duration-200 text-base">
											Swipe Right
										</button>
									</div> */}
								</div>
							</div>
						</>
					) : (
						<div className="w-full h-full flex items-center justify-center text-base text-neutral-500">Loading...</div>
					)}
				</div>
			</div>
		</div>
	);
}
