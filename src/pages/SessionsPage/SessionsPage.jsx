import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sessions from "./Sessions";

export default function SessionsPage() {
    const { idFilme } = useParams();
    const film = idFilme;
    const [cardDay, setCards] = useState(film.days);
    const [infoMovie, setInfoMovie] = useState();
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem('darkMode')) || false;
      });
      console.log("Dark mode em:", darkMode)

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = "Bih7oJ1on6MJflYVuhZlVsqI";
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`
    );

    promise.then((res) => {
      setCards(res.data.days)
      setInfoMovie(res)
    });
  }, []);

    return (

        <PageContainer darkMode={darkMode}>
            Selecione o horário
            <div>
            {
            cardDay 
            ? 
            <Sessions cardDay={cardDay} />  
            : null
            }
            </div>

            <>              
                {
                    infoMovie 
                    ?  
                    <FooterContainer darkMode={darkMode} data-test="footer" >
                        <div >
                            <img src={infoMovie.data.posterURL} alt="poster" />
                        </div>
                        <div>
                            <p>{infoMovie.data.title}</p>
                        </div>
                    </ FooterContainer>
                    : null

                }
                
            </>
        </PageContainer>    

        /** 
        <PageContainer>
            Selecione o horário
            <div>
                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                        <button>14:00</button>
                        <button>15:00</button>
                    </ButtonsContainer>
                </SessionContainer>

                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                        <button>14:00</button>
                        <button>15:00</button>
                    </ButtonsContainer>
                </SessionContainer>

                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                        <button>14:00</button>
                        <button>15:00</button>
                    </ButtonsContainer>
                </SessionContainer>
            </div>

            <FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                </div>
            </FooterContainer>

        </PageContainer>
        */
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: ${props => props.darkMode ? '#000000' : '#293845'};
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
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
        background-color: ${props => props.darkMode ? '#3c3c3c' : 'white'};;
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