import { PrismaClient } from "@prisma/client";
import { parseISO } from "date-fns";
import formidable from "formidable";
// you could use regular 'fs' and not a promise one
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const prisma = new PrismaClient();

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   const timeStamp = new Date().toString();
  const imagePath = path.join(`./public/uploads/verificationPapers/`);
  fs.mkdir(imagePath, { recursive: true });

  try {
    // parse form with a Promise wrapper
    await new Promise((resolve, reject) => {
      var form = new formidable.IncomingForm();
      form.uploadDir = imagePath;
      form.multiples = true;
      form.keepExtensions = true;

      // renaming the file first parameter is the file name
      form.on("fileBegin", (filename, file) => {
        form.emit("data", { name: "fileBegin", filename, value: file });
      });

      // saving the file to the local folder
      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });

        for (let [key, value] of Object.entries(files)) {
          fields[key] = value.path.replace(/^.*[\\\/]/, ""); // returns the file and extenstion from the path
        }
        // console.log(fields);
        const verificationData = await prisma.users.update({
          where: {
            id: parseInt((fields as any).id),
          },
          data: {
            // verificationPhotos: {},

            // Personal
            name: (fields as any).name,
            email: (fields as any).email,
            dateOfBirth: parseISO((fields as any).dateOfBirth),
            gender: (fields as any).gender,
            // contact information
            address: (fields as any).address,
            mobileNo: (fields as any).mobileNo,
            // checking salaried individual or self-employed
            borrowerType: (fields as any).borrowerType,
            // KYC
            documentType: (fields as any).documentType,
            verified: "pending",
            // verificationphotos
            verificationPhotos: {
              nidOrPassport: (fields as any).nidOrPassport,
              addressProof: (fields as any).addressProof,
              recentPhoto: (fields as any).recentPhoto,
              bankAccountStateMents: (fields as any).bankAccountStatements,
              businessProof: (fields as any).businessProof,
              salarySlip: (fields as any).salarySlip,
              employeeIdCard: (fields as any).employeeIdCard,
            },
          },
        });
        res.json({ verificationData });
      });
    });

    /* --------------------------- 
            Don't Delete This
     --------------------------- */

    // this is used to read the files
    // let contents: string[] = [];
    // for (let [key, value] of Object.entries((data as any).files)) {
    //   let res = await fs.readFile((value as any).path, {
    //     encoding: "utf8",
    //   });
    //   contents.push(res);
    // }
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
  //   res.send("OK");
};
