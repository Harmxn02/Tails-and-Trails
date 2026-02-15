export default function SwipeActions({ onNo, onYes }) {
	return (
		<div className="action-row">
			<button className="action-button action-button--no" type="button" onClick={onNo} aria-label="Swipe no">
				No
			</button>
			<button className="action-button action-button--yes" type="button" onClick={onYes} aria-label="Swipe yes">
				Yes
			</button>
		</div>
	);
}
