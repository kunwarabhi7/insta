import { Router } from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello user");
});

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
