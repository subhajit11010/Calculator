
document.getElementById("input").addEventListener('keydown', checkInput);
function checkInput(e){
    const key = e.key;
    const validInputs = "1234567890+-*/%.";
    if(!(validInputs.includes(key) || key === "Backspace" || key === "Delete")){
        e.preventDefault();
        displayWarning("Invalid Input!!");
    }
}
function displayWarning(msg){
    document.getElementById("warning").innerHTML = msg;
    setTimeout(clearMsg, 2000);
}
function clearMsg(){
    document.getElementById("warning").innerHTML = "";
}
var lhVal = 0, rhVal = 0;
var calculatedVal, finalVal = "";
const buttonVals = "+-/*"
var prevButtonVal;
var input = document.getElementById("input");
input.addEventListener("input", () => {
    console.log('Current scrollLeft:', input.scrollLeft);
    console.log('Current scrollWidth:', input.scrollWidth);
    input.scrollLeft = input.scrollWidth;
    console.log('Updated scrollLeft:', input.scrollLeft);
});

const buttons = document.getElementsByClassName("button");
for(let i = 0; i < buttons.length; i++){

    buttons[i].addEventListener("click", () => {
        input.scrollLeft = input.scrollWidth;
        console.log('Updated scrollLeft:', input.scrollLeft);
        if(buttons[i].textContent !== undefined){
            
            var buttonVal = buttons[i].value;
            
            // console.log(buttonVal);
            if(!(buttonVal === "DEL" || buttonVal === "CALC" || buttonVal === "AC")){
                
                if(buttonVals.includes(buttonVal) || buttonVal === "%"){
                    if(prevButtonVal !== buttonVal){
                        document.getElementById("input").value += buttonVal;
                        finalVal += buttonVal;
                    }
                }
                else{
                    document.getElementById("input").value += buttonVal;
                    finalVal += buttonVal;
                }
            }
            else{
                if(buttonVal === "DEL"){
                    //vbgru
                    finalVal = finalVal.slice(0,-1);
                    document.getElementById("input").value = finalVal;
                }
                else if(buttonVal === "AC"){
                    //inibc
                    finalVal = "";
                    document.getElementById("input").value = "";
                }
                else{
                    if(finalVal[0] === "/" || finalVal[0] === "*" || finalVal[0] === "%"){
                        displayWarning("Error!");
                    }
                    else{
                        if(buttonVals.includes(prevButtonVal) || prevButtonVal === "."){
                            displayWarning("Error!");
                        }
                        else{
                            finalVal = finalVal.split('');
                            // console.log(finalVal);
                            calculatedVal = calculateVal(finalVal);
                            if(calculatedVal === "Error!"){
                                finalVal = finalVal.join('');
                                // finalVal = finalVal;
                                displayWarning("Error!");
                            }
                            else {
                                document.getElementById("input").value = calculatedVal;
                                finalVal = calculatedVal;
                            }
                            // console.log(calculatedVal);
                            // document.getElementById("input").value = calculatedVal;
                            // calculatedVal = submittedVal;
                            
                        }
                    }
                }
            }
            if((buttonVals.includes(prevButtonVal) || prevButtonVal === "." || prevButtonVal === "0") && buttonVal === "CALC"){
                prevButtonVal = prevButtonVal;
            }
            else prevButtonVal = buttonVal;
           
        }
        input.scrollLeft = input.scrollWidth;
    });
}

function calculateVal(submittedVal){
    if(submittedVal.includes("%")){
        var index = submittedVal.indexOf("%");
        submittedVal = checkIndexAndCalc(submittedVal, index);
        if(submittedVal === "Error!"){
            return submittedVal;
        }
        else calculateVal(submittedVal);
    }
    else{
        if(submittedVal.includes("*") && submittedVal.includes("/")){
            if(submittedVal.indexOf("*") < submittedVal.indexOf("/")){
                var index = submittedVal.indexOf("*");
                submittedVal = checkIndexAndCalc(submittedVal, index);
                if(submittedVal === "Error!"){
                    return submittedVal;
                }
                else calculateVal(submittedVal);
            }
            else{
                var index = submittedVal.indexOf("/");
                submittedVal = checkIndexAndCalc(submittedVal, index);
                if(submittedVal === "Error!"){
                    return submittedVal;
                }
                else calculateVal(submittedVal);
            }
        }
        else if(submittedVal.includes("*")){
            var index = submittedVal.indexOf("*");
            submittedVal = checkIndexAndCalc(submittedVal, index);
            if(submittedVal === "Error!"){
                return submittedVal;
            }
            else calculateVal(submittedVal);
        }
        else if(submittedVal.includes("/")){
            var index = submittedVal.indexOf("/");
            submittedVal = checkIndexAndCalc(submittedVal, index);    
            if(submittedVal === "Error!"){
                return submittedVal;
            }
            else calculateVal(submittedVal);
        }
        else{
            if(submittedVal.includes("+") && submittedVal.includes("-")){
                if(submittedVal.indexOf("+") < submittedVal.indexOf("-")){
                    var index = submittedVal.indexOf("+");
                    submittedVal = checkIndexAndCalc(submittedVal, index);
                    calculateVal(submittedVal);
                }
                else{
                    var index = submittedVal.indexOf("-");
                    submittedVal = checkIndexAndCalc(submittedVal, index);
                    calculateVal(submittedVal);
                }
            }
            else if(submittedVal.includes("+")){
                var index = submittedVal.indexOf("+");
                // console.log(index);
                submittedVal = checkIndexAndCalc(submittedVal, index);
                console.log(submittedVal);
                calculateVal(submittedVal);
            }
            else if(submittedVal.includes("-")){
                var index = submittedVal.indexOf("-");
                console.log(submittedVal);
                submittedVal = checkIndexAndCalc(submittedVal, index);
                console.log(submittedVal,index);
                calculateVal(submittedVal);
            }
        }
    }
    
    submittedVal = submittedVal.join('');
    return submittedVal;
}

