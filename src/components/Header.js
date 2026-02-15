export default function Header({ likedCount }) {
	return (
		<header className="header">
			<div className="header-copy">
				<p className="eyebrow">Dog Match</p>
				<h1 className="title font-display">Tails and Trails</h1>
				<p className="subtitle">Find a new favorite. Swipe right to save and come back to your matches.</p>
			</div>
			<div className="liked-chip">
				<span className="liked-number">{likedCount}</span>
				<span className="liked-label">Saved</span>
			</div>
		</header>
	);
}
