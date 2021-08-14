import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

//inside useState is the initial state

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        
        const updateStage = prevStage => {
                //first flush the stage
                //taking prev stage and map through it with the row. multidimensional array
            const newStage = prevStage.map(row =>
                //checking if cell is set to clear the return empty cell, otherwise return the cell
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            //then draw tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    //if the value of a cell isn't zero then we know we are on a call that makes up the tetromino, and we can know how to position the tetromino on the stage
                    if (value !== 0) {
                        //giving you the coordinates on the stage
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value, //tetromino that is being looped through
                            //if the player has collided set to merged, otherwise set it to clear
                            `${player.collided ? 'merged' : 'clear'}`
                            //merge it into the stage
                        ];
                    }
                });
            });

            //Then check if we collided
            if (player.collided) {
                resetPlayer();
            }

            return newStage;
        };
//setting state of the stage with this function--calling updateStage and updating it with the previous stage state
        setStage(prev => updateStage(prev));
    }, [player, resetPlayer])

    //exporting stage and setStage
    return[stage, setStage];
}