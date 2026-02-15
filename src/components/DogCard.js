import Image from "next/image";

export default function DogCard({ dog, dragX, isDragging, swipeLabel, swipeSide, onPointerDown, onPointerMove, onPointerUp, onPointerCancel }) {
	const cardStyle = {
		transform: `translateX(${dragX}px) rotate(${dragX / 12}deg)`,
		transition: isDragging ? "none" : "transform 220ms ease",
	};

	if (!dog) {
		return (
			<div className="card-shell animate-rise">
				<div className="card-loading">Loading...</div>
			</div>
		);
	}

	const temperament = dog.temperament ? dog.temperament.split(", ").slice(0, 2).join(", ") : "Unknown";
	const weight = dog.weight?.metric ? `${dog.weight.metric} kg` : "Unknown";
	const group = dog.breed_group || dog.origin || "Companion";

	return (
		<div className="card-shell animate-rise">
			<div className="card-interactive touch-pan-y select-none" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerCancel} style={cardStyle}>
				<Image src={dog.image?.url || ""} alt={dog.name} fill sizes="70px" className="card-image-fill" draggable="false" />
				<Image src={dog.image?.url || ""} alt={dog.name} fill sizes="1080px" className="card-image" draggable="false" />
				<div className="card-overlay" />
				{swipeLabel ? <div className={`swipe-label ${swipeSide}`}>{swipeLabel}</div> : null}
				<div className="card-content">
					<div className="title-row">
						<h2 className="card-title font-display">{dog.name}</h2>
						<span className="card-badge">{group}</span>
					</div>
					<div className="pill-row">
						<span className="pill">Life: {dog.life_span}</span>
						<span className="pill">Temperament: {temperament}</span>
						<span className="pill">Weight: {weight}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
