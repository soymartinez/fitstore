import { randomColor } from 'styles/utils';
import { useState, useEffect } from 'react';

export default function Formbutton({ text }) {
    const [color, setColor] = useState(randomColor());
    useEffect(() => setColor(randomColor()), [])
    return (
        <>
            <button className='w-full relative text-center overflow-hidden rounded-lg'>
                <div className={`w-[200%] h-10 hover:w-full transition-all duration-300`}>
                    <span className='absolute text-center py-2 text-white left-0 w-full'>
                        {text}
                    </span>
                </div>
            </button>
            <style jsx>{`
                div {
                    background: linear-gradient(135deg, rgba(151, 83, 225, 0.5) 0%, rgba(229, 229, 229, 0.5) 100%), ${color}
                }
            `}</style>
        </>
    )
}
