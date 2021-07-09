const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

const NeighbourhoodsView = function() {
    this.parentHtmlElement = document.querySelector('#neighborhoods');
    this.parentForce = null;
    this.neighourhoods = [];
}

NeighbourhoodsView.prototype.bindEvents = function(){
    PubSub.subscribe('ForcesView:force-clicked', (evt) =>{
        this.parentForce = evt.detail;
        this.getNeighbourghoods();
    })
}

NeighbourhoodsView.prototype.getNeighbourghoods = function(){
    const url = `https://data.police.uk/api/${this.parentForce}/neighbourhoods`;
    const requestHelper = new RequestHelper(url);
    requestHelper.get((data)=>{
        this.neighourhoods = data;
        this.renderNeighbourhoodList();
    })
}

NeighbourhoodsView.prototype.renderNeighbourhoodList = function(){
    this.parentHtmlElement.textContent = null;
    var nullElement = document.createElement('option');
    nullElement.textContent = '-choose a Neighborhood-';
    nullElement.selected = true;
    this.parentHtmlElement.appendChild(nullElement);
    document.querySelector('#neighborhoods').hidden = false;
    this.neighourhoods.forEach((hood) => {
        const pElement = document.createElement('option');
        pElement.value = hood.id;
        pElement.textContent = hood.name;
        this.parentHtmlElement.appendChild(pElement);
    });
}


module.exports = NeighbourhoodsView;