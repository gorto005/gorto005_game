function GamePiece (type, //npc or player
            image,
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
            moveDownKey) {
    this.type = type;
    this.defaultimage = new Image();
    this.defaultimage.src = image;
    this.width = this.defaultimage.width;
    this.height = this.defaultimage.height;

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

    this.x = x;
    this.y = y;
    this.lastx = x;
    this.lasty = y;

    this.moved = false;
    this.dead = false;

    this.speedX = speedX;
    this.speedY = speedY;   

    this.moveLeftKey = moveLeftKey;
    this.moveRightKey = moveRightKey;
    this.moveUpKey = moveUpKey;
    this.moveDownKey = moveDownKey;
}

GamePiece.prototype = {
    update:function(ctx) {
        ctx.clearRect(this.lastx-3, this.lasty-3, this.image.width+6, this.image.height+6);
        if (this.dead) {
            // var img = ctx.createImageData(this.image.width, this.image.height);
            // for (var i = img.data.length; --i >= 0; )
            //     img.data[i] = 0;
            // this.image = img;
        }
        ctx.drawImage(this.image, 
            this.x, 
            this.y);
        if (this.moved) {
            this.playMoveSound();

        this.moved = false;
        this.image = this.defaultimage;
        } 
    },
    playMoveSound:function(){
        this.sound.play();
    },
    stopMoveSound:function(){
        this.sound.pause();
    },
    move:function(keys) {
        this.lastx = this.x;
        this.lasty = this.y;
        if (!this.dead) {
            if (this.type == "player") {
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
            } else if (this.type == "npc") {
                var speed = Math.floor(Math.random() * 10);
                var vx = Math.floor((Math.random() * 3) - 1) * speed;
                var vy = Math.floor((Math.random() * 3) - 1) * speed;
                this.x -= vx;
                this.y -= vy;
            }
        }
    }
}