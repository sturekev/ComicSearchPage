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
var WatchList = new Set();
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

        let moreInfoTd = document.createElement("td");
        let moreInfo = document.createElement("button");
        moreInfo.setAttribute("type", "button");
        moreInfo.setAttribute(
          "onclick",
          `callSearch('${type}','${titl.toString()}')`
        );
        moreInfo.innerText = "More info";
        moreInfoTd.appendChild(moreInfo);
        row.appendChild(moreInfoTd);

        table.appendChild(row);
      }
    })
    .catch((err) => console.error(err));
}

function callSearch(type, parram) {
  if (type == "anime") {
    if (parram) {
      AnimeSearch(parram);
    } else {
      let search_param = document.querySelector("#title").value;
      AnimeSearch(search_param);
    }
  } else if (type == "manga") {
    if (parram) {
      MangaSearch(parram);
    } else {
      let search_param = document.querySelector("#title").value;
      MangaSearch(search_param);
    }
  }
}

//anime search function -- data sample
// description: "It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the myster...read more."
// myanimelist_id: 1735
// myanimelist_url:"https://myanimelist.net/anime/1735/Naruto__Shippuuden"
// picture_url: "https://cdn.myanimelist.net/r/50x70/images/anime/1565/111305.jpg?s=a92272fe7a37f1c114011b406d5390c8"
// title: "Naruto: Shippuuden"
function saveToWatchList(title, type) {
  console.log(title);
  console.log(type);
  WatchList.add([title, type]);
  WatchList.delete();
}
function loadWatchList() {
  let table = document.querySelector("#watchList");
  for (tup of WatchList) {
    let row = document.createElement("tr");

    let title = document.createElement("td");
    title.setAttribute("scope", "col");
    console.log(tup);
    console.log(top[0]);
    title.innerText = tup[0];
    row.appendChild(title);

    let type = document.createElement("td");
    type.innerText = tup[1];
    row.appendChild(type);

    let remove = document.createElement("input");
    remove.setAttribute("type", "button");
    remove.setAttribute("value", "remove");
    remove.setAttribute("onclick", `removeRow(this,"${(tup[0], tup[1])}")`);
    remove.setAttribute("class", "d-flex justify-content-end");
    row.appendChild(remove);

    table.appendChild(row);
  }
}

function removeRow(element, tuple) {
  // TODO: Implement this function
  let closetTr = element.closest("tr");
  closetTr.parentElement.removeChild(closetTr);
  WatchList.delete(tuple);
  localStorage.setItem("local_WatchList", JSON.stringify(WatchList));
}

function saveWatchList() {
  localStorage.setItem("local_WatchList", JSON.stringify(WatchList));
}

function removeAll() {
  WatchList.clear();
  localStorage.setItem("local_WatchList", JSON.stringify(WatchList));
  let watchList = document.querySelector("#watchList");
  watchList.innerText = "";
}
function populateAnimeSearch(data) {
  let generalRes = document.querySelector("#searchRes");
  generalRes.innerText = "";

  for (info of data) {
    let row = document.createElement("tr");

    //index
    let idx = document.createElement("td");
    // idx.setAttribute('scope', 'row');
    let curColId = document.querySelectorAll("#searchRes > tr").length;
    idx.innerText = curColId.toString();
    row.appendChild(idx);

    //thumbnail
    let imgTd = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", `${info["picture_url"]}`);
    imgTd.appendChild(img);
    row.appendChild(imgTd);

    //title
    let title = document.createElement("td");
    title.innerText = info["title"];
    row.appendChild(title);

    let type = document.createElement("td");
    type.innerText = "anime";
    row.appendChild(type);

    // anime link
    let moreInfo = document.createElement("td");
    let link = document.createElement("a");
    link.setAttribute("href", `${info["myanimelist_url"]}`);
    link.setAttribute("target", "_blank");
    link.innerText = "More Info";
    moreInfo.appendChild(link);
    row.appendChild(moreInfo);

    //add to watch list
    let btn = document.createElement("td");
    let saveToWatchList = document.createElement("input");
    saveToWatchList.setAttribute("type", "button");
    saveToWatchList.setAttribute("value", "add to watchList");
    saveToWatchList.setAttribute(
      "onclick",
      `saveToWatchList('${info["title"]}','anime')`
    );
    saveToWatchList.setAttribute("class", "d-flex justify-content-end");
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
      .then((response) => {
        console.log(response);
        populateAnimeSearch(response);
      })
      .catch((err) => console.error(err));
  }
}
// manga search function -- data sample
// authors: ['Miura Kentaro']
// id: "manga-ma952557"
// last_updated: "Oct-13-2022 08:40"
// latest_chapter: 370
//latest_chapter_title: "Chapter 370"
// latest_chapter_url: "https://readmanganato.com/manga-ma952557/chapter-370"
// thumbnail_url: "https://avt.mkklcdnv6temp.com/43/o/1-1583465423.jpg"
// title: "Berserk"
// url: "https://readmanganato.com/manga-ma952557"
// views_count: 73303472
function populateMangaSearch(data) {
  let generalRes = document.querySelector("#searchRes");
  generalRes.innerText = "";

  for (info of data) {
    let row = document.createElement("tr");

    //index
    let idx = document.createElement("th");
    idx.setAttribute("scope", "row");
    let curColId = document.querySelectorAll("#searchRes > tr").length;
    idx.innerText = curColId.toString();
    row.appendChild(idx);

    //thumbnail
    let imgTd = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", `${info["thumbnail_url"]}`);
    imgTd.appendChild(img);
    row.appendChild(imgTd);

    //title
    let title = document.createElement("td");
    title.innerText = info["title"];
    row.appendChild(title);

    let type = document.createElement("td");
    type.innerText = "manga";
    row.appendChild(type);

    //chapters
    let chapter = document.createElement("td");
    chapter.innerText = info["latest_chapter"] + " chapters";
    row.appendChild(chapter);

    // latest updated
    let updated = document.createElement("td");
    updated.innerText = "updated by " + info["last_updated"];
    row.appendChild(updated);

    // views count
    let views = document.createElement("td");
    views.innerText = info["views_count"] + " views";
    row.appendChild(views);

    //manga link
    let moreInfo = document.createElement("td");
    let link = document.createElement("a");
    link.setAttribute("href", `${info["url"]}`);
    link.setAttribute("target", "_blank");
    link.innerText = "More Info";
    moreInfo.appendChild(link);
    row.appendChild(moreInfo);

    // add to watch list
    let btn = document.createElement("td");
    let saveToWatchList = document.createElement("input");
    saveToWatchList.setAttribute("type", "button");
    saveToWatchList.setAttribute("value", "add to watchList");
    saveToWatchList.setAttribute(
      "onclick",
      `saveToWatchList(${info["title"]},"manga")`
    );
    saveToWatchList.setAttribute("class", "d-flex justify-content-end");
    btn.appendChild(saveToWatchList);
    row.appendChild(btn);

    generalRes.appendChild(row);
  }
}
//manga search function
async function MangaSearch(search_param) {
  console.log(search_param);
  if (search_param == "") {
    console.log("HERRRREEEEE");
  } else {
    let search_res = await fetch(
      `https://manga-scraper-for-mangakakalot-website.p.rapidapi.com/search?keyword=${search_param}&page=1`,
      manga_search_options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        populateMangaSearch(response["data"]);
      })
      .catch((err) => console.error(err));
  }
}

window.onload = function () {};
