import bcrypt from "bcrypt";
import User from "../models/User.js";

const seedAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = new User({
      name: "Tanzia Mourin Chowdhury",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log("✅ Admin user created:", newAdmin.email);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};

export default seedAdminUser;
