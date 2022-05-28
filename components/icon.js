import { randomColor } from "../styles/utils";
import { useState, useEffect } from "react";

export default function Icon({ width, height }) {
    const [color, setColor] = useState(randomColor());
    useEffect(() => setColor(randomColor()), [])
    return (
        <>
            <div className='icon'></div>
            <style jsx>{`
                .icon {
                    width: ${width}px;
                    height: ${height}px;
                    border-radius: 50px;
                    background: linear-gradient(135deg, rgba(151, 83, 225, 0.5) 0%, rgba(229, 229, 229, 0.5) 100%), ${color}
                }
            `}</style>
        </>
    )
}
