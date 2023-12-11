// FileUpload.js
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, updateMetadata, getMetadata } from 'firebase/storage';
import { storage } from './firebaseConnect';

export const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [description, setDescription] = useState('');
  const [downloadUrls, setDownloadUrls] = useState(null);

  useEffect(() => {
    const listDocuments = async () => {
        try {
          const listRef = ref(storage, 'documents/');
          const res = await listAll(listRef);
      
          const downloadUrlPromises = res.items.map(async (itemRef) => {
              const metaData = await getMetadata(itemRef);
              const filename = metaData.customMetadata.filename;
              const description = metaData.customMetadata.description;

            const url = await getDownloadURL(itemRef);
            return {
              name: filename,
              description: description,
              url: url,
            };
          });
      
          // Wait for all promises to resolve
          const resolvedUrls = await Promise.all(downloadUrlPromises);
      
          setDownloadUrls(resolvedUrls);
          console.log("resolved",resolvedUrls);
          console.log("downloadurls",downloadUrls);

        } catch (error) {
          console.error('Error listing documents:', error);
        }
      };
      

    listDocuments();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
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
        setFile(null);
        setFilename('');
        setDescription('');
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <label>
        Filename:
        <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button onClick={handleUpload}>Upload</button>

      <div>
        <h3>Download URLs:</h3>
        <ol>
          {downloadUrls && downloadUrls.map((item, index) => (
            <li key={index}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <a href={item.url} download={true}>Download</a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