function checkIndexAndCalc(submittedVal, index){
    const length = submittedVal.length;
    var status = true;
    for(let i = 0; i < length; i++){
        if(buttonVals.includes(submittedVal[i]) || submittedVal[i] === "%"){
            // const s = submittedVal[i];
            for (j in buttonVals){
                if(buttonVals[j] === submittedVal[i-1]){
                    status = false;
                }
            }
        }
    }
    // console.log(submittedVal);
    var lIndex, rIndex;
    var lhVal, rhVal, calcVal;
    const operator = submittedVal[index];
    if(status){
        for(let i = index-1; i >= 0; i--){
            if(submittedVal[i] === "+" || submittedVal[i] === "-" || submittedVal[i] === "*" || submittedVal[i] === "/" || submittedVal[i] === "%"){
                lIndex = i;
                break;
            }
        }
        if(lIndex === undefined){
            lIndex = 0;
        }
        for(let i = index+1; i < length; i++){
            if(submittedVal[i] === "+" || submittedVal[i] === "-" || submittedVal[i] === "*" || submittedVal[i] === "/" || submittedVal[i] === "%"){
                // if()
                rIndex = i;
                break;
            }
        }
        if(rIndex === undefined){
            rIndex = length-1;
        }
        if(lIndex === 0 && rIndex === length-1){
            lhVal = Number((submittedVal.slice(lIndex, index)).join(''));
            rhVal = Number((submittedVal.slice(index+1, rIndex+1)).join(''));
        }
        else if(lIndex === 0){
            lhVal = Number((submittedVal.slice(lIndex, index)).join(''));
            rhVal = Number((submittedVal.slice(index+1, rIndex)).join(''));
        }
        else if(rIndex === length-1){
            lhVal = Number((submittedVal.slice(lIndex+1, index)).join(''));
            rhVal = Number((submittedVal.slice(index+1, rIndex+1)).join(''));
        }
        else{
            lhVal = Number((submittedVal.slice(lIndex+1, index)).join(''));
            rhVal = Number((submittedVal.slice(index+1, rIndex)).join(''));
        }
        
        switch(operator){
            case "+": 
                calcVal = String(lhVal + rhVal);
                break;
            case "-":
                calcVal = String(lhVal - rhVal);
                break;
            case "/":
                if(rhVal === 0){
                    return "Error!";
                }
                else calcVal = String(lhVal / rhVal);
                break;
            case "*":
                calcVal = String(lhVal * rhVal);
                break;
            case "%":
                calcVal = String(lhVal / 100);
        }
        console.log(lIndex, rIndex, lhVal, rhVal, calcVal);
        // console.log(submittedVal);
        if(lIndex === 0){
            submittedVal[lIndex] = calcVal;
        }
        else submittedVal[lIndex+1] = calcVal;
        console.log(submittedVal);
        var delCount;
        if(operator === "%"){
            if(lIndex === 0){
                delCount = index - lIndex;
                submittedVal.splice(lIndex+1, delCount);
            }
            else{
                delCount = index - lIndex - 1;
                submittedVal.splice(lIndex+2, delCount);
            }
        }
        else{
            if(lIndex === 0 && rIndex === length-1){
                delCount = rIndex - lIndex;
                submittedVal.splice(lIndex+1, delCount);
            }
            else if(lIndex === 0){
                delCount = rIndex - lIndex - 1;
                submittedVal.splice(lIndex+1, delCount);
            }
            else if(rIndex === length-1){
                delCount = rIndex - lIndex - 1;
                submittedVal.splice(lIndex+2, delCount);
            }
            else {
                delCount = rIndex - lIndex + 2;
                submittedVal.splice(lIndex+2, delCount);
            }
        }
        
        console.log(submittedVal);
        return submittedVal;
    }
    else return "Error!";
    
}




// function getData(){

// }