import express from "express";
import { newContact } from '../controllers/public.controller.js';

const router = express.Router();

router.post("/new-contact", newContact);

export default router;
