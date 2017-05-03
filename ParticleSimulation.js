function Particle(rx, ry, vx, vy, radius, mass, color){
	this.rx = rx;
	this.ry = ry;
	this.vx = vx;
	this.vy = vy;
	this.radius = radius;
	this.mass = mass;
}

//Handles file reading
document.getElementById("read").addEventListener("click", function(){
	var input = document.getElementById("file");
	if(input.files && input.files[0]){
		var reader = new FileReader();
		reader.onload = function(){
			arr = [];
			var rows = reader.result.split('\n');
			for(var i = 0; i < rows.length; i++){
				//Splits each line on white space
				arr[i] = rows[i].split(/\s+/);
			}
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
	var test = new Particle(100,100,0,0,4,4,"blue");

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
}
window.onload = function(){
	init();
}

