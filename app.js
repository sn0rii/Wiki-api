const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {
  useNewUrlParser: true,
});

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

////////////// Request Taretting all Articles/////////////////////

app
  .route("/articles")

  .get(function (req, res) {
    Article.find({}).then((foundArticles) => res.send(foundArticles));
  })

  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle
      .save()
      .then(() => res.send("Successfully aded a new article."))
      .catch((err) => {
        console.error(err);
      });
  })

  .delete(function (req, res) {
    Article.deleteMany()
      .then(() => res.send("Successfully deleted all articles."))
      .catch((err) => {
        console.error(err);
      });
  });

////////////// Request Taretting Specyfic Articles/////////////////////

app
  .route("/articles/:articleTitle")
  .get(function (req, res) {
    Article.findOne({ title: req.params.articleTitle }).then((foundArticle) =>
      res.send(foundArticle)
    );
  })

  .put(function (req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true }
    ).then(() => res.send("Successfully updated article"));
  })

  .patch(function (req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body }
    ).then(() => res.send("Successfully updated article"));
  })

  .delete(function (req, res) {
    Article.deleteOne({ title: req.params.articleTitle })
      .then(() => res.send("Successfully deleted corresponding article."))
      .catch((err) => {
        console.error(err);
      });
  });

// (function (err) {
//   if (!err) {
//     res.send("Successfully aded a new article.");
//   } else {
//     res.send(err);
//   }
// }

//OLD VERSION
// app.get("/articles", function (req, res) {
//   Article.find(function (foundArticles) {
//     console.log(foundArticles);
//   });
// });

// app.delete("/articles", function (req, res) {
//   Article.deleteMany(function (err) {
//     if (!err) {
//       res.send("Successfully deleted all articles.");
//     } else {
//       res.send(err);
//     }
//   });
// });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
