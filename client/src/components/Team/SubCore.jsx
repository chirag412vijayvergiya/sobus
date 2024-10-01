import React from 'react';
import styled from 'styled-components';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import ProfileCard from './ProfileCard';

const SubCore = ({ Team }) => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    } else {
      current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <SuCore>
      <Members className="images_container" ref={scrollRef}>
        {Team.map(
          (Person, index) =>
            index !== 0 && (
              <div className="images_card">
                <ProfileCard Person={Person} key={index} />
              </div>
            ),
        )}
      </Members>
      <div className="arrow">
        <button>
          <BsArrowLeftShort
            className="arrow-icon"
            onClick={() => scroll('left')}
          />
        </button>
        <button>
          <BsArrowRightShort
            className="arrow-icon"
            onClick={() => scroll('right')}
          />
        </button>
      </div>
    </SuCore>
  );
};

export default SubCore;

const SuCore = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;
  .images_container::-webkit-scrollbar {
    display: none;
  }

  .arrow {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    position: absolute;
    @media (max-width: 756px) {
      display: none;
    }
  }

  button {
    border: none;
    background-color: var(--bg);
  }

  .arrow-icon {
    background-color: var(--bg);
    color: var(--nav-links);
    border: 1px solid lightgrey;
    border-radius: 5px;
    box-shadow: 0 0 12px 0 #9b9595;
    font-size: 2rem;
    cursor: pointer;
    border-radius: 5px;
  }

  .arrow-icon:hover,
  .arrow-icon:focus {
    transition: all 0.2s ease-in-out;
    background-color: #eaecee;
    font-size: 2.5rem;
    color: black;
  }
`;

const Members = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: 0 2rem;

  .images_card {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;
