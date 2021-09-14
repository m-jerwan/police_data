const PubSub = require('../helpers/pub_sub');

const CalcsEngine = function() {
    this.boundaryRaw = [];
    this.boundaryLessCoordiantes = [];
    this.boundaryLessPrecise = [];
    this.boundaryChar = '';
    this.crimesRaw = [];
    this.statistics = {
        "details" : {},
        "crimesArray" : [],
        "crimesNumbersArray" : []
    };
}

CalcsEngine.prototype.bindEvents = function() {
    PubSub.subscribe('neighbourhoodDetailsView:boundary-raw', (evt) =>{
        this.boundaryRaw = evt.detail;
        this.limitBoundary(this.boundaryRaw);
    });
    PubSub.subscribe('neighbourhoodDetailsView:all-crimes-raw', (evt)=>{
        this.crimesRaw = evt.detail;
        this.calcStatistics();
    })
}

// parent function for limiting
CalcsEngine.prototype.limitBoundary = function() {
    this.boundaryLessCoordiantes = this.pickOutCoordinates(this.boundaryRaw);
    this.boundaryLessPrecise = this.boundaryLessCoordiantes.map(this.lessPrecision);
    this.changeToChar();
    PubSub.publish('CalcsEngine:boundaryChar-ready', this.boundaryChar);
}


// picks out every Nth coordinate, working recurseveliy until number of coordinates is below limit
// TODO: change factor
CalcsEngine.prototype.pickOutCoordinates = function(boundary){
    var lessCoordiantes = boundary.filter(function(_, i){
        return i%3 === 0;
    });
    if (lessCoordiantes.length > 136) {
        lessCoordiantes = this.pickOutCoordinates(lessCoordiantes);
    } 
    return lessCoordiantes;
}

// cuts last chars of lang and lat decreasing precision of each coordiate
CalcsEngine.prototype.lessPrecision = function(elmnt) {
    const indexOfLat = elmnt.latitude.indexOf('.');
    const indexOfLong = elmnt.longitude.indexOf('.');
    return {
        lat: elmnt.latitude.slice( 0, indexOfLat + 4), // TODO: make precision factor a variable
        long: elmnt.longitude.slice( 0, indexOfLong + 4)
    }
}

// constructs a char string from coordinates
CalcsEngine.prototype.changeToChar = function() {
    for (coordPair of this.boundaryLessPrecise) {
        this.boundaryChar += `:${coordPair.lat},${coordPair.long}`;
    }
    this.boundaryChar = this.boundaryChar.slice(1);
}


CalcsEngine.prototype.calcStatistics = function(){
    this.crimesRaw.forEach(elm => {
        //crimes counter 
        this.statistics.details[elm.category] = this.statistics.details[elm.category]+1||0;
    });

    //gather all crimes names and names in an array
    for (const detail in this.statistics.details) {
        this.statistics.crimesArray.push(detail);
        this.statistics.crimesNumbersArray.push(this.statistics.details[detail]);
      }
    console.log(this.statistics);
    PubSub.publish('calcsEngine:calcStatistics-ready', this.statistics);
}


module.exports = CalcsEngine;




/*
51.997169648, -0.023733794 org from API
51.99716964, -0.02373379
51.9971696, -0.0237337
51.997169, -0.023733
51.99716, -0.02373 <<< same place
51.9971, -0.0237
51.997, -0.023 <<< for crime statistics

lat: always 2 dec, never negative = 2 char + "." + 3 char decimal ==>>  6 char
long: east: 1 char positive, west: 1 char negative = 2 max char + "." + 3 char decimal ==>> max 6 char
for UK, anyway
max lang, long = lat + ","+ long + ":" ==>> max 14 char

max char of URL is 2000
https://data.police.uk/api/crimes-street/all-crime?poly=    <<  57 char
52.268,0.543:52.794,0.238:52.130,0.478
&date=2017-01   << optional date: 14 char

2000-57-14 = 1929 max char on boundary

1929/14 = 137.78
>>> max 137 pairs of coordinates to fit in URL <<< 
*/
