import React, { useEffect, useState } from "react";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch("/api/tasks")
        .then((res) => res.json())
        .then((tasks) => {
            setTasks(tasks);
            console.log(tasks);
        });
    }, []);

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const createTasks = (event) => {
        event.preventDefault();
        fetch("/api/tasks", {
            method: "POST",
            body:JSON.stringify({ description }),
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => res.json())
        .then((newTask) => {
            setDescription("");
            setTasks(tasks.concat(newTask));
        });
    };
    
    return (
        <main>
            <form onSubmit={createTasks}>
                <input value={description} onChange={handleDescriptionChange} type="text" />
            </form>
            {tasks.map((tasks) => (
                <span className="task" key={tasks.id}>
                    {tasks.description}
                </span>
            ))}
            <h1 text fdsaf>REACT INFO</h1>
        </main>
    );
};

export default App;


