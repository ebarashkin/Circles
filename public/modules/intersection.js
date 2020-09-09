let checkIntersectionCircle = (f, i, j) => {

	let maxDistanceCircle = f[j].radius/2 + f[i].radius/2;

	maxDistanceCircle *= maxDistanceCircle;

	let dx = f[j].x - f[i].x;
	let dy = f[j].y - f[i].y;

	let currentDistanceCircle = dx * dx + dy * dy;

	return currentDistanceCircle < maxDistanceCircle;
}

export { checkIntersectionCircle }