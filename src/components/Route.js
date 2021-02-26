import {useEffect, useState} from 'react';


//The children is because any component passed inside another component is a children
const Route = ({path, children})=>{
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() =>{
        const onLocationChange= ()=>{
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', onLocationChange);

        return ()=>{
            window.removeEventListener('popstate', onLocationChange);
        };
        
    }, []);

    return currentPath === path ? children : null;
};



export default Route;