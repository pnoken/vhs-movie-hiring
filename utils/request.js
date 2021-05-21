import axios from './axios';

const GET = (url) => {
	axios.get(url).catch((error) => {
		if (error.response) {
			return error.response.data;
		} else if (error.message) {
			console.log(`Eroor from Request ${error.request}`);
		} else {
			console.log(`General Error ${error.message}`);
		}
	});
};

const POST = (url) => {
	axios.get(url).catch((error) => {
		if (error.response) {
			return error.response.data;
		} else if (error.message) {
			console.log(`Eroor from Request ${error.request}`);
		} else {
			console.log(`General Error ${error.message}`);
		}
	});
};

const PATCH = (url) => {
	axios.get(url).catch((error) => {
		if (error.response) {
			return error.response.data;
		} else if (error.message) {
			console.log(`Eroor from Request ${error.request}`);
		} else {
			console.log(`General Error ${error.message}`);
		}
	});
};

export { GET, POST, PATCH };
