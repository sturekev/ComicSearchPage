// api -- https://rapidapi.com/jboy538antoni/api/animi/
// 'X-RapidAPI-Key': 'c7bdf33b7dmshcf42308cd22add9p16fdb8jsnf56785f70313',
// 'X-RapidAPI-Host': 'animi.p.rapidapi.com'

//api -- https://rapidapi.com/dan42/api/anime-news-network-encyclopedia/
// 'X-RapidAPI-Key': 'c7bdf33b7dmshcf42308cd22add9p16fdb8jsnf56785f70313',
// 'X-RapidAPI-Host': 'animenewsnetwork.p.rapidapi.com'

//api -- https://rapidapi.com/theapiguy/api/jikan1/
// 'X-RapidAPI-Key': 'c7bdf33b7dmshcf42308cd22add9p16fdb8jsnf56785f70313',
// 'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'
// 
//populate the info and choice for 

// call model
var animeModel = new allAnime();
var mangaModel = new allManga();

// api Jikan 
const jikanApi = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c7bdf33b7dmshcf42308cd22add9p16fdb8jsnf56785f70313',
		'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'
	}
};
data  = await fetch('https://jikan1.p.rapidapi.com/top/anime/1/upcoming', jikanApi)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
//
async function populateSugestion(type){
	topAnime  = await fetch(`https://jikan1.p.rapidapi.com/top/${type}`, jikanApi)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

window.onload = function(){
	let sugestionId = document.querySelector("suggestionContent");
	populateSugestion(jikanApi);
};