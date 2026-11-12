require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seedAdmin() {
  const { MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!MONGO_URI || !ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be set in .env');
  }
  if (ADMIN_PASSWORD.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters');
  await mongoose.connect(MONGO_URI);
  const email = ADMIN_EMAIL.trim().toLowerCase();
  let admin = await User.findOne({ email }).select('+password');
  if (admin) {
    admin.name = ADMIN_NAME.trim();
    admin.isAdmin = true;
    // The environment-provided password is re-hashed by the User pre-save hook.
    admin.password = ADMIN_PASSWORD;
  } else {
    admin = new User({ name: ADMIN_NAME.trim(), email, password: ADMIN_PASSWORD, isAdmin: true });
  }
  await admin.save();
  console.log(`Administrator account ready: ${email}`);
  await mongoose.disconnect();
}

seedAdmin().catch(async error => {
  console.error('Admin seed failed:', error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
