export function drawLine(x1, y1, x2, y2, width, color, canvas) {
	const context = canvas.getContext('2d');
	context.beginPath();
	context.lineWidth = width;
	context.lineJoin = 'round';
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.strokeStyle = color;
	context.stroke();
	context.closePath();
}

export function drawBezier(x1, y1, x2, y2, width, color, lineDash, canvas) {
	const context = canvas.getContext('2d');
	const x = (x2 - x1) / 2;
	context.beginPath();
	context.lineWidth = width;
	context.lineJoin = 'round';
	if (lineDash != null) {
		context.setLineDash(lineDash);
	} else {
		context.setLineDash([]);
	}
	context.moveTo(x1, y1);
	context.bezierCurveTo(x, y1, x, y2, x2, y2);
	context.strokeStyle = color;
	context.stroke();
	context.closePath();
}

export function drawPoint(x, y, radius, color, canvas) {
	const context = canvas.getContext('2d');
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2);
	context.fillStyle = color;
	context.fill();
	context.closePath();
}

export function drawArrow(x, y, width, height, color, canvas) {
	const context = canvas.getContext('2d');
	const w = width / 2;
	const h = height / 2;
	const x1 = x - w;
	const y1 = y - h;
	const x2 = x + w;
	const y2 = y;
	const x3 = x1;
	const y3 = y + h;
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(x3, y3);
	context.fillStyle = color;
	context.fill();
	context.closePath();
}
