const PubSub = require('../helpers/pub_sub');

const ProcessBoundary = function() {
    this.boundaryRaw = [];
    this.boundaryChar = '';
}

ProcessBoundary.prototype.bindEvents = function() {
    PubSub.subscribe('neighbourhoodDetailsView:boundary-raw', (evt) =>{
        this.force = evt.detail;
    })
}

module.exports = ProcessBoundary;