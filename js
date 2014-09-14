window.onload = function() {
	//grabs the html canvas element and enables us to draw on it
	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d")

	var W = window.innerWidth; //get the width of our window
	    H = window.innerHeight; //get the height

	    //set our canvas to our size of width and height
	    canvas.width = W;
	    canvas.height = H;

	    //==box class==/
	    function Box(_x,_y) {
	    	//the X.Y position
	    	this.x = _x;
	    	this.y = _y;

	    	//giving it velocity x and y
	    	this.xVel = 10 + Math.random()*20;
	    	this.yVel = 1;

	    	//the box width and height
	    	this.width = 20;
	    	this.height = 20; 

	    	//random colors for our box
	    	this.r = Math.round(Math.random()*255);
	    	this.g = Math.round(Math.random()*255);
	    	this.b = Math.round(Math.random()*255);

	    	this.rgba = "rgba("+this.r+","+this.g+","+this.b+",1)";

	    	//draw method for our box
	    	this.draw = function() {

	    		ctx.strokeStyle = this.rgba;
	    		ctx.strokeRect(this.x, this.y, this.width, this.height);

	    	    this.update();
	    	}

	    	//function that handle our logics for our box
	    	this.update = function() {
            //code to make it bounce
            //check the left window border
            if(this.x < 0) {
            	this.x = 0;//set its position to 0
            	this.xVel *= -1;//make it bounce
            }
            //check the right border
            if(this.x > W - this.width) {
               this.x = W - this.width; //sets position to 0
               this.xVel *= -1;
             
            }
            //check the top border
            if(this.y < 0) {
            	this.y = 0; //set its position to 0
            	this.yVel *= -1; //make it bounce
            }
            //the reason why we did this function so the boxes don't try to add
            //y by its velocity when it reaches the bottom because it will cause it to spazz
            if(this.y < H - this.height)
            	this.yVel += .25;

           

            //check the bottom border
            if(this.y > H - this.height) {

            	//make it bounce off the bottom
            	this.xVel *= .5;
            	this.yVel *= .5;

            	this.y = H - this.height;
            	this.yVel *= -1;
            }

                //code to make it move diagonally
                this.x += this.xVel;
                this.y += this.yVel;

	    	}
	    }

	    //array of boxes
	    var boxes = [];


	    //get an object instance of our Box class
	    var b = new Box(20,20)

	    //add another box
	    var b2 = new Box(50,20)

	    //Function to draw stuff on our screen
	    function draw () {

            //Background
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0,0,W,H);
            
            ctx.globalCompoiteOperation = "lighter";

            //loop through the boxes
            for(i=0; i<boxes.length; i++)
            	boxes[i].draw();
            
	        update();

	    }


	    //Function for our logic
	    function update () {
            //loop through the boxes and draw them
            for(i=0; i < boxes.length; i++)
            	boxes[i].update();

	    }

	    //add box every minute we specify
	    setInterval(function() {
	    	boxes.push( new Box(0,0))
	    }, 1000);

	    //set interval so we can draw then update our drawing
	    //every 30 millisecond
	    setInterval(draw, 30);
}
