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
              console.log(category);
            }}
          >
            <option value="" selected>
              Select Category
            </option>
            <option value="IX">IX</option>
            <option value="X">X</option>
            <option value="XI">XI</option>
            <option value="XII">XII</option>
            <option value="NEET">NEET</option>
            <option value="JEE-ADVANCE">JEE-ADVANCE</option>
            <option value="JEE-MAINS">JEE-MAINS</option>
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
              Select Subject
            </option>
            <option value="Science">Science</option>
            <option value="Physics">Physics</option>
            <option value="Maths">Maths</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="IT">IT</option>
            <option value="Social_Science">Social Science</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Physical_Education">Physical Education</option>
            <option value="Accountancy">Accountancy</option>
            <option value="Economics">Economics</option>
            <option value="Business_Studies">Business Studies</option>
            <option value="Fine_Arts">Fine Arts</option>
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
