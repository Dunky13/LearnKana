var rand = function(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
function round(value, step, dir) {
    step || (step = 1.0);
	dir || (dir = 0);
    var inv = 1.0 / step;
	var round = 0;
	if(dir == 1)
		round = Math.ceil(value * inv) / inv;
	else if(dir == -1)
		round = Math.floor(value * inv) / inv;
	else
		round = Math.round(value * inv) / inv;
    return round;
}
function shuffle(array, rounds) {
	rounds = typeof rounds !== 'undefined' ? rounds : 3;
	for(var i = 0; i < rounds; i++)
	{
		var counter = array.length;
		while (counter > 0) {
			var index = Math.floor(Math.random() * counter);
			counter--;
			var temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}
	}
    return array;
}
function getChanceList(array){
	var tmp = []
	for(var i = 0; i < array.length; i++)
	{
		tmp.push(array[i].chance);
	}
	return tmp;
}