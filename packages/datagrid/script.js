const agGridElement = document.querySelector('.ag-body-viewport');
const scrollElement = element => positionY => (element.scrollTop = positionY);
const scrollAgGrid = scrollElement(agGridElement);
const getAgGridheight = () => agGridElement.scrollHeight - agGridElement.offsetHeight;

function myStressTest() {
	const STEPS = 1000;
	const agGridScrollHeight = getAgGridheight();
	for (
		let position = 0, counter = 0;
		position < agGridScrollHeight;
		position += agGridScrollHeight / STEPS, counter += 1
	) {
		setTimeout(() => scrollAgGrid(position), counter * 30);
	}
}

setTimeout(myStressTest, 5000);

const scrollAgGridEnd = () => scrollAgGrid(getAgGridheight());
const scrollAgGridMiddle = () => scrollAgGrid(getAgGridheight() / 2);
setTimeout(scrollAgGridMiddle, 5300);
setTimeout(scrollAgGridEnd, 0);
setTimeout(scrollAgGridMiddle, 5600);
setTimeout(scrollAgGridEnd, 5900);
