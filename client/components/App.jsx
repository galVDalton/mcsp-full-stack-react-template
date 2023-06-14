import React, { useEffect, useState } from "react";
import VisitorForm from "./visitorform";
// import SearchResults from "./results";

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchresults, setSearchresults] = useState([]);
    const [selected, setSelected] = useState([]);
    const api = "https://api.spoonacular.com/recipes/";
    const searchFilter = "complexSearch?number=10";
    // gmail email secondary api
    // const apiKey = "&apiKey=0ed7263975804b509239ea78bbdd28ac";
    // yahoo email primary api
    const apiKey = "&apiKey=eba7563cfe4241aa9a6a889c2a5071ab";
    useEffect(() => {
        fetch(
          `${api}random?number=10${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            setRecipes(data.recipes); 
            console.log(data.recipes);
          })
          .catch((error) => console.error(error));
      }, []);
      
      const search = () => {
        let allergies = selected.join(",");
        let url = `${api}${searchFilter}&intolerances=${allergies}${apiKey}`;
      
        fetch(`${api}${searchFilter}&intolerances=${allergies}${apiKey}`)
          .then((response) => response.json())
          .then((data) => {
            setSearchresults(data.results);
            console.log(searchresults.length);
            console.log(searchresults.length >0);
          })
          .catch((error) => console.error(error));
      };
    
    
    const handleCheckbox = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
          setSelected([...selected, value]); // add the value to the selected array
        } else {
          setSelected(selected.filter(item => item !== value)); // remove the value from the selected array
        }
      }
    

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
            <VisitorForm />
            {searchresults.length > 0 ? (
                 
                    searchresults.map((searchresults) => (
                        <span className="recipes" key={searchresults.id}>
                            {searchresults.title}
                            <img src={searchresults.image} alt={searchresults.title} />
                        </span>
                    ))
            
                // <SearchResults searchresults = {searchresults}/>
            ) : (
            recipes.map((recipes) => (
                <span className="recipes" key={recipes.id}>
                    {recipes.title}
                    <img src={recipes.image} alt={recipes.title} />
                </span>
            ))
        )}  
        </main>
    );
};

export default App;


