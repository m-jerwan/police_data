const ForcesList = require('../models/forcesList');
const PubSub = require('../helpers/pub_sub');

const ForcesView = function () {
}

ForcesView.prototype.bindEvents = function () {
    this.addEventListeners();
}


ForcesView.prototype.addEventListeners = function () {
    const allForcesElements = document.querySelectorAll('.force');

    allForcesElements.forEach(elm => {
        elm.onclick = ()=> PubSub.publish('ForcesView:force-clicked', elm.id)
    });  
}


module.exports = ForcesView;