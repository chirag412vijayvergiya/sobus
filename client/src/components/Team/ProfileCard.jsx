import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function ProfileCard({ Person }) {
  return (
    <div>
      {Person.name && (
        <Container>
          <Image>
            <img src={Person.image} alt={Person.name} />
          </Image>
          <p id="p_name">{Person.name}</p>
          {Person.role ? <p>{Person.role}</p> : <p>MPSTME Shirpur</p>}
          <SocialAccounts>
            {Person.linkedin && (
              <a href={Person.linkedin} id="linkedin-a">
                <FontAwesomeIcon id="linkedin" icon={faLinkedin} />
              </a>
            )}
            {Person.insta && (
              <a href={Person.insta} id="insta-a">
                <FontAwesomeIcon id="insta" icon={faInstagram} />
              </a>
            )}
          </SocialAccounts>
        </Container>
      )}
    </div>
  );
}

export default ProfileCard;

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--nav-links);
  background-color: var(--bg);
  padding: 20px;
  width: 300px;
  border: 1px solid lightgrey;
  font-weight: 600;
  border-radius: 5px;
  box-shadow: 0 0 12px 0 #9b9595;
  p {
    text-align: center;
    font-size: 0.9em;
  }
  #p_name {
    font-size: 1.2em;
  }
  @media (max-width: 500px) {
    width: fit-content;
  }
`;
const Image = styled.div`
  img {
    width: 175px;
    height: 175px;
    border-radius: 50%;
    object-fit: cover;
  }
`; //object-fit: contain;
const SocialAccounts = styled.div`
  display: flex;
  justify-content: center;
  a {
    cursor: pointer;
    padding: 3px 5px;
    margin: 3px;
    border-radius: 3px;
    font-size: 1.3em;
  }
  a:hover {
    transform: scale(1.2, 1.2);
    padding-right: 7px;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  #insta-a {
    border: 1px solid rgb(230, 99, 121);
  }
  #linkedin-a {
    border: 1px solid #0072b1;
  }
  #insta {
    color: rgb(230, 99, 121);
  }
  #linkedin {
    color: #0072b1;
  }
`;
