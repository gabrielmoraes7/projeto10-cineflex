import styled from "styled-components";

export default function Card(props){
    const {imgURL} = props;

    return(
        <Poster src={imgURL} alt="poster" />
    );
}

const Poster = styled.img`
    max-width: 100%;
    height: auto;
    display: block;
`;