const mongoose = require('mongoose');

const dbConenection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        });

        console.log('Base on line');

    } catch (error) {

        console.log(error);
        throw new Error('error de inicio db ver logs');

    }


};

module.exports = {
    dbConenection
};