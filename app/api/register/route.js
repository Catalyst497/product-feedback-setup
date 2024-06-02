import mongoose from "mongoose";
import { connect } from "@/app/dbConfig";
import User from "@/app/models/userModel";
import bcryptjs from "bcryptjs";

// import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  await connect();
  try {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    if (!username || !email || !password)
      return new Response(
        JSON.stringify({ error: "Please fill all fields." })
      );
    if (!email.match(regex))
      return new Response(
        JSON.stringify({ error: "Please enter a valid email address." })
      );
    // return res.json({error: "Please enter a valid email address."})

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return new Response(
        JSON.stringify({ error: "You already have an account with us. Please login." })
      );
      // return res.json({
      //   error: "You already have an account with us. Please login.",
      // });
    }

    const userNameTwin = await User.findOne({ username });
    if (userNameTwin) {
      return new Response(
        JSON.stringify({error: "Sorry, this username is taken. Please try another." })
      );
      // return res.json({error: 'Sorry, this username is taken. Please try another.'})
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    const savedUser = await newUser.save();

    return new Response(
      JSON.stringify({
        message: "User created successfully.",
        success: true,
        savedUser,
      }),
      { status: 200 }
    );
    // return res.json({
    //   message: "User created successfully.",
    //   success: true,
    //   savedUser,
    // });
  } catch (err) {
    console.log(err);
  }
}
