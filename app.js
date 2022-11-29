"use strict";
const nodemailer = require("nodemailer");

async function mailSender(to, subject, text) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 587,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "authoralankay@163.com", // generated ethereal user
      pass: "JUPRTXEXFXPMAVWW", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Author AlanKay" <authoralankay@163.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  });

  return info.messageId;
}

const express = require("express");
const app = express();
const cors = require("cors");
// 端口号
const port = 30001;

app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  if (!req.query.to || !req.query.subject || !req.query.text) {
    res.send({ code: 1001, msg: "邮件格式错误" });
  }
  const result = await mailSender(
    req.query.to,
    req.query.subject,
    req.query.text
  );

  res.send({ code: 0, data: { messageId: result } });
});
