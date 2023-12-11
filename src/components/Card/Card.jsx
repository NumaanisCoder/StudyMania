import React from 'react'
import style from './CardStyle.module.css'

const Card = ({data}) => {
    const {name, description, url} = data;

  return (
    <div className={style.CardMain}>
      <h3 className={style.title}>{name}</h3>
      <p className={style.description}>{description}</p>
      <button className={style.downloadButton}><a href={url}>Download</a></button>
    </div>
  )
}

export default Card
