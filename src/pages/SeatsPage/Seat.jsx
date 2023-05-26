import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Seat(props) {
    const { seat, selected, setSelected } = props;
    const [border, setBorder] = useState()
    const [color, setColor] = useState()

    useEffect(() =>{
        switch (seat.isAvailable) {
            case true:
                setBorder('blue')
                setColor('lightblue')
                break;
        
            default:
                setBorder('#F7C52B')
                setColor('#FBE192')
                break;
        }
    }, []
    );

    function isAvailable(){
        if (seat.isAvailable == false) {
            alert("Esse assento não está disponível")
        }
    }
 
    function toggleSelect(seat){
        if (seat.isAvailable == true) {
            //verifica se está disponivel
            if (color == "lightblue") {
                setBorder("#0E7D71")
                setColor("#1AAE9E")
                setSelected(selected => [...selected, seat])
            }
            //verifica se está selecionado
            if (color == "#1AAE9E" && confirm("Gostaria de remover o assento e apagar os dados?")) {
                setBorder("blue")
                setColor("lightblue")
                setSelected(selected => selected.filter(selected => selected.id !== seat.id));
                
            }
        }
    }
    //testando se está selecionando direito
    /** useEffect(() => {
        console.log(selected);
    }, [selected]);*/

    function handleClick(seat){
        isAvailable()
        toggleSelect(seat)
    }

    return (
        <SeatItem color={color} border={border} onClick={() =>handleClick(seat)} data-test="seat">
            {seat.name}
        </SeatItem>
    );
  }

  const SeatItem = styled.div`
    border: 1px solid ${props => props.border};          // Essa cor deve mudar
    background-color: ${props => props.color};           // Essa cor deve mudar
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