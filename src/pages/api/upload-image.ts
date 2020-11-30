import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
import Axios from "axios";

export interface MulterFile {
  key: string; // Available using `S3`.
  path: string; // Available using `DiskStorage`.
  mimetype: string;
  originalname: string;
  size: number;
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file d", file);
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    console.log("file f", file);
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({ storage: storage });

export default async (
  req: NextApiRequest & { files: MulterFile[] },
  res: NextApiResponse
) => {
  //   res.send(req.body);
  //   res.send(req.files);
  //   console.log(req.body.data.fields);
  //   console.log("fields: ", req.data.fields);
  //   console.log("files", req.data.files);
};
