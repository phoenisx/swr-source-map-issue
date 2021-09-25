import React from "react";
import ReactDOM from "react-dom";

function App() {
    return <h1>JSX is working!</h1>;
}

console.log("Working", process.env.TESTING);
console.log("Working", process.env.ENV);
console.log("Working", process.env.FOO);

ReactDOM.render(<App />, document.getElementById("root"));
