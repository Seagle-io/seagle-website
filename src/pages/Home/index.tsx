import { useTranslation } from "react-i18next"
import FlowFieldParticles from '@/components/FlowFieldParticles.js'
import DeapSeaLight from "@/components/DeapSeaLight"

const Home = () => {
	const { t } = useTranslation()

	return <>
		<FlowFieldParticles fullscreen />
		<DeapSeaLight/>
		<div className="section flex w-11/12">
			<div className="flex flex-col w-11/12 py-8 items-center text-center shadow-sm">
				<h1 className="text-4xl">
					<span className="text-rotate text-(--seagle-color)">
						<span className="justify-items-center">
							<span>L'exigence</span>
							<span>La qualité</span>
							<span>La simplicité</span>
							<span>La rigueur</span>
							<span>L'assurance</span>
							<span>La fiabilité</span>
							<span>La sécurité</span>
						</span>
					</span>
					&nbsp;&nbsp;au service de votre métier</h1>
				<p className="">Seagle met l’IA au service de votre entreprise, en créant des outils internes fiables et adaptés à vos usages. Nous intervenons également sur vos projets web et leur gestion avec méthode et précision.</p>
			</div>
		</div>
	</>
}

export default Home
