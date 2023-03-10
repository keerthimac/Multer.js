const express = require("express");
const colors = require("colors");
const PORT = 5000;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static("Images"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Multer test" });
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.send(`/images/${path.basename(req.file.path)}`);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`.brightMagenta.underline);
});
