const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "My API",
        description: "Names",
    },
  host: 'project2cse341-main.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
