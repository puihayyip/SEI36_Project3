// /api/orders

const express = require("express");
const ordersSchema = require("../models/ordersSeed.schema");
const { StatusCodes } = require("http-status-codes");
const allOrdersSeed = require("../models/allOrdersSeeds");

const router = express.Router();

//! Seed Route (reset database)
router.get("/seed", async (req, res) => {
  try {
    await ordersSchema.deleteMany({});
    const newOrders = await ordersSchema.create(allOrdersSeed);
    res.send({ status: "success", data: newOrders });
  } catch (error) {
    res.send(error);
  }
});
//! ALL
router.get("/", async (req, res) => {
  try {
    const allOrders = await ordersSchema.find({});
    console.log(req.params.id);
    res.send({ status: "success", data: allOrders });
  } catch (error) {
    res.send(error);
  }
});
//! INDEX
router.get("/:id", async (req, res) => {
  try {
    const allOrders = await ordersSchema.findOne({
      tblNum: parseInt(req.params.id),
    });
    console.log(req.params.id);
    res.send({ status: "success", data: allOrders });
  } catch (error) {
    res.send(error);
  }
});
//! CREATE
router.post("/new/", async (req, res) => {
  const prevOrder = await ordersSchema.findOne({ tblNum: req.body.tblNum });
  try {
    if (prevOrder) {
      const newArr = req.body.orders[0].items;
      const orderCount = prevOrder.orders.length;
      const newOrders = await ordersSchema.updateOne(
        {
          tblNum: req.body.tblNum,
        },
        { $push: { orders: { orderNum: orderCount + 1, items: newArr } } }
      );
      res.send({ status: "success", data: newOrders });
    } else {
      const newOrders = await ordersSchema.create(req.body);
      res.send({ status: "success", data: newOrders });
    }
  } catch (err) {
    res.send(err);
  }
});
//! UPDATE

router.put("/:id", async (req, res) => {
  // console.log (req.params.id)
  try {
    const updatedOrder = await ordersSchema.findOneAndUpdate(
      { tblNum: req.params.id },
      req.body,
      { new: true }
    );
    res.send(updatedOrder);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
