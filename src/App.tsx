import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"

const App = () => <BrowserRouter>
	<Routes>
		<Route path="/" Component={Home}/>
	</Routes>
</BrowserRouter>

export default App
