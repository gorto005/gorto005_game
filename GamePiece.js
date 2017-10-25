class GamePiece {

    constructor (image,
            moveRightImages,
            moveLeftImages,
            moveSound, 
            x, 
            y,
            speedX,
            speedY,
            moveLeftKey,
            moveRightKey,
            moveUpKey,
            moveDownKey) 
    {
        this.defaultimage = new Image();
        this.defaultimage.src = image;

        this.moveRightImages = moveRightImages;
        this.moveRightImage = new Image();
        this.moveRightImage.src = this.moveRightImages[0];
        this.moveRightImageCount = 0;

        this.moveLeftImages = moveLeftImages;
        this.moveLeftImage = new Image();
        this.moveLeftImage.src = this.moveLeftImages[0];    
        this.moveLeftImageCount = 0;

        this.image = this.defaultimage;

        this.sound = document.createElement("audio");
        this.sound.src = moveSound;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        //document.body.appendChild(this.sound);

        this.x = x;
        this.y = y;

        this.moved = false;

        this.speedX = speedX;
        this.speedY = speedY;   

        this.moveLeftKey = moveLeftKey;
        this.moveRightKey = moveRightKey;
        this.moveUpKey = moveUpKey;
        this.moveDownKey = moveDownKey;    
    }


    update(ctx) {
        ctx.drawImage(this.image, 
            this.x, 
            this.y);
        if (this.moved) {
            this.playMoveSound();
        }
        this.moved = false;
        this.image = this.defaultimage;
    }

    playMoveSound(){
        this.sound.play();
    }

    stopMoveSound(){
        this.sound.pause();
    }

    move (keys) {
        if (keys && keys[this.moveLeftKey]) {
            this.moved = true;
            this.moveLeftImage.src = this.moveLeftImages[this.moveLeftImageCount];
            this.image = this.moveLeftImage;
            this.x -= this.speedX;

            if (this.moveLeftImageCount < this.moveLeftImages.length - 1) {
                this.moveLeftImageCount++;
            } else {
                this.moveLeftImageCount = 0;
            }
        }
        if (keys && keys[this.moveRightKey]) {
            this.moved = true;
            this.moveRightImage.src = this.moveRightImages[this.moveRightImageCount];
            this.image = this.moveRightImage;
            this.x += this.speedX;

            if (this.moveRightImageCount < this.moveRightImages.length - 1) {
                this.moveRightImageCount++;
            } else {
                this.moveRightImageCount = 0;
            }
        }
        if (keys && keys[this.moveUpKey]) {
            this.moved = true;
            this.y -= this.speedY; 
        }
        if (keys && keys[this.moveDownKey]) {
            this.moved = true;
            this.y += this.speedY;
        }


    }
}