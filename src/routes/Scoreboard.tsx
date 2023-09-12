import { useEffect, useState } from "react";
import { ISchedule } from "../data";
import { collection, getDocs } from "firebase/firestore";
import { dbService } from "../firebase";

interface ITeamScore {
    team: string;
    group: string;
    score: number;
}

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
		<div style={{ width: "100%", height: "100%" }}>
			<h1>Scoreboard</h1>
			{groups.map((group, index) => (
				<div key={index}>
					<h2>{group}</h2>
					<ul>
                        {teams.filter((team: any) => team.group === group).map((team: any, index: number) => (
                            <li key={index}>{team.team} : {team.score}</li>
                        ))}
					</ul>
				</div>
			))}
		</div>
	);
}

export default Scoreboard;
