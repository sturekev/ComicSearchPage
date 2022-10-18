// model relocate and save data set from api and use for views to updata interface

// class cho từng anime 

// title, imgUrl, description, url
class Anime {
    constructor(title, imgUrl, description, url) {
        this._animeTitle = title;
        this._animeImgUrl = imgUrl;
        this._animeDescription = description;
        this._animeUrl = url;
    }

    get animeTitle (){
        return this._animeTitle;
    }
    set animeTitle(newTitle){
        this._animeTitle = newTitle;
    }

    get animeImgUrl (){
        return this._animeImgUrl;
    }
    set animeImgUrl(newImgUrl){
        this._animeImgUrl = newImgUrl;
    }

    get animeDescription (){
        return this._animeDescription;
    }
    set animeDescription(newDescrpition){
        this._animeDescription = newDescrpition;
    }

    get animeUrl (){
        return this._animeUrl;
    }
    set animeUrl(newUrl){
        this._animeUrl = newUrl;
    }
}

// title, latestChapter, thumbnail, viewsCount, url, lastestUpdtae
class Manga {
    constructor(title, lastChapter, thumbnail, viewCount, url, lastestUpdate){
        this._mangaTitle = title;
        this._mangaChapter = lastChapter;
        this._mangaImg = thumbnail;
        this._views = viewCount;
        this._mangaUrl = url;
        this._mangaLatestUpdate  = lastestUpdate;
    }
    
    get mangaName (){
        return this._mangaName;
    }
    set mangaName(newName){
        this._mangaName = newName;
    }

    get mangaArtist (){
        return this._mangaArtist;
    }
    set mangaArtist(newArtist){
        this._mangaArtist = newArtist;
    }

    get mangaAuthor (){
        return this._mangaAuthor;
    }
    set mangaAuthor(newAuthor){
        this._mangaAuthor = newAuthor;
    }

    get mangaCategories (){
        return this._mangaCategories;
    }
    set mangaCategories(newCategorties){
        this._mangaCategories = newCategorties;
    }

    get mangaChapterLen (){
        return this._mangaChapterLen;
    }
    set mangaChapterLen(newChapterLen){
        this._mangaChapterLen = newChapterLen;
    }

    get mangaCreated (){
        return this._mangaCreated;
    }
    set mangaCreated(newCreated){
        this._mangaCreated = newCreated;
    }

    get mangaDescription (){
        return this._mangaDescription;
    }
    set mangaDescription(newDescrpition){
        this._mangaDescription = newDescrpition;
    }

    get mangaImg (){
        return this._mangaImg;
    }
    set mangaImg(newImg){
        this._mangaImg = newImg;
    }

    get mangaLang (){
        return this._mangaLang;
    }
    set mangaLang(newLang){
        this._mangaLang = newLang;
    }

    get _mangaLastRealease(){
        return this._mangaLastRealease;
    }
    set mangaLastRealease(newRelease){
        this._mangaLastRealease = newRelease;
    }
}

class Subject{
    constructor(){
        this.handlers = [];
    }

    subscribe(func){
        this.handlers.push(func);
    }
    unsubscribe(func){
        this.handlers = this.handlers.filter(item => item !== func);
    }

    publish(msg, obj){
        let scope = obj || window;
        for (let func of this.handlers){
            func(scope, msg);
        }
    }
}

// suy nghĩ về cái này về việc làm cái model

class allAnime extends Subject{
    constructor(){
        super();
        this._allAnime = [];
    }

    addAnime(animeInfo){
        this._allAnime.push(animeInfo);
        this.publish("newAnime has been added", this);
    }
    removeAnime(trIds){
        for (let index = trIds.length; index > 0, index --;){
            this._allAnime.splice(trIds[index],1);
        }
        this.publish("Selected Anime has been deleted", this);
    }
    removeAll (){
        this._allAnime = [];
        this.publish("The Anime local storage has been cleared", this);
    }

    [Symbol.iterator](){
        let index = -1;
        return{ next: () => ({value: this._allAnime[++index], done : !(index in this._allAnime)})};
    }
}
class allManga extends Subject{
    constructor(){
        super();
        this._allManga = [];
    }

    addManga (MangaInfo){
        this._allManga.push(MangaInfo);
        this.publish("New Manga has been added", this);
    }

    removeManga(trIds){
        for (let index = trIds.length; index > 0, index --;){
            this._allManga.splice(trIds[index],1);
        }
        this.publish("Selected Mangas has been deleted", this);
    }

    removeAll (){
        this._allManga = [];
        this.publish("The Manga local storage has been cleared", this);
    }

    [Symbol.iterator](){
        let index = -1;
        return{ next: () => ({value: this._allManga[++index], done : !(index in this._allManga)})};
    }
}

class Search extends Subject{
    constructor(){
        super();
        this._search = []
    }
    addSearch(searchInfo){
        this._search.push(searchInfo);
        this.publish("New Manga has been added", this);
    }

    removeSearch(trIds){
        for (let index = trIds.length; index > 0, index --;){
            this._search.splice(trIds[index],1);
        }
        this.publish("Selected search has been deleted", this);
    }

    removeAll (){
        this._search = [];
        this.publish("The search local storage has been cleared", this);
    }

    [Symbol.iterator](){
        let index = -1;
        return{ next: () => ({value: this._search[++index], done : !(index in this._allManga)})};
    }
}