import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../assets/style";

function MainLayout({ footer, children }) {
	return (
		<div className="bg-primaryGreen w-full h-screen overflow-auto ">
			<Navbar />
			<div>{children}</div>
			{footer == "noFooter" ? <></> : <Footer bgColor={"paleYellow"} />}
		</div>
	);
}

export default MainLayout;
