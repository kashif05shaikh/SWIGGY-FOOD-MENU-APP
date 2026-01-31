// const heading=React.createElement(
//     "h1",
//     {id:"h1",abc:"xyz"},
//     "HELLO WORLD FROM REACT"    OBJECT
// );
// const root=ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);
const parent = React.createElement("div", {
    id: "parent"
}, [
    React.createElement("div", {
        id: "child1"
    }, [
        React.createElement("h1", {}, "I'M AN H1 TAG"),
        React.createElement("h2", {}, "I'M AN H2 TAG")
    ]),
    React.createElement("div", {
        id: "child2"
    }, [
        React.createElement("h1", {}, "I'M AN H1 TAG"),
        React.createElement("h2", {}, "I'M AN H2 TAG")
    ])
]);
console.log(parent); //object;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);

//# sourceMappingURL=NAMASTE REACT.7c0ccee6.js.map
