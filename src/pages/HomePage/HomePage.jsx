import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  console.log("Dark mode em:", darkMode)

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = "Bih7oJ1on6MJflYVuhZlVsqI";
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v8/cineflex/movies"
    );

    promise.then((res) => {
      setCards(res.data);
    });
  }, []);

  return (
    <PageContainer darkMode={darkMode}>
      Selecione o filme
      <ListContainer>
        {cards.map((card) => (
            <Link to={`/sessoes/${card.id}`} key={card.id}>
                <MovieContainer data-test="movie">
                    <Card imgURL={card.posterURL} />
                </MovieContainer>
             </Link>
        ))}
      </ListContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color:  ${props => props.darkMode ? '#000000' : '#293845'};
  margin-top: 30px;
  padding-top: 70px;
`;
const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;
const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #000000;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
