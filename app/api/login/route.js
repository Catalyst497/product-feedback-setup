import React from "react";
import { connect } from "@/app/dbConfig.js";
import User from "@/app/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  await connect();
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    if (!email || !password)
      return new Response(JSON.stringify({ error: "Please fill all fields." }));
    // return res.json({ error: "Please fill all fields." });

    // Check if it is a valid email
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regex))
      return new Response(
        JSON.stringify({ error: "Please enter a valid email address." })
      );
    // return res.json({ error: "Please enter a valid email address." });

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({
          error:
            "Your email is not registered with us. You might want to register first.",
        })
      );
      // return res.json({
      //   error:
      //     "Your email is not registered with us. You might want to register first.",
      // });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return new Response(JSON.stringify({ error: "Invalid password" }));
      // return res.json({ error: "Invalid password" });
    }

    //create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    //create token
    const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return new Response(
      JSON.stringify({ message: "Login successful", success: true, token }),
      { status: 200 }
    );
    // return res
    //   .status(200)
    //   .json({ message: "Login successful", success: true, token });
  } catch (err) {
    console.log(err);
  }
}
