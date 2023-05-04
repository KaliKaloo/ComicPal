import {
	linkedin, star
} from "../assetsTemp";

export const navLinks = [
	{ name: "Overview", link: "/" },
	{ name: "Playground", link: "/Playground" },
	{ name: "About", link: "/About" },
	{ name: "Feedback", link: "/FeedbackForm" },
];

export const features = [
	{
		id: "feature-1",
		icon: star,
		title: "Comic Pages",
		content:
			"Give each panel a text prompt to generate reference images. Then drag and drop panels to build a full page. ",
	},
	{
		id: "feature-2",
		icon: star,
		title: "Character Design",
		// content:
		//   "Design a character from scratch. Brainstorm physical features, personalities, background etc, with the help of AI.",
		content: "Design a character from scratch with the help of AI. ",
	},
	{
		id: "feature-3",
		icon: star,
		title: "Story Creation",
		content:
			"Work with our chatbot AI to build an amazing story together from start to finish! You can piece together story points to create a full outline.",
	},
];

export const feedbackQuestions = {
	questions: {
		question1: "1. What is your gender?",
		question2: "2. You are tech-savvy",
		question3: "3. You enjoyed using ComicPal to create a comic book",
		question4:
			"4. ComicPal was easy to navigate and use",
		question5:
			"5. Did ComicPal fit into your creative workflow? Why?",
		question6: "6. What is your usual process of creating a comic?",
		question7: "7. Compared to the normal approach, using ComicPal made the comic creation process faster",
		question8: "8.What features did you like?",
		question9:
			"9.  What features did you dislike?",
		question10: "10. What new features would you like to have?",
		question11: "11. When generating images, what percentage of realism did you like the most?",
		question12: "12. Using ComicPal made me feel creative",
		question13: "13. I would use comic pal again",
		question14: "14. How do you feel about AI in the comic industry?",
		question15: "15. Any additional comments?",


	},
};

export const footerLinks = [
	{
		title: "Useful Links",
		links: [
			{
				name: "About",
				link: "/about",
			},
			{
				name: "Get Started",
				link: "/playground",
			}
		],
	},
	{
		title: "Other",
		links: [
			{
				name: "OpenAI API",
				link: "https://openai.com/api/",
			},
			{
				name: "GitHub",
				link: "https://github.com/KaliKaloo/AI-Tool-For-Comics",
			},
			{
				name: "Thesis",
				link: "#",
			},
		],
	},
	{
		title: "Author",
		links: [
			{
				name: "Pragya Gurung",
				link: "https://www.linkedin.com/in/pragya-gurung/",
			},
			{
				name: "wq19451@bristol.ac.uk",
				link: "mailto:wq19451@bristol.ac.uk",
			},
		],
	},
];

export const socialMedia = [
	{
		id: "social-media-4",
		icon: linkedin,
		link: "https://www.linkedin.com/in/pragya-gurung/",
	},
];
