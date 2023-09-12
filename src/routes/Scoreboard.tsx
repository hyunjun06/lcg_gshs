import { useEffect, useState } from "react";
import { ISchedule } from "../data";
import { collection, getDocs } from "firebase/firestore";
import { dbService } from "../firebase";
import { styled } from "styled-components";

interface ITeamScore {
    team: string;
    group: string;
    score: number;
}

const FullContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const GroupLabel = styled.h1`
    font-size: 2rem;
    font-weight: 900;
    margin-top: 1rem;
    
    span {
        font-weight: 300;
    }
`;

const GroupContainer = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: ${({theme}) => theme.black};
`;

const TeamContainer = styled.li`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
    background-color: ${({theme}) => theme.black};
    color: ${({theme}) => theme.white};
    padding: 1rem 1rem 1rem 1rem;
    font-weight: 100;
`;

const TeamLabel = styled.p`
    font-size: 1rem;
    font-weight: 600;
`;

const ScoreLabel = styled.p`
    font-size: 1rem;
`;

function Scoreboard() {
	const [schedules, setSchedules] = useState<ISchedule[]>([]);
	const [groups, setGroups] = useState<string[]>([]);
    const [teams, setTeams] = useState<ITeamScore[]>([]);

	const getSchedule = async () => {
        console.log("Schedule request by Scoreboard");
        
		const schedulesRef = collection(dbService, "schedules");
		const snapshot = await getDocs(schedulesRef);

		const fetchedSchedules = snapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));

		setSchedules(
			fetchedSchedules.map((schedule: any) => ({
				...(schedule as ISchedule),
			}))
		);

		const fetchedGroups = fetchedSchedules.map(
			(schedule: any) => schedule.group
		);
        
        // remove duplicate
        const uniqueGroups = fetchedGroups.filter((group, index) =>
            fetchedGroups.indexOf(group) === index
        );
        
		setGroups(uniqueGroups);
        
        const fetchedTeams = fetchedSchedules.map((schedule: any) => ({
            team: schedule.home,
            group: schedule.group,
            score: 0,
        }));
        const fetchedTeams2 = fetchedSchedules.map((schedule: any) => ({
            team: schedule.away,
            group: schedule.group,
            score: 0,
        }));
        const fetchedTeams3 = fetchedTeams.concat(fetchedTeams2);
        
        const uniqueTeams = fetchedTeams3.filter((team, index) =>
            fetchedTeams3.findIndex((t) => t.team === team.team) === index
        );

        schedules.forEach((schedule: any) => {
            if(schedule.state) 
                uniqueTeams[uniqueTeams.findIndex((team: any) => team.team === schedule.winner)].score += 1;
        });
                
        setTeams(uniqueTeams);
	};

	useEffect(() => {
		getSchedule();
	}, []);

	return (
		<FullContainer>
			{groups.map((group, index) => (
				<Container key={index}>
					<GroupLabel><span>Group-</span>{group}</GroupLabel>
					<GroupContainer>
                        {teams.filter((team: any) => team.group === group).map((team: any, index: number) => (
                            <TeamContainer key={index}>
                                <TeamLabel>{team.team}</TeamLabel>
                                <ScoreLabel>{team.score}</ScoreLabel>
                            </TeamContainer>
                        ))}
					</GroupContainer>
				</Container>
			))}
		</FullContainer>
	);
}

export default Scoreboard;
