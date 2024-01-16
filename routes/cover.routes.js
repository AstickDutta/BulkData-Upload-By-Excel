const router = require("express").Router();
const { blukDataUploadByExcel } = require("../controller/cover.controller");
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single('file'), blukDataUploadByExcel);


module.exports = router;