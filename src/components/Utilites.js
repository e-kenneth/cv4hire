const changeToSentenceCase = function (input) {
    return input.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

// Arrow function

// const doubleNumber = (input) => input * 2;

// const doubleNumber = (input) => {
//     return input * 2;
// }

// const doubleNumber = function (input) {
//     return input * 2;
// }

// function doubleNumber(input) {
//     return input * 2;
// }

export { changeToSentenceCase };