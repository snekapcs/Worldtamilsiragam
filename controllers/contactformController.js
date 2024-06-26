const nodeMail = require("nodemailer");
const ContactformModel = require('../models/contactformSchema');
const logger = require('../logger');
const { STATUS_CODES } = require("../util/constant.js");
require('dotenv').config();

const createContactForm = async (req, res) => {
    const { name, email, liveFrom, interestedIn, message, status = 'New' } = req.body;

    try {
        const contactUser = new ContactformModel({
            name,
            email,
            liveFrom,
            interestedIn,
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
            to: "snekav371@gmail.com",
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

        // Send email using await, remove callback
        const info = await transporter.sendMail(mailOptions);

        logger.info(`Email sent: ${info.response}`, { statusCode: STATUS_CODES.SUCCESS });
        logger.info(`Contact user added: ${name}`, { statusCode: STATUS_CODES.SUCCESS });

        res.status(201).json({ contactUser, msg: "Contact User Added Successfully" });
    } catch (error) {
        logger.error(`Error creating contact user: ${error.message}`, { statusCode: STATUS_CODES.ERROR });
        res.status(500).json({ error: "An error occurred" });
    }
};

const getContactForms = async (req, res) => {
    try {
        const contactForms = await ContactformModel.find({});
        res.status(200).json(contactForms);
    } catch (error) {
        logger.error(`Error retrieving contact forms: ${error.message}`, { statusCode: STATUS_CODES.ERROR });
        res.status(500).json({ error: "An error occurred while retrieving contact forms" });
    }
};

const updateContactForm = async (req, res) => {
    const { id } = req.params;
    const { name, email, liveFrom, interestedIn, message, status } = req.body;

    try {
        const updatedContactForm = await ContactformModel.findByIdAndUpdate(
            id, 
            { name, email, liveFrom, interestedIn, message, status },
            { new: true } 
        );

        if (!updatedContactForm) {
            return res.status(404).json({ error: "Contact form not found" });
        }

        res.status(200).json(updatedContactForm);
    } catch (error) {
        logger.error(`Error updating contact form: ${error.message}`, { statusCode: STATUS_CODES.ERROR });
        res.status(500).json({ error: "An error occurred while updating the contact form" });
    }
};

module.exports = {
    createContactForm,
    getContactForms,
    updateContactForm
};
