import { SolidButton } from '../../Buttons';
import './style.css';

const Navbar = () => {
    return (
        <div className='container'>
            <a href='#'>Main page</a>
            <a href='#'>About</a>
            <a href='#'>Page 3</a>
            <a href='#'>Page 4</a>
            <SolidButton value="page 5" />
        </div>
    );
};

export default Navbar;