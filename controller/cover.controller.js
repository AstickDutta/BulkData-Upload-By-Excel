const { CoverMastersSchema } = require("../models/index");
const xlsx = require("xlsx");
//const {coverBlukDataUpload} = require("../validation/cover.validation")

const blukDataUploadByExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Excel file is required" });
    }

    const excelBuffer = req.file.buffer;
    const workbook = xlsx.read(excelBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const seenCoverCodes = new Set();

    for (const entry of jsonData) {

        // const { error } = coverBlukDataUpload.validate(entry);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }

        if (seenCoverCodes.has(entry.CoverCode)) {
            return res.status(400).json({ message: `CoverCode '${entry.CoverCode}' is repeated in the Excel sheet` });
        }

        seenCoverCodes.add(entry.CoverCode);

      const findCover = await CoverMastersSchema.findOne({
        where: { CoverCode: String(entry.CoverCode) },
      });

      if (findCover) {
        findCover.CoverName = entry.CoverName;
        findCover.CoverDescription = entry.CoverDescription;
        findCover.Status = entry.Status;
        await findCover.save();
      } else {
        await CoverMastersSchema.create({
          CoverName: entry.CoverName,
          CoverCode: entry.CoverCode,
          CoverDescription: entry.CoverDescription,
          Status: entry.Status,
        });
      }
    }

    return res
      .status(200)
      .json({
        message: "Data uploaded successfully",
        count: jsonData.length,
        data: jsonData,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { blukDataUploadByExcel };
