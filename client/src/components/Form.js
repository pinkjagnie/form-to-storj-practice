import React, { useState } from 'react';
import Axios from 'axios';

// import LoadingSpinner from './ui/LoadingSpinner';
import Success from './ui/Success';

import styles from "./form.module.css";

const Form = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredFile, setEnteredFile] = useState("");

  const [isCancel, setIsCancel] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [isUrl, setIsUrl] = useState("");

  const closeSuccessHandler = () => {
    setShowSuccess(false)
  };

  const cancelHandler = (event) => {
    event.preventDefault();

    setIsCancel(true);
    setEnteredFile("");
    setEnteredName("")

    setTimeout(() => {
      setIsCancel(false);
    }, "2000")
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredFile || enteredFile === '') {
      alert("Ups! Something went wrong. Please fill in all the fields of the form correctly")
      return;
    };

    // setIsLoading(true)
    // console.log(isLoading)

    const formData = new FormData();
    formData.append('file', enteredFile);

    fetch(
      'http://127.0.0.1:4567/upload2',
      {
        mode: 'no-cors',
        method: 'POST',
        body: formData,
      }
    )

    setIsUrl(enteredName)
    
    // TO DO: fetch
    // fetch("http://127.0.0.1:4567/upload", {
    //   method: "POST",
    //   mode: 'no-cors',
    //   body: JSON.stringify({
    //     filename: enteredName,
    //     data: enteredFile
    //   }),
    //   headers: {
    //     "Content-Type": 'multipart/form-data',
    //   },
    // });

    console.log(enteredFile)
    console.log(enteredName)

    setShowSuccess(true);

    // console.log(isLoading)
    // setIsLoading(false)

    setEnteredFile("")
    setEnteredName("")
  }

  const downloadHandler = () => {
    let url = `http://127.0.0.1:4567/get/${isUrl}`
    
    fetch(url, {
      mode: 'no-cors',
    })
    .then((response) => response.blob())
    .then((blob) => {
    // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${isUrl}`,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    })
  };

  return(
    <>
    {/* {isLoading && <LoadingSpinner />} */}
    {showSuccess && <Success closeSuccessHandler={closeSuccessHandler} downloadHandler={downloadHandler} />}
    <section className={styles.formSection}>
      <h1>Upload your file with the form below</h1>
      <div>
        <form className={styles.form}>
          
          <div className={styles.control}>
            <label htmlFor="file">Upload your file</label>
            <input type="file" id="file" required onChange={event => {
                setEnteredFile(event.target.files[0]);
                setEnteredName(event.target.files[0].name)
              }} />
          </div>
          
          {/* <div className={styles.control}>
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
          </div> */}
          
          {isCancel && <p className={styles.canceled}>Canceled!</p>}
          <div className={styles.buttonsBox}>
            <button onClick={cancelHandler}>Cancel</button>
            <button onClick={formSubmitHandler}>Submit</button>
          </div>
        </form>
      </div>
    </section>
    </>
  )
};

export default Form;