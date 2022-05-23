const mongoose = require('mongoose');

const getConnection = async () => {
    try{
        const url = 'mongodb://Admin:Admin123456@cluster0-shard-00-00.zkrh6.mongodb.net:27017,cluster0-shard-00-01.zkrh6.mongodb.net:27017,cluster0-shard-00-02.zkrh6.mongodb.net:27017/Inventario-Act?ssl=true&replicaSet=atlas-q4peh6-shard-0&authSource=admin&retryWrites=true&w=majority';
        await mongoose.connect(url);
        console.log('Conexión Exitosa');
     
    } catch (error) {
        console.log(error);
    }
      
}
module.exports = {
    getConnection,
}