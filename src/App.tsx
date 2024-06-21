import { Show, createSignal } from "solid-js";
import "./App.css";
import Spinner from "./assets/Spinner-3.gif";
import ChallengeBox from "./ChallengeBox";
import BoxGridChallenge from "./challenges/BoxGrid";

declare module "solid-js" {
	namespace JSX {
		interface CustomEvents {
			Next: () => void;
		}
	}
}

function App() {
	const [isPlaying, setIsPlaying] = createSignal(false);

	const [index, setIndex] = createSignal(1);
	const seed = Math.random().toString(36).substring(2, 15);

	return (
		<div
			style={{
				width: "15rem",
				height: "3rem",
				"background-color": "#eee",
				display: "grid",
				"grid-template-columns": "max-content 1fr",
				"justify-items": "center",
				"align-items": "center",
				padding: "0.5rem",
				"border-radius": "0.3rem",
				border: "2px solid #ccc",
				position: "relative",
				"font-family": "sans-serif",
			}}
		>
			<div
				style={{
					width: "2rem",
					height: "2rem",
					border: isPlaying() ? "3px solid #fff" : "3px solid #ccc",
					"background-image": isPlaying() ? `url(${Spinner})` : "none",
					"background-size": "contain",
					"background-color": isPlaying() ? "transparent" : "#fff",
					"border-radius": isPlaying() ? "1.5rem" : "0.5rem",
					transition: "all 0.5s",
					"mix-blend-mode": isPlaying() ? "multiply" : "normal",
					cursor: isPlaying() ? "unset" : "pointer",
				}}
				onClick={() => setIsPlaying(true)}
			></div>
			<div>I'm not a robot</div>
			<div
				style={{
					"font-size": "0.7rem",
					display: "flex",
					gap: "0.5rem",
					position: "absolute",
					bottom: "0.1rem",
					right: "0.3rem",
					color: "#777",
				}}
			>
				<div>Terms</div>
				<div>Privacy</div>
			</div>
			<Show when={isPlaying()}>
				<Show when={index()} keyed>
					<ChallengeBox>
						<BoxGridChallenge
							index={index()}
							onNext={() => setIndex(index() + 1)}
							seed={seed}
						/>
					</ChallengeBox>
				</Show>
			</Show>
		</div>
	);
}

export default App;
