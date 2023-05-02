 $("#myBtn").click(function(){
    var str = $("#myInput").val();
    API(str);
});



function API(key){
    var URL="https://live-stock-market.p.rapidapi.com/yahoo-finance/v1/chart?symbol=" + key + "&interval=1d&range=1mo";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": URL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "live-stock-market.p.rapidapi.com",
            "x-rapidapi-key": "12a8c91d42mshed42cc3125c34a5p1d931djsnf5891bb4f419"
        }
    };
    
    $.ajax(settings).done(function (response) {
        const r=JSON.parse(response);
        
        var data=r.data.chart.result[0].indicators.quote[0].open;
        var title=r.data.chart.result[0].meta.symbol;
        Mychart(data,title);
    });
}

function Mychart(data,title){
    var xValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    var yValues = data;
    new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
        label: "close",
        fill: false,
        lineTension: 0,
        backgroundColor: "red",
        borderColor: "blue",
        data: yValues
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: false},
        scales: {
            yAxes: [{
                ticks: {min: Math.min(...data)-20, max: Math.max(...data)+100},
                gridLines: {
                    color: '#af5578',
                    lineWidth: 1
                }
            }],
            xAxes: [{
                gridLines: {
                    color: '#af5578',
                    lineWidth: 1
                }
            }],
        },
        title: {
            fontSize:30,
            display: true,
            text: title,
            fontColor: "blue"
        }
    }
    });
}