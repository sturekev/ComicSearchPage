// api -- https://rapidapi.com/jboy538antoni/api/animi/
// 'X-RapidAPI-Key': 'c7bdf33b7dmshcf42308cd22add9p16fdb8jsnf56785f70313',
// 'X-RapidAPI-Host': 'animi.p.rapidapi.com'

//api -- https://rapidapi.com/dan42/api/anime-news-network-encyclopedia/
// 'X-RapidAPI-Key': 'c7bdf33b7dmshcf42308cd22add9p16fdb8jsnf56785f70313',
// 'X-RapidAPI-Host': 'animenewsnetwork.p.rapidapi.com'

//api -- https://rapidapi.com/theapiguy/api/jikan1/
// 'X-RapidAPI-Key': 'c7bdf33b7dmshcf42308cd22add9p16fdb8jsnf56785f70313',
// 'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c7bdf33b7dmshcf42308cd22add9p16fdb8jsnf56785f70313',
		'X-RapidAPI-Host': 'animi.p.rapidapi.com'
	}
};

fetch('https://animi.p.rapidapi.com/name?name=Levi', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

console.log(options);