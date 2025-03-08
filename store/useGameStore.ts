import { create } from 'zustand';

export type Player = 'X' | 'O';
export type SquareValue = Player | null;

interface PlayerInfo {
    name: string;
    symbol: Player;
    type?: 'human' | 'computer'
}

interface GameState {
    board: SquareValue[];
    currentTurn: Player;
    winner: Player | 'tie' | null;
    player1: PlayerInfo;
    player2: PlayerInfo;
    popupVisible: boolean;
    isComputerThinking: boolean;
    setIsComputerThinking: (val: boolean) => void;
    makeMove: (index: number) => void;
    makeComputerMove: (index: number) => void;
    computerMove: () => void;
    resetGame: () => void;
    setPlayers: (p1: PlayerInfo, p2: PlayerInfo) => void;
    hidePopup: () => void;
}

const checkWinner = (board: SquareValue[]): Player | null => {
    const winnningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of winnningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const useGameStore = create<GameState>((set, get) => ({
    board: Array(9).fill(null),
    currentTurn: 'O',
    winner: null,
    player1: { name: '', symbol: 'O' },
    player2: { name: '', symbol: 'X', type: 'human' },
    popupVisible: true,
    isComputerThinking: false,
    setIsComputerThinking: (val) => set({ isComputerThinking: val }),
    makeMove: (index: number) => {
        // console.log("index", index)
        const { board, currentTurn, winner, player2, isComputerThinking } = get();

        // Skip if computer is thinking, game is over, or square is already filled
        if (isComputerThinking || winner || board[index] !== null) return;

        const newBoard = [...board];
        newBoard[index] = currentTurn;

        // If there is winner
        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            set({
                board: newBoard,
                winner: gameWinner,
            });
            return;
        }

        // Check for tie
        const isBoardFull = newBoard.every((square) => square !== null);
        if (isBoardFull) {
            set({
                board: newBoard,
                winner: 'tie',
            });
            return;
        }

        // No winner no tie then switch turn
        const nextTurn = currentTurn === 'X' ? 'O' : 'X';
        set({
            board: newBoard,
            currentTurn: nextTurn,
        });

        // If next turn belongs to computer, trigger computer move
        if (player2.type === 'computer' && player2.symbol === nextTurn) {
            // console.log("inside?", player2.type)
            get().setIsComputerThinking(true);
            setTimeout(() => {
                get().computerMove();
                get().setIsComputerThinking(false);
            }, 500);
        }
    },
    makeComputerMove: (index: number) => {
        const { board, currentTurn, winner } = get();

        if (winner || board[index] !== null) return;

        const newBoard = [...board];
        newBoard[index] = currentTurn;

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            set({
                board: newBoard,
                winner: gameWinner,
            });
            return;
        }

        // tie validation
        const isBoardFull = newBoard.every((square) => square !== null);
        if (isBoardFull) {
            set({
                board: newBoard,
                winner: 'tie',
            });
            return;
        }

        // no winner no tie then continue
        const nextTurn = currentTurn === 'X' ? 'O' : 'X';
        set({
            board: newBoard,
            currentTurn: nextTurn,
        });
    },
    computerMove: () => {
        const { board, winner, makeComputerMove } = get();
        // If the game is over, no need to move
        if (winner) return;

        // Find all empty squares
        const emptyIndeces = board
            .map((val, idx) => (val === null ? idx : null))
            .filter((val) => val !== null) as number[];

        // if no empty squares then return
        if (emptyIndeces.length === 0) return;

        // otherwise choose an empty square
        const randomIndex = emptyIndeces[Math.floor(Math.random() * emptyIndeces.length)];
        // console.log("choosing square", randomIndex)

        makeComputerMove(randomIndex);
    },
    resetGame: () => {
        set({
            board: Array(9).fill(null),
            currentTurn: 'O',
            winner: null
        });
    },
    setPlayers: (p1, p2) => {
        set({
            player1: p1,
            player2: p2
        });
    },
    hidePopup: () => set({ popupVisible: false }),
}));

export default useGameStore;