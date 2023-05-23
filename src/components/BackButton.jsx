import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }
  return (
    <Btn><ion-icon name="arrow-back-outline" onClick={() => navigate(-1)}></ion-icon></Btn>
  );
}

const Btn = styled.button`
    display: flex;
    left: 10px;
    background: transparent;
    color: Black;
    .icon {
        font-size: 50px;
        }
`;

