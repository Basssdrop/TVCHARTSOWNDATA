const log = console.log;

const chartProperties = {
  width:1930,
  height:850,
  timeScale:{
      timeVisible:true,
      secondsVisible:false,
  },
  layout: { 
      textColor: 'black', 
      background: { 
          type: 'solid', 
          color: 'white', 
      },  
  }, 
}
const domElement = document.getElementById('tvchart');
const chart = LightweightCharts.createChart(domElement,chartProperties);
const candleSeries = chart.addCandlestickSeries();


fetch(`http://127.0.0.1:9665/fetchAPI?endpoint=https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m`)
  .then(res => res.json())
  .then(data => {
    const cdata = data.map(d => {
      return {time:d[0]/1000,open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
    });
    candleSeries.setData(cdata);
  })
  .catch(err => log(err))
