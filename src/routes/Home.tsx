import styled from "styled-components";
import ScheduleBox from "../components/ScheduleBox";
import MenuButton from "../components/MenuButton";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dbService } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ISchedule } from "../data";

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

const AuthContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: end;
`;

const AuthButton = styled.button`
    width: 10rem;
    height: 2rem;
    border-radius: 1rem;
    border: none;
    background-color: ${({theme}) => theme.white};
    color: ${({theme}) => theme.black};
    font-weight: 300;
    cursor: pointer;
    outline: none;
    margin-bottom: 3rem;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: ${({theme}) => theme.primary};
        color: ${({theme}) => theme.white};
    }
`;

const MenuListItem = styled.li`
    width: 100%;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({theme}) => theme.white};
    font-size: 1.5rem;
    transition: color 0.3s ease-in-out;
    font-weight: 300;
    
    &:hover {
        color: ${({theme}) => theme.primary};
    }
`;

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [schedules, setSchedules] = useState<ISchedule[]>([]);
    
    const getSchedule = async () => {
        const schedulesRef = collection(dbService, "schedules");
        const snapshot = await getDocs(schedulesRef);
        
        const fetchedSchedules = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));
        
        setSchedules(fetchedSchedules.map((schedule: any) => ({
            ...(schedule as ISchedule),
        })));
    };
    
    useEffect(() => {
        getSchedule();
    });
    
    useEffect(() => {
        console.log("schedules");
        console.log(schedules);
    }, [schedules.length]);
    
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
                    <AuthContainer>
                        <AuthButton>관리자 인증</AuthButton>
                    </AuthContainer>
                </MenuList>
                :
                // If the menu is closed, show the homepage contents
                <Scroll>
                    <GridContainer>
                        {schedules.map((item, index) => (
                            <ScheduleBox key={index} schedule={item} />
                        ))}
                    </GridContainer>
                </Scroll>
                }    

            </Container>
        </Wrapper>
    );
}

export default Home;