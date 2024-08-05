import { useParams } from "react-router-dom";
import PerfilHeader from '../../Containers/HeaderCompras/Header';
import Prato from  '../../../public/img/Prato.png'
import { Botao, ClosePop, Container, ContainerBotao, ContainerGrid, ContainerList, ContainerPop, ContentPop, Imagens, Modal, Paragrafo, Title } from "./style";
import Footer from "../../Containers/Footer";
import Close from '../../../public/img/close.png'
import { useState } from "react";

const RestaurantProfile = () => {
    const { id } = useParams<{ id: string }>();
    const restaurantId = parseInt(id || "0"); // Garante que `id` seja um número

    const restaurants = [
        { id: 1, name: 'Shushi shoio', dishes: ['Sushi de Salmão', 'Sushi de Atum', 'Sushi de Camarão', 'Sushi de Polvo' , 'Sushi de Enguia', 'Sushi de Ovo (Tamago)'] },
        { id: 2, name: 'Massa com molho', dishes: ['Espaguete à Carbonara', 'Espaguete à Bolonhesa', 'Espaguete ao Pesto' ,'Espaguete Alfredo' ,'Espaguete à Puttanesca', 'Espaguete com Frutos do Mar'] },
        { id: 3, name: 'Hamburgueria JSX', dishes: ['Hambúrguer Clássico', 'Cheeseburger', 'Hambúrguer Barbecue', 'Hambúrguer Vegetariano', 'Spicy Jalapeño Burger', 'Frango Grelhado com Abacate'] },
        { id: 4, name: 'Vinheto', dishes: ['Vinho Tinto Cabernet Sauvignon', 'Vinho Branco Sauvignon Blanc', 'Vinho Rosé Provence',
        'Vinho Espumante Brut',
        'Vinho Tinto Merlot',
        'Vinho Branco Chardonnay'
        ] },
        { id: 5, name: 'Picacha do zé', dishes: [
        'Picanha Grelhada', 
        'Picanha ao Sal Grosso', 
        'Picanha na Chapa',
        'Picanha ao Molho Chimichurri',
        'Picanha com Legumes Assados',
        'Picanha com Manteiga de Alho'] },
        { id: 6, name: 'Gelato Delícia', dishes: [
        'Sorvete de Chocolate', 
        'Sorvete de Baunilha', 
        'Sorvete de Morango',
        'Sorvete de Caramelo Salgado', 
        'Sorvete de Pistache', 
        'Sorvete de Café'
        ] },
    ];

    const restaurantsForm = [
        { id: 1, sobre: ['Salmão fresco cortado finamente, servido sobre arroz temperado com vinagre de arroz. Um clássico amado por muitos devido à sua textura suave e sabor delicado.'
        ,'Fatias de atum de alta qualidade colocadas sobre arroz temperado. Este prato é conhecido por seu sabor marcante e textura firme.',
        "Camarão cozido e levemente adocicado, servido sobre arroz temperado com vinagre. Uma opção popular pela sua combinação equilibrada de sabores.",
        'Polvo macio e bem cozido, servido sobre arroz temperado. Conhecido por sua textura única e sabor suave.', 
        'Enguia grelhada com molho teriyaki, servida sobre arroz temperado. Um prato rico em sabor e com uma textura levemente crocante.', 
        'Omelete japonesa levemente doce, servida sobre arroz temperado. Uma opção doce e saborosa, perfeita para complementar outros sushis.'] },

        { id: 2, sobre: ['Espaguete cozido al dente, misturado com uma cremosa combinação de ovos, queijo parmesão, pancetta e pimenta preta. Um prato rico e saboroso, perfeito para qualquer ocasião.',
        'Espaguete servido com um molho de carne moída cozida lentamente com tomates, cebolas, cenouras e temperos italianos. Uma refeição clássica e reconfortante.', 
        "Espaguete coberto com um molho verde vibrante feito de manjericão fresco, alho, pinhões, queijo parmesão e azeite de oliva. Um prato leve e refrescante.",
        'Espaguete envolto em um molho cremoso feito de manteiga, creme de leite e queijo parmesão. Simples, mas incrivelmente indulgente.', 
        'Espaguete servido com um molho picante feito de tomates, alcaparras, azeitonas, anchovas e alho. Uma explosão de sabores robustos em cada mordida.',
        'Espaguete acompanhado por uma mistura de camarões, mariscos, lulas e mexilhões, tudo cozido em um molho de tomate leve com alho e ervas.'
        ] },
        { id: 3, sobre: [' Um hambúrguer suculento, preparado com carne de alta qualidade, grelhado à perfeição e servido em pão macio, acompanhado de alface, tomate e cebola.', 'Um hambúrguer delicioso coberto com queijo derretido, servido em pão fresco com alface, tomate, cebola e picles, além de ketchup e mostarda.', "Um hambúrguer grelhado com molho barbecue, queijo cheddar e cebolas caramelizadas, servido em pão brioche macio e saboroso, ideal para os amantes do sabor.", 
        'Um hambúrguer feito com grão-de-bico temperado, servido em pão integral, acompanhado de abacate, alface e molho de tahine, perfeito para vegetarianos.',
        'Um hambúrguer apimentado com jalapeño, queijo pepper jack e molho chipotle, servido em pão de gergelim, ideal para quem gosta de sabores intensos.',
        'Um hambúrguer de frango grelhado, marinado em ervas e especiarias, servido com abacate, alface e maionese em pão ciabatta, leve e delicioso.'
        ] },
        { id: 4, sobre: [
        'Um vinho encorpado, com notas de frutas escuras, taninos marcantes e um final prolongado, ideal para acompanhar carnes vermelhas.',
        'Um vinho fresco e aromático, com notas de frutas cítricas e herbáceas, perfeito para pratos de frutos do mar e saladas.', 
        "Um vinho leve e frutado, com aromas de morango e melancia, ideal para ser apreciado em dias quentes, acompanhando aperitivos.",
        'Um vinho borbulhante, com notas de maçã verde e pão tostado, excelente para celebrações e harmonização com pratos variados.',
        'Um vinho suave, com sabores de ameixa e especiarias, perfeito para harmonizar com pratos de carne de porco e frango assado.',
        'Um vinho encorpado, com aromas de maçã, pera e um toque de baunilha, ideal para pratos cremosos e queijos suaves.'], 
        },
        { id: 5, sobre: [
        'Um corte suculento e macio, grelhado na brasa, com uma crosta saborosa e temperada, perfeito para acompanhar arroz e farofa.', 
        'Preparada com sal grosso, esta picanha é assada lentamente, resultando em uma carne tenra e suculenta, ideal para churrascos.', 
        "Cozida na chapa, esta picanha é servida com cebolas caramelizadas e acompanhamentos de batatas fritas, proporcionando uma refeição saborosa.",
        'Um corte de picanha marinada em chimichurri, grelhado e servido com um molho fresco, ideal para um jantar especial.', 
        'Assada com legumes variados, como cenouras e batatas, esta picanha é uma opção nutritiva e deliciosa para a família.',
        'Servida com manteiga de alho derretida por cima, esta picanha é uma explosão de sabores e combinações perfeitas em cada garfada.'] },
        { id: 6, sobre: [
        'Cremoso e intenso, este sorvete é feito com chocolate belga de alta qualidade, proporcionando uma explosão de sabor a cada colherada.', 
        'Delicado e suave, este sorvete é feito com extrato natural de baunilha, oferecendo um sabor clássico que combina com qualquer acompanhamento.', 
        "Refrescante e frutado, este sorvete é feito com morangos frescos e cremosos, ideal para os dias quentes de verão.",
        'Uma combinação perfeita de doce e salgado, este sorvete de caramelo é a sobremesa ideal para quem busca sabores contrastantes.',
        'Feito com pistaches selecionados, este sorvete traz uma textura rica e um sabor único que encanta os amantes de nozes.' ,
        'Com um sabor robusto de café, este sorvete é perfeito para os amantes de café que desejam uma sobremesa gelada e cheia de sabor.'] },
    ];

    // Verifique se id está definido
    if (!id) {
        return <h1>ID não fornecido</h1>;
    }

    const restaurant = restaurants.find(r => r.id === restaurantId);
    const restaurantForm = restaurantsForm.find(rf => rf.id === restaurantId);

    if (!restaurant) {
        return <h1>Restaurante não encontrado</h1>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalAberto, SetModalAberto] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalUrl, SetModalUrl] = useState(0)


    return (
        <>
            <PerfilHeader />
            <Container>
                <ContainerGrid>
                    {restaurant.dishes.map((dish, dishIndex) => (
                        <ContainerList key={dishIndex}>
                            <Imagens src={Prato} />
                            <Title>{dish}</Title>
                            {restaurantForm?.sobre[dishIndex] && (
                                <Paragrafo>{restaurantForm.sobre[dishIndex]}</Paragrafo>
                            )}
                            <ContainerBotao key={dishIndex}>
                            {restaurantForm?.sobre[dishIndex] && (
                                <Botao onClick={()=> {
                                    SetModalAberto(true);
                                    SetModalUrl(dishIndex)
                                    console.log(SetModalUrl)
                                }}>Adicionar no carrinho</Botao>
                            )}
                            </ContainerBotao>
                            
                        </ContainerList>
                    ))}
                </ContainerGrid>
            </Container>
            <Footer/>
{modalAberto &&(
            <Modal className={modalAberto ? 'visivel' : ''}>
            <ContainerPop> 
                    <>
                        <div className="img" >
                        <img src={Prato} />
                        </div>
                        <ContentPop>
                        <h4>{restaurant.dishes[modalUrl]}</h4>
                        {restaurantForm?.sobre[modalUrl]&& (
                            <p>{restaurantForm.sobre[modalUrl]}</p>
                        )}
                        <span>serve 2 pessoas 1</span>
                        <button>Adicionar ao carrinho - R$50,90</button>
                    </ContentPop>
                    <ClosePop>
                    <img onClick={()=> {
                        SetModalAberto(false)
                        SetModalUrl(0)
                    }} src={Close} />
                    </ClosePop>
                </>
            
            </ContainerPop>
            <div className="overlay"></div>
            </Modal>
        )}
        </>
    );
}

export default RestaurantProfile;