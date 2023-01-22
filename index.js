const express = require("express");
const app = express();

const PORT = 3000;

const error404 = require('./middlewares/error404')

// Módulos de Rutas
const usersRoutes = require('./routes/usersRoutes')
const foodsRoutes = require('./routes/foodsRoutes')
const vehiclesRoutes = require('./routes/vehiclesRoutes')
const userRoutes = require('./routes/userRoutes')

// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));

//Rutas 
app.use('/users', usersRoutes); 
app.use('/foods', foodsRoutes); 
app.use('/vehicles', vehiclesRoutes); 
app.use('/user', userRoutes);

app.use(error404); // Middleware Para ruta no encontrada (404)

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});
