const express = require('express')
const axios = require("axios");
const app = express()

app.set("view engine" , "ejs");
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.render(`index`,{weather:null , error: null})
});

app.get(`/weather` , async(req,res)=>{
    const city = req.query.city;
    const apiKey = `7bd0717da3a3e47b8b4fce46efba6e2f`
    // logique 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    let  weather = null;
    let   error = null;
    try{
        const response = await axios.get(apiUrl);
        weather = response.data ;
    }catch(error){
        weather =  null;
        error = `Cannot find the city : ${city}!\n Please try again...`;
    }
    res.render(`index`,{weather , error});
})


const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))