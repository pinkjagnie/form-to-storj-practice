import React, { useState } from 'react';

import styles from "./form.module.css";

const Form = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredFile, setEnteredFile] = useState("");

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredFile || enteredFile === '') {
      alert("Ups! Something went wrong. Please fill in all the fields of the form correctly")
      return;
    };
    
    // TO DO: fetch
    fetch("http://127.0.0.1:4567/upload", {
      method: "POST",
      mode: 'no-cors',
      body: JSON.stringify({
        filename: enteredName,
        data: enteredFile
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(enteredFile)
    console.log(enteredName)

    setEnteredFile("")
    setEnteredName("")
  }

  return(
    <section className={styles.formSection}>
      <div>
        <form className={styles.form} onSubmit={formSubmitHandler}>
          
          {/* <div className={styles.control}>
            <label htmlFor="file">Upload your file</label>
            <input type="file" id="file" required onChange={event => {
                setEnteredFile(event.target.files[0]);
                setEnteredName(event.target.files[0].name)
              }} />
          </div> */}
          
          <div className={styles.control}>
            <label htmlFor="name">Upload your file</label>
            <input type="text" id="name" required onChange={event => {
                setEnteredFile(event.target.value)
              }} />
          </div>

          <div className={styles.control}>
            <label htmlFor="file">Upload your file</label>
            <input type="text" id="file" required onChange={event => {
                setEnteredName(event.target.value)
              }} />
          </div>

          <button>Submit</button>
        </form>
      </div>
    </section>
  )
};

export default Form;