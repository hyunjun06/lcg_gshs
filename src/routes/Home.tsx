import styled from "styled-components";
import ScheduleBox from "../components/ScheduleBox";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ISchedule } from "../data";

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

function Home() {
    const [schedules, setSchedules] = useState<ISchedule[]>([]);
    
    const compareDate = (a: string, b: string) => {
        const aMonth = parseInt(a.split("/")[0]);
        const aDate = parseInt(a.split("/")[1]);
        const bMonth = parseInt(b.split("/")[0]);
        const bDate = parseInt(b.split("/")[1]);

        if(aMonth > bMonth) return 1;
        else if(aMonth < bMonth) return -1;
        else {
            if(aDate > bDate) return 1;
            else if(aDate < bDate) return -1;
            else return 0;
        }
    };
    
    const getSchedule = async () => {
        console.log("Schedule request by Home")
        const schedulesRef = collection(dbService, "schedules");
        const snapshot = await getDocs(schedulesRef);
        
        const fetchedSchedules = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));
        
        fetchedSchedules.sort((a: any, b: any) => 
            compareDate(a.date, b.date)
        );
        
        setSchedules(fetchedSchedules.map((schedule: any) => ({
            ...(schedule as ISchedule),
        })));
    };
    
    useEffect(() => {
        getSchedule();
    }, []);
    
    return (
        <Scroll>
            <GridContainer>
                {schedules.map((item, index) => (
                    <ScheduleBox key={index} schedule={item} />
                ))}
            </GridContainer>
        </Scroll>
    );
}

export default Home;