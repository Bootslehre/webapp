export function writeToLocalStorage(key: string, data: Object) {
	localStorage.setItem(key, JSON.stringify(data));
}

export function readFromLocalStorage<T>(key: string, fallback: T): T {
	try {
		const res = localStorage.getItem(key);
		return JSON.parse(res!) || fallback;
	} catch {
		return fallback;
	}
}
