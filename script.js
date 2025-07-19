const screen=document.querySelector(".screen");
const buttons=document.querySelectorAll(".btn");
let expression="";
let display="";

buttons.forEach(btn =>{
    btn.addEventListener("click",()=>{
        const value=btn.getAttribute("data-value");

        if(value==="C"){
            expression="";
            display="";
            screen.value="";
        }
        else if(value==="="){
            try{
                const rawresult=eval(expression);
                const formatted=Number(rawresult).toLocaleString("en-US");
                expression=rawresult.toString();
                display=formatted;
                screen.value=formatted;
            }
            catch(error){
                screen.value="Error";
                expression="";
                display="";
            }
        }
        else if(value==="x"){
            expression=expression.slice(0,-1);
            display=display.slice(0,-1);
            screen.value=display;
        }
        else if(value==="."){
            const part=expression.split(/[\+\-\*\/]/);
            const lastPart=part[part.length-1];

            if(!lastPart.includes(".")) {
                expression+=value;
                display+=value;
                screen.value=display;
            }
        }
        else{
            const operators=["+","-","*","/","%"];
            const lastChar=expression[expression.length-1];

            if(operators.includes(value)){
                if(expression===""&&(value=== "+" || value === "*" || value === "/" || value==="%")){
                    return;
                }
                if(operators.includes(lastChar)){
                    if(value==="-"&& (lastChar==="*" || lastChar === "/" || lastChar === "+")){
                        expression+=value;
            display+=value;
            screen.value=display;
            return;
                    }
                    return;
                }
             if(value==="%"){
            expression+="/100*";
            display+="%";
            screen.value=display;
            return;
                }
            }
            expression+=value;
            display+=value;
            screen.value=display;
        }
    });
});