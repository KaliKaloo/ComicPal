const styles = {
	boxWidth: "xl:max-w-[1280px] w-full",
	boxWidth2: "xl:max-w-[1580px] w-full",

	heading2:
		"font-poppins font-semibold xs:text-[30] text-[24px] pt-6 text-darkGreen xs:leading-[36.8px] leading-[56.8px]",
	paragraph:
		"font-poppins font-normal text-dimWhite text-[16px] leading-[28.8px]",
	paragraphDark:
		"font-poppins font-normal text-darkGreen text-[14px] leading-[28.8px]",

	flexCenter: "flex justify-center items-center",
	flexStart: "flex justify-center items-start",

	paddingX: "sm:px-16 px-10",
	paddingY: "sm:pt-16 sm:pb-16 py-6",
	padding: "sm:px-16 px-6 sm:py-12 py-4",

	marginX: "sm:mx-16 mx-6",
	marginY: "sm:my-16 my-6",
};

export const layout = {
	section: `flex md:flex-row flex-col `,
	sectionReverse: `flex md:flex-row flex-col-reverse  `,

	sectionImgReverse: `flex-1 flex ${styles.flexCenter}  mr-0 md:mt-0 mt-10 relative`,
	sectionImg: `flex-1 flex ${styles.flexCenter} ml-0 md:mt-0 mt-10 relative`,

	sectionInfo: `flex-1 flex justify-center items-center  flex-col`,
};

export default styles;
