
export default function LikertScale({ onChange, checked, customOptions }) {
	const options = customOptions || [
		{ value: "Strongly Disagree"  },
		{ value: "Disagree"},
		{ value: "Neutral"},
		{ value: "Agree"},
		{ value: "Strongly Agree" }
	];

	return (
		<div className="flex space-x-12">
			{options.map((option, i) => {
				return (
					<label key={i} className="text-center">
						<div className="cursor-pointer text-sm mb-1">
							{option.value}
						</div>
						<input
							type="radio"
							className="radio"
							checked={option.value === checked?.value}
							onChange={() => onChange(option)}
						/>
					</label>
				);
			})}
		</div>
	);
}
