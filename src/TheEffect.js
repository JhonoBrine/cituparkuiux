import { useEffect, useState } from "react";

function init(){
    for(var i=0; i<1000000000; i++){
      /// do nothing
    }
  
  }

export default function TheEffect(){
    
    const [bOne, setBOne] = useState(0)
    const [bTwo, setBTwo] = useState(1)
    const [page,setPage] = useState("users")

    useEffect(()=>{
        init();
    },[bTwo]);

    useEffect(()=>{
        //fetch(`https://jsonplaceholder.org/${page}`)
        fetch('https://jsonplaceholder.org/'+page)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    },[page]);
   
    return (
        <div style={{
            margin: '0 auto',
            border: 'solid 1px #222',
            width: '50%'
        }}>
            <h1 id="h11">Hey</h1>
            <button onClick={()=>{
                setBOne(Math.ceil(Math.random()*10));
            }}>Change B1</button>
            <button onClick={()=>{
                setBTwo(Math.ceil(Math.random()*10))
            }}>Change B2</button>
            <br/>
             <button onClick={()=>{
                setPage("users");
            }}>Users</button>
             <button onClick={()=>{
                setPage("posts")
            }}>Posts</button>
             <button onClick={()=>{
                setPage("comments")
            }}>Comments</button>
        </div>
    )
}