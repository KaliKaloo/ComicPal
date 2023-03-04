import React from "react";
import MainLayout from "../../layout/MainLayout";
import styles, { layout } from "../../assets/style";
import { Link } from "react-router-dom";
import about1 from "../../assets/about1.jpg";
import about2 from "../../assets/about2.jpg";

function About() {
	return (
		<MainLayout>
			<div className={`${styles.flexStart}`}>
				<div className={``}>
					<section
						id="howToUse"
						className={`${layout.sectionReverse} py-10 bg-paleYellow`}
					>
						{/* <div className={`${styles.paddingX} ${styles.paddingY}`}> */}
						<div className={`${layout.sectionImgReverse}`}>
							<img
								src={about1}
								alt="billing"
								className="h-full relative object-cover"
							/>
						</div>

						<div className={layout.sectionInfo}>
							<h2
								className={`${styles.heading2} w-[470px] text-secondary`}
							>
								Why AI and comics?
							</h2>
							<p
								className={`${styles.paragraphDark} max-w-[470px] mt-5`}
							>
								In recent times, there has been a growing
								familiarity with the concept of artificial
								intelligence (AI) among the general public.
								However, due to the general public's lack of
								comprehension of how AI works, there is a
								growing fear that AI will soon displace humans
								in various job sectors. This apprehension is
								particularly pronounced in the art community,
								where many artists have publicly expressed their
								opposition to the use of AI in creative
								endeavours. This resistance is not unfounded, as
								some nefarious actors have exploited AI to
								deceive and steal others' works. Regrettably,
								this has resulted in a taboo surrounding any
								discussion of AI, preventing a productive
								dialogue on the subject.
							</p>
						</div>
						{/* </div> */}
					</section>

					<section
						id="howToUse"
						className={`${layout.section} py-10 bg-lightGreen`}
					>
						<div className={layout.sectionInfo}>
							<h2
								className={`${styles.heading2} w-[470px] text-white`}
							>
								The Objective
							</h2>
							<p
								className={`${styles.paragraphDark} max-w-[470px] mt-5 text-dimWhite`}
							>
								As part my final year thesis at the University
								of Bristol, this ComicPal was developed to
								"Explore the Potential of Artificial
								Intelligence in Empowering Comic Creators:
								Enhancing the Creative Process and Promoting
								Innovation". The objective of this study is to
								explore the present and potential future impact
								of AI on creative endeavours, with a particular
								emphasis on comic art and writing. Key questions
								that this research will address include: Does AI
								have a substantial edge over conventional
								methods like image search in creating a
								reference board? Can it enhance creativity,
								efficiency, and diversity?
							</p>
						</div>
						<div className={`${layout.sectionImg}`}>
							<img
								src={about2}
								alt="billing"
								className="h-full relative object-cover"
							/>
						</div>
					</section>

					<section
						id="howToUse"
						className={`${layout.sectionReverse} pt-10 pb-20 bg-paleYellow `}
					>
						<div className={layout.sectionInfo}>
							<h2
								className={`${styles.heading2} w-[470px] text-secondary`}
							>
								Your help!
							</h2>
							<p
								className={`${styles.paragraphDark} max-w-[470px] mt-5`}
							>
								Through users using this tool and their{" "}
								<span className="text-secondary ">
									<Link to="/FeedbackForm">feedback</Link>
								</span>
								, it helps us learn how what does and does not
								make them feel creative. It'll help us fine-tune
								ComicPal to be a tool you want to have in your
								workflow!
							</p>
						</div>
					</section>
				</div>
				{/* </div> */}
			</div>
		</MainLayout>
	);
}

export default About;
