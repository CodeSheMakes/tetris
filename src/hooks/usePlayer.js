import { useCallback, useState } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';

// need use before for custom hooks
//use state returns array with 2 items, destructured array to grab items
//player is state, setState is the setter for the state.
export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    //matrix is tetromino
    const rotate = (matrix, dir) => {
        //make row to become cols (transpose)
        const rotatedTetro = matrix.map((_, index) => 
        matrix.map(col => col[index]),
        );
        //reverse each row to get a rotated matrix
        if(dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    const playerRotate = (stage, dir) => {
        //complete clone of the player, as to not mutate the state
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        //stop rotation outside of playable area
        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            //tetromino will go back and forth to see if it collides with something to left or right
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        };

        setPlayer(clonedPlayer);
    }   

    const updatePlayerPos = ({ x, y, collided }) => {
        //setting state
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }))
    }
//prevent infine loop
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false,
        })
    })
//return player becasue we are going to import the custom hook into the tetis component and we need the player inside the tetis component
    return [player, updatePlayerPos, resetPlayer, playerRotate];
}