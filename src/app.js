const PubSub = require('./helpers/pub_sub');
const ForcesView = require('./views/forcesView');
const NeighbourhoodsView = require('./views/neighbourhoodsView');

document.addEventListener('DOMContentLoaded', ()=>{
    const forcesView = new ForcesView();
    forcesView.bindEvents();

    const neighbourhoodsView = new NeighbourhoodsView();
    neighbourhoodsView.bindEvents();

})