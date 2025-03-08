import React from 'react'
import Square from './Square';
import useGameStore from '@/store/useGameStore';

const Board = () => {
    const board = useGameStore((state) => state.board);
    const makeMove = useGameStore((state) => state.makeMove);
    const winner = useGameStore((state) => state.winner);
    const resetGame = useGameStore((state) => state.resetGame);
    const player1 = useGameStore((state) => state.player1);
    const player2 = useGameStore((state) => state.player2);
    const currentTurn = useGameStore((state) => state.currentTurn);
    const isComputerThinking = useGameStore((state) => state.isComputerThinking);
    let winnerName = '';
    if (winner && winner !== 'tie') {
        if (winner === player1.symbol) {
            winnerName = player1.name;
        } else if (winner === player2.symbol) {
            winnerName = player2.name;
        }
    }

    // lets disable the board if its tie or win
    const isGameOver = winner !== null;

    // handle user interacted square
    const handleSqureClick = (index: number) => {
        // disable the clicks if game is over or computer is thinking
        if(!isGameOver && !isComputerThinking) {
            makeMove(index);
        }
    }
    return (
        <section className='container pt-8'>
            <div className='flex justify-center'>
                <h1 className='text-4xl text-white/80 tracking-tight'>Tic Tac Toe</h1>
            </div>

            {winner === 'tie' ?
                (
                    <div className='text-center mt-4 text-xl text-yellow-400'>It's a tie!</div>
                ) : winner ?
                    (
                        <div className='text-center mt-4 text-xl text-green-400'>Winner is: {winnerName}</div>
                    )
                    :
                    (
                        <div className='text-center mt-4 text-xl text-white'>
                            Current Turn: {currentTurn === player1.symbol ? player1.name : player2.name}
                        </div>
                    )
            }

            <div className='flex justify-center mt-8'>
                {/* RENDER 3X3 grid board */}
                <div className='mt-8 grid grid-cols-3 gap-4 justify-items-center'>
                    {board.map((value, index) => (
                        <Square
                            key={index}
                            value={value}
                            // disable board if game over
                            onClick={() => handleSqureClick(index)}
                        />
                    ))}
                </div>
            </div>

            <div className='flex justify-center mt-6'>
                <button
                    onClick={resetGame}
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Reset Game</button>
            </div>
        </section>
    )
}

export default Board