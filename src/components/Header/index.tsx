import { cva } from "class-variance-authority"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router"

const links = [
	{ key: "navbar.expertise", href: "/expertise" },
	{ key: "navbar.offers", href: "/offres" },
	{ key: "navbar.about", href: "/a-propos" },
	{ key: "navbar.contact", href: "/contact" },
]

const navLink = cva("btn btn-ghost text-sm transition-colors duration-200", {
	variants: {
		active: {
			true: "font-black underline",
			false: "font-medium hover:text-white",
		},
	},
	defaultVariants: {
		active: false,
	},
})

export default function Header(){
	const { t, i18n } = useTranslation()
	const location = useLocation()
	const [open, setOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const normalizedLanguage = i18n.language.startsWith("fr") ? "fr" : "en"

	const currentPath = location?.pathname ?? "/"
	const toggle = () => setOpen(prev => !prev)
	const close = () => setOpen(false)
	const setLanguage = (code: string) => {
		if (i18n.language.startsWith(code)) {
			setOpen(false)
			return
		}
		void i18n.changeLanguage(code)
		setOpen(false)
	}
	const toggleLanguage = () => setLanguage(normalizedLanguage === "fr" ? "en" : "fr")

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 6)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	return (
		<header className={`sticky top-0 z-20 border-b transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur supports-backdrop-filter:bg-black/70" : "border-transparent bg-black/30 backdrop-blur supports-backdrop-filter:bg-black/20"}`}>
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<a href="/" className="flex items-center gap-3" onClick={close}>
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30">
						<img src="/models/favicon.png" alt="Seagle logo" className="h-6 w-6" />
					</div>
					<span className="text-lg font-semibold">Seagle</span>
				</a>

				<nav className={`absolute left-0 right-0 top-[72px] flex flex-col gap-4 bg-black/90 px-6 pb-6 pt-4 transition-all duration-200 lg:static lg:flex lg:flex-row lg:items-center lg:gap-6 lg:bg-transparent lg:p-0 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-100"}`}>
					{links.map(link => (
						<a
							key={link.key}
							href={link.href}
							className={navLink({ active: currentPath === link.href })}
							onClick={close}
						>
							{t(link.key)}
						</a>
					))}
					<div className="flex gap-2 lg:ml-2">
						<button
							type="button"
							onClick={toggleLanguage}
							className="btn btn-xs btn-neutral"
							aria-pressed={normalizedLanguage === "fr"}
						>
							{normalizedLanguage === "fr" ? "FR" : "EN"}
						</button>
					</div>
				</nav>
			</div>
		</header>
	)
}
