function World (options) {
    this.options = _.defaults(options || {},  {
        xSpeed:2,
        ySpeed:2,
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
        
    }
}