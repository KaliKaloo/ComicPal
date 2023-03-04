
export default function LikertScale({ onChange, checked }) {
	const options = [
		{ value: "Strongly Disagree" , text: "Strongly Disagree" },
		{ value: "Disagree", text: "Disagree" },
		{ value: "Neutral", text: "Neutral" },
		{ value: "Agree", text: "Agree" },
		{ value: "Strongly Agree", text: "Strongly Agree" }
	].map(response => {
		return { ...response, checked: response.value === checked?.value };
	});

	return (
		<div className="flex space-x-12">
			{options.map((option, i) => {
				return (
					<label key={i} className="text-center">
						<div className="cursor-pointer text-sm mb-1">
							{option.text}
						</div>
						<input
							type="radio"
							className="radio"
							checked={option.checked}
							onChange={() => onChange(option)}
						/>
					</label>
				);
			})}
		</div>
	);
}
