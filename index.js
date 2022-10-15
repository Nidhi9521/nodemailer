const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const clientId =
  "485945689011-5pps6r44202h4prpafudks08jv8frbd4.apps.googleusercontent.com";
const clientSecreat = "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";
const redirect_uri = "https://developers.google.com/oauthplayground";
const referesh_token =
  "1//04m6VoV9nrjmCCgYIARAAGAQSNgF-L9IrZbMcMkNtrzYlbFRXWdpenAk3gMupihvn_3oGjblOLn8zMCfVx5PMMXpPntcnftnVdg";

app.get("/", async (req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecreat,
    redirect_uri
  );
  oAuth2Client.setCredentials({ refresh_token: referesh_token });
  const accessToken = await oAuth2Client.getAccessToken();

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: "gokaninidhi9521@gmail.com",
      clientId: clientId,
      clientSecret: clientSecreat,
      refreshToken: referesh_token,
      accessToken: accessToken,
    },
  });

  var mailOptions = {
    from: "gokaninidhi9521@gmail.com",
    to: "18ce059@gardividyapith.ac.in",
    subject: "Sending Email using Node.js[nodemailer]",
    text: "That was easy!",
    html: "<h1>That was easy!</h1>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send("Success");
    }
  });
});
