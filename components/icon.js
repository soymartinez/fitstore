import { randomColor } from "../styles/utils";
import { useState, useEffect } from "react";


const IconProfile = () => {
    const [color, setColor] = useState(randomColor());
    useEffect(() => setColor(randomColor()), [])
    return (
        <>
            <span></span>
            <style jsx>{`
                span {
                    width: 40px;
                    height: 40px;
                    border-radius: 50px;
                    background: linear-gradient(135deg, rgba(151, 83, 225, 0.5) 0%, rgba(229, 229, 229, 0.5) 100%), ${color}               
                }
            `}</style>
        </>
    );
}
export default IconProfile;