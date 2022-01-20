const express = require('express')
const app = express();
const fetch = require('node-fetch')
app.use(express.json());
const dataa = require('./modals/data')
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',__dirname+'/public/views')

// this is the func to get and store the data into database
const v = async ()=>{
const data = await fetch('https://api.wazirx.com/api/v2/tickers')
const res = await data.json();
const d = Object.values(res);

const data1 = [];
d.forEach(element => {
      if(data1.length<10)
       data1.push(element)
});

data1.map(el=>{
   dataa.create({
    name:el.name,
    last:el.last,
    buy:el.buy,
    sell:el.sell,
    volume:el.volume,
    basuUnit:el.base_unit
   },()=>{console.log('data saved')})   
})
}

app.get('/',(req,res)=>{
    //fun to get data from api and store it to database
    v();
    dataa.find({},(err,data)=>{
        if(err) throw err;
        res.render('index',{rec:data,count:1})
    })

})

app.listen(1010,()=>{console.log('pot listen 1010')})