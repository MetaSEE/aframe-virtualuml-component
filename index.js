import express from "express";
import * as path from "path";
import * as url from "url";

let app = express();

const PORT = process.env.PORT || 3000;
const DIR = 'public';

app.use(express.static(DIR));

app.get('/', (request, response)=>{
  console.log('Hello world');
  response.sendFile(`/${DIR}/index.html`);
});


app.listen(PORT, ()=>{
  console.log(`Serever running at ${PORT} port.`);
})