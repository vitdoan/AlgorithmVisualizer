import React, { useState, useEffect } from "react";
import './Visualizer.css';
import MergeSort from "../algorithm/MergeSort";
import Nav from "./Nav";

const MIN_LENGTH = 11;
const MAX_LENGTH = 555;
const DEFAULT_SPEED = 5;
const DEFAULT_VALUE = 100;

function Visualizer(){
    //States
    let [state,setState] = useState([]);
    let [numOfElem,setNumOfElem] = useState(DEFAULT_VALUE);
    let [width,setNumOfWidth] = useState(10);
    let [marginLeft,setMarginLeft] = useState(-numOfElem*(width+1)/2);
    let [speed, setSpeed] = useState(DEFAULT_SPEED);

    //Calculate marginLeft for centering

    //Generate array when page is initialized
    useEffect(generate,[]);

    //Generater random array from 0 to numOfElem
    function generate(){
        let arr = [];
        for(let i = 0; i < numOfElem; i++){
            arr.push(randomInt(5,555))
        }
        console.log("ARRAY BEFORE: "+arr)
        setState(arr);
    }
    
    function handleMergeSort(array){
        console.log("runHandleMErge");
        let tempArr = [...array];
        setState(tempArr);
    }

    function handleInsertionSort(){

    }

    function handleBubbleSort(){

    }

    function handleSelectionSort(){
        
    }

    async function handleComparisionAnimation(index1,index2){
        const arrayBars = document.getElementsByClassName("array-num");
        arrayBars[index1].style.backgroundColor = "#FF6363";
        arrayBars[index2].style.backgroundColor = "#FF6363";
        await new Promise(r => setTimeout(()=>{
            arrayBars[index1].style.backgroundColor = "#b0b1fc";
            arrayBars[index2].style.backgroundColor = "#b0b1fc";
            r();
        }, speed));
        console.log("run "+index1+" and "+index2);
    }

    async function handleSingleAnimation(index){
        const arrayBars = document.getElementsByClassName("array-num");
        arrayBars[index].style.backgroundColor = "#BAFFB4";
        await new Promise(r => setTimeout(()=>{
            arrayBars[index].style.backgroundColor = "#b0b1fc";
            r();
        }, speed));
    }

    function calculateWidth(event){
        let input = event.target.value;
        console.log(input);
        const w = window.innerWidth;
        let barWidth = (0.85*w/input)-1;
        setNumOfElem(input);
        setNumOfWidth(barWidth);
        generate();
        setMarginLeft(-numOfElem*(barWidth+1)/2);
    }

    function calculateSpeed(event){
        let input = event.target.value;
        setSpeed(input);
    }


    return <div>
    <Nav calculateWidth={calculateWidth} inputValue={numOfElem} calculateSpeed={calculateSpeed} speed={speed}/>
    <div className="array-container" style={{marginLeft:marginLeft}}>
        {state.map((value,index)=>{
            return <div 
            className="array-num" 
            key={index}
            style={{height:`${value}px`,width:`${width}px`}}
            ></div>
        })}
    </div>
    <div className="footer">
        <a className="generate sort" onClick={generate} href>Generate new array</a>
        <div className="sortingAlgo">
            <MergeSort handleMergeSort={handleMergeSort} handleSingleAnimation={handleSingleAnimation} handleComparisionAnimation={handleComparisionAnimation} unsortedArray={state}/>
            {/* <a className="mergeSort" onClick={runMergeSort} href>Merge Sort</a> */}
            <a className="insertionSort sort" onClick={handleInsertionSort} href>Insertion Sort</a>
            <a className="bubbleSort sort" onClick={handleBubbleSort} href>Bubble Sort</a>
            <a className="selectionSort sort" onClick={handleSelectionSort} href>Selection Sort</a>
        </div>
    </div>
    </div>
}


export default Visualizer;
function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
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