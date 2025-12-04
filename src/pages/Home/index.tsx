import { useTranslation } from "react-i18next"
import FlowFieldParticles from '@/components/FlowFieldParticles.js'

const Home = () => {
	const { t } = useTranslation()

	return <div className="relative overflow-hidden isolate">
		<div>{t("Home.title")}</div>
		<FlowFieldParticles fullscreen />

	</div>
}

export default Home
