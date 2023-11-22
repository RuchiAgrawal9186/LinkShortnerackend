const express = require("express");
const { urlModel } = require("../models/UrlSchema");

const urlRouter = express.Router();

// Route to get all short URLs
urlRouter.get("/", async (req, res) => {
  try {
    const shorturls = await urlModel.find();
    res.json({ shorturls });
  } catch (error) {
    console.error("Error fetching short URLs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new short URL
urlRouter.post("/shortUrls", async (req, res) => {
  try {
    const url = req.body.full;
    const newshortURL = new urlModel({
      full: url,
    });
    await newshortURL.save();
    res.json({ success: true, shortUrl: newshortURL.short });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to redirect to the full URL based on the short URL
// urlRouter.get('/:shortUrl', async (req, res) => {
//   try {
//     const shortUrl = await urlModel.findOne({ short: req.params.shortUrl });
//     console.log(shortUrl)
//     if (shortUrl == null) {
//       return res.status(404).json({ error: "Short URL not found" });
//     }
//     await shortUrl.clicks++;
//     shortUrl.save();
//     console.log(shortUrl.full)
//     res.redirect(shortUrl.full);
//     // res.redirect(shortUrl.full);
//   } catch (error) {
//     console.error("Error redirecting to full URL:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

urlRouter.get('/:shortUrl', async (req, res) => {
    try {
      const shortUrl = await urlModel.findOne({ short: req.params.shortUrl });
      if (shortUrl == null) {
        return res.status(404).json({ error: "Short URL not found" });
      }
    await shortUrl.clicks++;
      shortUrl.save();
      res.redirect(shortUrl.full);
    } catch (error) {
      console.error("Error redirecting to full URL:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// Route to delete a short URL based on ID
urlRouter.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await urlModel.deleteOne({ _id: id });
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  urlRouter
};