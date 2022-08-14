export default function BubbleSort({
	handleComparisionAnimation,
	handleSort,
	unsortedArray,
	setColorAtIndex,
	handleSingleAnimation,
    handleNumOfComparision
}) {
	async function bubbleSort(array) {
		let unsorted = array.length;
		for (let i = 0; i < unsorted; unsorted--) {
			for (let j = i; j < unsorted; j++) {
				if (j + 1 < unsorted) {
					await handleComparisionAnimation(j, j + 1);
				}
				if (array[j] > array[j + 1]) {
				    handleNumOfComparision();
					let temp = array[j];
					array[j] = array[j + 1];
					array[j + 1] = temp;
				}
				handleSort(array);
			}
			handleSort(array);
			setColorAtIndex(unsorted - 1, "#b4e9fa");
		}
		await new Promise((res) => {
			setTimeout(() => {
				res();
			}, 250);
		});
		for (let i = 0; i < array.length; i++) {
			await handleSingleAnimation(i, "#b0b1fc");
		}
	}
	return (
		<a
			className="bubbleSort sort"
			onClick={() => {
                bubbleSort(unsortedArray)}}
		>
			Bubble Sort
		</a>
	);
}
