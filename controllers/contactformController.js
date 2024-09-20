const nodeMail = require("nodemailer");
const ContactformModel = require('../models/contactformSchema');
const logger = require('../logger');
const { STATUS_CODES, CONTACT_FORM } = require("../util/constant.js");
require('dotenv').config();

const createContactForm = async (req, res) => {
    const { name, email, mobile, subject, message, status = 'New' } = req.body;

    try {
        const contactUser = new ContactformModel({
            name,
            email,
            mobile,
            subject,
            message,
            status 
        });

        await contactUser.save();

        const transporter = nodeMail.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD, 
            },
        });

        const mailOptions = {
            from: email,
            to: "tamilsiragam@gmail.com",
            subject: `Message from ${name}`,
            html: `
                You got a message from <br>
                Email: ${email}<br>
                Name: ${name}<br>
                Mobile: ${mobile}<br>
                Subject: ${subject}<br>
                Message: ${message}
            `,
        };

        // Send email using await, remove callback
        const info = await transporter.sendMail(mailOptions);

        logger.info(`Email sent: ${info.response}`, { statusCode: STATUS_CODES.SUCCESS });
        logger.info(`Contact user added: ${name}`, { statusCode: STATUS_CODES.SUCCESS });

        res.status(STATUS_CODES.SUCCESS).json({ contactUser, msg: CONTACT_FORM.SUCCESS });
    } catch (error) {
        logger.error(`Error creating contact user: ${error.message}`, { statusCode: STATUS_CODES.SERVER_ERROR });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: "An error occurred" });
    }
};

const getContactForms = async (req, res) => {
    try {
        const contactForms = await ContactformModel.find({});
        res.status(STATUS_CODES.SUCCESS).json(contactForms);
    } catch (error) {
        logger.error(`Error retrieving contact forms: ${error.message}`, { statusCode: STATUS_CODES.SERVER_ERROR });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: CONTACT_FORM.RETRIVE_ERROR });
    }
};

const updateContactForm = async (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, subject, message, status } = req.body;

    try {
        const updatedContactForm = await ContactformModel.findByIdAndUpdate(
            id, 
            { name, email, mobile, subject, message, status },
            { new: true } 
        );

        if (!updatedContactForm) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ error: CONTACT_FORM.NOT_FOUND });
        }

        res.status(STATUS_CODES.SUCCESS).json(updatedContactForm);
    } catch (error) {
        logger.error(`Error updating contact form: ${error.message}`, { statusCode: STATUS_CODES.SERVER_ERROR });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: CONTACT_FORM.UPDATE_ERROR });
    }
};

module.exports = {
    createContactForm,
    getContactForms,
    updateContactForm
};
