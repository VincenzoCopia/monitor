var firebaseConfig = {
    apiKey: "",
    databaseURL: "https://sideralbamanutenzione-default-rtdb.europe-west1.firebasedatabase.app/",
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var Prod = database.ref("Produzione");
var Anno = "2024";
var Mese = "04";

Prod.child("Oggi").on('value', function (sn) {
    document.getElementById('Data').innerHTML = "" + sn.child("Data").val() + "";
});

var myData = [['Giorno', 'Tons', { role: 'style' }, { role: 'annotation' }]];

Prod.child("Monitor").child(Anno).child(Mese).on('value', function (snapshot) {
    myData = [['Giorno', 'Tons', { role: 'style' }, { role: 'annotation' }]];
    var TotMese = 0;
    var Conta = 0;

    snapshot.forEach(function (cs) {
        var Etichetta = cs.val() != 0 ? cs.val() : '';
        myData.push([cs.key, Etichetta, 'blue', "" + Etichetta]);
        if (cs.val() > 0) {
            TotMese += cs.val();
            Conta += 1;
        }
    });

    document.getElementById('Media').innerHTML = Math.floor(TotMese / Conta);

    google.charts.setOnLoadCallback(drawChart);
});

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable(myData);
    var options = {
        title: 'Produzione giornaliera',
        hAxis: { title: 'Giorno' },
        vAxis: { title: 'Tons', minValue: 0, maxValue: 1000 },
        legend: 'none'
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

// Gestione della connessione
var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", (snap) => {
    if (snap.val() === true) {
        console.log("connected");
    } else {
        console.log("not connected");
    }
});