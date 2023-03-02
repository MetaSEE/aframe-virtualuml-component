import express from "express";

let app = express();

const PORT = process.env.PORT || 4456;
const DIR = 'public';

app.use(express.static(DIR));

app.get('/', (request, response)=>{
  // console.log('Hello world');
  // response.sendFile(`/${DIR}/index.html`);
});


app.listen(PORT, ()=>{
  console.log(`Server running at ${PORT} port.`);
})