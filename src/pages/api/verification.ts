import formidable from "formidable";
// We could have usedregular 'fs' and not a promise one
import { promises as fs } from "fs";
import path from "path";
import { isEmptyObj } from "../../utils/functions";
import prisma from "../../lib/prisma";
import handler from "../../apiHandlers/handler";

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler.post(async (req, res, next) => {
  try {
    const imagePath = path.join(`./public/uploads/verificationPapers/`);
    fs.mkdir(imagePath, { recursive: true });
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
      try {
        form.parse(req, async (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });

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
                  bankAccountStateMents: (fields as any).bankAccountStatements,
                  businessProof: (fields as any).businessProof,
                  salarySlip: (fields as any).salarySlip,
                  employeeIdCard: (fields as any).employeeIdCard,
                },
              },
            });
          } catch (e) {
            console.log(e);
          }
          if (isEmptyObj(verificationData)) {
            res.status(405);
            res.end("You Messed Up");
          } else {
            res.status(200);
            res.json({ verificationData });
          }
        });
      } catch (e) {
        res.status(405);
        res.end("You Messed Up");
      }
    });
  } catch (e) {
    console.log(e);
    res.send("ERROR");
    res.status(405);
  }
  next();
});
