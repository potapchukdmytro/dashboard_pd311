import "./App.css";
import { SolidButton, OutlineButton } from "./Buttons";
import * as Buttons from "./Buttons"; // import all
import ClassComponent from "./components_lesson/ClassComponent";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer";

const App = () => {
    let title = "First react project";

    const changeTextHandler = () => {
        const text = document.getElementById("userText").value;
        title = text;
        console.log(title);
        
    };

    return (
        <>
            <Navbar />
            <div className="content">
                <ClassComponent text="App render class component"/>
                <div className="b-color">
                    <h1>{title}</h1>
                </div>
                <div className="Content">
                    <p>My app component</p>
                </div>
                <SolidButton value="App solid button" color="green-btn" />
            </div>
            <div>
                <input id="userText"/>
                <button onClick={changeTextHandler}>Change text</button>
            </div>
            <Footer />
        </>
    );
};

export default App;
