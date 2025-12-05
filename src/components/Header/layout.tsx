import { ReactNode } from "react"
import Header from "./index"

type LayoutProps = {
	children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
	<div className="bg-base-100 min-h-screen">
		<Header />
		<main className="flex justify-center relative z-10">
			{children}
		</main>
	</div>
)

export default Layout
