export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

    //checking collision, decting if we are outside the stage and also if we are colliding with another tetromino

     //1. check that we're on an actiual tetromino cell
                //2. CHECK THAT OUR MOVE IS INSIDE THE GAME AREAS HEIGHT(y)
                    //shouldn't go thru the bottom of the play area
                    //checking that the stage's y val has a value ie still the playable area, will return true and we know we are colliding
                    //3. check that our move is inside the game areas width (x)
                    //4. check that the cell we're moving to isn't set to clear, if it isn't clear we aren't colliding
                    
    export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
        for(let y = 0; y < player.tetromino.length; y +=1) {
            for(let x = 0; x < player.tetromino[y].length; x += 1) {
                if(player.tetromino[y][x] !== 0) {
                    if (
                    !stage[y + player.pos.y + moveY] || 
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
                    'clear'
                    )  {
                            return true;
                    }
                }
            }
        }
    };