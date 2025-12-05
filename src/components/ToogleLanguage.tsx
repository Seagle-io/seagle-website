import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function ButtonLanguage() {
	const { i18n } = useTranslation()
	const [open, setOpen] = useState(false)

	const normalizedLanguage = i18n.language.startsWith("fr") ? "fr" : "en"

	const setLanguage = (code: string) => {
		if (i18n.language.startsWith(code)) {
			setOpen(false)
			return
		}
		void i18n.changeLanguage(code)
		setOpen(false)
	}

	const toggleLanguage = () => setLanguage(normalizedLanguage === "fr" ? "en" : "fr")

	return <button
		type="button"
		onClick={toggleLanguage}
		className="btn btn-xs btn-neutral"
		aria-pressed={normalizedLanguage === "fr"}
	>
		{normalizedLanguage === "fr" ? "FR" : "EN"}
	</button>
}
