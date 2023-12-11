import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, updateMetadata, getMetadata } from 'firebase/storage';
import { storage } from '../../firebaseConnect';
import Card from '../Card/Card';
import style from './HomeStyle.module.css'

const Home = () => {
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); // Set loading to false after data is fetched

      } catch (error) {
        console.error('Error listing documents:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    listDocuments();
  }, []); 

  return (
    <div className={style.CardContainer}>
      {loading && <h2>Loading...</h2>}
      {!loading && downloadUrls.map((value, key) => <Card key={key} data={value} />)}
    </div>
  );
}

export default Home;
