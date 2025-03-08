import React from 'react'
import { FaRegCircle, FaTimes } from 'react-icons/fa';

interface SquareProps {
    value: 'X' | 'O' | null;
    onClick?: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button
    onClick={onClick}
    className='w-24 h-24 flex items-center justify-center bg-[#2d6a4f] border border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#52b788]'
    >
        {value === 'X' && <FaTimes className='text-4xl text-red-500'/>}
        {value === 'O' && <FaRegCircle className='text-4xl text-blue-500'/>}
    </button>
  )
}

export default Square