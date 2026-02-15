import Image from "next/image";
import { FaHeart, FaHeartCrack } from "react-icons/fa6";

export default function DogCard({ dog, dragX, isDragging, swipeState, swipeSide, onPointerDown, onPointerMove, onPointerUp, onPointerCancel }) {
	const cardStyle = {
		transform: `translateX(${dragX}px) rotate(${dragX / 12}deg)`,
		transition: isDragging ? "none" : "transform 220ms ease",
	};
	const swipeStrength = Math.min(Math.abs(dragX) / 120, 1);
	const swipeOpacity = 0.15 + swipeStrength * 0.85;
	const swipeScale = 0.7 + swipeStrength * 0.55;
	const swipeRotate = (dragX >= 0 ? 1 : -1) * swipeStrength * 10;

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
				<Image src={dog.image?.url || ""} alt={dog.name} fill sizes="20px" className="card-image-fill" draggable="false" />
				<Image src={dog.image?.url || ""} alt={dog.name} fill sizes="1080px" className="card-image" draggable="false" />
				<div className="card-overlay" />
				{swipeState ? (
					<div
						className={`swipe-label ${swipeSide} ${swipeState === "yes" ? "swipe-yes" : "swipe-no"}`}
						style={{
							opacity: swipeOpacity,
							transform: `translate(-50%, -50%) rotate(${swipeRotate}deg) scale(${swipeScale})`,
						}}
					>
						{swipeState === "yes" ? <FaHeart className="swipe-icon" aria-hidden="true" /> : <FaHeartCrack className="swipe-icon" aria-hidden="true" />}
					</div>
				) : null}
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
