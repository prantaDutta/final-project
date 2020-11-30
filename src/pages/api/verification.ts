import formidable from "formidable";
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const timeStamp = new Date().toString();
  const imagePath = path.join(`./public/uploads/verificationPapers/`);
  fs.mkdir(imagePath, { recursive: true });

  // parse form with a Promise wrapper
  const data = await new Promise((resolve, reject) => {
    // const form = new IncomingForm({
    //     uploadDir: __dirname + '/tmp',
    // });
    var form = new formidable.IncomingForm();
    form.uploadDir = imagePath;
    form.multiples = true;
    form.keepExtensions = true;

    // form.on("fileBegin", function (name, file) {
    //     file.path = path.join(imagePath, )
    // })

    form.on("fileBegin", (filename: string, file) => {
      const renamedFileName = filename + timeStamp;
      form.emit("data", { name: "fileBegin", renamedFileName, value: file });
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      //   console.log(files);
      resolve({ fields, files });
    });
  });
  //   for (let [key, value] of Object.entries((data as any).files)) {
  //     // if (typeof value === "object") {
  //     //   const uploadResponse = await Axios.post(
  //     //     "http://localhost:3000/api/upload-image",
  //     //     { data }
  //     //   );
  //     // }
  //     console.log(key, value);
  //   }
  //   console.log(uploadResponse);
  //   console.log(data);
  // read file from the temporary path
  let contents: string[] = [];
  for (let [key, value] of Object.entries((data as any).files)) {
    let res = await fs.readFile((value as any).path, {
      encoding: "utf8",
    });
    contents.push(res);
  }
  //   console.log(contents);
  res.send(contents);
  // contents is a string with the content of uploaded file, so you can read it or store
};
