import React, { useState, useEffect } from "react";
import "./Visualizer.css";
import MergeSort from "../algorithm/MergeSort";
import Nav from "./Nav";
import InsertionSort from "../algorithm/InsertionSort";

const DEFAULT_SPEED = 5;
const DEFAULT_VALUE = 100;
const PURPLE = "#b0b1fc";
const RED = "#FF6363";
const GREEN = "#BAFFB4";

function Visualizer() {
	//States
	let [state, setState] = useState([]);
	let [numOfElem, setNumOfElem] = useState(DEFAULT_VALUE);
	let [width, setNumOfWidth] = useState(10);
	let [marginLeft, setMarginLeft] = useState((-numOfElem * (width + 1)) / 2);
	let [speed, setSpeed] = useState(DEFAULT_SPEED);

	//Generate array when page is initialized
	useEffect(generate, []);

	//Generater random array from 0 to numOfElem
	function generate() {
		let arr = [];
		for (let i = 0; i < numOfElem; i++) {
			arr.push(randomInt(5, 555));
		}
		console.log("ARRAY BEFORE: " + arr);
		setState(arr);
	}

	function generateWithoutDuplicate() {
		let arr = [];
		for (let i = 0; i < numOfElem; i++) {
			arr.push(i);
		}
		shuffleArray(arr);
		setState(arr);
	}

	function getArrayBars() {
		return document.getElementsByClassName("array-num");
	}

	function setColorAtIndex(index, color = "#FF6363") {
		const arrayBars = getArrayBars();
		arrayBars[index].style.backgroundColor = color;
	}

	function handleSort(array) {
		let tempArr = [...array];
		setState(tempArr);
	}

	function sleep(ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}
	async function handleInsertionSort(i, j, key) {
		return sleep(speed).then(() => {
			setColorAtIndex(i);
			setColorAtIndex(j, GREEN);
            setColorAtIndex(key,"#b4e9fa");
			return sleep(speed)
				.then(() => {
					setColorAtIndex(j, PURPLE);
					setColorAtIndex(i, GREEN);
				})
				.then(() => {
					setColorAtIndex(i, PURPLE);
				});
		});
	}

	function handleBubbleSort() {}

	function handleSelectionSort() {}

	function calculateWidth(event) {
		let input = event.target.value;
		console.log(input);
		const w = window.innerWidth;
		let barWidth = (0.85 * w) / input - 1;
		setNumOfElem(input);
		setNumOfWidth(barWidth);
		generate();
		setMarginLeft((-numOfElem * (barWidth + 1)) / 2);
	}

	function calculateSpeed(event) {
		let input = event.target.value;
		setSpeed(input);
	}

	async function handleComparisionAnimation(index1, index2) {
		const arrayBars = getArrayBars();
		setColorAtIndex(index1);
		setColorAtIndex(index2);
		await new Promise((r) =>
			setTimeout(() => {
				setColorAtIndex(index1, "#b0b1fc");
				setColorAtIndex(index2, "#b0b1fc");
				r();
			}, speed)
		);
		console.log("run " + index1 + " and " + index2);
	}

	async function handleSingleAnimation(index, color = "#BAFFB4") {
		const arrayBars = document.getElementsByClassName("array-num");
		arrayBars[index].style.backgroundColor = color;
		await new Promise((r) =>
			setTimeout(() => {
				arrayBars[index].style.backgroundColor = "#b0b1fc";
				r();
			}, speed)
		);
	}

	return (
		<div>
			<Nav
				calculateWidth={calculateWidth}
				inputValue={numOfElem}
				calculateSpeed={calculateSpeed}
				speed={speed}
				generate={generate}
				generateWithoutDuplicate={generateWithoutDuplicate}
			/>
			<div className="array-container" style={{ marginLeft: marginLeft }}>
				{state.map((value, index) => {
					return (
						<div
							className="array-num"
							key={index}
							style={{
								height: `${value}px`,
								width: `${width}px`,
							}}
						></div>
					);
				})}
			</div>
			<div className="footer">
				<div className="sortingAlgo">
					<MergeSort
						handleMergeSort={handleSort}
						handleSingleAnimation={handleSingleAnimation}
						handleComparisionAnimation={handleComparisionAnimation}
						unsortedArray={state}
					/>
					<InsertionSort
						setColorAtIndex={setColorAtIndex}
						handleInsertionSort={handleInsertionSort}
						unsortedArray={state}
						handleSort={handleSort}
					/>

					<a
						className="bubbleSort sort"
						onClick={handleBubbleSort}
						href
					>
						Bubble Sort
					</a>
					<a
						className="selectionSort sort"
						onClick={handleSelectionSort}
						href
					>
						Selection Sort
					</a>
				</div>
			</div>
		</div>
	);
}

export default Visualizer;
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
//Compare 2 arrays
// function areEqual(arr1, arr2){
//     for(let i = 0; i<arr1.length; i++){
//         if(arr1[i]!==arr2[i]){
//             return false;
//         }
//     }
//     return(true);
// }

//Test sorting algorithm with javascript sort
// function testMergeSort() {
//     for(let i = 0; i<100; i++){
//         let arr = [];
//         const length = 100;
//         for(let j = 0; j<length; j++){
//             arr.push(randomInt(-1000,1000));
//         }
//         const javascriptSort = arr.sort(function(a, b){return a-b});
//         const mySort = mergeSort(arr,0,length-1);
//         console.log(areEqual(javascriptSort,mySort));
//     }
// }
