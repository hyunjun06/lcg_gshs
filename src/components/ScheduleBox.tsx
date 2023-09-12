import styled from "styled-components";
import { ISchedule } from "../data";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Date = styled.h1`
    font-size: 3rem;
    font-weight: 300;
    margin-top: 1rem;
    
    @media (max-width: 960px) {
        font-size: 2rem;
    }
`;

const Data = styled.h2`
    font-size: 1.5rem;
    font-weight: 900;
    margin-top: 1rem;
    
    @media (max-width: 960px) {
        font-size: 1rem;
    }
`;

interface IState {
    isdone: string;
}

const State = styled.p<IState>`
    font-size: 1rem;
    font-weight: 300;
    margin-top: 1rem;
    color: ${props => props.isdone === "true" ? ({theme}) => theme.primary : ({theme}) => theme.black};
`;

const GradientButtonBackground = styled.div`
    margin-top: 1rem;
    width: calc(100% - 2rem);
    height: 3rem;
    border-radius: 1rem;
    background: #C33764;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #1D2671, #C33764);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #1D2671, #C33764); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 3px 3px 3px;
    
    &:hover {
        transform: scale(1.01);
    }
    
    @media (max-width: 960px) {
        height: 2rem;
    }
`;

const GradientButton = styled.button`
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    border: none;
    background-color: white;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GradientButtonText = styled.p`
    font-size: 1rem;
    font-weight: 100;
    background: #C33764;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #1D2671, #C33764);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #1D2671, #C33764); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 960px) {
        font-size: 0.8rem;
    }
`;

function ScheduleBox({ schedule }: IScheduleBox) {
    const navigate = useNavigate();
    
    const onClick = () => {
        navigate(`/update_result/${schedule.id}`);
    };
    
    return (
        <Container>
            <Date>{schedule.date}</Date>
            {schedule.state ?
            <Data>{schedule.winner} WIN</Data>
            :
            <Data>{schedule.home} vs {schedule.away}</Data>
            }
            <State isdone={schedule.state.toString()}>{schedule.state ? "진행 완료" : "진행중"}</State>
            <GradientButtonBackground>
                <GradientButton onClick={onClick}>
                    {schedule.state ?
                    <GradientButtonText>경기 결과 수정</GradientButtonText>
                    :
                    <GradientButtonText>경기 결과 등록</GradientButtonText>
        }
                </GradientButton>
            </GradientButtonBackground>
        </Container>
    );
}

interface IScheduleBox {
    schedule: ISchedule;
}

export default ScheduleBox;