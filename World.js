function World (options) {
    this.options = _.defaults(options || {},  {
        worldWidth:900,
        worldHeight:600,
        interval:20
    });
    this.players = {};
};

World.prototype = {
    addPlayer:function(player) {
        if (player) {
            this.players[this.players.length] = player;
        }
    },
    simulate:function(keys) {
        players.forEach( function(player, index) {
            var tempx = player.x;
            var tempy = player.y;
            player.move(keys);
            //Check to see if the player has moved off the canvas.
            if (player.x < 0) {
                player.x = 0;
            } else if (player.x > (world.options.worldWidth - player.width)) {
                player.x = world.options.worldWidth - player.width;
            } 

            if (player.y < 0) {
                player.y = 0;
            } else if  (player.y > (world.options.worldHeight - player.height)) {
                player.y = world.options.worldHeight - player.height;
            }
            console.log(player.x + "," + player.y);
        });
    }
}