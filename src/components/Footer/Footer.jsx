import React from 'react'
import style from './FooterStyle.module.css';

const Footer = () => {
  return (
    <div className={style.footerforyou}>
      <p className={style.pfooter}>© 2023 NN. All rights reserved. | <a style={{color: "white"}}  href='mailto:nomannaeem985@gmail.com'>Contact us</a>
      </p>
    </div>
  )
}

export default Footer;