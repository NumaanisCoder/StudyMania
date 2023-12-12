import React from "react";
import style from "./CardStyle.module.css";

const Card = ({ data }) => {
  let { name, description, date, url, category,subject } = data;
  date = date.slice(0, 10);

  return (
    <div className={style.CardMain}>
      <h3 className={style.title}>{name}</h3>
      <p className={style.description}>{description}</p>
      <div className={style.date}>
        <p>
          <b>Class/Exam: </b> 
          {category}
        </p>
        <p>
          <b>Subject: </b> 
          {subject}
        </p>
      </div>
      <div className={style.date}>
        <p>
          <b>Date: </b> 
          {date}
        </p>
      </div>
      <button className={style.downloadButton}>
        <a href={url}>Download</a>
      </button>
    </div>
  );
};

export default Card;
