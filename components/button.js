import React from 'react';
import Link from 'next/link'

const Button = ({ href }) => {
    return (
        <div className="w-full relative mt-4 md:mt-12">
            <Link href={href}>
                <button className="flex justify-center align-middle py-2 px-4 md:py-3 md:px-6 hover:border-white
                                border border-[#D3D3D3] rounded-2xl w-[218px]
                                font-semibold text-xl md:text-2xl bg-transparent text-[#d3d3d3] hover:text-white leading-9 -tracking-[1px]">
                    Explorar
                </button>
            </Link>
        </div>
    );
}

export default Button;
