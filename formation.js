if(typeof Football!=='object'){var Football={};}
(function($){
    var Formation=Football.Formation=function(){

        // player radius
        this.r = 20;

        // canvas size
        this.width = this.r*2;
        this.height = this.r*2;
        
        // player color
        this.teamColorA = '#DF013A';
        this.teamColorB = '#2E2EFE';

        // team name
        this.selectA = 'teamA';
        this.selectB = 'teamB';

        // team canvas
        this.canvasIdA = 'canvasA_';
        this.canvasIdB = 'canvasB_';
        
        // start
        this._init();
    };
    
    /**
     * *
     * @private
     */
    Formation.prototype._init=function() {
        var self = this,
            pathA,pathB;
        
        // 初期設定
        pathA = self.getFormationFile($('[name='+self.selectA+']').val(), "teamA");
        pathB = self.getFormationFile($('[name='+self.selectB+']').val(), "teamB");
        
        self.addFormation(pathA, self.teamColorA, self.canvasIdA);
        self.addFormation(pathB, self.teamColorB, self.canvasIdB);

        self._bind();
    };

    /**
     * *
     * @private
     */
    Formation.prototype._bind=function() {
        var self = this;

        $('[name='+self.selectA+']').change(function() {
            pathA = self.getFormationFile($(this).val(), "teamA");
            self.moveFormation(pathA, self.canvasIdA);
        });

        $('[name='+self.selectB+']').change(function() {
            pathB = self.getFormationFile($(this).val(), "teamB");
            self.moveFormation(pathB, self.canvasIdB);
        });

    };

    /**
     * *
     * @param formation
     * @param color
     */
    Formation.prototype.addFormation=function(formation, color, teamId) {
        var self = this;
        $.getJSON(formation , function(data) {
            for(var i = 0; i < data.length; i++) {
                self.addPlayer(data[i].x,data[i].y, color, teamId);
            }
        });
        
    };

    /**
     * *
     * @param formation
     * @param color
     */
    Formation.prototype.moveFormation=function(formation, canvasId) {
        var self = this;
        $.getJSON(formation , function(data) {
            for(var i = 0; i < data.length; i++) {
                $('#'+ canvasId + data[i].id).css({top:data[i].x,left:data[i].y});
            }
        });

    };

    /**
     * *
     * @param formation
     * @param team
     * @returns {string}
     */
    Formation.prototype.getFormationFile=function(formation, team) {
        return './data/'+team+'/'+formation+'.json';
        
    };
    

    /**
     * *
     * @param x
     * @param y
     * @returns {boolean}
     */
    Formation.prototype.addPlayer = function(x, y, color, teamId) {
        var self = this, id, canvas, context;
        
        id = self.getId(teamId);

        // player canvas
        canvas = self.addCanvas(self.width, self.height, id);
        if (!canvas) return false;

        // create player
        context = canvas.getContext('2d');
        context.beginPath();
        //context.shadowBlur = 10; //ぼかし
        //context.shadowColor = "green"; //ぼかし

        context.arc(20, 20, self.r, 0, Math.PI*2, false); // x,y, 半径,
        context.fillStyle = color;
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
    /**
     * *
     * @param width
     * @param height
     * @param id
     * @param x
     * @param y
     * @returns {*}
     */
    Formation.prototype.addCanvas = function(width, height, id) {
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
    Formation.prototype.getId = function(teamId) {
        var self = this,
            screen,id,canvasLength;
        screen = document.getElementById('pitch_area');
        canvasLength = $("[id^="+teamId+"]").length;
        id = teamId + (canvasLength + 1).toString();
        return id;
    };

    
    
    
}(jQuery));
$(function(){new Football.Formation();});