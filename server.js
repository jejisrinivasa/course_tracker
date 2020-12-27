const express = require("express");
const app = express();
const dbConnection = require('./config/db');

dbConnection();

//middleware
app.use(express.json({ extended: false }));

// app.get("/get", (req, res) => {
//     res.send('Hello world!');
// });

app.use('/api/tracker', require('./routes/routes'));


const port = 5000;
app.listen(port, () => console.log(`Server is running at port ${port}...`));