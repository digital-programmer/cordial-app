const nodemailer = require("../config/nodemailer");

// another way of exporting method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({ comment }, "/comments/new_comment.ejs");
    nodemailer.transporter.sendMail({
        from: "digitalprogrammer123@gmail.com",
        to: comment.user.email,
        subject: "New comment published",
        html: htmlString
    }, (err, info) => {
        if (err) { console.log("Error in sending mail", err); return; }
        console.log("Message sent", info);
        return;
    })
}