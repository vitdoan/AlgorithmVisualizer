import React, { useState, useEffect } from "react";
import "./Visualizer.css";
import MergeSort from "../algorithm/MergeSort";
import Nav from "./Nav";
import InsertionSort from "../algorithm/InsertionSort";
import BubbleSort from "../algorithm/BubbleSort";
import SelectionSort from "../algorithm/SelectionSort";
import QuickSort from "../algorithm/QuickSort";

const DEFAULT_SPEED = 5;
const DEFAULT_VALUE = 100;
const PURPLE = "#b0b1fc";
const RED = "#FF6363";
const GREEN = "#BAFFB4";
const BLUE = "#b4e9fa";

function Visualizer() {
	//States
	let [state, setState] = useState([]);
	let [numOfElem, setNumOfElem] = useState(DEFAULT_VALUE);
	let [width, setNumOfWidth] = useState(10);
	let [marginLeft, setMarginLeft] = useState((-numOfElem * (width + 1)) / 2);
	let [speed, setSpeed] = useState(DEFAULT_SPEED);
    let [comparision, setComparision] = useState(0);

	//Generate array when page is initialized
	useEffect(generate, []);
	//Generater random array from 0 to numOfElem
	function generate() {
		let arr = [];
        setComparision(0);
		for (let i = 0; i < numOfElem; i++) {
			arr.push(randomInt(5, 555));
		}
		console.log("ARRAY BEFORE: " + arr);
		setState(arr);
	}

	function generateWithoutDuplicate() {
        setComparision(0);
		let arr = [];
        let count = 0;
        if(numOfElem <= 20){
            for (let i = 30; count < numOfElem; i+=30) {
                count++;
                arr.push(i);
            }
        }
        else if(numOfElem <= 50){
            for (let i = 10; count < numOfElem; i+=10) {
                count++;
                arr.push(i);
            }
        }
        else if(numOfElem <= 80){
            for (let i = 7; count < numOfElem; i+=7) {
                count++;
                arr.push(i);
            }
        }
        else if(numOfElem<=110){
            for (let i = 5; count < numOfElem; i+=5) {
                count++;
                arr.push(i);
            }
        }
        else if(numOfElem<=180){
            for (let i = 3; count < numOfElem; i+=3) {
                count++;
                arr.push(i);
            }
        }
        else{
            for (let i = 2; count < numOfElem; i+=2) {
                count++;
                arr.push(i);
            }
        }
		shuffleArray(arr);
		setState(arr);
	}

	function getArrayBars() {
		return document.getElementsByClassName("array-num");
	}

	function setColorAtIndex(index, color = RED) {
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
		return sleep(speed/2).then(() => {
			setColorAtIndex(i);
			setColorAtIndex(j, GREEN);
			setColorAtIndex(key, BLUE);
			return sleep(speed/2)
				.then(() => {
					setColorAtIndex(j, PURPLE);
					setColorAtIndex(i, GREEN);
				})
				.then(() => {
					setColorAtIndex(i, PURPLE);
				});
		});
	}

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

    function handleNumOfComparision(){
        setComparision(++comparision);
    }

	async function handleComparisionAnimation(index1, index2) {
		setColorAtIndex(index1);
		setColorAtIndex(index2);
		await new Promise((r) =>
			setTimeout(() => {
				setColorAtIndex(index1, PURPLE);
				setColorAtIndex(index2, PURPLE);
				r();
			}, speed/2)
		);
	}

	async function handleSingleAnimation(index, color = GREEN) {
        setColorAtIndex(index,color);
		await new Promise((r) =>
			setTimeout(() => {
                setColorAtIndex(index,PURPLE)
				r();
			}, speed/2)
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
                <div className="numOfComparision">Number of comparisions: {comparision}</div>
				<div className="sortingAlgo">
					<MergeSort
                        handleNumOfComparision={handleNumOfComparision}
						handleMergeSort={handleSort}
						handleSingleAnimation={handleSingleAnimation}
						handleComparisionAnimation={handleComparisionAnimation}
						unsortedArray={state}
					/>
					<InsertionSort
                        handleNumOfComparision={handleNumOfComparision}
						setColorAtIndex={setColorAtIndex}
						handleInsertionSort={handleInsertionSort}
						unsortedArray={state}
						handleSort={handleSort}
					/>
                    <BubbleSort
                        handleNumOfComparision={handleNumOfComparision}
                        handleSort={handleSort}
                        handleComparisionAnimation={handleComparisionAnimation}
						unsortedArray={state}
						setColorAtIndex={setColorAtIndex}
                        handleSingleAnimation={handleSingleAnimation}
                    />
					<SelectionSort
                        handleNumOfComparision={handleNumOfComparision}
                        handleSort={handleSort}
                        handleComparisionAnimation={handleComparisionAnimation}
						unsortedArray={state}
						setColorAtIndex={setColorAtIndex}
                        handleSingleAnimation={handleSingleAnimation}
                    />
                    <QuickSort
                        handleNumOfComparision={handleNumOfComparision}
                        handleSort={handleSort}
						unsortedArray={state}
                        handleQuickSort={handleInsertionSort}
                    />
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
