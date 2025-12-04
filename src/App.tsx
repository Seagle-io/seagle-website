import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Layout from "./components/Header/layout"

const App = () => <BrowserRouter>
	<Layout>
		<Routes>
			<Route path="/" Component={Home}/>
		</Routes>
	</Layout>
</BrowserRouter>

export default App
