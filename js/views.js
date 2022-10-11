// show ouw page interface
// same methods as list of stuff 

// cần suy nghĩ thêm
class pageView {
    constructor(model){
        model.subscribe(this.redrawTable.bind(this))
    }
}