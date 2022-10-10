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
}