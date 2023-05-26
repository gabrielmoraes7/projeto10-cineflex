    import { useState, useEffect } from "react";
    import styled from "styled-components";
    import { useParams, useNavigate } from "react-router-dom";
    import axios from "axios";
    import Seat from "./Seat";
    import { Link } from "react-router-dom";


    export default function SeatsPage() {
        const navigate = useNavigate();
        const { idSessao } = useParams()
        const [movieInfo, setMovieInfo] = useState([])
        const [sessionInfo, setSessionInfo] = useState([])
        const [seats, setSeats]  = useState([])
        const [selected, setSelected] = useState([])
        const [compradores, setCompradores] = useState([]);
        const [hour, setHour] = useState([]);
        const [darkMode, setDarkMode] = useState(() => {
            return JSON.parse(localStorage.getItem('darkMode')) || false;
          });
        const [data, setData] = useState([{
            nameFilme:'',
            date:'',
            hour:'',
            seat:{}, 
            nameBuyer:'',
            cpf:''
        }]);  
          useEffect(() => {
            const handleStorageChange = () => {
              const darkModeValue = JSON.parse(localStorage.getItem('darkMode')) || false;
              setDarkMode(darkModeValue);
            };
        
            window.addEventListener('storage', handleStorageChange);
            return () => {
                window.removeEventListener('storage', handleStorageChange);
              };
            }, []);
        
          
          
        useEffect(() => {
            axios.defaults.headers.common["Authorization"] = "Bih7oJ1on6MJflYVuhZlVsqI";
            const promise = axios.get(
            `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
            );
        
            promise.then((res) => {
                setMovieInfo(res.data.movie)
                setSeats(res.data.seats)
                setSessionInfo(res.data.day)
                setHour(res.data.name)
                console.log("recebeu os dados!")
            });
            promise.catch((error) => {
                console.log(error);
            })
        }, []);

        useEffect(() => {
          console.log(data);
         }, [data]);

        function handleInputChange(event, index) {
            const { name, value } = event.target;
            setCompradores(compradores => {
              const newCompradores = [...compradores];
              if (index === undefined) {
                newCompradores[0] = { ...newCompradores[0], [name]: value };
              } else {
                newCompradores[index] = { ...newCompradores[index], [name]: value };
              }
              return newCompradores;
            });
          }
          
          function handleSubmit(event) {
            event.preventDefault();
            const banco = seats.find(seat => seat.id === compradores[0].idAssento);            
            const name = compradores[0].nome;
            const cpf = compradores[0].cpf;
            const ids = selected.map(seat => seat.id);
            const numSeat = selected.map(seat => seat.name);
            const nameFilme = movieInfo.title;
            const date = sessionInfo.date;
            const seat = numSeat;

            const data = {
              nameFilme: movieInfo.title,
              date: sessionInfo.date,
              hour: hour,
              seat: numSeat,
              nameBuyer: compradores[0].nome,
              cpf: compradores[0].cpf
            };
            
            console.log(data);
            
            axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', {
            ids,
            name,
            cpf
            }).then(res => {
            console.log("mandou")
            navigate('/sucesso', { state: data });
            console.log(data)
            })
            .catch(error => {
            console.error(error);
            });
           }
           
           
        

        useEffect(() => {
            setCompradores(selected.map(seat => ({ idAssento: seat.id })));
        }, [selected]);
        
        return (
            <PageContainer darkMode={darkMode}>
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

                <CaptionContainer darkMode={darkMode}>
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

                <FormContainer onSubmit={handleSubmit} >
                <form>
                <p>Nome do Comprador:</p>
                <input 
                name="nome" 
                type="text"
                placeholder="Digite seu nome..." 
                value={compradores[0]?.nome || ''}
                onChange={event => handleInputChange(event, 0)}
                data-test="client-name"
                required
                />

                <p>CPF do Comprador:</p>
                <input 
                name="cpf" 
                type="number"
                placeholder="Digite seu CPF..." 
                value={compradores[0]?.cpf || ''}
                onChange={event => handleInputChange(event, 0)}
                data-test="client-cpf"
                required
                />
                <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
                </form>
                </FormContainer>



                <FooterContainer darkMode={darkMode} data-test="footer">
                    <div>
                        <img src={movieInfo.posterURL} alt="poster" />
                    </div>
                    <div>
                        <p>{movieInfo.title}</p>
                        <p>{sessionInfo.weekday} - {hour}</p>
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
        color: ${props => props.darkMode ? '#000000' : '#293845'};
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
        background-color: ${props => props.darkMode ? '#212121' : '#C3CFD9'};
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