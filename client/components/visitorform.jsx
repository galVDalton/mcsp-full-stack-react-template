// ChildComponent.js

import React, { useState } from "react";

  const VisitorForm = ({onSubmit}) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    
    const handleFirstnameChange = (event) => {
      setFirstname(event.target.value);
    };
    
    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
    };

    const recordVisit = (event) => {
      // console.log(JSON.stringify({ firstname, lastname }));
      event.preventDefault();
      fetch("/api/visitors", {
          method: "POST",
          body:JSON.stringify({ firstname, lastname }),
          headers: { "Content-Type": "application/json" }
      })
      .then ((res) => res.json())
      .then((data) => {
          console.log("added", data);
      });
    };

    return (
      <form onSubmit={recordVisit}>
        <h1>Record Your Visit</h1>
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
      )
}

export default VisitorForm;
