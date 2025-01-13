import * as styles from './styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import './style.css';
import { Button } from '@mui/material';

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
                <a style={navLink} href='#'>Main page</a>
                <a style={navLink} href='#'>About</a>
                <a style={navLink} href='#'>Page 3</a>
                <a style={navLink} href='#'>Page 4</a>
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