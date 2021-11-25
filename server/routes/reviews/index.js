const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let result = [];

  try {
    const client = req.app.get("client");

    const database = client.db("art-central");
    const collection = await database.collection("reviews");

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

router.post("/", async (req, res) => {
  try {
    const client = req.app.get("client");

    const database = client.db("art-central");
    const collection = await database.collection("reviews");

    const query = {
      title: req.body.title,
      description: req.body.description,
      stars: req.body.stars,
      user: req.body.user,
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

module.exports = router;
