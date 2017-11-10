function Fireball (x,y) {
	this.image = new Image();
	this.image.src = "fireball.png";
	// this.x = x/2 - (this.image.width/2);
	// this.y = y/2 - (this.image.height/2);
	this.x = -this.image.width/2;
	this.y = -this.image.height/2;
	this.worldx = x;
	this.worldy = y;
	this.degrees = 0;
}

Fireball.prototype = {
	update:function(ctx) {
		ctx.clearRect(this.x, this.y, this.image.width, this.image.height);
		ctx.save();
		ctx.translate(this.worldx/2, this.worldy/2);
		this.degrees += 10;

		if (this.degrees >= 360) {
			this.degrees = 0;
		}

		ctx.rotate(this.degrees*Math.PI/180);
		
		ctx.drawImage(this.image, 
            this.x, 
            this.y);
		ctx.restore();

	}
};