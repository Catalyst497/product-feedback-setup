import { connect } from "@/app/dbConfig.js";
import Feedback from "@/app/models/feedbackModel";
export async function DELETE(req, {params}) {
  await connect();
  try {
    console.log(req.query, params);
    const { id } = params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    console.log(deletedFeedback);
    return new Response("Feedback deleted successfully.", { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
