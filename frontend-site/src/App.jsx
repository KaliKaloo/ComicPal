import React from "react";
import "./assets/normal.css";
import OverviewPage from "./pages/Overview/OverviewPage.jsx";

function App() {
	const [buildId] = useBuildId(); // useSWR under the hood
	const prevBuildId = usePrevious(buildId);
	React.useEffect(() => {
		if (prevBuildId && buildId && prevBuildId !== buildId) {
			Router.reload();
		}
	}, [buildId, prevBuildId]);
	return (
		<div>
			<OverviewPage />
		</div>
	);
}

export default App;
