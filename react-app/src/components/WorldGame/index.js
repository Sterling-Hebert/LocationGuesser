import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWorldGame, editRoundScore } from "../../store/games";

const WorldGame = () => {
  const dispatch = useDispatch();
  const game = useSelector(state => state.games.game);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    const createAndReadGame = async () => {
      await dispatch(createWorldGame({ game_mode: 'world', rounds: 5 }));
    };

    createAndReadGame();
  }, [dispatch]);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleUpdateScore = () => {
    if (game && game.rounds) {
      const firstNotStartedRound = game.rounds.find(round => !round.hasStarted);
      console.log(firstNotStartedRound);
      if (firstNotStartedRound) {
        console.log('Updating round:', firstNotStartedRound.roundNumber);
        dispatch(editRoundScore(firstNotStartedRound.roundNumber, 11, true));
      }
      console.log(firstNotStartedRound);
    }
  };

  console.log(game);

  return (
    <div>
      <h1>World Game</h1>
      {!isGameStarted && (
        <button onClick={handleStartGame}>Start Game</button>
      )}
      {isGameStarted && game && game.rounds && (
        <button onClick={handleUpdateScore}>Update Score</button>
      )}
    </div>
  );
};

export default WorldGame;
