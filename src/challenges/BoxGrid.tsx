import { For, Show, createComputed, createSignal } from "solid-js";

export default function BoxGridChallenge(props: {
	index: number;
	onNext: () => void;
	seed: string;
}) {
	const seeds = Array.from({ length: 10 }, (_, i) =>
		Math.random().toString(36).substring(2, 15)
	);

	const [selectedImages, setSelectedImages] = createSignal(
		Array.from({ length: 10 }, () => false)
	);

	const filters: string[] = Array.from({ length: 10 }, () =>
		Math.random() > 0.8
			? [
					Math.random() > 0.1 ? `grayscale(${Math.random()})` : "",
					Math.random() > 0.1 ? `sepia(${Math.random()})` : "",
					Math.random() > 0.1
						? `hue-rotate(${Math.random() * 50 - 25}deg)`
						: "",
					Math.random() > 0.1 ? `saturate(${Math.random()})` : "",
					Math.random() > 0.1 ? `brightness(${Math.random() + 0.5})` : "",
			  ]
					.filter(Boolean)
					.join(" ")
			: ""
	);

	const isSmall: boolean[] = Array.from(
		{ length: 10 },
		() => Math.random() > 0.6
	);

	return (
		<div>
			<div
				style={{
					display: "grid",
					"grid-template-columns": "1fr max-content",
					gap: "0.5rem",
					padding: "0.5rem",
					"align-items": "center",
					background: "#4990e2",
					color: "white",
					"margin-bottom": "0.3rem",
				}}
			>
				<div>
					<div style={{ "font-size": "1rem" }}>
						Select all images that match:
					</div>
					<div style={{ "font-size": "0.7rem" }}>
						If there are none, click Skip.
					</div>
				</div>
				<img
					src={`https://picsum.photos/seed/${props.seed}${props.index}0/100/100/`}
					alt="Image"
					width={100}
					height={100}
					style={{
						width: "4rem",
						height: "4rem",
					}}
				/>
			</div>

			<Show when={props.index > 1}>
				<div
					style={{
						"font-size": "1rem",
						"text-align": "center",
						"padding-bottom": "0.3rem",
					}}
				>
					Incorrect! Please try again.
				</div>
			</Show>

			<div
				style={{
					display: "grid",
					"grid-template-rows": "repeat(3, 1fr)",
					"grid-template-columns": "repeat(3, 1fr)",
					gap: "0.1rem",
					"align-items": "center",
					"justify-items": "center",
				}}
			>
				<For each={seeds.slice(1)}>
					{(seed, i) => {
						const isSelected = () => selectedImages()[i()];
						return (
							<div style={{ position: "relative" }}>
								<img
									src={`https://picsum.photos/seed/${props.seed}${props.index}${
										i() + 1
									}/${isSmall[i()] ? "50/50" : "100/100"}/`}
									alt="Image"
									width={100}
									height={100}
									onClick={() => {
										setSelectedImages(() => {
											let prev = selectedImages();
											prev[i()] = !prev[i()];
											console.log(prev);
											return [...prev];
										});
									}}
									style={{
										filter: filters[i()],
										transform: isSelected() ? "scale(0.9)" : "scale(1)",
										transition: "transform 0.1s",
									}}
								/>
								<div
									style={{
										position: "absolute",
										top: "0.1rem",
										right: "0.1rem",
										"border-radius": "50%",
										width: "1.5rem",
										height: "1.5rem",
										background: "#4990e2",
										color: "white",
										"font-size": "1.3rem",
										"font-weight": "bold",
										"text-align": "center",
										"line-height": "1.5rem",
										transform: isSelected() ? "scale(1)" : "scale(0)",
										transition: "transform 0.1s",
									}}
								>
									✓
								</div>
							</div>
						);
					}}
				</For>
			</div>
			<div
				style={{
					display: "flex",
					"justify-content": "right",
					padding: "0.3rem",
					"padding-top": 0,
				}}
			>
				<button
					style={{
						background: "#4990e2",
						color: "white",
						border: "none",
						"border-radius": 0,
						padding: "0.5rem 1.5rem",
						"font-size": "1rem",
						cursor: "pointer",
						"font-weight": "bold",
					}}
					onClick={() => {
						props.onNext();
					}}
				>
					{selectedImages().some(Boolean) ? "Submit" : "Skip"}
				</button>
			</div>
		</div>
	);
}
