const express = require('express');

const hbs = require('hbs');
const { get } = require('http');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  //console.log("probando")
  res.render('index');
});

app.get("/beers", (req, res) => {
  console.log("probando cerveza")

  
  punkAPI.getBeers()
  .then(beersFromApi => {
    //console.log('Beers from the database: ', beersFromApi)
    res.render("beers.hbs", {
      beersFromApi
    })
  })
  .catch(error => console.log(error));
})

app.get("/random-beer", (req, res) => {
  console.log("probando random cerveza")
  punkAPI.getRandom()
  .then(responseFromApi => {
    //console.log(responseFromApi)
    res.render("aleatoria-beer.hbs", {
      responseFromApi
      
    })
  })
  .catch(error => console.log(error))
})

app.get("/beers/:id", (req, res) => {
  console.log("entrando en iteraccion 6")
  let {id} = req.params
  punkAPI.getBeer(id)
  .then(beersFromApi => {
    //console.log(beersFromApi)
    res.render("all-beers.hbs", {
      beersFromApi
    })
  })
  .catch(error => console.log(error))
})



app.listen(3000, () => console.log('🏃‍ on port 3000'));
