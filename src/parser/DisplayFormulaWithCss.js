const myComponentStyle = {
    background: 'lightblue',
    padding: '1.5em',
 }
export default function DisplayFomulaWithCSS(props){
    const formula = props.data;
    const colors = ["#EF5350","#8BC34A","#69F0AE","#FFC107","#FFD600","#4E342E","#F44336","#E91E63","#9C27B0","#F50057"];
    // colors[Math.floor(Math.random() * colors.length)]
    let arr=[],c;

    for(let i=0; i<formula.length; i++){
      if(formula[i] == "(" || formula[i] == ")")
        arr.push(i);
    }
    let sub = ""
    for(let p=0; p<arr.length/2; p++){
        for(let q=arr.length-1; q>p; q--){
                sub += formula.substr(arr[p], arr[q]);
                p++;

        }
    }

   return sub;
}