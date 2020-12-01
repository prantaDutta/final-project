import formidable from "formidable";
// We could have usedregular 'fs' and not a promise one
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { isEmptyObj } from "../../utils/functions";
import prisma from "../../lib/prisma";

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    try {
      //   const timeStamp = new Date().toString();
      const imagePath = path.join(`./public/uploads/verificationPapers/users`);
      fs.mkdir(imagePath, { recursive: true });
      // parse form with a Promise wrapper
      await new Promise((formidableResolve, formidableReject) => {
        var form = new formidable.IncomingForm();
        form.uploadDir = imagePath;
        form.multiples = true;
        form.keepExtensions = true;

        // renaming the file first parameter is the file name
        form.on("fileBegin", (filename, file) => {
          form.emit("data", { name: "fileBegin", filename, value: file });
        });

        // saving the file to the local folder
        try {
          form.parse(req, async (err, fields, files) => {
            if (err) return formidableReject(err);
            formidableResolve({ fields, files });

            for (let [key, value] of Object.entries(files)) {
              fields[key] = value.path.replace(/^.*[\\\/]/, ""); // returns the file and extenstion from the path
            }

            let verificationData = {};

            try {
              // sending data to the database
              verificationData = await prisma.users.update({
                where: {
                  id: parseInt((fields as any).id),
                },
                data: {
                  // Personal
                  name: (fields as any).name,
                  email: (fields as any).email,
                  dateOfBirth: (fields as any).dateOfBirth,
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
                    bankAccountStateMents: (fields as any)
                      .bankAccountStatements,
                    businessProof: (fields as any).businessProof,
                    salarySlip: (fields as any).salarySlip,
                    employeeIdCard: (fields as any).employeeIdCard,
                  },
                },
              });
              resolve();
            } catch (e) {
              console.log(e);
              reject();
            }
            if (isEmptyObj(verificationData)) {
              res.status(405);
              res.end("You Messed Up");
              reject();
            } else {
              res.status(200);
              res.json({ verificationData });
              resolve();
            }
          });
        } catch (e) {
          res.status(405);
          res.end("You Messed Up");
          reject();
        }
      });
    } catch (e) {
      console.log(e);
      res.send("ERROR");
      res.status(405);
      reject();
    }
  });
};
