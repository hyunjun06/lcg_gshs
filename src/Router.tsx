import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Frame from "./routes/Frame";
import Schedules from "./routes/Schedules";
import Scoreboard from "./routes/Scoreboard";
import UpdateResult from "./routes/UpdateResult";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Frame />,
				children: [
					{
						path: "",
						element: <Home />,
					},
					{
						path: "scoreboard",
						element: <Scoreboard />,
					},
					{
						path: "schedules",
						element: <Schedules />,
					},
					{
						path: "update_result/:id",
						element: <UpdateResult />,
					}
				],
			},
		],
	},
], {basename: "/lcg_gshs"});

export default router;
