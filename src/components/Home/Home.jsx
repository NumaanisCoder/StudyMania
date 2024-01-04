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
  const semOptions = ['SEM 1', 'SEM 2', 'SEM 3', 'SEM 4', 'SEM 5', 'SEM 6', 'SEM 7', 'SEM 8'];
  const classOptions = ['IX', 'X', 'XI-Sci','XI-Comm', 'XII-Sci','XII-Comm', 'NEET', 'JEE-ADVANCE', 'JEE-MAINS', 'BTECH-CSE'];
  const JEEOptions = ["Physics","Chemistry","Maths","Phy+Chem+Math"];
  const commerceOption = ['Physical Education', 'Accountancy', 'Economics', 'Business Studies', 'Fine Arts', 'IT', 'English', 'Hindi'];
  const ScienceOption = [ 'Physics', 'Maths', 'Chemistry', 'Biology', 'IT', 'English', 'Hindi','Physical Education']
  const [subjectOptions, setsubjectOptions] = useState(['Science', 'Social Science','Hindi','English','IT','Maths']);
  const backup = ['Science', 'Social Science','Hindi','English','IT','Maths'];
 
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
                  setsubjectOptions(backup);
                }
            }}
          >
            <option value="" selected>
              Select CLASS/EXAM
            </option>
            {classOptions.map((value,index)=>(
              <option value={value}>{value}</option>
            ))}
          </select>
          <select id='subjects' onChange={(e)=>{
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
              Select Subject/Semester
            </option>
            {subjectOptions.map((value,index)=>(
              <option value={value}>{value}</option>
            ))}
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
