import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebaseConnect";
import style from "./AdminStyle.module.css";

const Admin = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Subject, setSubject] = useState("");
  const [Button, setButton] = useState("Upload");
  const [error, seterror] = useState("");
  const semOptions = ['SEM 1', 'SEM 2', 'SEM 3', 'SEM 4', 'SEM 5', 'SEM 6', 'SEM 7', 'SEM 8'];
  const classOptions = ['IX', 'X', 'XI-Sci','XI-Comm', 'XII-Sci','XII-Comm', 'NEET', 'JEE-ADVANCE', 'JEE-MAINS', 'BTECH-CSE'];
  const JEEOptions = ["Physics","Chemistry","Maths","Phy+Chem+Math"];
  const commerceOption = ['Physical_Education', 'Accountancy', 'Economics', 'Business_Studies', 'Fine_Arts', 'IT', 'English', 'Hindi'];
  const ScienceOption = [ 'Physics', 'Maths', 'Chemistry', 'Biology', 'IT', 'English', 'Hindi']
  const [subjectOptions, setsubjectOptions] = useState(['Science', 'Physics', 'Maths', 'Chemistry', 'Biology', 'IT', 'Social_Science', 'English', 'Hindi', 'Physical_Education', 'Accountancy', 'Economics', 'Business_Studies', 'Fine_Arts', 'Combined']);

  const handleReload = () => {
    window.location.reload();
  };

  const allowedFileTypes = [
    "application/pdf",
    "application/vnd.ms-excel",
    "text/plain",
    "application/msword",
  ];

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    const maxSizeInBytes = 50 * 1024 * 1024; // 50MB in bytes
    if (file) {
      // Check if the file size is within the limit (50MB)
      if (!allowedFileTypes.includes(file.type)) {
        seterror(
          "Invalid file type. Please select a PDF, Excel, TXT, or Word document."
        );
        return;
      } else if (file.size > maxSizeInBytes) {
        console.error("File size exceeds the limit (50MB).");
        seterror("Please upload file of less than 50MB");
        return;
      }

      setButton("Uploading");
      const storageRef = ref(storage, `documents/${file.name}`);

      // Set metadata including filename and description
      const metadata = {
        customMetadata: {
          filename: filename,
          description: description,
          category: category,
          subject: Subject
        },
      };

      try {
        // Upload file with metadata
        await uploadBytes(storageRef, file, metadata);

        // Clear the form fields after successful upload
        setButton("Uploaded");
        setTimeout(() => {
          handleReload();
        }, 2000);

      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    }
  };
  return (
    <div className={style.AdminMain}>
      <div className={style.form}>
        <div className={style.formGroup}>
          <h3>UPLOAD DOCS</h3>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="file">File</label>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              handleChange(e);
              seterror("");
            }}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="">Filename:</label>
          <input
            type="text"
            value={filename}
            onChange={(e) => {
              setFilename(e.target.value);
            }}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="">Description:</label>
          <textarea
            type="text"
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="">CLASS/EXAM:</label>
          <select
            name=""
            id=""
            required
            onChange={(e) => {
              setCategory(e.target.value);
              const selectedCategory = e.target.value;
              if(selectedCategory === "BTECH-CSE"){
                setsubjectOptions(semOptions);
               }else if(selectedCategory === "JEE-MAINS" || selectedCategory === "JEE-ADVANCE"){
                 setsubjectOptions(JEEOptions);
               }else if(selectedCategory === "XI-Sci" || selectedCategory === "XII-Sci"){
                 setsubjectOptions(ScienceOption);
               }
               else if(selectedCategory === "XI-Comm" || selectedCategory === "XII-Comm"){
                 setsubjectOptions(commerceOption);
               }else{
                 setsubjectOptions(subjectOptions);
               }
              console.log(category);
            }}
          >
            <option value="" selected>
              Select CLASS/EXAM
            </option>
            {classOptions.map((value,index)=>(
              <option value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="">Subject</label>
          <select
            name=""
            id=""
            required
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          >
             <option value="" selected>
              Select Subject/Semester
            </option>
            {subjectOptions.map((value,index)=>(
              <option value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className={style.formGroup}>
          <p>{error}</p>
          <button type="submit" onClick={handleUpload}>
            {Button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
