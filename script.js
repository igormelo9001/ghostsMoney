document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const monster1 = document.getElementById('monster1');
    const monster2 = document.getElementById('monster2');
    const money1 = document.getElementById('money1');
    const money2 = document.getElementById('money2');
    
    const maze = document.querySelector('.maze');
    const blocks = document.querySelectorAll('.block');
    const stepSize = 20;
    let score = 0;

    const initializeGame = () => {
        character.style.top = '0px';
        character.style.left = '0px';

        money1.style.top = '200px';
        money1.style.left = '200px';
        money1.style.display = 'block';

        money2.style.top = '100px';
        money2.style.left = '300px';
        money2.style.display = 'block';

        monster1.style.top = '300px';
        monster1.style.left = '300px';

        monster2.style.top = '50px';
        monster2.style.left = '350px';
        
        score = 0;
        console.log('Game Started. Score:', score);
    }

    const moveCharacter = (x, y) => {
        const currentX = parseInt(character.style.left);
        const currentY = parseInt(character.style.top);
        const newX = currentX + x;
        const newY = currentY + y;

        if (isValidMove(newX, newY)) {
            character.style.left = `${newX}px`;
            character.style.top = `${newY}px`;
            checkCollision();
        }
    }

    const moveMonster = (monster) => {
        const characterX = parseInt(character.style.left);
        const characterY = parseInt(character.style.top);
        const monsterX = parseInt(monster.style.left);
        const monsterY = parseInt(monster.style.top);
        let newX = monsterX;
        let newY = monsterY;

        if (characterX > monsterX) {
            newX = monsterX + stepSize;
        } else if (characterX < monsterX) {
            newX = monsterX - stepSize;
        }

        if (characterY > monsterY) {
            newY = monsterY + stepSize;
        } else if (characterY < monsterY) {
            newY = monsterY - stepSize;
        }

        if (isValidMove(newX, newY, monster)) {
            monster.style.left = `${newX}px`;
            monster.style.top = `${newY}px`;
        }

        checkCollision();
    }

    const checkCollision = () => {
        const characterRect = character.getBoundingClientRect();
        const money1Rect = money1.getBoundingClientRect();
        const money2Rect = money2.getBoundingClientRect();
        const monster1Rect = monster1.getBoundingClientRect();
        const monster2Rect = monster2.getBoundingClientRect();

        if (isCollide(characterRect, money1Rect)) {
            score++;
            money1.style.display = 'none';
            console.log('Score:', score);
        }

        if (isCollide(characterRect, money2Rect)) {
            score++;
            money2.style.display = 'none';
            console.log('Score:', score);
        }

        if (isCollide(characterRect, monster1Rect) || isCollide(characterRect, monster2Rect)) {
            alert('Game Over!');
            initializeGame();
        }
    }

    const isCollide = (rect1, rect2) => {
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    const isValidMove = (newX, newY, movingElement = character) => {
        const newRect = {
            left: newX,
            top: newY,
            right: newX + stepSize,
            bottom: newY + stepSize
        };

        for (let block of blocks) {
            const blockRect = block.getBoundingClientRect();
            if (isCollide(newRect, blockRect)) {
                return false;
            }
        }
        return true;
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                moveCharacter(0, -stepSize);
                break;
            case 'ArrowDown':
                moveCharacter(0, stepSize);
                break;
            case 'ArrowLeft':
                moveCharacter(-stepSize, 0);
                break;
            case 'ArrowRight':
                moveCharacter(stepSize, 0);
                break;
        }
    });

    setInterval(() => {
        moveMonster(monster1);
        moveMonster(monster2);
    }, 500);

    initializeGame();
});
