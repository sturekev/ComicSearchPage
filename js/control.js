
// anime search constant variable
const anime_search_options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7574f18f9bmsh34870144cdb7a1bp1b4b3cjsn22321cb8f492",
    "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
  },
};

// manga search constant variable
const manga_search_options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7574f18f9bmsh34870144cdb7a1bp1b4b3cjsn22321cb8f492",
    "X-RapidAPI-Host": "manga-scraper-for-mangakakalot-website.p.rapidapi.com",
  },
};
var animeWatchList = [];
var mangaWatchList = [];
//Top Manga/Anime function
async function populateSugestion(type) {
  top = await fetch(`https://api.jikan.moe/v4/top/${type}`)
    .then((response) => response.json())
    .then((response) => {
      // console.log(response['data'][0]['title']);
      let table = document.querySelector("#suggest-table > tbody");
      table.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        let titl = response["data"][i]["title"];
        let linkUrl;
        if (type == "anime") {
          linkUrl = response["data"][i]["trailer"]["url"];
        } else {
          linkUrl = response["data"][i]["url"];
        }
        let row = document.createElement("tr");

        let title_number = document.createElement("td");
        title_number.innerHTML = `<b>${(i + 1).toString()}</b>`;
        row.appendChild(title_number);

        let title_data = document.createElement("td");
        title_data.innerHTML = titl.toString();
        row.appendChild(title_data);

        let trailer_Url = document.createElement("td");
        if (linkUrl) {
          let link = document.createElement("a");
          link.setAttribute("href", `${linkUrl}`);
          link.innerText = "About";
          trailer_Url.appendChild(link);
        } else {
          trailer_Url.innerText = "N/A";
        }
        row.appendChild(trailer_Url);

        let moreInfoTd = document.createElement('td');
        let moreInfo = document.createElement('button');
        moreInfo.setAttribute('type','button');
        moreInfo.setAttribute('onclick',`callSearch(${type},${titl.toString()})`);
        moreInfo.innerText = 'More info';
        moreInfoTd.appendChild(moreInfo);
        row.appendChild(moreInfoTd);

        table.appendChild(row);
      }
    })
    .catch((err) => console.error(err));
}

function callSearch(type, parram) {
  if (type == 'anime'){
    if (parram){
      AnimeSearch(parram);
    }else {
      let search_param = document.querySelector("#title").value;
      AnimeSearch(search_param);
    }
  }
  else if (type =='manga  ') {
    if (parram){
      MangaSearch(parram);
    }else {
      let search_param = document.querySelector("#title").value;
      MangaSearch(search_param);
    }
  }
}

//anime search function
// description: 
// "It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the myster...read more."
// myanimelist_id:
// 1735
// myanimelist_url:
// "https://myanimelist.net/anime/1735/Naruto__Shippuuden"
// picture_url:
// "https://cdn.myanimelist.net/r/50x70/images/anime/1565/111305.jpg?s=a92272fe7a37f1c114011b406d5390c8"
// title:
// "Naruto: Shippuuden"
function saveToWatchList(params) {
  
}
function watchList(params) {
  
}
function populateAnimeSearch(data){
  let generalRes = document.querySelector('#searchRes');
  generalRes.innerText ='';
  
  for (info of data){
    let row = document.createElement('tr');

    let idx = document.createElement('td');
    let curColId  = document.querySelectorAll("#searchRes").length;
    idx.innerText = curColId.toString();
    row.appendChild(idx);

    let imgTd = document.createElement('td');
    let img = document.createElement('img');
    img.setAttribute('src',`info['picture_url']`);
    // img.setAttribute('class', 'img-thumbnail');
    imgTd.appendChild(img);
    row.appendChild(imgTd);

    let title = document.createElement("td");
    title.innerText = info['title'];
    row.appendChild(title);

    let moreInfo = document.createElement("td");
    let link = document.createElement("a");
    link.setAttribute("href", `${info['myanimelist_url']}`);
    link.innerText = "More Info";
    moreInfo.appendChild(link);
    row.appendChild(moreInfo);

    let btn = document.createElement('td');
    let saveToWatchList = document.createElement('btn');
    saveToWatchList.setAttribute('onclick',saveToWatchList(this));
    saveToWatchList.innerText = 'add';
    btn.appendChild(saveToWatchList);
    row.appendChild(btn);

    generalRes.appendChild(row);
  }
}

async function AnimeSearch(search_param) {
  
  console.log(search_param);
  if (search_param == "") {
    console.log("HERRRREEEEE");
  } else {
    let search_res = await fetch(
      `https://myanimelist.p.rapidapi.com/search/${search_param}/10`,
      anime_search_options
    )
      .then((response) => response.json())
      .then((response) => {console.log(response);
        // xử lý thông tin //
        // for (let index = 0; index <=  Object.keys(response).length; index++){
        // }

      })
      .catch((err) => console.error(err));
  }
}

function populateMangaSearch(){}
//manga search function
async function MangaSearch(search_param) {
  if (search_param == "") {
    console.log("HERRRREEEEE");
  } else {
    let search_res = await fetch(
      `https://manga-scraper-for-mangakakalot-website.p.rapidapi.com/search?keyword=${search_param}&page=1`,
      manga_search_options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }
}

function saveWatchList() {
  localStorage.setItem("local_MangaWatchList", JSON.stringify(mangaWatchList));
  localStorage.setItem("local_AnimeWatchList", JSON.stringify(animeWatchList));
}
// var deletePlayerIdList = [];
// function clearWatchList() {
//   let cbList = document.querySelectorAll(
//     "#watch-table > tbody > tr > td > input[type = 'checkbox']"
//   );
//   for (let checkbox of cbList) {
//     if (checkbox.checked) {
//       deletePlayerIdList.push(parseInt(checkbox.closest("tr")["id"]));
//     }
//   }
//   searchModel.removeSearch(deletePlayerIdList);
// }

// function RemoveAll() {
//   animeModel.RemoveAll();
//   mangaModel.RemoveAll();
// }
// function watchList(model) {}
window.onload = function () {};
