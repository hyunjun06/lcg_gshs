import { collection, doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { dbService } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

function UpdateResult() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();
    
    const params = useParams<{id: string}>();
    const navigate = useNavigate();
    
    const updateResult = async (id: string, winner: string) => {
        console.log("Update Result Request");
        
        const schedulesRef = collection(dbService, "schedules");
        await updateDoc(doc(schedulesRef, id), {
            winner: winner,
            state: true,
        });
    };

    return (
        <div style={{width: "100%", height: "100%"}}>
            <h1>Update Result</h1>
            <form onSubmit={handleSubmit((data) => {
                updateResult(params.id!, data.winner);
                reset();
                navigate("/");
            })} style={{display: "flex", flexDirection: "column"}}>
                <input {...register('winner', {required: true})} />
                {errors.winner && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </div>
    );
}

export default UpdateResult;