    import { useState, useEffect } from "react";
    import styled from "styled-components";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import Seat from "./Seat";
    import { Link } from "react-router-dom";


    export default function SeatsPage() {
        const { idSessao } = useParams()
        const [movieInfo, setMovieInfo] = useState([])
        const [sessionInfo, setSessionInfo] = useState([])
        const [seats, setSeats]  = useState([])
        const [selected, setSelected] = useState([])
        const [compradores, setCompradores] = useState([]);
        
        console.log(idSessao);
        useEffect(() => {
            axios.defaults.headers.common["Authorization"] = "Bih7oJ1on6MJflYVuhZlVsqI";
            const promise = axios.get(
            `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
            );
        
            promise.then((res) => {
                setMovieInfo(res.data.movie)
                setSeats(res.data.seats)
                setSessionInfo(res.data.day)
            });
        }, []);

        function handleInputChange(event, index) {
            const { name, value } = event.target;
            setCompradores(compradores => {
              const newCompradores = [...compradores];
              newCompradores[index] = { ...newCompradores[index], [name]: value };
              return newCompradores;
            });
          }
          
          function handleSubmit(event) {
            event.preventDefault();
            const ids = selected.map(seat => seat.id);
            axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', {
              ids,
              compradores: compradores.map(comprador => ({
                idAssento: comprador.idAssento,
                nome: comprador.nome,
                cpf: comprador.cpf
              }))
            });
          }
        

        useEffect(() => {
            setCompradores(selected.map(seat => ({ idAssento: seat.id })));
        }, [selected]);
        
        return (
            <PageContainer>
                Selecione o(s) assento(s)

                <SeatsContainer>

                    {seats 
                    ? 
                        seats.map((seat) => (
                            <Seat   seat={seat} 
                                    selected={selected}
                                    setSelected={setSelected}/>
                        )
                        )
                    : null }
                </SeatsContainer>

                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle color="#1AAE9E" border="#0E7D71"/>
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle color="lightblue" border="blue"/>
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle color="#FBE192" border="#F7C52B"/>
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <FormContainer onSubmit={handleSubmit}>
                <form>
                    {
                    compradores.length < 2
                    ?
                    <>
                        <p>Nome do Comprador:</p>
                        <input 
                            name="nome" 
                            placeholder="Digite seu nome..." 
                            value={compradores.nome || ''}
                            onChange={event => handleInputChange(event, index)}
                        />

                        <p>CPF do Comprador:</p>
                        <input 
                            name="cpf" 
                            placeholder="Digite seu CPF..." 
                            value={compradores.cpf || ''}
                            onChange={event => handleInputChange(event, index)}
                        />
                    </>
                    :
                    compradores.map((comprador, index) => {
                      const seat = seats.find(seat => seat.id === comprador.idAssento);
                      return (
                        <>
                          <p>Nome do Comprador {seat.name}:</p>
                          <input
                            name="nome"
                            placeholder="Digite seu nome..."
                            value={comprador.nome || ''}
                            onChange={event => handleInputChange(event, index)}
                          />
                          
                          <p>CPF do Comprador {seat.name}:</p>
                          <input
                            name="cpf"
                            placeholder="Digite seu CPF..."
                            value={comprador.cpf || ''}
                            onChange={event => handleInputChange(event, index)}
                          />
                        </>
                      );
                    })
                  }
                    
                    <Link to={`/sucesso`} >
                    <button type="submit">Reservar Assento(s)</button>
                    </Link> 
                </form>
                </FormContainer>


                <FooterContainer>
                    <div>
                        <img src={movieInfo.posterURL} alt="poster" />
                    </div>
                    <div>
                        <p>{movieInfo.title}</p>
                        <p>{sessionInfo.weekday} - {sessionInfo.date}</p>
                    </div>
                </FooterContainer>

            </PageContainer>
        )
    }

    const PageContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'Roboto';
        font-size: 24px;
        text-align: center;
        color: #293845;
        margin-top: 30px;
        padding-bottom: 120px;
        padding-top: 70px;
    `
    const SeatsContainer = styled.div`
        width: 330px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    `
    const FormContainer = styled.div`
        width: calc(100vw - 40px); 
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 20px 0;
        font-size: 18px;
        button {
            align-self: center;
        }
        input {
            width: calc(100vw - 60px);
        }
    `
    const CaptionContainer = styled.div`
        display: flex;
        flex-direction: row;
        width: 300px;
        justify-content: space-between;
        margin: 20px;
    `
    const CaptionCircle = styled.div`
        border: 1px solid ${props => props.border};         // Essa cor deve mudar
        background-color: ${props => props.color};    // Essa cor deve mudar
        height: 25px;
        width: 25px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px 3px;
    `
    const CaptionItem = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
    `
    const SeatItem = styled.div`
        border: 1px solid blue;         // Essa cor deve mudar
        background-color: lightblue;    // Essa cor deve mudar
        height: 25px;
        width: 25px;
        border-radius: 25px;
        font-family: 'Roboto';
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px 3px;
    `
    const FooterContainer = styled.div`
        width: 100%;
        height: 120px;
        background-color: #C3CFD9;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 20px;
        position: fixed;
        bottom: 0;

        div:nth-child(1) {
            box-shadow: 0px 2px 4px 2px #0000001A;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            margin: 12px;
            img {
                width: 50px;
                height: 70px;
                padding: 8px;
            }
        }

        div:nth-child(2) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            p {
                text-align: left;
                &:nth-child(2) {
                    margin-top: 10px;
                }
            }
        }
    `