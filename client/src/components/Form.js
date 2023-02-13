import React, { useState } from 'react';

import styles from "./form.module.css";

const Form = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");
  const [enteredNote, setEnteredNote] = useState("")

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredName || enteredName.trim() === '' || !enteredEmail || enteredEmail.trim() === '' || !enteredEmail.includes('@') || !enteredQuantity || enteredQuantity === '' || enteredQuantity === '0' || !enteredNote || enteredNote.trim() === '') {
      alert("Ups! Something went wrong. Please fill in all the fields of the form correctly")
      return;
    };

    console.log(enteredName, enteredEmail, enteredNote)
  }

  return(
    <section className={styles.formSection}>
      <div>
        <form className={styles.form} onSubmit={formSubmitHandler}>
          <div className={styles.control}>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" required value={enteredName} onChange={event => setEnteredName(event.target.value)} />
          </div>
          <div className={styles.control}>
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" required value={enteredEmail} onChange={event => setEnteredEmail(event.target.value)}/>
          </div>
          <div className={styles.control}>
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" required value={enteredQuantity} onChange={event => setEnteredQuantity(event.target.value)} />
          </div>
          <div className={styles.control}>
            <label htmlFor="note">Note</label>
            <textarea id="note" rows="4" cols="50" required value={enteredNote} onChange={event => setEnteredNote(event.target.value)}/>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </section>
  )
};

export default Form;