import { SolidButton } from '../../Buttons';
import * as styles from './styles';
import './style.css';

const Navbar = ({isDark = false}) => {
    return (
        <div 
        style={isDark ? styles.darkContainer : styles.lightContainer}
        className='container'>
            <a style={styles.navLink} href='#'>Main page</a>
            <a style={styles.navLink} href='#'>About</a>
            <a style={styles.navLink} href='#'>Page 3</a>
            <a style={styles.navLink} href='#'>Page 4</a>
            <SolidButton value="page 5" color="red" />
        </div>
    );
};

export default Navbar;