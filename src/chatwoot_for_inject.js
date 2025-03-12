console.log("skrip.dev console injected from downloaded file");

(async () => {
	console.log("skrip.dev async function injected");

	await new Promise((resolve) => {
		setTimeout(() => {
			console.log("skrip.dev async function resolved");
			resolve();
		}, 10000);
	});

	console.log("skrip.dev async function resolved 10 seconds later");
})();
