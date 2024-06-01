import React from "react";
import TopActionsBlck from "./TopActionsBlck";
import Feedbacks from "./Feedbacks";

function Main() {
  return (
    <main className="flex-1">
      <TopActionsBlck />
      <div className="main max-h-screen overflow-y-auto">
        <Feedbacks />
      </div>
    </main>
  );
}

export default Main;
