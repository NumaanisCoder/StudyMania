import { Link } from 'react-router-dom';
import style from './Nav.module.css';

const Nav = () => {
  return (
    <div className={style.NavMain}>
      <h3>StudyMania</h3>
      <ul className={style.NavUL}>
        <li className={style.NavLi}><Link to="/">Home</Link></li>
        <li className={style.NavLi}><Link to="/admin">Admin</Link></li>
      </ul>
    </div>
  );
}

export default Nav;
