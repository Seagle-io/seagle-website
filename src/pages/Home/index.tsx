import { useTranslation } from "react-i18next"
import FlowFieldParticles from '@/components/FlowFieldParticles.js'

const Home = () => {
	const { t } = useTranslation()

	return <div className="relative min-h-screen">
		<FlowFieldParticles fullscreen />
		<div className="relative z-10">
			<div>{t("Home.title")}</div>
		</div>
	</div>
}

export default Home
