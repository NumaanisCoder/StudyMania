import { Link, NavLink } from 'react-router-dom';
import style from './Nav.module.css';

const Nav = () => {
  return (
    <div className={style.NavMain}>
      <h3>StudyMania</h3>
      <ul className={style.NavUL}>
        <li className={style.NavLi}><NavLink to="/" activeClassName='active'>Home</NavLink></li>
        <li className={style.NavLi}><NavLink to="/admin" activeClassName='active'>Admin</NavLink></li>
      </ul>
    </div>
  );
}

export default Nav;
