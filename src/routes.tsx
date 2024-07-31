import { BrowserRouter, Route, Routes } from "react-router-dom";
import Perfil from "./pages/Perfil";
import Home from "./pages/Home";
import RestaurantProfile from './Components/RestaurantProfile'


function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/Perfil/:id' element={<RestaurantProfile/>}/>
            </Routes>
        </BrowserRouter>

        
    )
}

export default AppRoutes