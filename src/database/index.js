const mongoose = require('mongoose')

function connect() {
  mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {

  }).then(() => {
    console.log('Conectado ao MongoDB Atlas !');
  })
    .catch(error => {
      console.log('erro ao conectar no MongoDB : ', error);
    });
}

module.exports = connect;