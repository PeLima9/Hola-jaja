//Imports
import express from "express";
import salesController from "../controllers/salesController.js";

//Router
const router = express.Router();

//Routes
router.route("/")
    .get(salesController.getSales)
    .post(salesController.createSale);

router.route("/:id")
    .put(salesController.updateSale)
    .delete(salesController.deleteSale);

//Specific routes
router.route("/salesByCategory")
    .get(salesController.getSalesByCategory);
router.route("/topSellingProducts")
    .get(salesController.getTopSellingProducts);
router.route("/lowSellingProducts")
    .get(salesController.getLowSellingProducts);
router.route("/totalEarnings")
    .get(salesController.getTotalEarnings);
router.route("/frequentCustomers")
    .get(salesController.getMostFrequentCustomers);

//Export
export default router;
