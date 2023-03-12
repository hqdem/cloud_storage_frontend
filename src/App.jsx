import './App.css'
import Header from "./layouts/Header/Header.jsx"
import Main from "./layouts/Main/Main.jsx"
import Footer from "./layouts/Footer/Footer.jsx"
import {Routes, Route} from "react-router-dom"
import DirsFilesMain from "./components/DirsFilesMain/DirsFilesMain.jsx"

function App() {
    return (
        <div className="d_flex-col h-100">
            <Header/>
            <Main>
                <Routes>
                    <Route path='/' element={<DirsFilesMain />} />
                </Routes>
            </Main>
            <Footer/>
        </div>
    )
}

export default App
