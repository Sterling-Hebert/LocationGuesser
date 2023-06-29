import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readGame } from "../../store/games";
const WorldGame = () => {
    const dispatch = useDispatch();
dispatch(readGame())
    // const game = useSelector(state => state.games);
    useEffect(()=>{

    })

    return (
      <div>
        <h1>World Game</h1>
      </div>
    );
};

export default WorldGame;
