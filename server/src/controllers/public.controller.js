import Contact from "../models/contact.model.js";

export const newContact = async (req, res, next) => {
  try {
    const { fullName, phone, message, email } = req.body;
    if (!fullName || !phone || !message || !email) {
      return next({
        status: 400,
        message: "All fields are required",
      });
    }

    const newMessage = await Contact.create({
      fullName,
      phone,
      message,
      email,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in newContact controller", error);
    next(error);
  }
};
