import express from 'express';
const router = express.Router(); // Invoke Router() as a function

router.post('/foodData', (req, res) => {
    try {
        // console.log(global.food_items);
        res.send([global.food_items, global.food_category]); // Send food_items as response
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).send("Server Error"); // Send a 500 error for server issues
    }
});

export default router;
