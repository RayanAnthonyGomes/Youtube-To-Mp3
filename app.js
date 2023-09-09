//reqquired packages
const e = require("express");
const express = require("express");
const fetch = require("node-fetch");
const { restart } = require("nodemon");
require("dotenv").config();

//create the expresss serverr
const app = express();

//sservver port numberr
const PORT = process.env.PORT || 3000;

// //set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//needed to parse html data for POST request
app.use(express.urlencoded({
    extended: true
}))
app.get("/", (req, res) =>{
    res.render("index")
})
app.post("/convert-mp3", async (req, res) => {
    const videoID = req.body.videoID;
    console.log(videoID);
    if(
        videoID === undefined ||
        videoID === "" ||
        videoID === null
    ){
        return res.render("index", {success : false, message : "Please enter a videoID "});
    }else{
        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoID}`, {
            "method" : "GET",
            "headers" : {
                "x-rapidapi-key" : process.env.API_KEY,
                "x-rapidapi-host" : process.env.API_HOST
            }
        });
        const fetchResponse = await fetchAPI.json();

        if(fetchResponse.status === "ok")
        return res.render("index", {success : true, song_title : fetchResponse.
            title, song_link : fetchResponse.link});
        else
            return res.render("index", {success: false, message : fetchResponse.msg});
    }
 })

//strat sever
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})