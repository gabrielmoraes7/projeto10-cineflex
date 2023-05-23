import styled from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import das paginas:
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import BackButton from "./components/BackButton"
import DarkMode from "./components/DarkMode";
import { useState,useEffect } from "react";


export default function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem('darkMode')) || false;
      });
    
      useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
      }, [darkMode]);
    
      function toggleDarkMode() {
        console.log('toggleDarkMode called');
        setDarkMode(darkMode => !darkMode);
        switchMode();
      }

      const [icon, setIcon] = useState('sunny-outline');

    function switchMode(){
        if (icon == 'sunny-outline') {
            setIcon('moon-outline')
        }
        if (icon == 'moon-outline') {
            setIcon('sunny-outline')
        }
    }

    return (
        <>
           

           <BrowserRouter>
           <Container darkMode={darkMode}>
           <NavContainer darkMode={darkMode}>
                <BackButton />
                CINEFLEX
                <DarkBtn onClick={toggleDarkMode}>
                    <ion-icon name={icon}>
                    </ion-icon>
                </DarkBtn>
            </NavContainer>
                
           <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/sessoes/:idFilme" element={<SessionsPage />} />
              <Route exact path="/assentos/:idSessao" element={<SeatsPage />} />
              <Route exact path="/sucesso" element={<SuccessPage />} />
            </Routes>
            </Container>
          </BrowserRouter>
            {/* <SeatsPage /> */}
            {/* <SessionsPage /> */}
            {/* <SuccessPage /> */}
        </>
    )
}

const Container = styled.div`
background-color: ${props => props.darkMode ? '#3c3c3c' : '#FFFFFF'};
`

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${props => props.darkMode ? '#212121' : '#C3CFD9'};
  color: #E8833A;
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  position: relative;
  a {
    text-decoration: none;
    color: #E8833A;
  }
`

const ModeContainer = styled.div`
position: absolute;
right: 10px;
top: 0px;
`

const DarkBtn = styled.button`
width:50px;
border-radius: 100%;
padding: 10px 5px;
transition: all 0.25s linear;
background-color: transparent;
display: flex;
right: 10px;
top: 15px;
position: absolute;
box-shadow: 0px 1px 2px 1px #000000;
`

