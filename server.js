const express = require('express');
const path = require('path');
const cors = require('cors');
const request = require('request').defaults({rejectUnauthorized: false, strictSSL: false});
const app = express();

app.set('views', path.join(__dirname, 'pages'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('.'));

app.listen(8000, ()=>{
  console.log('Listening on 8000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/women', (req, res, next)=>{
    var newurl = 'https://stg.lillypulitzer.com/s/lillypulitzer-us/dw/shop/v18_3/product_search?expand=availability,images,prices,variations&count=18&refine_1=cgid=for-women&q=&start=0&client_id=7469c353-e112-4902-bf40-ead35df41219';
    
    request(newurl).pipe(res);
});

app.get('/products', (req, res, next)=>{
    var newurl = 'https://stg.lillypulitzer.com/s/lillypulitzer-us/dw/shop/v18_3/product_search?expand=availability,images,prices,variations&count=18&refine_1=cgid=just-in&q=&start=0&client_id=7469c353-e112-4902-bf40-ead35df41219';
    
    request(newurl).pipe(res);
});

app.get('/men', (req, res, next)=>{
    var newurl = 'https://stg.lillypulitzer.com/s/lillypulitzer-us/dw/shop/v18_3/product_search?expand=availability,images,prices,variations&count=18&refine_1=cgid=for-men&q=&start=0&client_id=7469c353-e112-4902-bf40-ead35df41219';
    
    request(newurl).pipe(res);
});
 
app.get('/sizes', (req, res, next)=>{
    var newurl = 'https://stg.lillypulitzer.com/s/lillypulitzer-us/dw/shop/v18_2/products/:id/variations?client_id=7469c353-e112-4902-bf40-ead35df41219';
    
    request(newurl).pipe(res);
});

