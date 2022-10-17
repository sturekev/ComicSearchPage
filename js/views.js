// show ouw page interface
// same methods as list of stuff 

// cần suy nghĩ thêm
class pageView {
    constructor(model,task){
        if (task == "watchList"){
            model.subscribe(this.redrawWatchList.bind(this))
        }
        else if (task == "top"){
            model.subscribe(this.topTable.bind(this))
        }
        else if (task == "Search"){
            model.subscribe(this.redrawContent.bind(this))
        }
    }
    redrawWatchList(listOfAnime, listOfManga, message){
        let tblBody = document.querySelector("#watch-table > tbody");
        tblBody.innerText = "";
        let trAnime = document.createElement("tr");
        let thAnime = document.createElement("th");
        thAnime.innerText = "Anime";
        trAnime.appendChild(thAnime);
        tblBody.appendChild(trAnime);

        for (let animeInfo of listOfAnime){
            let row = document.createElement("tr");
            let curAnimeId = document.querySelectorAll("#watch-table > tbody > tr").length;
            row.setAttribute("id", `${curAnimeId}`);

            let tdCheckBox  = document.createElement("td");
            let cb = document.createElement("input");
            cb.setAttribute("type","checkbox");

            tdCheckBox.appendChild(cb);
            row.appendChild(tdCheckBox);

            let animeName  = document.createElement("td");
            animeName.innerText = animeInfo.animeName;
            row.appendChild(animeName);

            tblBody.appendChild(row);
        }

        let trManga = document.createElement("tr");
        let thManga = document.createElement("th");
        thManga.innerText = "Manga";
        trManga.appendChild(thManga);
        tblBody.appendChild(trManga);

        for (let mangaInfo of listOfManga){
            let row = document.createElement("tr");
            let curMangaId = document.querySelectorAll("#watch-table > tbody > tr").length;
            row.setAttribute("id", `${curMangaId}`);

            let tdCheckBox  = document.createElement("td");
            let cb = document.createElement("input");
            cb.setAttribute("type","checkbox");

            tdCheckBox.appendChild(cb);
            row.appendChild(tdCheckBox);

            let mangaName  = document.createElement("td");
            mangaName.innerText = mangaInfo.mangaName;
            row.appendChild(mangaName);

            tblBody.appendChild(row);
        }
    }
}