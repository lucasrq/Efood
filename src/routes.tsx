import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantProfile from './Components/RestaurantProfile';
import { RestaurantersApi } from "./Components/ProductList";

type AppRoutesProps = {
    restaurantes: RestaurantersApi[]; // Ajuste para o tipo correto
};

function AppRoutes({ restaurantes }: AppRoutesProps) { // Adiciona a tipagem aqui
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Perfil/:id'  element={<RestaurantProfile restaurantes={restaurantes} />}  />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
