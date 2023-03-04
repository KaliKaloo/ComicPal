import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LikertScale from "../../components/LikertScale";
import { feedbackQuestions } from "../../constants";

const FeedbackForm = ({ submitFunc }) => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [likertAnswers, setLikertAnswers] = useState({});
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

	const updateLikertAnswers = (key, value) => {
		setLikertAnswers((likertAnswers) => {
			return { ...likertAnswers, [key]: value };
		});
	};

	const onSubmit = (data) => {
		setSubmitButtonDisabled(true);

		const formData = new FormData();

		for (const [key, value] of Object.entries(data)) {
			if (key === "Question8ii") {
				formData.set(
					"Question8",
					[formData.get("Question8"), value].join(",")
				);
			} else {
				formData.append(key, value);
			}
		}

		for (const [key, answer] of Object.entries(likertAnswers)) {
			formData.append(key, answer.value);
		}

		fetch(
			"https://script.google.com/macros/s/AKfycbwcuSinKb8mp_TYQ4WR02Qo33zEIYfal--wG1OYV7ngd0a1FjM-g4ADQN_RCFBsm5YoFA/exec",
			{ method: "POST", body: formData }
		)
		.then(() => submitFunc())
		.catch((error) => console.log(error));
	};

	return (
		<div className="w-full lg:w-4/5 xl:w-3/5 md:mx-20 md:my-10 mx-10 my-20 text-left font-poppins">
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
					<LikertScale
						checked={likertAnswers.Question1}
						onChange={(val) => {
							updateLikertAnswers("Question1", val);
						}}
					/>
				</div>

				<div className="mb-8">
					<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
						{feedbackQuestions.questions.question2}
					</label>
					<LikertScale
						checked={likertAnswers.Question2}
						onChange={(val) => {
							updateLikertAnswers("Question2", val);
						}}
					/>
				</div>
				<div className="mb-8">
					<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
						{feedbackQuestions.questions.question3}
					</label>
					<LikertScale
						checked={likertAnswers.Question3}
						onChange={(val) => {
							updateLikertAnswers("Question3", val);
						}}
					/>
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
					<LikertScale
						checked={likertAnswers.Question5}
						onChange={(val) => {
							updateLikertAnswers("Question5", val);
						}}
					/>
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
								Edit the generated images by cropping, rotating
								etc
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
								When planning a story, have a narrative timeline
								with the ability to move around story points
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
						<div className="mb-3 mt-1">
							<label className="block mb-2">
								Other:
							</label>
							<textarea
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								id="Question8ii"
								{...register("Question8ii")}
							/>
						</div>
					</div>
				</div>
				<div className="mb-8">
					<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
						{feedbackQuestions.questions.question9}
					</label>
					<div className="md:flex space-x-6">
						<LikertScale
							checked={likertAnswers.Question9}
							onChange={(val) => {
								updateLikertAnswers("Question9", val);
							}}
							customOptions={[
								{ value: "0%" },
								{ value: "25%" },
								{ value: "50%" },
								{ value: "75%" },
								{ value: "100%" },
							]}
						/>
					</div>
				</div>
				<div className="mb-8">
					<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
						{feedbackQuestions.questions.question10}
					</label>
					<LikertScale
						checked={likertAnswers.Question10}
						onChange={(val) => {
							updateLikertAnswers("Question10", val);
						}}
						customOptions={[
							{ value: "Very Uncreative" },
							{ value: "Uncreative" },
							{ value: "Neutral" },
							{ value: "Creative" },
							{ value: "Very Creative" },
						]}
					/>
				</div>
				<div className="mb-8">
					<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
						{feedbackQuestions.questions.question11}
					</label>
					<LikertScale
						checked={likertAnswers.Question11}
						onChange={(val) => {
							updateLikertAnswers("Question11", val);
						}}
					/>
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
				<div className="mb-8">
					<label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
						{feedbackQuestions.questions.question13}
					</label>
					<textarea
						className="shadow appearance-none border rounded md:w-[80%] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						id="Question13"
						{...register("Question13")}
					/>
				</div>

				<div className="flex justify-end gap-3 items-center">
					<label className="text-secondary flex gap-3 text-sm ">
						<input
							type="checkbox"
							className="checkbox checkbox-sm"
							onChange={(e) => setSubmitButtonDisabled(!e.target.checked)}
						/>
						<div className="cursor-pointer">
							I acknowledge that my feedback will be collected
							anonymously
						</div>
					</label>
					<button
						type="submit"
						disabled={submitButtonDisabled}
						className="w-32 disabled:bg-[#ed9b75] bg-secondary hover:bg-[#E36021] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default FeedbackForm;
