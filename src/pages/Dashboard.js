import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard(){
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/');
    },[token, navigate]);

    return (<h1>Dashboard</h1>)
}

export default Dashboard;