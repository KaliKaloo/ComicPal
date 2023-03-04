import React from "react";
import overviewImg1 from "../../assets/overviewImg1.png";
import overviewImg2 from "../../assets/overviewImg2.png";
import styles, { layout } from "../../assets/style";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { useNavigate } from "react-router-dom";

function Info() {
	const navigate = useNavigate();

	return (
		// <div className="flex flex-row">
		<div className="grid xl:grid-cols-2 gap-0 relative">
			<section className={layout.sectionReverse}>
				<div className={layout.sectionImgReverse}>
					<img
						src={overviewImg1}
						alt="overview img 1 "
						className="object-cover w-[100%]  h-[100%] relative z-[5]"
					/>
				</div>

				<div className={`${layout.sectionInfo} px-16 mt-10`}>
					<h2 className={`${styles.heading2} w-[300px] pb-4`}>
						Your Wingman,
						<br className="sm:block hidden" />{" "}
						<div className="text-secondary">
							for Creative Leadership!
						</div>
					</h2>
					<p className={`${styles.paragraphDark} max-w-[300px]`}>
						AI technology has revolutionized the creative space, but
						some artists still view it as a taboo. Fear not, because
						ComicPal is not here to replace your creative vision.
						Instead, think of it as a virtual assistant to elevate
						your artistry to new heights. With just the right amount
						of AI assistance, ComicPal is here to help unleash your
						creativity and enhance your productivity!
					</p>

					<div className="w-[300px]">
						<SecondaryButton
							styles="mt-6 mb-10 text-lightGreen outline outline-2 outline-offset-2 outline-lightGreen hover:text-secondary hover:scale-105"
							text="Learn More"
							onClick={() => navigate("/about")}
						/>
					</div>
				</div>
			</section>
			<div>
				<img
					src={overviewImg2}
					alt="overview img 2"
					className="w-[100%] h-[100%] relative z-[5] object-cover"
				/>
			</div>
		</div>
	);
}

export default Info;
