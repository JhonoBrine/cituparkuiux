import { useEffect, useRef, useState } from "react"

export default function TheRef(){
    const theH1 = useRef();
    const perVar = useRef(0);
    const [dummy, setDummy] = useState(100);

    useEffect(()=>{
        perVar.current = dummy;
    },[dummy])

    return (
        <div style={{
            margin: '0 auto',
            border: 'solid 1px #222',
            width: '50%'
        }}>
            <h1 ref={theH1}>Hey</h1>
            <button onClick={()=>{
               theH1.current.innerText = "Hey There!";
            }}>There</button>
            <button onClick={()=>{
               theH1.current.innerText = "Hey You!";
            }}>You</button>
            <button onClick={()=>{
               theH1.current.innerText = "Himi!";
            }}>Me</button>
            
            <h2>{perVar.current}</h2>
            <button onClick={()=>{
                perVar.current = perVar.current + 1;
            }}>Change It</button><br/>
            <h2>{dummy}</h2>
            <button onClick={()=>{
                setDummy(Math.ceil(Math.random()*100))
            }}>Changing State</button>
        </div>
    )
}