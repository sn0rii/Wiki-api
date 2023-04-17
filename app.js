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

//OLD VERSION
// app.get("/articles", function (req, res) {
//   Article.find(function (foundArticles) {
//     console.log(foundArticles);
//   });
// });

app.get("/articles", function (req, res) {
  Article.find({}).then((foundArticles) => res.send(foundArticles));
});

app.post("/articles", function (req, res) {
  console.log();
  console.log();

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });

  newArticle.save(function (err) {
    if (!err) {
      res.send("Successfully aded a new article.");
    } else {
      res.send(err);
    }
  });
});

// app.delete("/articles", function (req, res) {
//   Article.deleteMany(function (err) {
//     if (!err) {
//       res.send("Successfully deleted all articles.");
//     } else {
//       res.send(err);
//     }
//   });
// });

app.delete("/articles", function (req, res) {
  Article.deleteMany()
    .then(() => res.send("Successfully deleted all articles."))
    .catch((err) => {
      console.error(err);
    });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
