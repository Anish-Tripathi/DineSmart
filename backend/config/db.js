import mongoose from 'mongoose';

const mongodb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/DineSmart'); 
        console.log("Database connected");

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategoryData = await mongoose.connection.db.collection("food_category").find({}).toArray();
        
        if (!fetchedData || !foodCategoryData) {
            console.log("No data found or an error occurred");
        } else {
            global.food_items = fetchedData;
            global.food_category = foodCategoryData;
            
        }
        

    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

export default mongodb;
