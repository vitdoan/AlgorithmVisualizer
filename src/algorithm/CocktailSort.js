export default function CocktailSort({
	handleComparisionAnimation,
	handleSort,
	unsortedArray,
	setColorAtIndex,
	handleSingleAnimation,
	handleNumOfComparision,
}) {
	async function cocktailSort(arr) {
		let start = 0;
		let end = arr.length;
		let swapped = true;

		while (swapped) {
			swapped = false;
			for (let i = start; i < end - 1; ++i) {
				if (arr[i] > arr[i + 1]) {
					handleNumOfComparision();
					await handleComparisionAnimation(i, i + 1);
					let temp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = temp;
					swapped = true;
				}
				handleSort(arr);
			}
			if (!swapped) {
				setColorAtIndex(end, "#b4e9fa");
				break;
			}
			swapped = false;
			end -= 1;
			setColorAtIndex(end, "#b4e9fa");
			for (let i = end - 1; i >= start; i--) {
				if (arr[i] > arr[i + 1]) {
					handleNumOfComparision();
					await handleComparisionAnimation(i, i + 1);
					let temp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = temp;
					swapped = true;
				}
				handleSort(arr);
			}
			setColorAtIndex(start, "#b4e9fa");
			start += 1;
			handleSort(arr);
		}
		await new Promise((res) => {
			setTimeout(() => {
				res();
			}, 250);
		});

		for (let i = 0; i < arr.length; i++) {
			await handleSingleAnimation(i, "#b0b1fc");
		}
	}
	return (
		<a
			className="CocktailSort sort"
			onClick={() => {
				cocktailSort(unsortedArray);
			}}
		>
			Cocktail Shake Sort
		</a>
	);
}
