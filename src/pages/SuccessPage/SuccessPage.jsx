import styled from "styled-components"
import { useLocation, Link  } from "react-router-dom";

export default function SuccessPage() {
    const location = useLocation();
    console.log(location.state) 
    if (location.state) {
        const { nameFilme, date, hour, seat, nameBuyer, cpf } = location.state;
        console.log(nameFilme);
        console.log(date);
        console.log(hour);
        console.log(seat);
        console.log(nameBuyer);
        console.log(cpf);
        return (
            <PageContainer>
                <h1>Pedido feito <br /> com sucesso!</h1>
    
                <TextContainer>
                    <strong><p>Filme e sessão</p></strong>
                    <p>{location.state.nameFilme}</p>
                    <p>{date} - {hour}</p>
                </TextContainer>
    
                <TextContainer>
                    <strong><p>Ingressos</p></strong>
                    {seat?seat.map((banco) => (
                        <p>Assento {banco}</p>
                    ))
                    : null}
                </TextContainer>
    
                <TextContainer>
                    <strong><p>Comprador</p></strong>
                    <p>Nome: {nameBuyer}</p>
                    <p>CPF: {cpf}</p>
                </TextContainer>
                <Link to='/' >
                    <button data-test="go-home-btn">Voltar para Home</button>
                </Link>
            </PageContainer>
        )
        } else {
        console.log("deu ruim")
        }
    
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`