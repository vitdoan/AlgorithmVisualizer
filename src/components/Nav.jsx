import React from "react";

function Nav({
	calculateWidth,
	inputValue,
	calculateSpeed,
	speed,
	generate,
	generateWithoutDuplicate,
}) {
	return (
		<nav className="navBar">
			<div className="nav1">
				<div>
					<input
						onChange={calculateWidth}
						value={inputValue}
						type="range"
						className="inputRange"
						name="inputRange"
						min="4"
						max="222"
					></input>
					<label className="inputLabel" htmlFor="inputLabel">
						Array Length: {inputValue}
					</label>
				</div>
				<div>
					<input
						data-rangeslider
						onChange={calculateSpeed}
						type="range"
						className="speedRange"
						name="speedRange"
						min="0"
						max="333"
					></input>
					<label className="speedLabel" htmlFor="speedLabel">
						Speed: {speed} ms
					</label>
				</div>
			</div>
			<div className="nav2">
				<a className="generate sort" onClick={generate} href>
					Generate new array
				</a>
				<a
					className="noDuplicates sort"
					onClick={generateWithoutDuplicate}
					href
				>
					No Duplicates
				</a>
			</div>
		</nav>
	);
}
export default Nav;
