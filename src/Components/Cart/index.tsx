import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lixo from "../../../public/img/excluir.png";
import {
  Botao,
  Checkout,
  CheckoutCard,
  ContainerClose,
  ContainerPop,
  ContainerPrato,
  ContainerSobre,
  ContanerBotao,
  Deli,
  DisplayNone,
  Finalidy,
  IMG,
  Overlay,
} from "./style";
import { RootReducer } from "../../store";
import { close, remove } from "../../store/reducers/cart";
import { useGetFeatureRestQuery, usePurchaseMutation } from "../../Service/api";
import { useParams } from "react-router-dom";
import { RestaurantersApi } from "../ProductList";
import { useFormik } from "formik";
import * as yup from "yup";
const Cart = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = parseInt(id || "0"); 
  const [purchese ,] = usePurchaseMutation()
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart);
  const dispatch = useDispatch();

  const { data: restaurantes } = useGetFeatureRestQuery();

  const restaurantMap = Array.isArray(restaurantes)
    ? restaurantes.reduce<Record<number, RestaurantersApi>>(
        (map, restaurant) => {
          map[restaurant.id] = restaurant;
          return map;
        },
        {}
      )
    : {};

  const restaurant = restaurantMap[restaurantId];
  const [itensSacola, setItensSacola] = useState(false);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);
  const [isCheckoutCardVisible, setCheckoutCardVisible] = useState(false);
  const [isFinalizVisible, setFinalizVisible] = useState(false);

  const form = useFormik({
    initialValues: {
      fullName: "",
      endereco: "",
      city: "",
      CEP: "",
      numero: "",
      complemento: "",
      fullNameCard: "",
      fullNumberCard: "",
      CVC: "",
      AnoVencimento: "",
      MesVencimento: "",
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .min(5, "o nome precisa ter pelo menos 5 caracteres")
        .required("obrigadorio"),
        endereco: yup.string().required("obrigadorio"),
      city: yup.string().required("obrigadorio"),
      CEP: yup
        .number()
        .min(6, "Cep Obrigadorio")
        .required("obrigadorio"),
      numero: yup.number().required("obrigadorio"),
      complemento: yup.string().min(7, "invalido"),
      fullNameCard: yup
        .string()
        .min(5, "o nome precisa ter pelo menos 5 caracteres")
        .required("obrigadorio"),
      fullNumberCard: yup
        .number()
        .min(18, "Obrigadorio")
        .required("obrigadorio")
        .max(18),
      CVC: yup.number().min(3, "Obrigadorio").required("obrigadorio").max(3),
      AnoVencimento: yup
        .number()
        .min(2, "Obrigadorio")
        .required("obrigadorio")
        .max(2),
      MesVencimento: yup
        .number()
        .min(2, "Obrigadorio")
        .required("obrigadorio")
        .max(2),
    }),
    onSubmit: (values) => {
        purchese({
            products: [], 
            delivery: {
                receiver: values.fullName,
                address: { 
                    city: values.city,
                    zipCode: values.CEP,
                    number: Number(values.numero),
                    complement: values.complemento,
                    description: values.endereco
                }   
            },
            payment: {
                card: {
                    name: values.fullNameCard,
                    number: values.fullNumberCard,
                    code: Number(values.CVC),
                    expires: {
                        month: Number(values.MesVencimento),
                        year: Number(values.AnoVencimento)
                    }
                }
            },
        });
    },
  });

  if (!restaurant) {
    return <h1>Restaurante não encontrado</h1>;
  }

  const cardapio = restaurant.cardapio;

  const getTotalPrice = () => {
    return items
      .reduce((acumulador, item) => {
        const prato = cardapio.find((c) => c.id === item.id);
        return prato ? acumulador + prato.preco : acumulador;
      }, 0)
      .toFixed(2);
  };

  const RemoveItem = (id: number) => {
    dispatch(remove(id));
  };

  const handleContinueToDelivery = () => {
    setCheckoutVisible(false);
    setCheckoutCardVisible(false);
    setFinalizVisible(false);
  };

  const handleContinueToPayment = () => {
    setCheckoutVisible(false);
    setCheckoutCardVisible(true);
    setFinalizVisible(false);
  };

  const handleFinalizeOrder = () => {
    setCheckoutVisible(false);
    setCheckoutCardVisible(false);
    setFinalizVisible(true);
  };

  const getErrorMessage = (fieldName: string, massage?: string) => {
    const isTouched = fieldName in form.touched;
    const isInvalid = fieldName in form.errors;

    if (isTouched && isInvalid) return massage;
    return "";
  };
  return (
    <DisplayNone className={isOpen ? "visivel" : ""}>
      <Overlay onClick={() => dispatch(close())}></Overlay>
      <ContainerPop>
        <ul className={itensSacola ? "visivel" : ""}>
          {items.map((item) => {
            const prato = cardapio.find((c) => c.id === item.id);
            return prato ? (
              <li key={item.id}>
                <ContainerPrato>
                  <img src={prato.foto} alt={prato.nome} />
                </ContainerPrato>
                <ContainerSobre>
                  <h3>{prato.nome}</h3>
                  <span>R$ {prato.preco.toFixed(2)}</span>
                </ContainerSobre>
                <ContainerClose onClick={() => RemoveItem(item.id)}>
                  <IMG src={lixo} alt="Remover item" />
                </ContainerClose>
              </li>
            ) : null;
          })}
        </ul>
        <div>
          <Deli className="">
            <h3>Valor total</h3>
            <span>R$ {getTotalPrice()}</span>
          </Deli>
          <Botao
            className={itensSacola ? "visivel" : ""}
            onClick={() => {
              handleContinueToDelivery();
              setCheckoutVisible(true);
              setItensSacola(true);
            //   activePayment()

            }}
          >
            Continuar com a entrega
          </Botao>
        </div>
        <Checkout className={isCheckoutVisible ? "" : "visivel"}>
          <h3>Entrega</h3>
          <form onSubmit={form.handleSubmit}>
            <label htmlFor="fullName">Quem vai receber</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={form.values.fullName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage("fullName", form.errors.fullName)}</small>

            <label htmlFor="endereco">Endereço</label>
            <input
              id="endereco"
              type="text"
              name="endereco"
              value={form.values.endereco}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage("endereco", form.errors.endereco)}</small>
            <label htmlFor="city">Cidade</label>
            <input
              id="city"
              type="text"
              name="city"
              value={form.values.city}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage("city", form.errors.city)}</small>
            <div>
              <div>
                <label htmlFor="CEP">CEP</label>
                <input
                  id="CEP"
                  type="number"
                  name="CEP"
                  value={form.values.CEP}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage("CEP", form.errors.CEP)}</small>
              </div>
              <div>
                <label htmlFor="numero">Numero</label>
                <input
                  id="numero"
                  type="number"
                  name="numero"
                  value={form.values.numero}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage("numero", form.errors.numero)}</small>
              </div>
            </div>
            <label htmlFor="complemento">Complemento (opcional)</label>
            <input
              id="complemento"
              type="text"
              name="complemento"
              value={form.values.complemento}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage("complemento", form.errors.complemento)}</small>
          </form>
          <ContanerBotao>
            <button type="submit" onClick={handleContinueToPayment} >
              Continuar com o pagamento
            </button>
            <button type="submit"
              onClick={() => {
                setCheckoutVisible(false);
                setItensSacola(false);
                setCheckoutVisible(false);
                // activeConfirmed()
              }}
            >
              Voltar para o carrinho
            </button>
          </ContanerBotao>
        </Checkout>

        <CheckoutCard className={isCheckoutCardVisible ? "" : "visivel"}>
          <form onSubmit={form.handleSubmit}>
            <label htmlFor="fullNameCard">Nome do Cartão</label>
            <input
              id="fullNameCard"
              type="text"
              name="fullNameCard"
              value={form.values.fullNameCard}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage("fullNameCard", form.errors.fullNameCard)}</small>
            <div>
              <div>
                <label htmlFor="fullNumberCard">Numero do cartao</label>
                <input
                  id="fullNumberCard"
                  type="number"
                  name="fullNumberCard"
                  value={form.values.fullNumberCard}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage("fullNumberCard", form.errors.fullNumberCard)}</small>
              </div>
              <div>
                <label htmlFor="CVC">CVV</label>
                <input
                  id="CVC"
                  type="number"
                  name="CVC"
                  value={form.values.CVC}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage("CVC", form.errors.CVC)}</small>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="MesVencimento">Mes de vencimento</label>
                <input
                  id="MesVencimento"
                  type="number"
                  name="MesVencimento"
                  value={form.values.MesVencimento}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage("MesVencimento", form.errors.MesVencimento)}</small>
              </div>
              <div>
                <label htmlFor="AnoVencimento">Ano de vencimento</label>
                <input
                  id="AnoVencimento"
                  type="number"
                  name="AnoVencimento"
                  value={form.values.AnoVencimento}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage("AnoVencimento", form.errors.AnoVencimento)}</small>
              </div>
            </div>
          </form>
          <ContanerBotao>
            <button onClick={handleFinalizeOrder}>Finalizar pagamento</button>
            <button
              onClick={() => {
                setCheckoutVisible(true);
                setCheckoutCardVisible(false);
              }}
            >
              Voltar para a edição de endereço
            </button>
          </ContanerBotao>
        </CheckoutCard>

        <Finalidy className={isFinalizVisible ? "" : "visivel"}>
          <h3>Pedido realizado - {restaurant.id}</h3>
          <p>
            Estamos felizes em informar que seu pedido já está em processo de
            preparação e, em breve, será entregue no endereço fornecido.
          </p>
          <p>
            Gostaríamos de ressaltar que nossos entregadores não estão
            autorizados a realizar cobranças extras.
          </p>
          <p>
            Lembre-se da importância de higienizar as mãos após o recebimento do
            pedido, garantindo assim sua segurança e bem-estar durante a
            refeição.
          </p>
          <p>
            Esperamos que desfrute de uma deliciosa e agradável experiência
            gastronômica. Bom apetite!
          </p>
          <ContanerBotao>
            <button
              onClick={() => {
                setFinalizVisible(false);
                dispatch(close());

              }}
            >
              Concluir
            </button>
          </ContanerBotao>
        </Finalidy>
      </ContainerPop>
    </DisplayNone>
  );
};

export default Cart;
