import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const userUpdate = async (req, res, next) => {
  try {
    const { email, phone, name } = req.body;

    console.log({ email, phone, name });

    if (!email || !name || !phone) {
      return next({
        status: 400,
        message: "All fileds are required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { email, phone, name } },
      { new: true },
    );

    console.log(user);

    res.status(200).json({ data: user, message: "Updated successfully" });
  } catch (error) {
    console.log("Error in update profile: ", error);
  }
};

export const userChangePhoto = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const dp = req.file;

    if (!dp) {
      return next({ status: 400, message: "Profile picture is required" });
    }

    if (currentUser?.photo?.publicID) {
      await cloudinary.uploader.destroy(currentUser.photo.publicID);
    }

    const b64 = Buffer.from(dp.buffer).toString("base64");

    const dataURI = `data:${dp.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "Cravings/User",
      width: 500,
      height: 500,
      crop: "fill",
    });

    currentUser.photo.url = result.secure_url;
    currentUser.photo.publicID = result.public_id;

    console.log(currentUser);

    await currentUser.save();

    res.status(200).json({ message: "Photo updated", data: currentUser });
  } catch (error) {
    console.log("Error in updating Photo");
    next(error);
  }
};
