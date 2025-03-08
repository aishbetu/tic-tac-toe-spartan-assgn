import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useGameStore from '@/store/useGameStore';

const PlayerSetupPopup: React.FC = () => {
  const setPlayers = useGameStore((state) => state.setPlayers);
  const hidePopup = useGameStore((state) => state.hidePopup);

  // Local state for inputs
  const [player1Name, setPlayer1Name] = useState<string>('');
  const [player1Symbol, setPlayer1Symbol] = useState<'O' | 'X'>('O');
  const [player2Type, setPlayer2Type] = useState<'human' | 'computer'>('human');
  const [player2Name, setPlayer2Name] = useState<string>('');
  const [player2Symbol, setPlayer2Symbol] = useState<'O' | 'X'>('X');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(player1Symbol === player2Symbol) {
        setError("Players cannot choose same symbol. Please select different symbols.");
        return;
    }
    const finalPlayer2Name = player2Type === 'computer' ? 'Computer' : player2Name;
    setPlayers(
      { name: player1Name, symbol: player1Symbol },
      { name: finalPlayer2Name, symbol: player2Symbol, type: player2Type }
    );
    hidePopup();
  };

  return (
    <Dialog open>
      <DialogContent className="bg-[#1b4332] w-full sm:max-w-[425px] p-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-white">Player Setup</DialogTitle>
          <DialogDescription className="text-sm text-gray-300">
            Please enter your details to start the game.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">
              Player 1 Name
            </label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              required
              className="bg-[#40916c] text-white placeholder:text-[#d8f3dc]"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">
              Player 1 Symbol
            </label>
            <select
              value={player1Symbol}
              onChange={(e) => {
                setPlayer1Symbol(e.target.value as 'O' | 'X');
                setError('');
              }}
              required
              className="px-3 py-2 bg-[#40916c] text-white border border-gray-300 rounded-md"
            >
              <option value="O">O</option>
              <option value="X">X</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">
              Opponent Type
            </label>
            <select
              value={player2Type}
              onChange={(e) => setPlayer2Type(e.target.value as 'human' | 'computer')}
              className="px-3 py-2 bg-[#40916c] text-white border border-gray-300 rounded-md"
            >
              <option value="human">Player vs. Player</option>
              <option value="computer">Player vs. Computer</option>
            </select>
          </div>
          {player2Type === 'human' && (
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-white">
                Player 2 Name
              </label>
              <Input
                type="text"
                placeholder="Enter opponent's name"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                required
                className="bg-[#40916c] text-white placeholder:text-[#d8f3dc]"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">
              Player 2 Symbol
            </label>
            <select
              value={player2Symbol}
              onChange={(e) => {
                setPlayer2Symbol(e.target.value as 'O' | 'X');
                setError('');
              }}
              className="px-3 py-2 bg-[#40916c] text-white border border-gray-300 rounded-md"
            >
              <option value="X">X</option>
              <option value="O">O</option>
            </select>
          </div>
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Start Game
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerSetupPopup;
