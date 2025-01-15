import * as styles from './styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import './style.css';
import {Button} from '@mui/material';
import {Link} from  'react-router-dom';

const Navbar = ({isDark = false, themeHandler}) => {
    const navLink = {
        textDecoration: "none",
        color: isDark ? "white" : "black"
    };

    return (
        <div 
        style={isDark ? styles.darkContainer : styles.lightContainer}
        className='container'>
            <div className='navbar'>
                <Link style={navLink} to='/'>Main page</Link>
                <Link style={navLink} to='about'>About</Link>
                <Link style={navLink} to='register'>Register</Link>
                <Link style={navLink} to='#'>Page 4</Link>
            </div>
            <div className='theme-container'>
                <Button onClick={themeHandler}>
                    { isDark ? <LightModeIcon sx={{color: "white"}} /> : <DarkModeIcon sx={{color: "black"}} /> }
                </Button>
            </div>
        </div>
    );
};

export default Navbar;