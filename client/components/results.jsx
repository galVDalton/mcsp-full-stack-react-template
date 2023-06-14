import React from "react";

const SearchResults = (searchresults) => {
    return( 
        searchresults.map((searchresults) => (
            <span className="recipes" key={searchresults.id}>
                {searchresults.title}
                <img src={searchresults.image} alt={searchresults.title} />
            </span>
        ))
    )
}
export default SearchResults;
