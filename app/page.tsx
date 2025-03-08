'use client';
import Board from "@/components/Board";
import PlayerSetupPopup from "@/components/PlayerSetupPopup";
import useGameStore from "@/store/useGameStore";

export default function Home() {
  const popupVisible = useGameStore((state) => state.popupVisible);
  return (
    <>
      {popupVisible && <PlayerSetupPopup /> }
      <Board />
    </>
  );
}
