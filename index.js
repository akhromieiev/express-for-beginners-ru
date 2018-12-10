const express = require('express');
const app = express(); //its working

const products = ['Apple', 'Pen', 'Computer'];

// pug
// app.set('view engine', 'pug');
//ejs
// app.set('view engine', 'ejs');

app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    res.send('Its working');
});

app.get('/products', (req, res, next) => {
    next();
    // res.json({products});
});

app.get('/products/:id', (req, res, next) => {
    if (products[req.params.id]) {
        res.send(products[req.params.id]);
    } else {
        res.status(404).send('Product not found');
    }
});

app.get('/downloadBooks', (req, res, next) => {
    res.download('./public/books.html', 'anothername', (err) => {
        console.log('File sent');
    });
});

app.get('/blog', (req, res, next) => {
    res.redirect(301, '/');
})

// pug
app.get('/main', (req, res, next) => {
    res.render('main', {
        layout: false
    }, {
        title: 'Products',
        message: 'Products List',
        products: products
    });
});

// ejs
app.get('/ejs', (req, res, next) => {
    res.render('main', {
        title: 'Products',
        message: 'Products List',
        products: products
    });
});

//hbs
app.get('/hbs', (req, res, next)=>{
    res.render('main.hbs', {
        title: 'Products',
        message: 'Products List',
        products: products
    });
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(err.stack);
});

app.listen(5000, () => {
    console.log('Its started', new Date());
});
