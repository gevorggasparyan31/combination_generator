const express = require('express');
const combinationsRoute = require('./src/routes/combinationsRoute');

const app = express();

app.use(express.json());

app.use('/api', combinationsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
