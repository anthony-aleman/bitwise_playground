import './ToggleBits.css';
type ToggleBitsProps = {
    bits: number[];
    setBits: (newBits: number[]) => void;
    setDec: (newDec: number) => void;
    label: string;
};

export default function ToggleBits({bits, setBits, setDec, label }: ToggleBitsProps){
    
    function handleToggle(i: number){
        const updatedBit = [...bits];
        updatedBit[i] = bits[i] === 1 ? 0 : 1;
        setBits(updatedBit);
        setDec(parseInt(updatedBit.join(''),2));
    }
    
    
    return (
        <>
            <div className="toggle-bits-container">
    <label className="bit-label" htmlFor='toggle-bits-container'>{label}</label>
    <div className="bit-buttons">
      {bits.map((bit: string | number, index: number) => (
        <button
            className={`bit-button ${bit ? "on" : "off"}`}
            key={index}
            onClick={() => handleToggle(index)}
            style={{ margin: '4px', width: '32px', fontSize: '18px'}}>
                {bit}
            </button>
      ))}
    </div>
    </div>
        </>
    )
}