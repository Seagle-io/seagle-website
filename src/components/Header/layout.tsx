import { ReactNode } from "react"
import Header from "./index"

type LayoutProps = {
	children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
	<div className="min-h-screen">
		<Header />
		<main className="relative z-10">
			{children}
		</main>
	</div>
)

export default Layout
