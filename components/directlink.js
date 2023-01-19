import { useState } from 'react'

export default function DirectLink({ href, children }) {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <h3
            className='flex gap-2 mb-8 text-2xl font-semibold'
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
        >
            {children}
            <a
                href={`#${href}`}
                title='Direct link to heading'>
                <span className={`text-blue-500 transition-all
                    ${isHovered ? 'opacity-100 underline' : 'opacity-0'}
                `}>
                    #
                </span>
            </a>
        </h3>
    )
}
