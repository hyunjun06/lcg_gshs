import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ISchedule } from "../data";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { dbService } from "../firebase";

function Schedules() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    const [schedules, setSchedules] = useState<ISchedule[]>([]);
    
    const getSchedule = async () => {
        console.log("Schedule request by Schedules");
        
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
    
    const createSchedule = async (schedule: ISchedule) => {
        const schedulesRef = collection(dbService, "schedules");
        await addDoc(schedulesRef, schedule);
        getSchedule();
    };
    
    const deleteSchedule = async (id: string) => {
        const schedulesRef = collection(dbService, "schedules");
        await deleteDoc(doc(schedulesRef, id));
        getSchedule();
    };
        
    
    useEffect(() => {
        getSchedule();
    }, []);
    
    return (
        <div style={{width: "100%", height: "100%"}}>
            <ul>
                {schedules.map((item, index) => (
                    <li key={index} style={{display: "flex", flexDirection: "row"}}>
                        <p>{item.date} : {item.home} vs {item.away}</p>
                        <button onClick={() => deleteSchedule(item.id)}>x</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit((data) => {
                createSchedule({...data, state: false, winner: ""} as ISchedule);
                reset();
            })} style={{display: "flex", flexDirection: "column"}}>
                date
                <input {...register('date', {required: true})} />
                {errors.date && <p>date is required</p>}
                group
                <input {...register('group', {required: true})} />
                {errors.group && <p>group is required</p>}
                home
                <input {...register('home', {required: true})} />
                {errors.home && <p>home is required</p>}
                away
                <input {...register('away', {required: true})} />
                {errors.away && <p>away is required</p>}
                <input type="submit" />
            </form>
        </div>
    );
}

export default Schedules;