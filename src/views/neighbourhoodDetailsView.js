const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

const NeighbourhoodDetailsView = function() {
    this.force = [];
    this.neighbourhood = [];
    this.specifics = [];
    this.boundary = [];
    this.people = [];
    this.events = [];
    this.priorities = [];
    this.crimes = [];
    this.boundaryChar = '';
}


NeighbourhoodDetailsView.prototype.bindEvents = function(){
    PubSub.subscribe('NeighbourhoodsView:neighborhood-selected', (evt) =>{
        this.force = evt.detail.force;
        this.neighbourhood = evt.detail.neighbourhood;
        this.getHoodSpecifics();
        this.getHoodBoundary();
        this.getHoodTeam();
        this.getHoodEvents();
        this.getHoodPriorities();
        // console.log(this);
    })
    PubSub.subscribe('CalcsEngine:boundaryChar-ready', (evt) =>{
        this.boundaryChar = evt.detail;
        this.getHoodCrimes();
    })

}
// 
// TODO: DRY all sthis into one function:
// 
NeighbourhoodDetailsView.prototype.getHoodSpecifics = function(){
    const url = `https://data.police.uk/api/${this.force}/${this.neighbourhood}`;
    const requestHelper = new RequestHelper(url);
    requestHelper.get((data)=>{
        this.specifics = data;
    });
}


NeighbourhoodDetailsView.prototype.getHoodBoundary = function(){
    const url = `https://data.police.uk/api/${this.force}/${this.neighbourhood}/boundary`;
    const requestHelper = new RequestHelper(url);
    requestHelper.get((data)=>{
        this.boundary = data;
        PubSub.publish('neighbourhoodDetailsView:boundary-raw', this.boundary );
    });
}

NeighbourhoodDetailsView.prototype.getHoodTeam = function(){
    const url = `https://data.police.uk/api/${this.force}/${this.neighbourhood}/people`;
    const requestHelper = new RequestHelper(url);
    requestHelper.get((data)=>{
        this.people = data;
    });
}

NeighbourhoodDetailsView.prototype.getHoodEvents = function(){
    const url = `https://data.police.uk/api/${this.force}/${this.neighbourhood}/events`;
    const requestHelper = new RequestHelper(url);
    requestHelper.get((data)=>{
        this.events = data;
    });
}

NeighbourhoodDetailsView.prototype.getHoodPriorities = function(){
    const url = `https://data.police.uk/api/${this.force}/${this.neighbourhood}/priorities`;
    const requestHelper = new RequestHelper(url);
    requestHelper.get((data)=>{
        this.priorities = data;
    });
}


NeighbourhoodDetailsView.prototype.getHoodCrimes = function(){
    const url = `https://data.police.uk/api/crimes-street/all-crime?poly=${this.boundaryChar}&date=2021-01`;
    const requestHelper = new RequestHelper(url);
    requestHelper.get((data)=>{
        this.crimes = data;
        console.log(this.crimes);
    });
}


module.exports = NeighbourhoodDetailsView;