function parseData(createGraph){
Papa.parse("https://KiiraKH.github.io/Assignment-SSID.csv", {
    download: true,
    header: true,
    complete: function(result) {
        console.log(result.data);
        createGraph(result.data);
    }
});
}

function createGraph(data) {

    let fertilityChartLine = document.getElementById("fertilitychartline"); // elements created
    let divorceChartLine = document.getElementById("divorcechartline");

    let fertilityRateCoordinates = []; // arreys created, do not include anything yet
    let divorceCoordinates = [];

    let maxYear = 0; // from 0 to infinity for x axis
    let minYear = Infinity;
    let maxFertilityrate = 0;
    let minFertilityrate = Infinity;
    let maxAverageDivorce = 0;
    let minAverageDivorce = Infinity;

    for (let dataPoint of data) { // for loop
        let fertilityRate = parseFloat(dataPoint["\"Fertility rate\""]); // ParseFloat means that function parses a string and returns a floating point number.
        let averageDivorce = parseFloat(dataPoint["\"Average divorce\""].replace(" %", ""));
        let year = parseInt(dataPoint["\"Year\""]); // function parses a string and returns an integer=kokonaisluku

        if (maxYear < year) { // if maxYear is smaller than year, 
            maxYear = year; // then year value is located in maxYear
        }
        if (minYear > year) { // if minYear is bigger than year,
            minYear = year; // then year value is located in minYear
        }

        if (maxFertilityrate < fertilityRate) {
            maxFertilityrate = fertilityRate;
        }
        if (minFertilityrate > fertilityRate) {
            minFertilityrate = fertilityRate;
        }
        if (maxAverageDivorce < averageDivorce) {
            maxAverageDivorce = averageDivorce;
        }
        if (minAverageDivorce > averageDivorce){
            minAverageDivorce = averageDivorce;
        }
    }

    let counter = 0;

    for (let dataPoint of data) { // for loop
        let fertilityRate = parseFloat(dataPoint["\"Fertility rate\""]); // same rows incase needed for parse?
        let averageDivorce = parseFloat(dataPoint["\"Average divorce\""].replace(" %", "")); // same rows incase needed?
        let year = parseInt(dataPoint["\"Year\""]); // same rows incase needed?

        fertilityRateCoordinates.push(500 * (year - minYear) / (maxYear - minYear)); // push method adds new items to the end of an array
        // x axis from 0 to 500 is multiplied by (first divided then multiplied)
        fertilityRateCoordinates.push(235 - 235 * (fertilityRate - minFertilityrate) / (maxFertilityrate - minFertilityrate)); // this is the y axis

        divorceCoordinates.push(500 * (year - minYear) / (maxYear - minYear)); // this is the same thing for the right side of the chart box
        divorceCoordinates.push(235 - 235 * (averageDivorce - minAverageDivorce) / (maxAverageDivorce - minAverageDivorce)); // this is the y axis also from the top 
    
        if (counter === 0) {
            let label = document.createElementNS("http://www.w3.org/2000/svg", "text"); // create element for svg, element name "text"
            label.textContent = year;
            label.setAttribute("x", 500 * (year - minYear) / (maxYear - minYear));
            label.setAttribute("y", 248);
            document.getElementById("labels").appendChild(label);

            let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", 500 * (year - minYear) / (maxYear - minYear));
            line.setAttribute("x2", 500 * (year - minYear) / (maxYear - minYear));
            line.setAttribute("y1", 0);
            line.setAttribute("y2", 235);
            line.setAttribute("stroke-width", "0.25");
            line.setAttribute("stroke", "black");
            document.getElementById("labels").appendChild(line);
        }

        counter = counter + 1;
        if (counter > 10) {
            counter = 0;
        }
    }

    fertilityChartLine.setAttribute("points", fertilityRateCoordinates.join(" "));
    divorceChartLine.setAttribute("points", divorceCoordinates.join(" "));
}
parseData(createGraph);
