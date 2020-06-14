chartIt();
async function chartIt() 
{
    const data = await getData();
    const preData = await getPrediction();
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, 
    {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: 
        {
            labels: preData.dx,
            datasets: 
            [
                {
                	// Data plot of the Deceased Cases
                    label: 'Deceased',
                    backgroundColor: 'rgb(24,24,24,0.6)',
                    borderColor: 'rgb(24,24,24)',
                    data: data.dead,
                    fill: true

                },
                {
                	// Data plot of the Recoverd Cases
                    label: 'Recovered',
                    backgroundColor: 'rgb(34,139,34,0.5)',
                    borderColor: 'rgb(34,139,34)',
                    data: data.zs,
                    fill: true

                },
                {
                	// Data plot of the Confirmed Cases
                    label: 'No. of Confirmed Cases',
                    backgroundColor: '	rgb(139, 0, 0, 0.5)',
                    borderColor: 'rgb(139, 0, 0)',
                    data: data.ys,
                    fill: true
                },
                {
                	// Data plot of the Predicted Cases
                    label: 'Predicted no. of Cases',
                    backgroundColor: 'rgb(35, 150, 232, 0.5)',
                    borderColor: 'rgb(35, 150, 232)',
                    data: preData.py,
                    fill: false
                }
            ]
        },

            // Configuration options go here
            options: 
            {
                responsive: true,
            }
    });
}
async function getData()
{
    const xs = []; //date list
    const ys = []; //confirmed list
    const zs = []; //recoverd list
    const dead = [];

    // getting the data from the JSON database
    // https://api.covid19india.org/data.json

    const response = await fetch("https://api.covid19india.org/data.json")
    const data = await response.json();
    const table = data["cases_time_series"];

    // slicing the data point for the last 14 days

    Alenght = table.length - 14;
    const recentData = table.slice(Alenght);

    // Reading the each data point from the database and setting each value to
    // a variable

    recentData.forEach(({date, totalconfirmed, totalrecovered, totaldeceased}) => { const Cdate = date;
    xs.push(date);
    const Cconfirmed = totalconfirmed;
    ys.push(Cconfirmed);
    const Crecovered = totalrecovered;
    zs.push(Crecovered);
    const Cdead = totaldeceased;
    dead.push(Cdead);
    });
    return {xs, ys, zs, dead};
}

async function getPrediction()
{
    const dx = []; // date
    const py = []; // prediction

    // Geting the data from the prediction model
    // Ducky is an absolute madlad, dude made the model run on github using workflow
    // before this i didn't knew github can do stuffs like this

    const response = await fetch("https://raw.githubusercontent.com/therajdeepbiswas/covid19-prediction/master/jsons/current.json")
    const pdata = await response.json();
    const ptable = pdata["cases_time_series"];

    // slicing the data point for the last 14 days
    const precentData = ptable.slice(Alenght);

    // Reading the each data point from the database and setting each value to
    // a variable
    precentData.forEach(({date, totalconfirmed}) => { const pdate = date;
    dx.push(date);
    const pConfirmed = totalconfirmed;
    py.push(pConfirmed);
    console.log(date, pConfirmed);
    });
    return {dx, py};

}

       

