import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Sessions(props) {
    const { cardDay } = props;
  
    return (
      <SessionContainer>
        {cardDay.map((card) => (
          <div key={card.id}>
            <h2>{card.weekday} - {card.date}</h2>
            <ButtonsContainer>
              {card.showtimes.map((showtime) => (
                <Link to={`/assentos/${showtime.id}`} key={showtime.id}>
                  <button>{showtime.name}</button>
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
    color: #293845;
    padding: 0 20px;
`