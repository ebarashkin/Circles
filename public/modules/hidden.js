let checkIntersectionCircle = (c, i, j) => {

	let iX = c[i].x 
	let iY = c[i].y
	let iD = c[i].radius
	let iR = iX + iD/2 //right circle i 
	let iL = iX - iD/2 //left circle i
	let iT = iY - iD/2 //top circle i
	let iB = iY + iD/2 //bootom circle i

	let jX = c[j].x 
	let jY = c[j].y
	let jD = c[j].radius 
	let jR = jX + jD/2 //right circle j 
	let jL = jX - jD/2 //left circle j
	let jT = jY - jD/2 //top circle j
	let jB = jY + jD/2 //bootom circle j


	return 	iT + iD > jT &&
			iL + iD > jL && 
			iB - iD < jB && 
			iR - iD < jR 
}

export { checkIntersectionCircle }