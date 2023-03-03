import React from "react";
import { useForm } from "react-hook-form";
import { feedbackQuestions } from "../../constants";

const FeedbackFrom = ({ submitFunc }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		submitFunc();
		const formData = new FormData();
		for (const key in data) {
			if (key === "field") {
				formData.append(key, data[key][1]);
			} else {
				formData.append(key, data[key]);
			}
		}
		fetch(
			"https://script.google.com/macros/s/AKfycbwcuSinKb8mp_TYQ4WR02Qo33zEIYfal--wG1OYV7ngd0a1FjM-g4ADQN_RCFBsm5YoFA/exec",
			{
				method: "POST",
				body: formData,
			}
		)
			// .then((res) => {
			//   // console.log(res);
			// })
			.catch((error) => console.log(error));
	};

	return (
		<>
			<div className="w-3/5 md:mx-20 md:my-10 mx-10 my-20 text-left font-poppins">
				<form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="border-b-2 pb-2 mb-2">Feedback Form</h1>
					<p className="text-secondary text-sm mb-6">
						Note: Your feedback will be stored anonymously!
					</p>
					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question1}
						</label>
						<div className="flex space-x-6">
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question1"
									name="radio-1"
									className="radio mr-2"
									value="yes"
									{...register("Question1")}
								/>
								<div className="cursor-pointer">Yes</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question1"
									name="radio-1"
									className="radio"
									value="no"
									{...register("Question1")}
								/>
								<div className="cursor-pointer">No</div>
							</label>
						</div>
					</div>

					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question2}
						</label>
						<div className="flex space-x-6">
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question2"
									name="radio-1"
									className="radio mr-2"
									value="yes"
									{...register("Question2")}
								/>
								<div className="cursor-pointer">Yes</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question2"
									name="radio-1"
									className="radio"
									value="no"
									{...register("Question2")}
								/>
								<div className="cursor-pointer">No</div>
							</label>
						</div>
					</div>
					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question3}
						</label>
						<div className="flex space-x-6">
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question3"
									name="radio-1"
									className="radio mr-2"
									value="yes"
									{...register("Question3")}
								/>
								<div className="cursor-pointer">Yes</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question3"
									name="radio-1"
									className="radio"
									value="no"
									{...register("Question3")}
								/>
								<div className="cursor-pointer">No</div>
							</label>
						</div>
					</div>
					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question4}
						</label>
						<textarea
							className="shadow appearance-none border rounded md:w-[80%] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="Question4"
							{...register("Question4")}
						/>
					</div>
					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question5}
						</label>
						<div className="flex space-x-6">
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question5"
									name="radio-1"
									className="radio mr-2"
									value="yes"
									{...register("Question5")}
								/>
								<div className="cursor-pointer">Yes</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question5"
									name="radio-1"
									className="radio"
									value="no"
									{...register("Question5")}
								/>
								<div className="cursor-pointer">No</div>
							</label>
						</div>
					</div>
					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question6}
						</label>
						<div className="grid md:grid-cols-2 gap-2">
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Plan a Story tool"
									{...register("Question6")}
								/>
								<div className="cursor-pointer">
									Plan a Story tool
								</div>
							</label>

							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Create a Comic Page tool"
									{...register("Question6")}
								/>
								<div className="cursor-pointer">
									Create a Comic Page tool
								</div>
							</label>

							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Design a Character tool"
									{...register("Question6")}
								/>
								<div className="cursor-pointer">
									Design a Character tool
								</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Chatting to the AI when creating a story
"
									{...register("Question6")}
								/>
								<div className="cursor-pointer">
									Chatting to the AI when creating a story
								</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Realism percentage options when generating images"
									{...register("Question6")}
								/>
								<div className="cursor-pointer">
									Realism percentage options when generating
									images
								</div>
							</label>
							{/* <label className="flex space-x-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  value="Stylize options when generating images"
                  {...register("Question6")}
                />
                <div className="cursor-pointer">
                  Stylize options when generating images
                </div>
              </label> */}
						</div>
					</div>
					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question7}
						</label>
						<div className="grid md:grid-cols-2 gap-2">
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Plan a Story tool"
									{...register("Question7")}
								/>
								<div className="cursor-pointer">
									Plan a Story tool
								</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Create a Comic Page tool"
									{...register("Question7")}
								/>
								<div className="cursor-pointer">
									Create a Comic Page tool
								</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Design a Character tool"
									{...register("Question7")}
								/>
								<div className="cursor-pointer">
									Design a Character tool
								</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Chatting to the AI when creating a story
