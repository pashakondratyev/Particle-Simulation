//Global Variables
var dt = 0.1;
var particles;
var arr;
var scale = 1;
//Array for 

/*
 * Class for the particle object
 * also contains various methods 
 * for the particle
 * TODO: add color variations
 */
function Particle(rx, ry, vx, vy, radius, mass){
	var canvas = document.getElementById('particleCanvas');
	this.rx = rx;
	this.ry = ry;
	this.vx = vx;
	this.vy = vy;
	this.radius = radius;
	this.mass = mass;
	this.color = "#0095DD";

	//Draws particle in new position
	this.drawParticle=function(ctx){
		var centerX = this.rx*scale;
		var centerY = this.ry*scale;
		var radius = this.radius*scale;
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	this.move = function(){
		this.rx += this.vx*dt;
		this.ry += this.vy*dt;
	}
	//Predicts when a particle would hit another(if it would)
	this.timeOfHit = function(that){
		if(this == that) return Infinity;
		var dx = that.rx - this.rx;
		var dy = that.ry - this.ry;
		var dvx = that.vx - this.vx;
		var dvy = that.vy - this.vy;
		var dvdr = dx*dvx + dy*dvy;
		if(dvdr > 0) return Infinity;
		var dvdv = dvx*dvx + dvy*dvy;
		var drdr = dx*dx + dy*dy;
		var sig = this.radius + that.radius;
		//this checks if there are overlapping particles
		var d = (dvdr*dvdr) - dvdv * (drdr - sig*sig);
		if (d < 0) return Infinity;
		return -(dvdr + Math.sqrt(d))/dvdv;
	}
	//Calculates, if a ball continues straight, when it would collide with the wall
	this.horizontalWallCollisionTime = function(){
		if(this.vx > 0){
			return ((canvas.height - this.rx - this.radius)/this.vx); 
		}
		else if(this.vx < 0){
			return ((radius - this.rx)/this.vx); 
		}
		else{
			return Infinity;
		}
	}
	this.verticalWallCollisionTime = function(){
		if(this.vy > 0){
			return ((canvas.width - this.ry - this.radius)/this.vy); 
		}
		else if(this.vy < 0){
			return ((this.radius - this.ry)/this.vy); 
		}
		else{
			return Infinity;
		}
	}
	
	//If a particle collides with a ball, its velocity reverses
	this.horizantalWallCollision = function(){
		this.vx = -this.vx;
	}
	this.verticalWallCollision = function(){
		this.vy = -this.vy;
	}
	this.kineticEnergy = function(){
		return .5 * mass * (this.vx * this.vx + this.yv * this.vy);
	}
}

/**
 * Takes the  array from the parsed file
 * and populates a new array with particle objects
 */
function populateParticles(arr){
	var canvas = document.getElementById("particleCanvas");
	var ctx = canvas.getContext("2d");
	var height = canvas.height;
	var width = canvas.width;
	particles = [];
	console.log(arr);
	for(var i=0; i < arr.length; i++){
		//Adds all particles to 
		particles[i] = new Particle( arr[i][1]*width,arr[i][2]*height,arr[i][3]*width, arr[i][4]*height,arr[i][5]*width,arr[i][6]);
		particles[i].drawParticle(ctx);
		console.log("Drawn");
	}
}

//Handles file reading, creates array which holds all values for particles
document.getElementById("read").addEventListener("click", function(){
	var input = document.getElementById("file");
	arr = [];
	if(input.files && input.files[0]){
		var reader = new FileReader();
		reader.onload = function(){
			var rows = reader.result.split('\n');
			for(var i = 0; i < rows.length; i++){
				//Splits each line on white space
				arr[i] = rows[i].split(/\s+/);
			}
			populateParticles(arr);
			handleArray(arr);
		}
		reader.readAsText(input.files[0]);
	}
});

function handleArray(arr){
	var text = "";
	for (var i = 0; i < arr.length; i++){
        var row = "";
        for (var j = 0; j < arr[i].length; j++){
            row += arr[i][j] + " ";
        }
		row += '\n';
		text += row;	
    }
	document.getElementById("text").innerHTML = text;
}

//Functions for drawing the particles
/*
function drawParticle(particle, ctx){
	
}
*/

function init(){
	try{
		//loadEventListeners();
		window.requestAnimationFrame(draw);
	}
	catch(err){
		document.getElementById("err").innerHTML = err.message;
		console.log(err.message);
	}
}

function draw(){
	var canvas = document.getElementById("particleCanvas");
	var ctx = canvas.getContext("2d");
    //Clear Canvas for new drawings
//	var test = new Particle(0,0,0,0,10,4,"blue");
//	test.drawParticle(ctx);
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.onload = function(){
	init();
}

