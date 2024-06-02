import React from "react";
import { connect } from "@/app/dbConfig.js";
import Feedback from "@/app/models/feedbackModel";
import User from "@/app/models/userModel";

export async function POST (req, res) {
  await connect();
  const reqBody = await req.json();
    const { title, body, author } = reqBody;
    console.log(author)
    const user = await User.findById(author.id);
    const proposedNewFeedback = { ...reqBody, author: user };
    const newFeedback = new Feedback(proposedNewFeedback);
    newFeedback.save();
    return new Response("New Feedback successsfully saved.", {status: 200})
}

export async function GET (req, res) {
  await connect();
  try {
    const feedbacks = await Feedback.find({}).populate(
      "author",
      "id email username"
    );
 return new Response (JSON.stringify(feedbacks), { status: 200})
    // res.status(200).send(feedbacks);
  } catch (err) {
    console.log(err);
return new Response (err, { status: 500})
    // res.status(500).send(err);
  }
}

export async function PUT (req) {
  await connect();
  try {
    const reqBody = await req.json();
    const { id, title, body } = reqBody;
    console.log(id, title, body)
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );
    console.log(updatedFeedback);
    return new Response("Feedback updated successfully.", { status: 200})
    // res.status(200).send("Feedback updated successfully.");
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500})
  }
}



// async function handler(req, res) {
//   await connect();
//   if (req.method === "POST") {
//     const reqBody = await req.body;
//     const { title, body, author } = reqBody;
//     console.log(author)
//     const user = await User.findById(author.id);
//     const proposedNewFeedback = { ...reqBody, author: user };
//     const newFeedback = new Feedback(proposedNewFeedback);
//     newFeedback.save().then(function (savedFeedback) {
//       res.status(200).send("New Feedback successsfully saved.");
//     });
//   }
//   if (req.method === "GET") {
//     try {
//       const feedbacks = await Feedback.find({}).populate(
//         "author",
//         "id email username"
//       );

//       res.status(200).send(feedbacks);
//     } catch (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//   }
//   if (req.method === 'PUT') {
//     try {
//       const { id, title, body } = await req.body.feedback;
//       console.log(req.body.feedback);
//       const updatedFeedback = await Feedback.findByIdAndUpdate(
//         id,
//         { title, body },
//         { new: true }
//       );
//       console.log(updatedFeedback);
//       res.status(200).send("Feedback updated successfully.");
//     } catch (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//   }
//   if (req.method === "DELETE") {
//     try {
//       const { id } = await req.body;
//       const deletedFeedback = await Feedback.findByIdAndDelete(id);
//       console.log(deletedFeedback);
//       res.status(200).send("Feedback deleted successfully.");
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// export default handler;
