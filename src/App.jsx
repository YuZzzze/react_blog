import { Routes ,Route ,useLocation ,Navigate} from 'react-router-dom'
import Header from './components/Herder'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import Detailed from './pages/Detailed'
import Login from './pages/Login'
import EditArticle from './pages/EditArticle'
import './App.css';
import MyList from './pages/MyList/indexl'

const App = () => {
  const {pathname} = useLocation()
  return (    
      <div className="App">

        {pathname ==='/login'? '' :<Header/>}
        
        <Routes>
          <Route path='/' element={<Navigate to='/home'/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/mylist' element={<MyList/>}/>
          <Route path='/detailed/:id' element={<Detailed/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/articleEdit' element={<EditArticle/>}/>
        </Routes>
        
        {(pathname !=='/login'&&pathname !== '/articleEdit')?<Footer/>:''}
      </div>
  )
}

export default App;
