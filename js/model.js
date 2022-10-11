// model relocate and save data set from api and use for views to updata interface

// class cho từng anime 

class Anime {
    constructor(Name, Status, urlLink, Title, AlternateTitle, episodeCount, coverImg, Description, Type, Genres) {
        this._animeName = Name;
        this._animeStatus = Status;
        this._animeUrl = urlLink;
        this._animeTitle = Title;
        this._animeAlterTitle = AlternateTitle;
        this._animeEpisode = episodeCount;
        this._animeCoverImg = coverImg;
        this._animeDescript = Description;
        this._animeType = Type;
        this._animeGenres = Genres;
    }

    get animeName (){
        return this._animeName;
    }
    set animeName(newName){
        this._animeName = newName;
    }

    get animeStatus (){
        return this._animeStatus;
    }
    set animeStatus(newStatus){
        this._animeStatus = newStatus;
    }

    get animeUrl (){
        return this._animeUrl;
    }
    set animeUrl(newUrl){
        this._animeUrl = newUrl;
    }

    get animeTitle (){
        return this._animeTitle;
    }
    set animeTitle(newTitle){
        this._animeTitle = newTitle;
    }

    get alterTitle (){
        return this._animeAlterTitle;
    }
    set alterTitle(newAlterTitle){
        this._animeAlterTitle = newAlterTitle;
    }

    get animeEpisode (){
        return this._animeEpisode;
    }
    set animeEpisode(newEpisode){
        this._animeEpisode = newEpisode;
    }

    get animeCoverImg (){
        return this._animeCoverImg;
    }
    set animeCoverImg(newImg){
        this._animeCoverImg = newImg;
    }

    get animeDescription (){
        return this._animeDescript;
    }
    set animeDescription(newDescrpition){
        this._animeDescript = newDescrpition;
    }

    get animeType (){
        return this._animeType;
    }
    set animeType(newType){
        this._animeType = newType;
    }

    get animeGenres(){
        return this._animeGenres;
    }
    set animeGenres(newGenres){
        this._animeGenres = newGenres;
    }
}

class Manga {
    constructor(name, artist,author, categories, chapterLen,created, description, img, language, lastChapterDate ){
        this._mangaName = name;
        this._mangaArtist = artist;
        this._mangaAuthor = author;
        this._mangaCategories = categories;
        this._mangaChapterLen  = chapterLen;
        this._mangaCreated = created;
        this._mangaDescription  = description;
        this._mangaImg = img;
        this._mangaLang = language;
        this._mangaLastRealease = lastChapterDate;
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
    removeManga(trIds){
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
    
}