import styled from "styled-components";
import { schedule } from "../tempData";
import ScheduleBox from "../components/ScheduleBox";
import MenuButton from "../components/MenuButton";
import { useState } from "react";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled(motion.div)`
    width: min(100vw, 56.25vh);
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 2rem 0 2rem;
`;

const Topbar = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    font-weight: 900;
    margin-top: 1rem;
`;

const Scroll = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;

const GridContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding-top: 10rem;
`;

const MenuContainer = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    margin-top: 20px;
`;

const MenuList = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 2rem 0 2rem;
`;

const MenuListItem = styled.li`
    width: 100%;
    height: 10rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${({theme}) => theme.white};
    font-size: 1.5rem;
    transition: font-size 0.5s ease-in-out;
    font-weight: 300;
    
    &:hover {
        // font-size transition
        font-size: 1.7rem;
        transition: font-size 0.5s ease-in-out;
    }
`;

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <Wrapper>
            <Container animate={{backgroundColor: isOpen ? "#111" : "#fff"}}>
                {/* Topbar */}
                <Topbar>
                    <Title animate={{color: isOpen ? "#fff" : "#111"}}>LCG</Title>
                    <MenuContainer onClick={() => setIsOpen(!isOpen)}>
                        <MenuButton 
                            isOpen={isOpen}
                            color={isOpen ? "#fff" : "#111"}
                        />
                    </MenuContainer>
                </Topbar>
                {isOpen ?
                // If the menu is open, show the menu list
                <MenuList>
                    <MenuListItem>경기 현황</MenuListItem>
                    <MenuListItem>팀 관리</MenuListItem>
                    <MenuListItem>일정 관리</MenuListItem>
                </MenuList>
                :
                // If the menu is closed, show the homepage contents
                <Scroll>
                    <GridContainer>
                        {schedule.map((item, index) => (
                            <ScheduleBox key={index} date={item.date} data={item.data} state={item.state} />
                        ))}
                    </GridContainer>
                </Scroll>
                }    

            </Container>
        </Wrapper>
    );
}

export default Home;