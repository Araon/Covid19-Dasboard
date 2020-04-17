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
                    backgroundColor: '	rgb(35, 150, 232, 0.5)',
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
    // gets the data from the JSON database

    const response = await fetch("https://pomber.github.io/covid19/timeseries.json")
    const data = await response.json();
    const table = data["India"];
    Alenght = table.length - 14;
    const recentData = table.slice(Alenght);
    //console.log(recentData);

    recentData.forEach(({date, confirmed, recovered}) => { const Cdate = date;
    xs.push(date.slice(5));
    const Cconfirmed = confirmed;
    ys.push(Cconfirmed);
    const Crecovered = recovered;
    zs.push(Crecovered);
    });
    return {xs, ys, zs};
            
}

async function getPrediction()
{
    const dx = []; // date
    const py = []; // prediction


    const response = await fetch('current.json');
    const pData = await response.json();
    const ptabel = pData["India"];
    const prdata = ptabel.slice(Alenght);

    prdata.forEach(({date, confirmed}) => { const Pdate = date;
    dx.push(date.slice(5));
    const pConfirmed = confirmed;
    //console.log(pConfirmed,date);
    py.push(pConfirmed);
    });
    return {dx, py};
}
       

