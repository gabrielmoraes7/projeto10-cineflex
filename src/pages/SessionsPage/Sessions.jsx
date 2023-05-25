import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sessions(props) {
    const { cardDay } = props;
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem('darkMode')) || false;
      });
      console.log("Dark mode em:", darkMode)
  
    return (
      <SessionContainer >
        {cardDay.map((card) => (
          <div key={card.id} darkMode={darkMode} data-test="movie-day">
            <h2>{card.weekday} - {card.date}</h2>
            <ButtonsContainer darkMode={darkMode}>
              {card.showtimes.map((showtime) => (
                <Link to={`/assentos/${showtime.id}`} key={showtime.id}>
                  <button data-test="showtime">{showtime.name}</button>
                </Link>
              ))}
            </ButtonsContainer>
          </div>
        ))}
      </SessionContainer>
    );
  }

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0; 
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: ${props => props.darkMode ? '#000000' : '#293845'};
    padding: 0 20px;
`