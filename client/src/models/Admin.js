const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

adminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Admin = mongoose.model('Admin', adminSchema);