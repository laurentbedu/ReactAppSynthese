import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ListScreen = (props) => {

    const navigate = useNavigate();

    useEffect(()=>{
        if(!sessionStorage.getItem('auth')){
            navigate('/');//TODO context
        }
    })

    return (
        <>
          
            <h1>ListScreen</h1>
          
        </>
      );
}

export default ListScreen;