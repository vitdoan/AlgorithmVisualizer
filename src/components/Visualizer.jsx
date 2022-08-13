import React, { useState, useEffect, useRef } from "react";
import './Visualizer.css';
import MergeSort from "./MergeSort";

function Visualizer(){
    //States
    let [state,setState] = useState([]);
    let [numOfElem,setNumOfElem] = useState(50);
    let [width,setNumOfWidth] = useState(15);

    //Calculate marginLeft for centering
    const marginLeft = -numOfElem*(width+1)/2;

    //Generate array when page is initialized
    useEffect(generate,[]);

    //Generater random array from 0 to numOfElem
    function generate(){
        let arr = [];
        for(let i = 0; i < numOfElem; i++){
            arr.push(randomInt(5,305))
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
        }, 40));
        console.log("run "+index1+" and "+index2);
    }

    return <div>
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
            <MergeSort handleMergeSort={handleMergeSort} handleComparisionAnimation={handleComparisionAnimation} unsortedArray={state}/>
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
function areEqual(arr1, arr2){
    for(let i = 0; i<arr1.length; i++){
        if(arr1[i]!==arr2[i]){
            return false;
        }
    }
    return(true);
}

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