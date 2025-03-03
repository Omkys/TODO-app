import { useState } from "react";

export function CreateTodo(props) {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return (
        <div>
            <input id="title" style={{
                padding: "10px",
                margin: "10px"
            }} type="text" placeholder="title" onChange={function(e) {
                setTitle(e.target.value);
            }}></input> <br />
            <input id="description" style={{
                padding: "10px",
                margin: "10px"
            }} type="text" placeholder="description" onChange={function(e) {
                setDescription(e.target.value);
            }}></input> <br />

            <button style={{
                padding: "10px",
                margin: "10px",
                backgroundColor: "lightcoral"
                
            }} onClick={() => {
                fetch("http://localhost:3000/todo", {
                    method: "POST",
                    body: JSON.stringify({ 
                        title: title,
                        description: description,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(async function(res) {
                    const json = await res.json();
                    alert("Todo created successfully");
                    setTitle(""); // Clear title input
                    setDescription(""); // Clear description input
                })
            }}>add a todo</button>

        </div>
    )
}
