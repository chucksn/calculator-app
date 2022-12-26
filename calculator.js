let innerCalculator = 0;
let innerTempMemory = [];
let result;
let arithmeticBtnsFirstClick = true; //Flag set to prevent arithmetic operators (+ - / *) from  giving results on multiple clicks
let equalBtnFirstClick = true; // Flag set for equal operator (=) increment on multiple clicks
let z; // Random variable that stores values to display when equal button is clicked
let previousArithmeticBtnClicked = "";
let equalBtnClicked = false;
let numericBtnsClicked = false;
let percentBtnClicked = false;
let percentBtnFirstClick = true;
let plusClicked = false;
let minusClicked = false;
let multiplyClicked = false;
let divideClicked = false;
let negate = false; // +/-

const display = document.querySelector("#calc-display");
window.addEventListener("load", () => {
  display.innerText = 0;
});
let container = document.querySelector("#btn-container");
container.addEventListener("click", (e) => {
  let btnValue = e.target.innerText;

  // Numeric
  if (e.target.classList.contains("numeric")) {
    arithmeticBtnsFirstClick = true;
    equalBtnFirstClick = true;
    numericBtnsClicked = true;
    plusClicked = false;
    minusClicked = false;
    multiplyClicked = false;
    divideClicked = false;
    percentBtnFirstClick = true;
    if (equalBtnClicked && numericBtnsClicked) {
      innerTempMemory = [];
    }
  }

  if (result == undefined) {
    if (e.target.classList.contains("numeric")) {
      if (display.innerText == "0") {
        display.innerText = btnValue;
      } else if (display.innerText == "0.") {
        display.innerText += btnValue;
      } else if (display.innerText.length < 16) {
        display.innerText += btnValue;
      } else {
        display.innerText = display.innerText;
      }
    }
    if (e.target.classList.contains("dot")) {
      if (display.innerText.includes(".")) {
        display.innerText = display.innerText;
      } else if (display.innerText.length < 16) {
        display.innerText += btnValue;
      } else {
        display.innerText = display.innerText;
      }
    }
  } else {
    if (e.target.classList.contains("numeric")) {
      display.innerText = btnValue;
    }
    if (e.target.classList.contains("dot")) {
      display.innerText = "0.";
    }
    result = undefined;
  }

  if (e.target.classList.contains("back")) {
    let len = display.innerText.length;

    if (equalBtnClicked) {
      display.innerText = display.innerText;
    } else {
      display.innerText = display.innerText.slice(0, len - 1);
    }
    if (display.innerText == "") {
      display.innerText = 0;
    }
  }

  if (e.target.classList.contains("clear")) {
    display.innerText = 0;
    innerCalculator = 0;
    innerTempMemory = [];
  }

  // Operators
  if (e.target.classList.contains("plusMinus")) {
    if (display.innerText !== 0 && !negate) {
      display.innerText = Number(`-${display.innerText}`);
      negate = true;
    } else if (display.innerText !== 0 && negate) {
      display.innerText = 0 - Number(display.innerText);
      negate = false;
    }
  }
  if (e.target.classList.contains("%operator")) {
    if (percentBtnFirstClick) {
      result = 0;
      if (display.innerText == "0") {
        display.innerText = 0;
      } else {
        let percentCalc = Number(display.innerText) / 100;
        result = percentCalc;
        innerTempMemory.push(result);
        display.innerText = result;

        arithmeticBtnsFirstClick = true;
      }
    } else {
      display.innerText = display.innerText;
    }
    equalBtnFirstClick = true;
    percentBtnFirstClick = false;
    percentBtnClicked = true;
    // if block below prevents displayed result from exceeding display area
    if (display.innerText.length > 16) {
      display.innerText = Number(display.innerText).toExponential(4);
    } else {
      display.innerText = display.innerText;
    }
  }

  let id = e.target.getAttribute("id");
  if (e.target.classList.contains("operator")) {
    if (numericBtnsClicked && equalBtnClicked) {
      innerCalculator = 0;
      innerTempMemory = [];
      equalBtnClicked = false;
      arithmeticBtnsFirstClick = true;
    } else if (
      previousArithmeticBtnClicked == "plus" &&
      !equalBtnClicked &&
      !plusClicked
    ) {
      innerTempMemory.push(Number(display.innerText));
      innerCalculator += innerTempMemory[innerTempMemory.length - 1];
      display.innerText = innerCalculator;
      innerTempMemory = [];
      innerTempMemory.push(innerCalculator);
      arithmeticBtnsFirstClick = false;
      equalBtnFirstClick = true;
      result = 0;
    } else if (
      previousArithmeticBtnClicked == "minus" &&
      !equalBtnClicked &&
      !minusClicked
    ) {
      innerTempMemory.push(Number(display.innerText));
      innerCalculator -= innerTempMemory[innerTempMemory.length - 1];
      display.innerText = innerCalculator;
      innerTempMemory = [];
      innerTempMemory.push(innerCalculator);
      arithmeticBtnsFirstClick = false;
      equalBtnFirstClick = true;
      result = 0;
    } else if (
      previousArithmeticBtnClicked == "divide" &&
      !equalBtnClicked &&
      !divideClicked
    ) {
      innerTempMemory.push(Number(display.innerText));
      innerCalculator /= innerTempMemory[innerTempMemory.length - 1];
      display.innerText = innerCalculator;
      innerTempMemory = [];
      innerTempMemory.push(innerCalculator);
      arithmeticBtnsFirstClick = false;
      equalBtnFirstClick = true;
      result = 0;
    } else if (
      previousArithmeticBtnClicked == "multiply" &&
      !equalBtnClicked &&
      !multiplyClicked
    ) {
      innerTempMemory.push(Number(display.innerText));
      innerCalculator *= innerTempMemory[innerTempMemory.length - 1];
      display.innerText = innerCalculator;
      innerTempMemory = [];
      innerTempMemory.push(innerCalculator);
      arithmeticBtnsFirstClick = false;
      equalBtnFirstClick = true;
      result = 0;
    } else {
      result = 0;
    }

    if (id == "btnPlus") {
      if (arithmeticBtnsFirstClick) {
        result = 0;
        if (display.innerText == "0") {
          display.innerText = 0;
        } else {
          innerTempMemory.push(Number(display.innerText));

          innerCalculator += innerTempMemory[innerTempMemory.length - 1];
          result = innerCalculator;

          display.innerText = result;

          arithmeticBtnsFirstClick = false;
        }
      } else {
        display.innerText = display.innerText;
      }
      equalBtnFirstClick = true;
      previousArithmeticBtnClicked = "plus";
      plusClicked = true;
    }

    if (id == "btnMinus") {
      if (arithmeticBtnsFirstClick) {
        result = 0;
        if (display.innerText == "0") {
          display.innerText = 0;
        } else if (innerCalculator == 0) {
          innerTempMemory.push(Number(display.innerText));
          innerCalculator = innerTempMemory[innerTempMemory.length - 1];
        } else {
          innerTempMemory.push(Number(display.innerText));

          innerCalculator -= innerTempMemory[innerTempMemory.length - 1];
          result = innerCalculator;

          display.innerText = result;

          arithmeticBtnsFirstClick = false;
        }
      } else {
        display.innerText = display.innerText;
      }
      equalBtnFirstClick = true;
      minusClicked = true;
      previousArithmeticBtnClicked = "minus";
    }

    if (id == "btnMultiply") {
      if (innerCalculator == 0) {
        innerCalculator = 1;
      }
      if (arithmeticBtnsFirstClick) {
        result = 0;
        if (display.innerText == "0") {
          display.innerText = 0;
        } else {
          innerTempMemory.push(Number(display.innerText));

          innerCalculator *= innerTempMemory[innerTempMemory.length - 1];
          result = innerCalculator;
          result = Number(result.toFixed(5));

          display.innerText = result;

          arithmeticBtnsFirstClick = false;
        }
      } else {
        display.innerText = display.innerText;
      }
      equalBtnFirstClick = true;
      multiplyClicked = true;
      previousArithmeticBtnClicked = "multiply";
    }

    if (id == "btnDivision") {
      if (arithmeticBtnsFirstClick) {
        result = 0;
        if (display.innerText == "0") {
          display.innerText = 0;
        } else if (innerCalculator == 0) {
          innerTempMemory.push(Number(display.innerText));
          innerCalculator = innerTempMemory[innerTempMemory.length - 1];
        } else {
          innerTempMemory.push(Number(display.innerText));

          innerCalculator /= innerTempMemory[innerTempMemory.length - 1];
          result = innerCalculator;

          display.innerText = result;

          arithmeticBtnsFirstClick = false;
        }
      } else {
        display.innerText = display.innerText;
      }
      equalBtnFirstClick = true;
      divideClicked = true;
      previousArithmeticBtnClicked = "divide";
    }

    // if block below prevents displayed result from exceeding display area
    if (display.innerText.length > 16) {
      display.innerText = Number(display.innerText).toExponential(4);
    } else {
      display.innerText = display.innerText;
    }
  }

  if (e.target.classList.contains("=operator")) {
    equalBtnClicked = true;

    if (
      previousArithmeticBtnClicked == "plus" &&
      equalBtnClicked &&
      !percentBtnClicked
    ) {
      if (innerCalculator == 0) {
        display.innerText = display.innerText;

        arithmeticBtnsFirstClick = true;
      } else if (equalBtnFirstClick) {
        innerTempMemory.push(Number(display.innerText));

        z = innerCalculator += Number(display.innerText);
        result = z;
        result = Number(result.toFixed(5));
        display.innerText = result;
        result = 0;

        equalBtnFirstClick = false;
        arithmeticBtnsFirstClick = false;
      } else {
        z += innerTempMemory[innerTempMemory.length - 1];
        result = z;
        result = Number(result.toFixed(5));

        display.innerText = result;

        innerCalculator = result;

        arithmeticBtnsFirstClick = false;
      }
    } else if (
      previousArithmeticBtnClicked == "multiply" &&
      equalBtnClicked &&
      !percentBtnClicked
    ) {
      if (innerCalculator == 0) {
        display.innerText = display.innerText;

        arithmeticBtnsFirstClick = true;
      } else if (equalBtnFirstClick) {
        innerTempMemory.push(Number(display.innerText));

        z = innerCalculator *= Number(display.innerText);
        result = z;
        result = Number(result.toFixed(5));
        display.innerText = result;
        result = 0;

        equalBtnFirstClick = false;
        arithmeticBtnsFirstClick = false;
      } else {
        z *= innerTempMemory[innerTempMemory.length - 1];
        result = z;
        result = Number(result.toFixed(5));

        display.innerText = result;
        innerCalculator = result;

        arithmeticBtnsFirstClick = false;
      }
    } else if (
      previousArithmeticBtnClicked == "minus" &&
      equalBtnClicked &&
      !percentBtnClicked
    ) {
      if (innerCalculator == 0) {
        display.innerText = display.innerText;

        arithmeticBtnsFirstClick = true;
      } else if (equalBtnFirstClick) {
        innerTempMemory.push(Number(display.innerText));

        z = innerCalculator -= Number(display.innerText);
        result = z;
        result = Number(result.toFixed(5));
        display.innerText = result;

        result = 0;

        equalBtnFirstClick = false;
        arithmeticBtnsFirstClick = false;
      } else {
        z -= innerTempMemory[innerTempMemory.length - 1];
        result = z;
        result = Number(result.toFixed(5));

        display.innerText = result;

        innerCalculator = result;

        arithmeticBtnsFirstClick = false;
      }
    } else if (
      previousArithmeticBtnClicked == "divide" &&
      equalBtnClicked &&
      !percentBtnClicked
    ) {
      if (innerCalculator == 0) {
        display.innerText = display.innerText;

        arithmeticBtnsFirstClick = true;
      } else if (equalBtnFirstClick) {
        innerTempMemory.push(Number(display.innerText));

        z = innerCalculator /= Number(display.innerText);
        result = z;
        result = Number(result.toFixed(5));
        display.innerText = result;

        result = 0;
        equalBtnFirstClick = false;
        arithmeticBtnsFirstClick = false;
      } else {
        z /= innerTempMemory[innerTempMemory.length - 1];
        result = z;
        result = Number(result.toFixed(5));

        display.innerText = result;

        innerCalculator = result;

        arithmeticBtnsFirstClick = false;
      }
    } else if (
      previousArithmeticBtnClicked == "divide" &&
      equalBtnClicked &&
      percentBtnClicked
    ) {
      if (innerCalculator == 0) {
        display.innerText = display.innerText;

        arithmeticBtnsFirstClick = true;
      } else if (equalBtnFirstClick) {
        innerTempMemory.push(Number(display.innerText));

        z = innerCalculator /= Number(display.innerText);
        result = z;
        result = Number(result.toFixed(5));
        display.innerText = result;

        result = 0;

        equalBtnFirstClick = false;
        arithmeticBtnsFirstClick = false;
      } else {
        z /= innerTempMemory[innerTempMemory.length - 1];
        result = z;
        result = Number(result.toFixed(5));

        display.innerText = result;

        innerCalculator = result;

        arithmeticBtnsFirstClick = false;
      }
    } else if (
      previousArithmeticBtnClicked == "plus" &&
      equalBtnClicked &&
      percentBtnClicked
    ) {
      if (innerCalculator == 0) {
        display.innerText = display.innerText;

        arithmeticBtnsFirstClick = true;
      } else if (equalBtnFirstClick) {
        innerTempMemory.push(Number(display.innerText));

        z = innerCalculator += Number(display.innerText);
        result = z;
        result = Number(result.toFixed(5));
        display.innerText = result;

        result = 0;

        equalBtnFirstClick = false;
        arithmeticBtnsFirstClick = false;
      } else {
        z += innerTempMemory[innerTempMemory.length - 1];
        result = z;
        result = Number(result.toFixed(5));

        display.innerText = result;

        innerCalculator = result;

        arithmeticBtnsFirstClick = false;
      }
    } else if (
      previousArithmeticBtnClicked == "multiply" &&
      equalBtnClicked &&
      percentBtnClicked
    ) {
      if (innerCalculator == 0) {
        display.innerText = display.innerText;

        arithmeticBtnsFirstClick = true;
      } else if (equalBtnFirstClick) {
        innerTempMemory.push(Number(display.innerText));

        z = innerCalculator *= Number(display.innerText);
        result = z;
        result = Number(result.toFixed(5));
        display.innerText = result;

        result = 0;

        equalBtnFirstClick = false;
        arithmeticBtnsFirstClick = false;
      } else {
        z *= innerTempMemory[innerTempMemory.length - 1];
        result = z;
        result = Number(result.toFixed(5));

        display.innerText = result;

        innerCalculator = result;

        arithmeticBtnsFirstClick = false;
      }
    } else if (
      previousArithmeticBtnClicked == "minus" &&
      equalBtnClicked &&
      percentBtnClicked
    ) {
      if (innerCalculator == 0) {
        display.innerText = display.innerText;

        arithmeticBtnsFirstClick = true;
      } else if (equalBtnFirstClick) {
        innerTempMemory.push(Number(display.innerText));

        z = innerCalculator -= Number(display.innerText);
        result = z;
        result = Number(result.toFixed(5));
        display.innerText = result;

        result = 0;

        equalBtnFirstClick = false;
        arithmeticBtnsFirstClick = false;
      } else {
        z -= innerTempMemory[innerTempMemory.length - 1];
        result = z;
        result = Number(result.toFixed(5));

        display.innerText = result;

        innerCalculator = result;

        arithmeticBtnsFirstClick = false;
      }
    }

    // if block below prevents displayed result from exceeding display area
    if (display.innerText.length > 16) {
      display.innerText = Number(display.innerText).toExponential(4);
    } else {
      display.innerText = display.innerText;
    }
  }

  console.log(btnValue);
});
