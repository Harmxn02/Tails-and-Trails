"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dogData from "../../../data/thedogapi_data.json";

function getRandomDog() {
	const idx = Math.floor(Math.random() * dogData.length);
	return dogData[idx];
}

export default function DogTinder() {
	const [dog, setDog] = useState(null);
	const [dragX, setDragX] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const startXRef = useRef(0);
	const yesStorageKey = "dogtinder_yes";
	const swipeThreshold = 90;

	useEffect(() => {
		setDog(getRandomDog());
	}, []);

	const saveYesDog = (dogToSave) => {
		const stored = localStorage.getItem(yesStorageKey);
		let previous = [];
		if (stored) {
			try {
				previous = JSON.parse(stored);
			} catch (error) {
				previous = [];
			}
		}
		const exists = previous.some((item) => item.id === dogToSave.id);
		const updated = exists ? previous : [dogToSave, ...previous];
		localStorage.setItem(yesStorageKey, JSON.stringify(updated));
	};

	const handleSwipe = (direction) => {
		if (!dog) return;

		if (direction === "right") {
			saveYesDog(dog);
		}

		setDragX(0);
		setDog(getRandomDog());
	};

	const handlePointerDown = (event) => {
		event.currentTarget.setPointerCapture(event.pointerId);
		startXRef.current = event.clientX;
		setIsDragging(true);
	};

	const handlePointerMove = (event) => {
		if (!isDragging) return;
		setDragX(event.clientX - startXRef.current);
	};

	const handlePointerUp = (event) => {
		if (!isDragging) return;
		setIsDragging(false);
		event.currentTarget.releasePointerCapture(event.pointerId);
		if (Math.abs(dragX) >= swipeThreshold) {
			handleSwipe(dragX > 0 ? "right" : "left");
		} else {
			setDragX(0);
		}
	};

	const handlePointerCancel = () => {
		setIsDragging(false);
		setDragX(0);
	};

	const pillClass = "inline-flex items-center px-3 py-1 rounded-xl bg-neutral-700 bg-opacity-80 border border-neutral-600 text-neutral-100 text-xs font-medium shadow";
	const buttonClass = "w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-100 text-neutral-900 font-semibold shadow-lg hover:bg-neutral-200 transition-all duration-150 flex items-center justify-center text-lg";
	const cardTransform = {
		transform: `translateX(${dragX}px) rotate(${dragX / 12}deg)`,
		transition: isDragging ? "none" : "transform 200ms ease",
	};
	const swipeLabel = dragX > 20 ? "YES" : dragX < -20 ? "NO" : "";
	const swipeLabelClass = dragX > 20 ? "bg-emerald-500" : "bg-rose-500";

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#ff6c5a] to-[#fe307a] p-4">
			<div className="relative w-[95vw] h-100 md:w-[600px] md:h-[600px] flex items-center justify-center max-w-full max-h-full">
				<div className="absolute inset-0 flex flex-col items-center justify-center p-0">
					{dog ? (
						<>
							<div className="relative w-full h-full touch-pan-y select-none" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerCancel} style={cardTransform}>
								<Image src={dog.image?.url || ""} draggable="false" alt={dog.name} fill sizes="1080px" className="object-cover object-center select-none" style={{ filter: "brightness(0.65)", zIndex: 0 }} />
								{swipeLabel ? <div className={`absolute top-5 ${dragX > 0 ? "left-5" : "right-5"} px-3 py-1 rounded-lg text-white text-sm font-semibold ${swipeLabelClass} shadow-lg`}>{swipeLabel}</div> : null}
								<div className="absolute bottom-0 left-0 w-full px-5 pb-6 flex flex-col gap-3 z-10">
									<h2 className="text-2xl font-bold text-neutral-100 mb-2 drop-shadow-xl">{dog.name}</h2>
									<div className="flex flex-wrap gap-2 justify-start">
										<span className={pillClass}>
											<span className="mr-2" role="img" aria-label="lifespan">
												⏳
											</span>
											{dog.life_span}
										</span>
										<span className={pillClass}>
											<span className="mr-2" role="img" aria-label="temperament">
												🧠
											</span>
											{dog.temperament ? dog.temperament.split(", ")[0] : "Unknown"}
										</span>
										<span className={pillClass}>
											<span className="mr-2" role="img" aria-label="weight">
												⚖️
											</span>
											{dog.weight?.metric} kg
										</span>
									</div>
								</div>
							</div>
						</>
					) : (
						<div className="w-full h-full flex items-center justify-center text-base text-neutral-500">Loading...</div>
					)}
				</div>
			</div>
			<div className="mt-6 flex items-center gap-6">
				<button className={`${buttonClass} border-2 border-rose-400`} onClick={() => handleSwipe("left")} aria-label="Swipe no">
					No
				</button>
				<button className={`${buttonClass} border-2 border-emerald-400`} onClick={() => handleSwipe("right")} aria-label="Swipe yes">
					Yes
				</button>
			</div>
		</div>
	);
}
