import {
	people01,
	people02,
	people03,
	facebook,
	instagram,
	linkedin,
	twitter,
	airbnb,
	binance,
	coinbase,
	dropbox,
	send,
	shield,
	star,
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
		question1: "1. I enjoyed using ComicPal to create a comic",
		question2: "2. It was easy to navigate and use",
		question3: "3. It fit into my creative workflow",
		question4:
			"4. Step-by-step, what is your usual process of creating a comic?",
		question5:
			"5. In comparison to your usual method, using ComicPal make it easier to create a comic?",
		question6: "6. What features did you like?",
		question7: "7. What features did you dislike?",
		question8: "8. What new features would you like to have?",
		question9:
			"9. When generating images, what percentage of realism did you like the most?",
		question10: "10. How creative did ComicPal make you feel?",
		question11: "11. I would use ComicPal again",
		question12: "12. How do you feel about AI in the comic industry?",
		question13: "13. Any additional comments?",
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
				name: "How it Works",
				link: "#",
			},
			{
				name: "Get Started",
				link: "/playground",
			},
			{
				name: "FAQ",
				link: "#",
			},
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
