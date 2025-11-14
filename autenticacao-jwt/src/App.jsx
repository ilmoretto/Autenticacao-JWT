import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import { AuthenticationImage } from "./components/login";

function App() {
	return (
		<MantineProvider>
			<div className="min-h-screen flex ">
				<AuthenticationImage />
			</div>
		</MantineProvider>
	);
}
export default App;
