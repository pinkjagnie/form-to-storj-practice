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

    console.log(enteredFile)
    console.log(enteredName)

    setEnteredFile("")
    setEnteredName("")
  }

  return(
    <section className={styles.formSection}>
      <div>
        <form className={styles.form} onSubmit={formSubmitHandler}>
          
          <div className={styles.control}>
            <label htmlFor="file">Upload your file</label>
            <input type="file" id="file" required onChange={event => {
                setEnteredFile(event.target.files[0]);
                setEnteredName(event.target.files[0].name)
              }} />
          </div>
          
          <button>Submit</button>
        </form>
      </div>
    </section>
  )
};

export default Form;