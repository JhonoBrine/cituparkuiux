import { createContext, useContext, useState } from "react"

let context = createContext()

export default function TheContext(){

    const [data,setData] = useState("Pugong!")
    return (
        <context.Provider value={{data}}>
            <MamaNiInputNi/>
            <SaSilingan/>
            <button onClick={()=>{
                if(Math.ceil(Math.random() * 10) % 3===0)
                    setData(data+">" +"H")
                else    
                    setData(data+">" +"L")
            }}>Gen</button>
        </context.Provider>
    )
}

function SaSilingan(){
    const {data} = useContext(context)
    return (
        <h1>{data}</h1>
    )
}

function MamaNiInputNi(){

    return <>
    <InputNi/><br/>
    </>
    
  }
  
  function InputNi(){
    return (
      <InputNiNi/>
    )
  }

  function InputNiNi(){
    const {data} = useContext(context);
    return (
        <>
         <h1>{data}</h1>
         <button onClick={()=>{}}>Click Me</button>
        </>
      )
  }
  