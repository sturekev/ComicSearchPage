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
var pageViews = new pageView();
var searchModel = new Search();
// api Jikan
// const jikanApi = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "c7bdf33b7dmshcf42308cd22add9p16fdb8jsnf56785f70313",
//     "X-RapidAPI-Host": "jikan1.p.rapidapi.com",
//   },
// };
//
async function populateSugestion(type) {
  top = await fetch(`https://api.jikan.moe/v4/top/${type}`)
    .then((response) => response.json())
    .then((response) => {
      // console.log(response['data'][0]['title']);
      let table = document.querySelector("#suggest-table > tbody");
      table.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        let titl = response["data"][i]["title"];
		let youtubeUrl = response["data"][i]["trailer"]["url"];
		console.log(youtubeUrl);
        let row = document.createElement("tr");
        let title_number = document.createElement("td");
        title_number.innerHTML = `<b>${(i + 1).toString()}</b>`;

        let title_data = document.createElement("td");
        title_data.innerHTML = titl.toString();
		let trailer_Url = document.createElement('td');
		if (youtubeUrl){
			let link = document.createElement('a');
			link.setAttribute('href',`${youtubeUrl}`)
			link.innerText = "Trailer";
			trailer_Url.appendChild(link);
		}
		else{trailer_Url.innerText = "N/A";}
				
		
        row.appendChild(title_number);
        row.appendChild(title_data);
		row.appendChild(trailer_Url);
        table.appendChild(row);
      }
    })
    .catch((err) => console.error(err));
	console.log(top);
}

function saveWatchList() {
  localStorage.setItem("local_AnimeWatchList", JSON.stringify(animeModel));
  localStorage.setItem("local_MangaWatchList", JSON.stringify(mangaModel));
}

var deletePlayerIdList = [];
function clearWatchList() {
  let cbList = document.querySelectorAll(
    "#watch-table > tbody > tr > td > input[type = 'checkbox']"
  );
  for (let checkbox of cbList) {
    if (checkbox.checked) {
      deletePlayerIdList.push(parseInt(checkbox.closest("tr")["id"]));
    }
  }
  searchModel.removeSearch(deletePlayerIdList);
}

function RemoveAll() {
  animeModel.RemoveAll();
  mangaModel.RemoveAll();
}
function watchList(model) {}

window.onload = function () {};
