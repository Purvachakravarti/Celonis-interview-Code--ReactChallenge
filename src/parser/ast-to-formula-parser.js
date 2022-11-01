const getNotation = {
        "DIVISION" : '/',
        "MULTIPLICATION" : '*',
        "SUBTRACTION" : '-',
        "ADDITION" : '+',
        "PERCENT" : '%',
}
const getNotationForNames = {
    "SQR" : "^2",
    "CUBE": "^3",
    "SQRT" :"#"
}
let prefixStack = []; 
export default function AstToFormula(data) {
    Object.keys(data).map(function(key){
        if(key === 'type')
        {
            //console.log("inside if loop of key:type")
            Object.entries(getNotation).map(([k, v]) =>{
                    if(k === data[key]) 
                    {
                        //console.log("checking: ", k,"--", data[key])
                        prefixStack.push(v)
                    }
                    
                })  
            
        } 
        if(key === "name")
            if(data[key].charAt(0) === '$') 
            prefixStack.push(data[key].substring(1))
            else
            {
                Object.entries(getNotationForNames).map(([k, v]) =>{
                    if(k === data[key]) 
                    prefixStack.push(v)
                 })
            }
                
            
        if(key === "value" )
        {
            //console.log("inside if loop of key:value ", data[key])
             prefixStack.push(data[key])
            
        }
        if(key === "arguments")
        {
            //console.log("inside if loop of key: Arguments ", data[key])
            let dataLength = data[key].length;
            //console.log("inside if loop of key: Arguments ", dataLength)
            for(let i=0; i<=dataLength-1; i++){
                //console.log("inside if loop of key: Arguments ", data[key][i])
                if(data[key][i])
                {
                   AstToFormula(data[key][i]) 
                }
            }
                
        }
       
        if(key === 'left' && typeof data[key] === 'object')
        {
            //console.log("inside if loop of key:left ", data[key])
            if((data[key].type)){
                AstToFormula(data[key])}
            if(data[key].expression)
                AstToFormula(data[key].expression)
            if(data[key].arguments)
                AstToFormula(data[key].arguments)                               
        }
        if(key === 'right' && typeof data[key] === 'object')
        {
            //console.log("inside if loop of key:right ", data[key])
            if((data[key].type))
                AstToFormula(data[key])
            if(data[key].expression)
                AstToFormula(data[key].expression)
            if(data[key].arguments)
                AstToFormula(data[key].arguments)
                                        
        }
       
    })
    console.log(prefixStack.join(""))

    let finalValue = convert(prefixStack.join(""))
    return finalValue;
 }
 function isOperator(x)
 {
     switch(x)
     {
         case '+':
         case '-':
         case '*':
         case '/':
         case '^':
         case '%':
         case "#":
             return true;
     }
     return false;
 }
 // Convert prefix to Infix expression
 function convert(str)
 {
     let stack = [];
     let l = str.length;
     for(let i = l - 1; i >= 0; i--)
     {
         let symbol = str[i], op1, op2, temp;
         if (isOperator(symbol))
         {
            op1 = stack[stack.length - 1];
            stack.pop()
             if(symbol == "#"){
                temp = "sqrt" +"("+op1+")" ;
             }
             else
             {
                op2 = stack[stack.length - 1];
                stack.pop()
                temp = "(" + op1 + symbol + op2 + ")";
             }
            stack.push(temp);
            console.log(stack)
         }
         else
         {
            stack.push(symbol + "");
         }
     }
     return stack[stack.length - 1];
 }
  