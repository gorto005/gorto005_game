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
        // First move all the players
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
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
        };
        // Next, calculate collisions. We iterate of the array of players and compare
        // two players. That's why the two for loops.
        for (var i = 0; i < players.length - 1; i++) {
            var p1 = players[i];
            var box1 = new SAT.Box(new SAT.Vector(p1.x, p1.y), p1.width, p1.height);
            for (var j = i + 1; j < players.length; j++) {
                var p2 = players[j];
                var box2 = new SAT.Box(new SAT.Vector(p2.x, p2.y), p2.width, p2.height);
                var response = new SAT.Response();
                // check the collision
                if (SAT.testPolygonPolygon(box1.toPolygon(), box2.toPolygon(), response)) {
                    var oV = response.overlapV;
                    // If there was a collision, split the overlap between the two plays and move them.
                    p1.x = p1.x - oV.x/2;
                    p1.y = p1.y - oV.y/2;
                    p2.x = p2.x + oV.x/2;
                    p2.y = p2.y + oV.y/2;
                }
            }
        }

    }
}