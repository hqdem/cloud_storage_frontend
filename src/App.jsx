import './App.css'
import Header from "./layouts/Header/Header.jsx"
import Main from "./layouts/Main/Main.jsx"
import Footer from "./layouts/Footer/Footer.jsx"
import Dirs from "./components/Dirs/Dirs.jsx"

function App() {
  return (
    <div className='d_flex-col h-100'>
        <Header />
        <Main>
            <Dirs />
        </Main>
        <Footer />
    </div>
  )
}

export default App
