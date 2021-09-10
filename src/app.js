const PubSub = require('./helpers/pub_sub');
const ForcesView = require('./views/forcesView');
const NeighbourhoodsView = require('./views/neighbourhoodsView');
const NeighbourhoodDetailsView = require('./views/neighbourhoodDetailsView');
const CalcsEngine = require('./models/calcs_engine');

document.addEventListener('DOMContentLoaded', ()=>{
    const forcesView = new ForcesView();
    forcesView.bindEvents();

    const neighbourhoodsView = new NeighbourhoodsView();
    neighbourhoodsView.bindEvents();

    const neighbourhoodDetailsView = new NeighbourhoodDetailsView();
    neighbourhoodDetailsView.bindEvents();

    const calcsEngine = new CalcsEngine();
    calcsEngine.bindEvents();

})