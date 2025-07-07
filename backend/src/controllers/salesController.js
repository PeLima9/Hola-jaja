//Imports
import salesModel from "../models/Sales.js";

const salesController = {};

//Select - Get
salesController.getSales = async (req, res) => {
    try {
        const sales = await salesModel.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error retrieving sales data:", error);
    }
};

//Insert - Post
salesController.createSale = async (req, res) => {
    try {
        const {product, category, customer, total} = req.body;

        //Validate total amount
        if (total < 0) {
            return res.status(400).json({ message: "Total cannot be negative" });
        }

        const newSales = await new salesModel({product, category, customer, total});
        await newSales.save();

        //Confirm
        res.status(201).json(newSales);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error creating sale:", error);
    }
};

//Edit - Put
salesController.updateSale = async (req, res) => {
    try {
        const {product, category, customer, total} = req.body;

        //Validate total amount
        if (total < 0) {
            return res.status(400).json({ message: "Total cannot be negative" });
        }

        //Request ID and new values
        const updatedSale = await Sales.findByIdAndUpdate(
            req.params.id, 
            {product, category, customer, total}, 
            {new: true}
        );

        res.status(200).json(updatedSale);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error updating sale:", error);
    }
};

//Delete
salesController.deleteSale = async (req, res) => {
    try {
        await salesModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Sale deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error deleting sale:", error);
    }
};

//Sales by category
salesController.getSalesByCategory = async (req, res) => {
    try {
        const result = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$category",
                        totalSales: { $sum: "$total" }
                    }    
                },

                {
                $sort: {totalSales: -1 }
                },
            ]
        );
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error retrieving sales by category:", error);
    };
};

//Top selling products
salesController.getTopSellingProducts = async (req, res) => {
    try {
        const result = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$product",
                        totalSales: { $sum: 1 }
                    },
                },

                {
                $sort: {totalSales: -1 }
                },

                {
                    $limit: 10
                }
            ]
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error retrieving top selling products:", error);
    }
};

//Low selling products
salesController.getLowSellingProducts = async (req, res) => {
    try {
        const result = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$product",
                        totalSales: { $sum: 1 }
                    },
                },

                {
                $sort: {totalSales: -1 }
                },

                {
                    $limit: 10
                }
            ]
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error retrieving top selling products:", error);
    }
};

//Total earnings
salesController.getTotalEarnings = async (req, res) => {
    try {
        const result = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: null,
                        totalEarnings: { $avg: "$total" }
                    }
                }
            ]
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error retrieving total earnings:", error);
    }
};

//Most frecuent customers
salesController.getMostFrequentCustomers = async (req, res) => {
    try {
        const result = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$customer",
                        totalSales: { $sum: 1 }
                    },
                },

                {
                $sort: {totalSales: -1 }
                },

                {
                    $limit: 3
                }
            ]
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error retrieving most frequent customers:", error);
    }
};

//Export
export default salesController;