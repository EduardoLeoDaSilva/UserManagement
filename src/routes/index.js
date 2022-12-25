const userRoutes = require('./userRoutes.js')

const configRoutes = (app) => {
    app.use('/api/user', userRoutes);
}


module.exports = configRoutes;