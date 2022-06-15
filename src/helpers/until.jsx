export function until(promiseOrPromiseList) {
	if (!promiseOrPromiseList) {
		console.error("no promise provided", promiseOrPromiseList);
		return Promise.reject([null, null]);
	}
	// array of promises
	if (Array.isArray(promiseOrPromiseList)) {
		return Promise.all(promiseOrPromiseList)
			.then((results) => [null, results])
			.catch((err) => [err, promiseOrPromiseList.map(() => undefined)]);
	}
	// single promise
	return promiseOrPromiseList
		.then((result) => [null, result])
		.catch((err) => [err, undefined]);
}
