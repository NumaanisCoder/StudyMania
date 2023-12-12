import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, updateMetadata, getMetadata } from 'firebase/storage';
import { storage } from '../../firebaseConnect';
import Card from '../Card/Card';
import style from './HomeStyle.module.css'

const Home = () => {
  let [downloadUrls, setDownloadUrls] = useState([]);
  let [Filtered, setFiltered] = useState([]);
  let [SubjectFilter, setSubjectFilter] = useState([]);
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
          const subject = metaData.customMetadata.subject;
          const date = metaData.timeCreated;

          const url = await getDownloadURL(itemRef);
          return {
            name: filename,
            description: description,
            date: date,
            url: url,
            category: category,
            subject: subject
          };
        });

        // Wait for all promises to resolve
        const resolvedUrls = await Promise.all(downloadUrlPromises);
        setFiltered(resolvedUrls);
        setDownloadUrls(resolvedUrls);
        setSubjectFilter(resolvedUrls);
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
                setSubjectFilter(filtered);
                if(selectedCategory === ''){
                    setFiltered(downloadUrls);
                }
            }}
          >
            <option value="" selected>
              Select CLASS/EXAM
            </option>
            <option value="IX">IX</option>
            <option value="X">X</option>
            <option value="XI">XI</option>
            <option value="XII">XII</option>
            <option value="NEET">NEET</option>
            <option value="JEE-ADVANCE">JEE-ADVANCE</option>
            <option value="JEE-MAINS">JEE-MAINS</option>
          </select>
          <select onChange={(e)=>{
            const selectedValue = e.target.value;
            const filterd = SubjectFilter.filter((items)=>{
                return items.subject === selectedValue;
            })
            if(selectedValue === ''){
                setFiltered(Filtered);
            }
            setFiltered(filterd);
          }}>
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

    <div className={style.CardContainer}>
      {loading && <h2>Loading...</h2>}
      {!loading && Filtered.length === 0 ? (
          <h3>Sorry, no matching documents found.</h3>
        ) : (
          Filtered.map((value, key) => <Card key={key} data={value} />)
        )}
    </div>
    </>
  );
}

export default Home;
