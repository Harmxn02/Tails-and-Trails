"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "./Header";

const yesStorageKey = "dogtinder_yes";

function loadYesDogs() {
	const stored = localStorage.getItem(yesStorageKey);
	if (!stored) return [];
	try {
		return JSON.parse(stored);
	} catch (error) {
		return [];
	}
}

export default function SavedDogsPage() {
	const [savedDogs, setSavedDogs] = useState([]);

	useEffect(() => {
		setSavedDogs(loadYesDogs());
	}, []);

	return (
		<div className="app-shell">
			<div className="app-frame">
				<Header likedCount={savedDogs.length} linkHref="/" linkLabel="Back to swipe" />
				<div className="saved-panel">
					{savedDogs.length === 0 ? (
						<div className="saved-empty">
							<p className="saved-empty-title">No saved dogs yet</p>
							<p className="saved-empty-subtitle">Swipe right on the main page to build your list.</p>
						</div>
					) : (
						<div className="saved-grid">
							{savedDogs.map((dog) => (
								<div className="saved-card" key={dog.id}>
									<div className="saved-image-wrap">
										{/* <Image src={dog.image?.url || ""} alt={dog.name} fill sizes="20px" className="fill-blurred-background" /> */}
										<Image src={dog.image?.url || ""} alt={dog.name} fill sizes="400px" className="saved-image" />
									</div>
									<div className="saved-details">
										<h2 className="saved-title font-display">{dog.name}</h2>
										<p className="saved-meta">{dog.breed_group || dog.origin || "Companion"}</p>
										<div className="saved-pills">
											<span>Life: {dog.life_span}</span>
											<span>Weight: {dog.weight?.metric || "Unknown"} kg</span>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
