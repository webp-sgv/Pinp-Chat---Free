const mainAppUse = require('./server/config');
const app = new mainAppUse;

// HOME
app.use(
    require('./server/router/home/index')
);