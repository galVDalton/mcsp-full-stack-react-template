import React, { useEffect, useState } from "react";
import ChildComponent from "./recipe.jsx";

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [results, setResults] = useState([]);
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [selected, setSelected] = useState([]);
    const api = "https://api.spoonacular.com/recipes/";
    const searchFilter = "complexSearch?number=10";
    // gmail email secondary api
    // const apiKey = "&apiKey=0ed7263975804b509239ea78bbdd28ac";
    // yahoo email primary api
    // const apiKey = "&apiKey=eba7563cfe4241aa9a6a889c2a5071ab";
    useEffect(() => {
        // fetch(
        //   `${api}random?number=10${apiKey}`
        // )
        //   .then((response) => response.json())
        //   .then((data) => {
        //     setRecipes(data.recipes); // Update this line
        //     // console.log(data.recipes);
        //   })
        //   .catch((error) => console.error(error));
      }, []);
      
    const search = () => {
        let allergies = selected.join(",");
        let url = `${api}${searchFilter}&intolerances=${allergies}${apiKey}`;
        // console.log(url);
        
        fetch(
            `${api}${searchFilter}&intolerances=${allergies}${apiKey}`
          )
            .then((response) => response.json())
            .then((data) => {
              setResults(data.results); 
              console.log(data);
            })
            .catch((error) => console.error(error));
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
    };
    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
    };
    
    const handleCheckbox = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
          setSelected([...selected, value]); // add the value to the selected array
        } else {
          setSelected(selected.filter(item => item !== value)); // remove the value from the selected array
        }
      }
    

    const createUsername = (event) => {
        console.log(JSON.stringify({ username , firstname, lastname }));
        event.preventDefault();
        fetch("/api/users", {
            method: "POST",
            body:JSON.stringify({ username, firstname, lastname }),
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => res.json())
        .then((data) => {
        console.log("added", data);
        });
    };
    
    return (
        <main>
           <div className="filter">
                <h1>Allergies</h1>
                <div className="label">
                    <input type="checkbox" value="dairy" onChange={handleCheckbox}/>
                    Dairy
                </div>
                <div className="label">
                    <input type="checkbox" value="gluten" onChange={handleCheckbox}/>
                    Gluten
                </div>
                <div className="label">
                    <input type="checkbox" value="tree nut" onChange={handleCheckbox}/>
                    Tree Nut
                </div>
                <input type="button" value="search" onClick={search} />
            </div>
            <form onSubmit={createUsername}>
        <div className="label">
            <span>Username</span>
            <input value={username} onChange={handleUsernameChange} type="text" />
        </div>
        <div className="label">
            <span>First Name</span>
            <input value={firstname} onChange={handleFirstnameChange} type="text" />
        </div>
        <div className="label">
            <span>Last Name</span>
            <input value={lastname} onChange={handleLastnameChange} type="text" />
        </div>
        <button type="submit">Submit</button>
        </form>

            {recipes.map((recipes) => (
                <span className="recipes" key={recipes.id}>
                {recipes.title}
                <img src={recipes.image} alt={recipes.title} />
            </span>
            ))}
            <h1>REACT INFO</h1>
        </main>
    );
};

export default App;


