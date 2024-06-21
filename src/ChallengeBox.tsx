import { JSX, createSignal } from "solid-js";
import BoxGridChallenge from "./challenges/BoxGrid";
import { createEffect } from "solid-js";

export default function ChallengeBox(props: { children: JSX.Element }) {
	const [showChallenge, setShowChallenge] = createSignal(false);

	createEffect(() => {
		setTimeout(() => setShowChallenge(true), 2000 + Math.random() * 3000);
	});

	return (
		<div
			style={{
				width: "20rem",
				height: "max-content",
				"background-color": "#eee",
				display: "grid",
				"grid-template-rows": "max-content 1fr",
				position: "absolute",
				top: "110%",
				left: "50%",
				"border-radius": "0.3rem",
				border: "2px solid #ccc",
				"box-shadow": "0 0 0.5rem #ccc",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					opacity: showChallenge() ? 1 : 0,
					"pointer-events": showChallenge() ? "auto" : "none",
				}}
			>
				{props.children}
			</div>
		</div>
	);
}
