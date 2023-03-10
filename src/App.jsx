import './App.css'
import Header from "./layouts/Header/header.jsx"
import Main from "./layouts/Main/main.jsx"
import Footer from "./layouts/Footer/footer.jsx"

function App() {
  return (
    <div className='d_flex-col h-100'>
        <Header />
        <Main>
            Main
        </Main>
        <Footer />
    </div>
  )
}

export default App
