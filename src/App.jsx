import './App.css'
import Header from "./layouts/Header/Header.jsx"
import Main from "./layouts/Main/Main.jsx"
import Footer from "./layouts/Footer/Footer.jsx"
import {Routes, Route} from "react-router-dom"
import DirsFilesMain from "./components/DirsFilesMain/DirsFilesMain.jsx"
import Login from "./components/Auth/Login/Login.jsx"
import SignUp from "./components/Auth/SignUp/SignUp.jsx"
import {QueryClient, QueryClientProvider} from "react-query"

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="d_flex-col h-100">
                <Header/>
                <Main>
                    <Routes>
                        <Route path="/" element={<DirsFilesMain/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                    </Routes>
                </Main>
                <Footer/>
            </div>
        </QueryClientProvider>
    )
}

export default App
