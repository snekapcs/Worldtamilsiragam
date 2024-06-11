const nodeMail = require("nodemailer");
const ContactformModel = require('../models/contactformSchema');
const logger = require('../logger');
const { STATUS_CODES } = require("../util/constant.js");

const createContactForm = async (req, res) => {
    console.log(req.body);
    const { name, email, liveFrom, interestedIn, message } = req.body;

    try {
        const contactUser = new ContactformModel({
            name,
            email,
            liveFrom,
            interestedIn,
            message
        });

        await contactUser.save();

        const transporter = nodeMail.createTransport({
            service: "gmail",
            auth: {
                user: "kalaiarsankan1426@gmail.com",
                pass: "xvql zjlb fhqk elln",
            },
        });

        const mailOptions = {
            from: email,
            to: "kalaiarsankan1426@gmail.com", 
            subject: `Message from ${name}`,
            html: `
                You got a message from <br>
                Email: ${email}<br>
                Name: ${name}<br>
                Live From: ${liveFrom}<br>
                Interested In: ${interestedIn}<br>
                Message: ${message}
            `,
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(`Error sending email: ${error.message}`, { statusCode: STATUS_CODES.ERROR });
                return res.status(500).json({ error: "Failed to send email" });
            }
            logger.info(`Email sent: ${info.response}`, { statusCode: STATUS_CODES.SUCCESS });
        });

        logger.info(`Contact user added: ${name}`, { statusCode: STATUS_CODES.SUCCESS });
        res.status(201).json({ contactUser, msg: "Contact User Added Successfully" });
    } catch (error) {
        logger.error(`Error creating contact user: ${error.message}`, { statusCode: STATUS_CODES.ERROR });
        res.status(500).json({ error: "An error occurred" });
    }
};

module.exports = { createContactForm };
