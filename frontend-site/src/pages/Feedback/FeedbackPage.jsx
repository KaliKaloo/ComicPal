import { useState } from "react";
import FeedbackFrom from "./FeedbackForm";
import MainLayout from "../../layout/MainLayout";

function ThankYou() {}

function FeedbackPage() {
  const [submitted, setSubmit] = useState(false);

  const handleSubmit = () => {
    console.log(submitted);
    setSubmit(true);
  };
  return (
    <MainLayout>
      <div className="  flex justify-center items-center ">
        {!submitted ? (
          <FeedbackFrom submitFunc={handleSubmit} />
        ) : (
          <div className="w-3/5 md:mx-20 md:my-10 mx-10 my-20 text-left font-poppins">
            <div className="bg-paleYellow shadow-lg rounded-md px-8 pt-6 pb-8 mb-4 h-56 flex items-center justify-center">
              <h1>
              <span className="text-secondary">Thank you</span> for your feedback! :D
              </h1>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default FeedbackPage;
