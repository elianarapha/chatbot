const express = require('express');
const app = express()
const PORT = process.env.PORT || 4000;

const cors = require('cors');

const chatRoutes = require('./routes/chatRoutes');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());


app.use('/api/chatbotRoutes/', chatRoutes);


app.get('/hello', (req, res) => {
    res.send('Hi from hello endpoint');
})

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
