
module.exports = {

    generate: function (currentDate) {

        var previousYear = currentDate.getFullYear() - 1,
            previousDay = currentDate.getDate() - 1,
            data = new Array(),
            saturdayId = 5,
            sundayId = 6,
            minDigitsAfterComma = 2,
            maxDigitsAfterComma = 6,
            neededPricesCount = 4,
            curr = new Date(currentDate.getTime()),
            i;

        while (curr.getFullYear() != previousYear ||
            curr.getMonth() != currentDate.getMonth() ||
            curr.getDate() <= previousDay) {
            if (curr.getDay() == saturdayId || curr.getDay() == sundayId) {
                curr.setTime(curr.getTime() - 1 * 86400000);
                continue;
            }

            var minStockPrice = monthAverageStockPrice[curr.getMonth()];
            var maxStockPrice;
            if (curr.getMonth() == 11) {
                maxStockPrice = monthAverageStockPrice[0];
            } else {
                maxStockPrice = monthAverageStockPrice[curr.getMonth() + 1];
            }

            var neededPrices = new Array();
            for (i = 0; i < neededPricesCount; i++) {
                neededPrices.push(_getRandomByPortion(
                    minStockPrice,
                    maxStockPrice,
                    _getNumberOfDays(curr.getFullYear(), curr.getMonth()),
                    curr.getDate(),
                    monthStockNoise[curr.getMonth()],
                    _getRandomInt(minDigitsAfterComma, maxDigitsAfterComma)));
            }

            neededPrices.sort();
           

            var stockData = {
                Close: neededPrices[1],
                Date: _convertDate(curr),
                High: neededPrices[3],
                Low: neededPrices[0],
                Open: neededPrices[2],
                Volume: _getRandomInt(minVolume, maxVolume).toString()
            };

            data.push(stockData);
            curr.setTime(curr.getTime() - 1 * 86400000);
        }

        return data;
    },

    generateDetails: function (currentDate) {
        var currentMonth = currentDate.getMonth(),
            midMonthStockPrice = _toFixedNumber(monthAverageStockPrice[currentMonth], 2),
            maxMonthStockPrice = _toFixedNumber(monthAverageStockPrice[currentMonth] + monthStockNoise[currentMonth], 2),
            minMonthStockPrice = _toFixedNumber(monthAverageStockPrice[currentMonth] - monthStockNoise[currentMonth], 2),
            minStockPrice = _toFixedNumber(Math.min.apply(null, monthAverageStockPrice), 2),
            maxStockPrice = _toFixedNumber(Math.max.apply(null, monthAverageStockPrice), 2);

        return {
            Ask: midMonthStockPrice.toString(),
            Bid: minMonthStockPrice.toString(),
            Change: "-0.34",
            DailyHigh: maxMonthStockPrice.toString(),
            DailyLow: minMonthStockPrice.toString(),
            DailyRange: minMonthStockPrice + " - " + maxMonthStockPrice,
            EBITDA: "33.57B",
            EarningsPerShare: "1.48",
            LastTradeAmount: midMonthStockPrice.toString(),
            LastTradeDate: currentDate.toString(),
            LastTradeTime: "4:00pm",
            MarketCapitalization: "376.78B",
            Name: "Example Corporation",
            Open: midMonthStockPrice.toString(),
            PERatio: "31.83",
            PercentAndChange: "-0.34 - -0.72%",
            PercentChange: "-0.72%",
            PreviousClose: midMonthStockPrice.toString(),
            Range52Week: minStockPrice + " - " + maxStockPrice,
            SharesOwned: "N/A",
            StockExchange: "NMS",
            Symbol: "EXMPL",
            Volume: "28600632",
            description: null,
            title: "EXMPL",
            "y:row": "1"
        }
    },
    getDataForGrid() {
        return GridData();
    }

};

