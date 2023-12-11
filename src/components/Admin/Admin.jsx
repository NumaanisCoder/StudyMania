import React, { useState} from 'react';
import {ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebaseConnect';
import style from './AdminStyle.module.css';


const Admin = () => {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [description, setDescription] = useState('');
    const [Button, setButton] = useState("Upload")

    const handleChange = (e) => {
        if (e.target.files[0]) {
          setFile(e.target.files[0]);
        }
      };
      const handleUpload = async () => {
        if (file) {
          setButton("Uploading")
          const storageRef = ref(storage, `documents/${file.name}`);
    
          // Set metadata including filename and description
          const metadata = {
            customMetadata: {
              filename: filename,
              description: description,
            },
          };
    
          try {
            // Upload file with metadata
            await uploadBytes(storageRef, file, metadata);
    
            // Clear the form fields after successful upload
            setButton("Uploaded")
            setFile(null);
            setFilename('');
            setDescription('');
            setTimeout(() => {
              setButton("Upload")
            }, 1000);
          } catch (error) {
            console.error('Error uploading file:', error.message);
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
                <input type="file" name='file' onChange={handleChange} />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="">Filename:</label>
                <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="">Description:</label>
                <textarea type="text" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className={style.formGroup}>
            <button onClick={handleUpload}>{Button}</button>
            </div>
      </div>



    </div>
  )
}

export default Admin