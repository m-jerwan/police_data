const PubSub = require('./helpers/pub_sub');

const ForcesView = require('./views/forcesView');

document.addEventListener('DOMContentLoaded', ()=>{
    const forcesView = new ForcesView();
    forcesView.bindEvents();
})