if(typeof Football!=='object'){var Football={};}
(function($){
    var Formation=Football.Formation=function(){

        // player radius
        this.r = 20;

        // canvas size
        this.width = this.r*2;
        this.height = this.r*2;
        
        // start
        this._init();
    };
    /**
     * *
     * @private
     */
    Formation.prototype._init=function() {
        var c, self = this;


        // top, left
        this.addPlayer(300,25);
        
        this.addPlayer(100,200);
        this.addPlayer(250,150);
        this.addPlayer(350,150);
        this.addPlayer(500,200);

        this.addPlayer(200,350);
        this.addPlayer(300,300);
        this.addPlayer(400,350);
        
        //this.addRect(50,150);
        //this.addRect(450,150);
        //this.addRect(450,150);

        //this.addRect(50,50);

        // 移動
        //$('#canvas1').css({top:300,left:50});
        //
        //$('#canvas2').css({top:100,left:100});
        //$('#canvas3').css({top:200,left:100});
        //$('#canvas4').css({top:300,left:100});
        //$('#canvas5').css({top:400,left:100});
        
    };


    /**
     * *
     * @param width
     * @param height
     * @param id
     * @param x
     * @param y
     * @returns {*}
     */
    Formation.prototype.addCanvas = function(width, height, id, x,y) {
        //Formation.prototype.addCanvas = function(width, height, id) {
        // Canvas要素を追加
        $('#pitch_area').append(
            $('<canvas></canvas>')
                .attr('id', id)
                .attr('width', width)
                .attr('height', height)
                .css('position', 'absolute')
        );
        // ブラウザが未対応の場合はnullを返す
        var canvas = document.getElementById(id);
        if (!canvas || !canvas.getContext)
            return null;
        return canvas;
    };

    /**
     * canvasのidを返す *
     * @returns {string}
     */
    Formation.prototype.getId = function() {
        var self = this,
            screen,id;
        screen = document.getElementById('pitch_area');
        id = 'canvas' + (screen.getElementsByTagName('canvas').length + 1).toString();
        return id;
    };

    /**
     * *
     * @param x
     * @param y
     * @returns {boolean}
     */
    Formation.prototype.addPlayer = function(x, y) {
        var self = this, id, canvas, context;
        
        id = this.getId();

        // player canvas
        canvas = this.addCanvas(self.width, self.height, id, x,y);
        if (!canvas) return false;

        context = canvas.getContext('2d');
        // create player
        context.beginPath();
        //context.shadowBlur = 10; //ぼかし
        //context.shadowColor = "green"; //ぼかし


        context.arc(20, 20, self.r, 0, Math.PI*2, false); // x,y, 半径,
        context.fillStyle ='rgb(192, 80, 77)'; // 赤色
        context.fill();
        context.lineWidth = 0.5;
        context.stroke();
        context.strokeStyle = 'black';
        //context.translate(100, 50);
        context.closePath();
        
        // dragable
        $(canvas).draggable({ containment: '#pitch_area', scroll: false });
        // move
        $('#'+id).css({top:x,left:y});
        
    };

}(jQuery));
$(function(){new Football.Formation();});