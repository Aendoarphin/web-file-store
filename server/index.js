import express from "express";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Get all users
app.get("/api/users", async (req, res) => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data.users);
});

// Create new user
app.post("/api/create-user", async (req, res) => {
  const { email, password, name, role, group } = req.body;
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, email, role, group },
  });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data);
});

// Update user password
app.put("/api/update-user-pw", async (req, res) => {
  const { userId, userPassword } = req.body;
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password: userPassword,
  });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json({ message: "Password updated successfully" });
});

// Update user metadata
app.put("/api/update-user-metadata", async (req, res) => {
  const { userId, name, email, role, group } = req.body;
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    user_metadata: { name, email, group, role },
  });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json({ message: "User metadata updated successfully" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
