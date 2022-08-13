import React from "react";

function Nav({calculateWidth, inputValue, calculateSpeed, speed}){
    return <nav className="navBar">
    <div>
        <input onChange={calculateWidth} value={inputValue} type="range" className="inputRange" name="inputRange" min="12" max="222"></input>
        <label className="inputLabel" for="inputLabel">Array Length: {inputValue}</label>
    </div>
    <div>
        <input data-rangeslider onChange={calculateSpeed} type="range" className="speedRange" name="speedRange" min="0" max="400"></input>
        <label className="speedLabel" for="speedLabel">Speed: {speed} ms</label>
    </div>
    </nav>
}
export default Nav;