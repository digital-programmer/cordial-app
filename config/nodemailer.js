const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "digitalprogrammer123@gmail.com", // generated gmail user
        pass: '@Situn123.', // generated gmail password
    },
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(path.join(__dirname, "../views/mailers", relativePath), data, (err, template) => {
        if (err) {
            console.log("Error in rendering template", err);
            return;
        }

        mailHTML = template;
    })

    return mailHTML;
}

module.exports = {
    transporter,
    renderTemplate
}