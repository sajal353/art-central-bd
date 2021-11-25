const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  let result = [];

  try {
    const client = req.app.get("client");

    const database = client.db("art-central");
    const collection = await database.collection("users");

    const cursor = await collection.find();

    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
      throw new Error("No Data");
    }

    await cursor.forEach((r) => {
      result.push(r);
    });

    res.status(200);
    res.send({
      data: result,
    });
  } catch (err) {
    res.status(500);
    res.send({
      message: err.message,
    });
  }
});

router.get("/:email", async (req, res) => {
  let result = [];

  try {
    const client = req.app.get("client");

    const database = client.db("art-central");
    const collection = await database.collection("users");

    const query = {
      email: req.params.email,
    };

    const cursor = await collection.find(query);

    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
      throw new Error("No Data");
    }

    await cursor.forEach((r) => {
      result.push(r);
    });

    res.status(200);
    res.send({
      data: result,
    });
  } catch (err) {
    res.status(500);
    res.send({
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const client = req.app.get("client");

    const database = client.db("art-central");
    const collection = await database.collection("users");

    const query = {
      name: req.body.name,
      email: req.body.email,
      isAdmin: false,
    };

    const cursor = await collection.insertOne(query);

    res.status(200);
    res.send({
      message: "Success",
      id: cursor.insertedId,
    });
  } catch (err) {
    res.status(500);
    res.send({
      message: err.message,
    });
  }
});

router.patch("/", async (req, res) => {
  try {
    const client = req.app.get("client");

    const database = client.db("art-central");
    const collection = await database.collection("users");

    const filter = {
      email: req.body.email,
    };

    const query = {
      $set: {
        isAdmin: true,
      },
    };

    const cursor = await collection.updateOne(filter, query);

    res.status(200);
    res.send({
      message: "Success",
      modified: cursor.modifiedCount,
    });
  } catch (err) {
    res.status(500);
    res.send({
      message: err.message,
    });
  }
});

module.exports = router;
