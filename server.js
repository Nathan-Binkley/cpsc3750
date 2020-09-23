const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
	  res.send("Hello World!")
})
app.get('/time', (req, res) => {
	var today = new Date();
	res.send(today.toDateString() + " " + today.toTimeString())
})

app.get('/*', (req,res) => {
	res.send("the path was " + req.path);
})

app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
})
