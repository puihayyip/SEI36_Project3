// /api/orders

const express = require("express");
const ordersSchema = require("../models/ordersSeed.schema");
const { StatusCodes } = require("http-status-codes");
const allOrdersSeed = require("../models/allOrdersSeeds");
const { verifyToken } = require("./authController");

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
router.get("/", verifyToken, async (req, res) => {
  try {
    const allOrders = await ordersSchema.find({});
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
    // console.log(req.params.id);
    res.send({ status: "success", data: allOrders });
  } catch (error) {
    res.send(error);
  }
});

router.get("/each/:id", verifyToken, async (req, res) => {
  try {
    const allOrders = await ordersSchema.findOne({
      _id: req.params.id,
    });
    // console.log(allOrders);
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

// router.put("/edit/kitchen", async (req, res) => {
//   try {
//     const updatedOrder = await ordersSchema.aggregate([
//       { $unwind: "$orders" },
//       { $unwind: "$orders.items" },
//       { $match: { "orders.items.foodPrepared": "on" } },
//       {
//         $group: {
//           _id: "$orders.items._id",
//         },
//       },
//     ]);
//     res.send({ status: "success", data: updatedOrder });
//   } catch (error) {
//     res.send({ status: "error", data: error });
//   }
// });

router.put("/edit/:id", async (req, res) => {
  try {
    const updatedOrder = await ordersSchema.updateOne(
      { tblNum: req.params.id },
      {
        $set: {
          [`orders.$[outside].items.$[inside].${req.body.field}`]:
            req.body.edit,
        },
      },
      {
        arrayFilters: [
          {
            "outside.orderNum": req.body.orderNum,
          },
          {
            "inside._id": req.body.itemID,
          },
        ],
      }
    );
    res.send({ status: "success", data: updatedOrder });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

//! DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const updatedOrder = await ordersSchema.deleteOne({
      tblNum: req.params.id,
    });
    res.send({ status: "success", data: updatedOrder });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

module.exports = router;
