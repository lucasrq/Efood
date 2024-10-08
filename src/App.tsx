import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import AppRoutes from './routes';
import { GlobalStyle } from './style';
import { RestaurantersApi } from "./Components/ProductList";
import { store } from "./store";

function App() {
    const [restaurantes, setRestaurantes] = useState<RestaurantersApi[]>([]);

    useEffect(() => {
        fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes')
            .then(res => res.json())
            .then(data => setRestaurantes(data));
    }, []);

    return (
        <>
        <Provider store={store}>
            <GlobalStyle />
            <AppRoutes restaurantes={restaurantes} /> {/* Passando restaurantes aqui */}
        </Provider>
        </>
    );
}

export default App;
