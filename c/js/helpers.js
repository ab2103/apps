function clamp ( n=0, a=0, z=0 ) {
	if ( n < a ) return a;
	if ( n > z ) return z;
	return n;
}

function cycle ( n , x, y) {
	if ( n < x ) return y;
	if ( n > y ) return x;
	return n;
}

export { clamp , cycle}