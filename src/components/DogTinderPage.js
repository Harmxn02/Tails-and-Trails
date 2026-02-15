"use client";

import { useEffect, useRef, useState } from "react";
import dogData from "../../../data/thedogapi_data.json";
import DogCard from "./DogCard";
import Header from "./Header";
import SwipeActions from "./SwipeActions";

const yesStorageKey = "dogtinder_yes";
const swipeThreshold = 90;

function getRandomDog() {
	const idx = Math.floor(Math.random() * dogData.length);
	return dogData[idx];
}

function loadYesDogs() {
	const stored = localStorage.getItem(yesStorageKey);
	if (!stored) return [];
	try {
		return JSON.parse(stored);
	} catch (error) {
		return [];
	}
}

export default function DogTinderPage() {
	const [dog, setDog] = useState(null);
	const [dragX, setDragX] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [likedCount, setLikedCount] = useState(0);
	const startXRef = useRef(0);

	useEffect(() => {
		setDog(getRandomDog());
		setLikedCount(loadYesDogs().length);
	}, []);

	const saveYesDog = (dogToSave) => {
		const previous = loadYesDogs();
		const exists = previous.some((item) => item.id === dogToSave.id);
		const updated = exists ? previous : [dogToSave, ...previous];
		localStorage.setItem(yesStorageKey, JSON.stringify(updated));
		setLikedCount(updated.length);
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

	const swipeLabel = dragX > 25 ? "YES" : dragX < -25 ? "NO" : "";
	const swipeSide = dragX > 0 ? "right" : "left";

	return (
		<div className="app-shell">
			<div className="app-frame">
				<Header likedCount={likedCount} />
				<DogCard key={dog?.id || "loading"} dog={dog} dragX={dragX} isDragging={isDragging} swipeLabel={swipeLabel} swipeSide={swipeSide} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerCancel} />
				<SwipeActions onNo={() => handleSwipe("left")} onYes={() => handleSwipe("right")} />
				<p className="hint-text">Drag to decide or tap a button.</p>
			</div>
		</div>
	);
}
