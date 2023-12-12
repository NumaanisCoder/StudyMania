import React from "react";
import style from "./CardStyle.module.css";

const Card = ({ data }) => {
  let { name, description, date, url, category } = data;
  date = date.slice(0, 10);

  return (
    <div className={style.CardMain}>
      <h3 className={style.title}>{name}</h3>
      <p className={style.description}>{description}</p>
      <div className={style.date}>
        <p>
          <b>Category: </b> 
          {category}
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
