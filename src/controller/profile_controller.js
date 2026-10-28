import Profile from "../schema/profile_schema.js";

// Create user profile
export const createProfile = async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const userId = req.user.userId;

    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    // Create new profile
    const profile = await Profile.create({
      userId,
      username,
      email,
      phone,
    });

    return res.status(201).json(profile);
  } catch (error) {
    console.error("Error occurred while creating profile: ", error);
    return res
      .status(500)
      .json({ message: "Error occurred while creating profile" });
  }
};
// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error occurred while fetching profile: ", error);
    return res
      .status(500)
      .json({ message: "Error occurred while fetching profile" });
  }
};