"
									{...register("Question7")}
								/>
								<div className="cursor-pointer">
									Chatting to the AI when creating a story
								</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Realism percentage options when generating images"
									{...register("Question7")}
								/>
								<div className="cursor-pointer">
									Realism percentage options when generating
									images
								</div>
							</label>
							{/* <label className="flex space-x-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  value="Stylize options when generating images"
                  {...register("Question7")}
                />
                <div className="cursor-pointer">
                  Stylize options when generating images
                </div>
              </label> */}
						</div>
					</div>

					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question8}
						</label>
						<div className="grid md:grid-cols-2 gap-2">
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Ability to draw on top of the page"
									{...register("Question8")}
								/>
								<div className="cursor-pointer">
									Ability to draw on top of the page
								</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Edit the generated images by cropping, rotating etc"
									{...register("Question8")}
								/>
								<div className="cursor-pointer">
									Edit the generated images by cropping,
									rotating etc
								</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="When planning a story, have a narrative timeline with the ability to move around story points                  "
									{...register("Question8")}
								/>
								<div className="cursor-pointer">
									When planning a story, have a narrative
									timeline with the ability to move around
									story points
								</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									value="Remember the characters created and use them when creating a comic page"
									{...register("Question8")}
								/>
								<div className="cursor-pointer">
									Remember the characters created and use them
									when creating a comic page
								</div>
							</label>
						</div>
					</div>
					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question9}
						</label>
						<div className="md:flex space-x-6">
							<label>
								<div className="cursor-pointer">0%</div>
								<input
									type="radio"
									id="Question9"
									name="radio-1"
									className="radio"
									value="0%"
									{...register("Question9")}
								/>
							</label>

							<label>
								<div className="cursor-pointer">30%</div>
								<input
									type="radio"
									id="Question9"
									name="radio-1"
									className="radio"
									value="30%"
									{...register("Question9")}
								/>
							</label>

							<label>
								<div className="cursor-pointer">50%</div>
								<input
									type="radio"
									id="Question9"
									name="radio-1"
									className="radio"
									value="50%"
									{...register("Question9")}
								/>
							</label>

							<label>
								<div className="cursor-pointer">70%</div>
								<input
									type="radio"
									id="Question9"
									name="radio-1"
									className="radio"
									value="70%"
									{...register("Question9")}
								/>
							</label>

							<label>
								<div className="cursor-pointer">100%</div>
								<input
									type="radio"
									id="Question9"
									name="radio-1"
									className="radio"
									value="100%"
									{...register("Question9")}
								/>
							</label>
						</div>
					</div>
					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question10}
						</label>
						<div className="flex space-x-6">
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question10"
									name="radio-1"
									className="radio mr-2"
									value="yes"
									{...register("Question10")}
								/>
								<div className="cursor-pointer">Yes</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question10"
									name="radio-1"
									className="radio"
									value="no"
									{...register("Question10")}
								/>
								<div className="cursor-pointer">No</div>
							</label>
						</div>
					</div>
					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question11}
						</label>
						<div className="flex space-x-6">
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question11"
									name="radio-1"
									className="radio mr-2"
									value="yes"
									{...register("Question11")}
								/>
								<div className="cursor-pointer">Yes</div>
							</label>
							<label className="flex space-x-3">
								<input
									type="radio"
									id="Question11"
									name="radio-1"
									className="radio"
									value="no"
									{...register("Question11")}
								/>
								<div className="cursor-pointer">No</div>
							</label>
						</div>
					</div>

					<div className="mb-8">
						<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
							{feedbackQuestions.questions.question12}
						</label>
						<textarea
							className="shadow appearance-none border rounded md:w-[80%] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="Question12"
							{...register("Question12")}
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							className="w-32 bg-secondary hover:bg-[#E36021] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default FeedbackFrom;
