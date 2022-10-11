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
    
}