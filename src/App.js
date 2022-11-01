import { useState } from 'react';
import './App.css';
import * as Parser from './parser/formula-parser.js';
import jsonFile from './myFormulaJson.json'
import AstToFormula from './parser/ast-to-formula-parser.js'
import DisplayFomulaWithCSS from './parser/DisplayFormulaWithCss.js'

const parse = Parser.parse;


function App() {
  let [formula, formulaChange] = useState('($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)');
  let [syntaxTree, syntaxTreeChange] = useState('');
  let [syntaxTreeJson, syntaxTreeJsonChange] = useState(null);
  let [visualizerOutput, visualizerChange] = useState('');
  // let [visualizerOutputWithCss, visualizerUIChange] = useState('');


  const updateAst = () => {
    console.log('creating ast view...');
    const newSyntaxTree = parse(formula);
    syntaxTreeChange(newSyntaxTree);
    console.log('The ast is: ', syntaxTree);
    syntaxTreeJsonChange(JSON.stringify(newSyntaxTree, null, 2));
  };

  const convertAstToFormula = () => {     
    console.log('converting ast to string...');
    const formulaObtained = AstToFormula(JSON.parse(JSON.stringify(jsonFile)));
    visualizerChange(formulaObtained); 
 };


 const styles = {
  padding: '10px',
  border: '1px solid blue', 
};

  return (
    <div className='formulizer'>
      <h1>Welcome to the formulizer!</h1>
      <h3>Input formula</h3>
      <p>
        <textarea 
          cols={100} 
          rows={8} 
          value={formula} 
          onChange={(event) => formulaChange(event.target.value)}/> <br/>
      </p>
      <p><button onClick={updateAst}>Parse and update AST View</button></p>

      <h3>Syntax tree</h3>
      <pre style={{maxHheight: '300px', overflowy: 'auto',backgroundColor: '#eeeeee'}}>{syntaxTreeJson}</pre>
      <p><button onClick={convertAstToFormula}>Convert AST to Formula</button></p>

      <h3>Visualizer-to-Formula</h3>
      <p>{visualizerOutput}</p>

      <p style={styles}><DisplayFomulaWithCSS data={visualizerOutput} /></p>
    </div>
  );{}
}

export default App;
