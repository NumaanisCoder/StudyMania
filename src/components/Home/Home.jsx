import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, updateMetadata, getMetadata } from 'firebase/storage';
import { storage } from '../../firebaseConnect';
import Card from '../Card/Card';
import style from './HomeStyle.module.css'

const Home = () => {
  let [downloadUrls, setDownloadUrls] = useState([]);
  let [Filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const listDocuments = async () => {
      try {
        const listRef = ref(storage, 'documents/');
        const res = await listAll(listRef);

        const downloadUrlPromises = res.items.map(async (itemRef) => {
          const metaData = await getMetadata(itemRef);
          console.log(metaData)
          const filename = metaData.customMetadata.filename;
          const description = metaData.customMetadata.description;
          const category = metaData.customMetadata.category;
          const date = metaData.timeCreated;

          const url = await getDownloadURL(itemRef);
          return {
            name: filename,
            description: description,
            date: date,
            url: url,
            category: category
          };
        });

        // Wait for all promises to resolve
        const resolvedUrls = await Promise.all(downloadUrlPromises);
        setFiltered(resolvedUrls);
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
    <>
    <div className={style.Filter}>
    <select
            name=""
            id=""
            required
            onChange={(e)=>{
                const selectedCategory = e.target.value;
                const filtered = downloadUrls.filter((item)=>{
                    return item.category === selectedCategory
                });
                setFiltered(filtered);
                if(selectedCategory === ''){
                    setFiltered(downloadUrls);
                }
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

    <div className={style.CardContainer}>
      {loading && <h2>Loading...</h2>}
      {!loading && Filtered.map((value, key) => <Card key={key} data={value} />)}
    </div>
    </>
  );
}

export default Home;
