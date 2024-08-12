import { useEffect, useState } from "react";
import Product from "../Product";
import { Container, List } from "./style";

// Interfaces
export interface CardapioItem {
    id: number;
    foto: string;
    nome: string;
    descricao: string;
    porcao: string;
    preco: number;
}

export interface RestaurantersApi {
    id: number;
    tipo: string;
    titulo: string;
    destacado?: boolean;
    descricao: string; // Descrição como obrigatória
    avaliacao?: number; // Propriedade opcional
    capa?: string; // Propriedade opcional
    cardapio: CardapioItem[]; // Permite que seja um array de CardapioItem
}

const ProductsList = () => {
    const [restaurantes, setRestaurantes] = useState<RestaurantersApi[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRestaurantes = async () => {
            try {
                const response = await fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os restaurantes');
                }
                const data: RestaurantersApi[] = await response.json();
                setRestaurantes(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantes();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container>
            <List>
                <Product restaurantes={restaurantes} />
            </List>
        </Container>
    );
};

export default ProductsList;
