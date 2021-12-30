import mongoose from 'mongoose';

const db = async(url) => {
    try {
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

        console.log('Database connected successfully');
    }
    catch(err) {
        console.log(err);
    }   
}

export default db;