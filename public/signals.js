let currentListener;

/**
 * Creates a signal with an initial value.
 *
 * @param {*} initialValue - The initial value of the signal.
 * @returns {Array<Function>} - An array containing the read and write functions of the signal.
 */
export function createSignal(initialValue) {
	let value = initialValue;

	const subscribers = new Set();

	const read = () => {
		if (currentListener !== undefined) {
			subscribers.add(currentListener);
		}
		return value;
	};
	const write = (newValue) => {
		value = newValue;
		subscribers.forEach((fn) => fn());
	};

	return [read, write];
}

/**
 * Creates an effect with the given callback function.
 * @param {Function} callback - The callback function to be executed as the effect.
 */
export function createEffect(callback) {
	currentListener = callback;
	callback();
	currentListener = undefined;
}