import Product from "../Product";
import { Container, List } from "./style";
import Sushi from '../../../public/img/Sushi.png'
import Massa from '../../../public/img/massa.png'
import Humburgues from '../../../public/img/hamburgues.jpeg'
import Vinho from '../../../public/img/restauranteVinheto.jpeg'
import Picacha from '../../../public/img/Picanha.jpeg'
import Sorvete from '../../../public/img/Sorvete.jpeg'
const ProcutsList = () => (
    <Container>
        <List>
            <Product 
                id={1} 
                image={Sushi}
                infos='Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida. Experimente o Japão sem sair do lar com nosso delivery!'
                nota="4.9"
                title="Shushi shoio"
                category="Japonesa"
                category2="Destaque da semana"
            />
            <Product 
                id={2} 
                image={Massa} 
                infos='A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!' 
                nota="4.5" 
                title="Massa com molho" 
                category="italiana"
            />
            <Product 
                id={3} 
                image={Humburgues}
                infos='Hamburgueria JSX é uma hamburgueria moderna que oferece hambúrgueres suculentos feitos com ingredientes frescos. O ambiente descontraído é ideal para uma refeição saborosa e casual, com opções clássicas e criações exclusivas.' 
                nota="4.8" 
                title="Hamburgueria JSX" 
                category="Carne Boa"
            />
            <Product 
                id={4} 
                image={Vinho} 
                infos='Na Vinheto tem uma variedades de vinhos, soda e chop avontade, primeiro restaurante na america latina onde o foco é as bebidas.' 
                nota="5" 
                title="Vinheto" 
                category="Vinho"
                category2="Destaque da semana"
            />
            <Product 
                id={5} 
                image={Picacha}
                infos='Picanha do Zé é um restaurante que celebra o melhor da picanha, servindo cortes suculentos e perfeitamente grelhados. Com um ambiente acolhedor e rústico, o local é ideal para os amantes de carne que buscam uma experiência autêntica e saborosa.' 
                nota="3.9" 
                title="Picacha do zé" 
                category="Carne"
            />
            <Product 
                id={6} 
                image={Sorvete}
                infos='Gelato Delícia é uma sorveteria encantadora que oferece uma variedade de gelatos artesanais e sorvetes cremosos. Com um ambiente colorido e alegre, é o lugar perfeito para desfrutar de sabores inovadores e clássicos em um clima descontraído e prazeroso.' 
                nota="4.6" 
                title="Gelato Delícia" 
                category="Sorvete"
            />
        </List>
    </Container>
);

export default ProcutsList;
