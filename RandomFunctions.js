function collide(obj1,obj2){
	if(obj1.x + obj1.w < obj2.x)
		return false;
	else if(obj1.y + obj1.h < obj2.y)
		return false;
	else if(obj1.x > obj2.x + obj2.w)
		return false;
	else if(obj1.y > obj2.y + obj2.h)
		return false;
	
	return true;
}

function adjust(moveable,stationary){
	var left = Math.abs(moveable.x - (stationary.x - moveable.w));
	var right = Math.abs(moveable.x - (stationary.x + stationary.w));
	var up = Math.abs(moveable.y - (stationary.y - moveable.h));
	var down = Math.abs(moveable.y - (stationary.y + stationary.h));
	
	if(left <= right && left <= up && left <= down)
		moveable.x = stationary.x - moveable.w;
	else if(right <= left && right <= up && right <= down)
		moveable.x = stationary.x + stationary.w;
	else if(up <= left && up <= right && up <= down)
		moveable.y = stationary.y - moveable.h;
	else if(down <= left && down <= right && down <= up)
		moveable.y = stationary.y + stationary.h;
}