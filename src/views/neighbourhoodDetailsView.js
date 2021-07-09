const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

const neighbourhoodDetailsView = function() {
}


neighbourhoodDetailsView.prototype.bindEvents = function(){
    PubSub.subscribe('NeighbourhoodsView:neighborhood-selected', (evt) =>{
        // this.parentForce = evt.detail;
        console.log(evt.detail);
    })
}



module.exports = neighbourhoodDetailsView;