function _convertDate(curr){


     var d = new Date(curr.getTime());
     var monthnumber  = d.getMonth()+1; 
     var month; 
     if(monthnumber == 1) {
         month = "JAN";
     }
    else if(monthnumber == 2) {
         month = "FEB";
     }
    else if(monthnumber == 3) {
         month = "MARCH";
     }
    else if(monthnumber == 4) {
         month = "APRIL";
     }
      else if(monthnumber == 5) {
         month = "MAY";
     }
      else if(monthnumber == 6) {
         month = "JUNE";
     }
      else if(monthnumber == 7) {
         month = "JULY";
     }
      else if(monthnumber == 8) {
         month = "AUG";
     }
      else if(monthnumber == 9) {
         month = "SEP";
     }
      else if(monthnumber == 10) {
         month = "OCT";
     }
      else if(monthnumber == 11) {
         month = "NOV";
     }
      else {
         month = "DEC";
     }
    var dateToDisplay =  month ;
    return dateToDisplay;

}

var Id = "I am from Data Generator";

var monthAverageStockPrice = [20.6, 23.18, 25.17, 28.1, 21.2, 27.16, 22.15, 26.14, 28.8, 25.13, 22.12, 23.11],
    monthStockNoise = [0.52, 0.96, 1.8, 1.1, 0.98, 0.94, 1.45, 1.35, 1.11, 0.1, 1.01, 1.15],
    minVolume = 15000000,
    maxVolume = 45000000;

function _toFixedNumber(number, digitsAfterComma) {
    var pow = Math.pow(10, digitsAfterComma);
    return +(Math.round(number * pow) / pow);
}

function _getRandomArbitrary(min, max, toFixedNumber) {
    return _toFixedNumber((Math.random() * (max - min) + min), toFixedNumber);
}

function _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _getRandomByPortion(start, end, portionsCount, currentPortion, noise, toFixedNumber) {
    var comparison = 0,
        difference,
        currentPortionEnd,
        addToMax, min, max;

    if (start > end) {
        comparison = 1;
    } else if (start < end) {
        comparison = -1;
    }

    if (comparison == 0) {
        return start;
    }

    difference = Math.abs(start - end);
    portionSpan = difference / portionsCount;
    currentPortionEnd = portionSpan * currentPortion;

    if (comparison == 1) {
        min = start - (currentPortionEnd - portionSpan);
        max = start - currentPortionEnd;
    } else {
        min = start + (currentPortionEnd - portionSpan);
        max = start + currentPortionEnd;
    }

    addToMax = [true, true, true, false][_getRandomInt(1, 4) - 1]; //25%
    if (addToMax) {
        max += noise;
    }

    return _getRandomArbitrary(min, max, toFixedNumber);
}

function _getNumberOfDays(year, month) {
    var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}


function GridData(){

    var close = 22.34;
    var date = new Date().toLocaleDateString();
    var high = 22.6294;
    var low = 22.24;
    var open = 22.5675;
    var volume = 25815932;
    var data = [];
    console.log("here");

    for (var i = 0; i <= 5000; i++) {

        if (i % 2 == 0) {

            data.push({ "Id": i + 1, "Close": close + 1, "Date": date, "High": high + 1, "Low": low + 1, "Open": open + 1, "Volume": volume + 15000 });

        }
        else if (i % 3 == 0) {

            data.push({ "Id": i + 1, "Close": close + 2, "Date": date, "High": high + 2, "Low": low + 2, "Open": open + 2, "Volume": volume + 25000 });

        }
        else if (i % 5 == 0) {

            data.push({ "Id": i + 1, "Close": close - 1, "Date": date, "High": high - 1, "Low": low - 1, "Open": open - 1, "Volume": volume - 25000 });

        }
        else if (i % 6 == 0) {

            data.push({ "Id": i + 1, "Close": close + 3, "Date": date, "High": high + 3, "Low": low + 3, "Open": open + 3, "Volume": volume + 35000 });

        }
        else if (i % 7 == 0) {

            data.push({ "Id": i + 1, "Close": close + 4, "Date": date, "High": high + 4, "Low": low + 4, "Open": open + 4, "Volume": volume + 45000 });

        }
      
    }
     return data;
}



