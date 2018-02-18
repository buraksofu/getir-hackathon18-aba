var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var _ = require("lodash");
var { ObjectID } = require("mongodb");
var Order = require("../models/user");

router.post("/create", (req, res) => {
  var courierID = req.body.courier,
    customerID = req.body.customer,
    //itemID = req.body.item;

  if (!(ObjectID.isValid(courierID) && ObjectID.isValid(customerID))) {
    return res.status(404).send();
  }

  var order = new Order({
    courier: courierID,
    customer: customerID,
    //item: itemID,
    item: {
      itemName: req.body.item.itemName,
      price: req.body.item.price,
      weight: req.body.item.weight,
      count: req.body.item.count
    }
  });

  order.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

/**
 * Update an orders count
 */

//  router.patch("/:id", (req, res) => {
//   var id = req.params.id;
//   var body = _.pick(req.body, ["count"]);

//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }

//   Order.findByIdAndUpdate(id, { $set: body }, { new: true })
//     .then(order => {
//       if (!order) {
//         return res.status(404).send();
//       }

//       res.send({ order });
//     })
//     .catch(e => {
//       res.status(400).send();
//     });
// });

/**
 * Get all orders
 */
router.get("/", (req, res) => {
  Order.find().then(
    order => {
      res.send({ order });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

/**
 * Get an by ObjectID parameter
 */
router.get("/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Order.findById(id)
    .then(order => {
      if (!order) {
        return res.status(404).send();
      }

      res.send({ order });
    })
    .catch(e => {
      res.status(400).send();
    });
});

module.exports = router;
