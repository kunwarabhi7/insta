import { Router } from "express";
import { signupUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello user");
});

//signup
router.post("/signup", signupUser);

export default router;
