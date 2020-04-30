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
                    label: 'dead',
                    backgroundColor: 'rgb(24,24,24,0.6)',
                    borderColor: 'rgb(24,24,24)',
                    data: data.dead,
                    fill: true

                },
                {
                    label: 'recovered',
                    backgroundColor: 'rgb(34,139,34,0.5)',
                    borderColor: 'rgb(34,139,34)',
                    data: data.zs,
                    fill: true

                },
                {
                    label: 'No. of infected',
                    backgroundColor: '	rgb(139, 0, 0, 0.5)',
                    borderColor: 'rgb(139, 0, 0)',
                    data: data.ys,
                    fill: true
                },
                {
                    label: 'Predicted no. of infected',
                    backgroundColor: 'rgb(35, 150, 232, 0.5)',
                    borderColor: 'rgb(35, 150, 232)',
                    data: preData.py,
                    fill: false
                }
            ]
        },

            // Configuration options go here
            options: {
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
    // gets the data from the JSON database

    const response = await fetch("https://api.covid19india.org/data.json")
    const data = await response.json();
    const table = data["cases_time_series"];
    Alenght = table.length - 14;
    const recentData = table.slice(Alenght);

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


    const response = await fetch("https://raw.githubusercontent.com/therajdeepbiswas/covid19-prediction/master/jsons/current.json")
    const pdata = await response.json();
    const ptable = pdata["cases_time_series"];
    console.log(ptable);
    const precentData = ptable.slice(Alenght);

    precentData.forEach(({date, dailyconfirmed}) => { const pdate = date;
    dx.push(date);
    const pConfirmed = dailyconfirmed;
    py.push(pConfirmed);
    console.log(date, pConfirmed);
    });
    return {dx, py};

}

       

