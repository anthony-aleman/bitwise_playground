import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToggleBits from './ToggleBits'

function App() {
  const [ABits, setABits] = useState<number[]>([0,0,0,0,0,0,0,0]);
  const [inputADec, setInputADec] = useState(0);
  
  const [BBits, setBBits] = useState<number[]>([0,0,0,0,0,0,0,0]);
  const [inputBDec, setInputBDec] = useState(0);

  const[bitwiseOperation, setBitwiseOperation] = useState('AND');
  const[output, setOutput] = useState(0);

  useEffect(() =>{
    BitwiseOutput();
  }, [inputADec, inputBDec, bitwiseOperation])

  function BitwiseOutput(){
    switch(bitwiseOperation){
      case "AND": setOutput((inputADec & inputBDec));break;
      case "OR": setOutput(inputADec | inputBDec);break;
      case "XOR": setOutput(inputADec ^ inputBDec);break;
     // case "<<": setOutput(inputADec << inputBDec) ;break;
     // case ">>": setOutput(inputADec >> inputBDec);break;
    }
  }

  function decimalToBits(value: number): any{
    return(value.toString(2).padStart(8, '0').split('').map(Number));
  }

  function HandleInputChange(value: number, setDec: Function, setBitsArr: React.Dispatch<React.SetStateAction<number[]>>){
    const clamped = Math.max(0, Math.min(255, value));
    setDec(clamped);
    setBitsArr(decimalToBits(clamped));
  }

  return (
    <>
    <div style={{
      display: 'flex',
      justifyContent: 'center',

    }}>
      <label htmlFor='inputA'>Input A</label>
      <input
      id='inputA'
      type='number'
      min='0'
      max='255'
      disabled={bitwiseOperation === "NOT"}
      value={inputADec}
      onChange={(e) =>
        HandleInputChange(parseInt(e.target.value || '0'), setInputADec, setABits)}
      style={{
        borderRadius: '5px',
        width: '15%',
        height: '50px',
        fontSize: '32px',
        textAlign: 'center',
        padding: '0.5rem 1rem',
        backgroundColor: '#2c2c2c',
        color: 'white',

      }}/>
        <select

          value={bitwiseOperation}
          onChange={(e) =>
            setBitwiseOperation(e.target.value)
            }
          style={{
            borderRadius: '5px',
            textAlign: 'center',
            height: '65px',
            margin: '0 15px',
            fontSize: '32px',
            color: 'white',
            padding: '0.5rem 1rem',
            backgroundColor: '#2c2c2c',
          }}
        >
          <option value={"AND"}>AND</option>
          <option value={"OR"}>OR</option>
          <option value={"XOR"}>XOR</option>
        </select>
      
      <label htmlFor='inputB'>Input B</label>
      <input
      id='inputB'
      type='number'
      min='0'
      max='255'
      value={inputBDec}
      onChange={(e) =>
        HandleInputChange(parseInt(e.target.value || '0'), setInputBDec, setBBits)}
      style={{
        borderRadius: '5px',
        width: '15%',
        height: '50px',
        fontSize: '32px',
        textAlign: 'center',
        padding: '0.5rem 1rem',
        backgroundColor: '#2c2c2c',
        color: 'white',
      }}/>
    </div>

   

    <ToggleBits 
      bits={ABits}
      setBits={setABits}
      setDec={setInputADec}
      label='Input A Bits'
      />

    <ToggleBits
      bits={BBits}
      setBits={setBBits}
      setDec={setInputBDec}
      label='Input B Bits'
      />


    <output className='bit-output'>
      <code>Bits:{decimalToBits(output).join('').replace(/(.{4})/g, '$1 ')}</code>
      <code>Decimal: {output}</code>
    </output>
    
    </>
  )
}

export default App
