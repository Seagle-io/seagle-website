import i18n from 'i18next'
import { initReactI18next } from "react-i18next"
import fr from './local/fr'
import en from './local/en'

export const defaultNS = "common"

const resources = {
	fr: {
		common: fr,
	},
	en: {
		common: en,
	},
}

void i18n
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "fr",
		lng: "fr",
		defaultNS,
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n
