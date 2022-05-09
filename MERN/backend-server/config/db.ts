import mongoose from 'mongoose';

const connectDB =  async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URL!);    
    } catch (error) {
        console.log(`can not connect to database, ${error}`);
    }

    const connection = await mongoose.connection;
    if (connection.readyState >= 1 ){
        console.log("Connecting to Database"); 
        return;
    }
    connection.on("error", () => console.error("Connection failed"));
};

export default connectDB;