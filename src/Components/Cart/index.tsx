import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lixo from "../../../public/img/excluir.png";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
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
  const [purchase, { data }] = usePurchaseMutation();
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart);
  const dispatch = useDispatch();
  const handleGoHome = () => {
    navigate('/'); // Navega para a página inicial
};
const navigate = useNavigate();
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

  // Use o hook useNavigate para criar a função

  const restaurant = restaurantMap[restaurantId];
  const [itensSacola, setItensSacola] = useState(false);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);
  const [isCheckoutCardVisible, setCheckoutCardVisible] = useState(false);
  const [isFinalizVisible, setFinalizVisible] = useState(false);
  const [isValorSome, setIsValrSome] = useState(false);

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
        .min(5, "O nome precisa ter pelo menos 5 caracteres")
        .required("Obrigatório"),
      endereco: yup.string().required("Obrigatório"),
      city: yup.string().required("Obrigatório"),
      CEP: yup
        .string()
        .matches(/^\d{2}\.\d{3}-\d{3}$/, "CEP deve estar no formato 99.999-999")
        .required("Obrigatório"),
      numero: yup.number().required("Obrigatório"),
      complemento: yup.string().min(7, "Inválido"),
      fullNameCard: yup
        .string()
        .min(5, "O nome precisa ter pelo menos 5 caracteres")
        .required("Obrigatório"),
      fullNumberCard: yup
        .string()
        .matches(
          /^\d{4} \d{4} \d{4} \d{4}$/,
          "NumberCard deve estar no formato 9999 9999 9999 9999"
        )
        .required("Obrigatório"),
      CVC: yup
      .string()
      .matches(/^\d{3}$/, "CVV deve ter 3 dígitos")
      .required("Obrigatório"),
      AnoVencimento: yup
        .string()
        .matches(/^\d{2}$/, "deve ter 2dígitos")
        .required("Obrigatório"),
      MesVencimento: yup
        .string()
        .matches(/^\d{2}$/, "deve ter 2dígitos")
        .required("Obrigatório"),
    }),
    onSubmit: (values) => {
      // Esta função é chamada quando o formulário é submetido.
      purchase({
        delivery: {
          receiver: values.fullName,
          address: {
            description: values.endereco,
            city: values.city,
            zipCode: values.CEP,
            number: Number(values.numero),
            complement: values.complemento,
          },
        },
        payment: {
          card: {
            name: values.fullNameCard,
            number: values.fullNumberCard,
            code: Number(values.CVC),
            expires: {
              month: Number(values.MesVencimento),
              year: Number(values.AnoVencimento),
            },
          },
        },
        products: [
          {
            id: 1,
            price: 100,
          },
        ],
      })
        .unwrap()
        .then((response) => {
          console.log("Compra realizada com sucesso:", response);
          // Você pode adicionar lógica para redirecionar ou mostrar uma mensagem de sucesso aqui.
        })
        .catch((error) => {
          console.error("Erro ao realizar a compra:", error);
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
    setIsValrSome(true);
  };

  const handleContinueToPayment = () => {
    setCheckoutVisible(false);
    setCheckoutCardVisible(true);
    setFinalizVisible(false);
    setIsValrSome(false);
  };

  const handleFinalizeOrder = () => {
    form.handleSubmit(); // Submete o formulário, acionando o onSubmit
    setCheckoutVisible(false);
    setCheckoutCardVisible(false);
    setFinalizVisible(true);
    setIsValrSome(true);
  };

  const getErrorMessage = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched;
    const isInvalid = fieldName in form.errors;

    if (isTouched && isInvalid) return message;
    return "";
  };

  const FullNamesdsd = () => {
    const { fullName, endereco, city, CEP, numero } = form.values;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!fullName || !endereco || !city || !CEP || !numero) {
      alert("Preencha todos os campos obrigatórios do formulário");
      return;
    }

    handleContinueToPayment();
  };

  const FullFinaly = async () => {
    const { fullNameCard, fullNumberCard, CVC, MesVencimento, AnoVencimento } =
      form.values;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (
      !fullNameCard ||
      !fullNumberCard ||
      !CVC ||
      !MesVencimento ||
      !AnoVencimento
    ) {
      alert("Preencha todos os campos obrigatórios do formulário");
      return;
    }

    // Chama o método POST
    try {
      const response = await purchase({
        delivery: {
          receiver: form.values.fullName,
          address: {
            description: form.values.endereco,
            city: form.values.city,
            zipCode: form.values.CEP,
            number: Number(form.values.numero),
            complement: form.values.complemento,
          },
        },
        payment: {
          card: {
            name: fullNameCard,
            number: fullNumberCard,
            code: Number(CVC),
            expires: {
              month: Number(MesVencimento),
              year: Number(AnoVencimento),
            },
          },
        },
        products: [
          {
            id: 1, // Substitua pelo ID do produto real
            price: 100, // Substitua pelo preço real
          },
        ],
      }).unwrap();

      // Se a requisição for bem-sucedida, exibe a resposta
      console.log("Compra realizada com sucesso:", response);

      // Atualiza a visibilidade do finalizador
      setFinalizVisible(true);
    } catch (error) {
      console.error("Erro ao realizar a compra:", error);
      alert("Houve um erro ao realizar a compra. Tente novamente.");
    }
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
          <Deli className={isValorSome ? "visivel" : ""}>
            <h3>Valor total</h3>
            <span>R$ {getTotalPrice()}</span>
          </Deli>
          <Botao
            className={itensSacola ? "visivel" : ""}
            onClick={() => {
              handleContinueToDelivery();
              setCheckoutVisible(true);
              setItensSacola(true);
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
                <InputMask
                  id="CEP"
                  type="text"
                  name="CEP"
                  value={form.values.CEP}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  mask="99.999-999"
                />
                <small>{getErrorMessage("CEP", form.errors.CEP)}</small>
              </div>
              <div>
                <label htmlFor="numero">Número</label>
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
            <small>
              {getErrorMessage("complemento", form.errors.complemento)}
            </small>
          </form>

          <ContanerBotao>
            <button onClick={FullNamesdsd}>Continuar com o pagamento</button>
            <button
              onClick={() => {
                setCheckoutVisible(false);
                setItensSacola(true);
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
            <small>
              {getErrorMessage("fullNameCard", form.errors.fullNameCard)}
            </small>

            <div>
              <div>
                <label htmlFor="fullNumberCard">Número do Cartão</label>
                <InputMask
                  id="fullNumberCard"
                  type="text"
                  name="fullNumberCard"
                  value={form.values.fullNumberCard}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  mask="9999 9999 9999 9999"
                />
                <small>
                  {getErrorMessage(
                    "fullNumberCard",
                    form.errors.fullNumberCard
                  )}
                </small>
              </div>
              <div>
                <label htmlFor="CVC">CVV</label>
                <InputMask
                  id="CVC"
                  type="text"
                  name="CVC"
                  value={form.values.CVC}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  mask="999"
                />
                <small>{getErrorMessage("CVC", form.errors.CVC)}</small>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="MesVencimento">Mês de Vencimento</label>
                <InputMask
                  id="MesVencimento"
                  type="text"
                  name="MesVencimento"
                  value={form.values.MesVencimento}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  mask="99"
                />
                <small>
                  {getErrorMessage("MesVencimento", form.errors.MesVencimento)}
                </small>
              </div>
              <div>
                <label htmlFor="AnoVencimento">Ano de Vencimento</label>
                <InputMask
                  id="AnoVencimento"
                  type="text"
                  name="AnoVencimento"
                  value={form.values.AnoVencimento}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  mask="99"
                />
                <small>
                  {getErrorMessage("AnoVencimento", form.errors.AnoVencimento)}
                </small>
              </div>
            </div>
          </form>

          <ContanerBotao>
            <button
              onClick={() => {
                FullFinaly();
                handleFinalizeOrder();
              }}
            >
              Finalizar pagamento
            </button>
            <button
              onClick={() => {
                setCheckoutCardVisible(false);
                setCheckoutVisible(true);
              }}
            >
              Voltar para a edição de endereço
            </button>
          </ContanerBotao>
        </CheckoutCard>

        <Finalidy className={isFinalizVisible ? "" : "visivel"}>
          <h3>Pedido realizado - {data?.orderId}</h3>
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
                handleGoHome()
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
