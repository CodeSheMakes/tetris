import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers'
//styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
//custom hooks
//updatePlayerPos and resetPlayer placed into the usePlayer custom hook, when calling the usePlayer get updatePlayer and resetPlayer
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
//components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    //created two states, dropTime is speed based on level
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGeameOver] = useState(false);

    //custom hooks, using exported player and stages from custom hooks -- sending the player into the useStage to use player later
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
        //creating the stage in useStage
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log('re-render');
    
    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0})) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const startGame =() => {
        //Reset everything
        setStage(createStage());
        resetPlayer();
        setGeameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, {x: 0, y: 1})) {
            updatePlayerPos({x: 0, y: 1, collided: false})
        } else {
            //game over
            //if we collide with something when dropping this tetromino needs to merge with the stage.
            if (player.pos.y < 1) {
                console.log('GAME OVER LOSER!!!');
                setGeameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true})
        }
    }

    const dropPlayer = () => {
        drop();
    }
    
    //destructuring the keycode, callback function when pressing gthe keys on the keyboard
    //37=left arrow, 38=up, 39=right arrow, 40=down arrow
    const move = ({ keyCode }) => {
            if (!gameOver) {
            if (keyCode === 37) {
            movePlayer(-1);
        } else if (keyCode === 39) {
            movePlayer(1);
        } else if (keyCode === 40) {
            dropPlayer();
        } else if (keyCode === 38) {
            playerRotate(stage, 1);
        }
        }
    }


    return (
        //the Wrapper is respons. for taking the key inputs---the whole page takes the input, you don't have to click on the board to get keys to register
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>

                {/* if the game is over it displays game over only, no score/rows/levels */}
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" />
                ) : (
                    <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />
                    </div>
                )}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
        
        );
};

export default Tetris;