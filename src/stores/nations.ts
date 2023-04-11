import { defineStore } from 'pinia'
import { computed, onMounted, ref, type Ref } from 'vue'
import type { Nation } from '@/common/interfaces/nation.interface'
import axios from 'axios'

export const useNationsStore = defineStore('nations', () => {
  const nations: Ref<{ [key: string]: Nation }> = ref({})
  const nationNames: Ref<string[]> = ref([])
  const activeNationName: Ref<string> = ref('ussr')
  const activeNation: Ref<Nation> = computed(() => {
    return nations.value[activeNationName.value]
  })
  const nationDescriptions = ref({
    ussr: "With over half her massive landmass bordered by water, Russia's navy was (and still is today) divided into four major fleets: the Pacific, Northern, Baltic and Black Sea Fleets; at the height of the Russian Empire, the Imperial Russian Navy was the fourth most powerful fleet in the world after Great Britain, Spain and France. Lagging technological advancement and disastrous wars greatly dented her power, resulting in mixed performance in the years leading up to World War I; the Northern Fleet was created during the War to protect shipping in the Barents Sea, the Black Sea Fleet distinguished herself against the Ottoman Navy, and the Pacific and Baltic Fleets faded into insignificance following the Russo-Japanese War and the Battle of Tsushima in 1905 respectively. The Imperial Russian Navy suffered a near-complete collapse in the Russian Revolution and the resulting Civil War during the closing years of World War I, and was eventually succeeded by the Soviet Union's Red Fleet.",
    japan:
      "As an island nation, the Imperial Japanese Navy (IJN) was consistently the forefront of Japan's military, characterized by advanced development of naval technology, quality shipbuilding and superb seamanship. Japan also readily looked to and accepted foreign input after the opening of their borders, from the rapid assimilation of foreign technology, to the frequent military exchanges with Dutch, French, British and United States navies, with plenty of naval students being sent to their naval academies and many ships (such as the Kongo) initially being purchased or built in their dockyards while Japan perfected her own shipbuilding capabilities",
    usa: 'Ships fielded by the United States Navy (USN) sport great armor (albeit in an all-or-nothing design), main battery guns, and anti-aircraft (AA) capabilities, and are less hindered by stock configurations — many were built later and subsequently underwent fewer, less drastic upgrades (unlike Imperial Japanese Navy (IJN) vessels such as Kongo). Most stock American ships are adequate for their roles, and while fully-upgraded ships perform better, they require little to no change in play style. Early American ship-launched torpedoes do leave a great deal to be desired, but the real strength of USN ships lies in their ability to get into firefights and slug it out, relying on their superior guns and survivability to see them through.',
    germany:
      "Throughout most of European history, Germany's naval prowess had always been eclipsed by its British, French, Dutch and Spanish neighbors. A unified Germany only came into being in the late 19th century, thus it did not play a major role in the European colonial period; while its inherited coastline (largely from the Kingdom of Prussia) was relatively long, Germany's geographical location at the center of the European continent meant that greater preference was given to its army and its navy never went beyond being a coastal defense force.",
    uk: `From the early 18th century until the middle of the 20th century, the Royal Navy of the United Kingdom was the most powerful in the world, defeating the French, Dutch and Spanish navies to establish the British Empire as the dominant world power — the "empire on which the sun never sets" — influencing many aspects of life in numerous countries across the world, even today. Due to this historical prominence, although many other navies have similar designations, only the United Kingdom's is referred to as "The Royal Navy" without further qualification.`,
    france: `"Honor, Homeland, Valor, Discipline." These are still the four tenets that define the Marine Nationale[1] — or "La Royale" — as one of the world's oldest navies. The Marine Nationale was instrumental in establishing the French colonial empire and engaging in near-constant conflicts with their European neighbors, particularly the Royal Navy.`,
    commonwealth: `The "Commonwealth of Nations" was born in the early twentieth century during the waning years of the British Empire. Officially formed in December 1931 via the Statute of Westminster, the original seven member states were the United Kingdom, Australia, Canada, New Zealand, South Africa, Ireland, and Newfoundland. Today, it is made up of 52 sovereign states that span the globe, and currently includes nations that had no previous political or economic ties to the United Kingdom or the British Empire.`,
    italy: `With the fall of the Roman Empire in 476 AD, the Italian peninsula would not be united for over a thousand years until the proclamation of the Kingdom of Italy in 1861. Out of this unification was born the Italian Royal Navy, known as the Regia Marina[1]. Situated in the very center of the Mediterranean, the newly established Regia Marina attempted to claim the Mediterranean Sea as Mare Nostrum (literally "Our Sea"), constantly vying for supremacy against France, The United Kingdom, and Austria-Hungary, keeping the Regia Marina at the forefront of Italian politics`,
    pan_asia: `The Pan-Asia faction does not cover a specific nation, but includes ships from various nations within the Asia-Pacific region. Ships from six navies are currently represented in World of Warships: the People's Republic of China, the Republic of China (Taiwan), the Republic of Korea (South Korea), the Republic of Indonesia, the Kingdom of Thailand, and the Federation of Malaysia. In-game, each ship can fly the individual ensign of their respective navy (as shown below) or the Pan-Asian flag (as shown on the left).`,
    europe: `The Pan-Europe faction does not cover a specific nation, but includes ships from various nations within the European region. Ships from these navies are currently represented in World of Warships: Sweden, Poland, Greece, Turkey, Norway, Yugoslavia, and Austria-Hungary, with the Netherlands now their own country (since Update 0.10.6) In-game, each ship can fly the individual ensign of their respective navy (as shown below) or the Pan-European flag (as shown on the left).`,
    pan_america: `The Pan-American faction does not cover a specific nation, but includes ships from several Central and South American nations. Currently, these South American navies are represented in World of Warships: the Argentine Republic[1], the Federative Republic of the Brazil[2], the Republic of Chile, the Republic of Colombia, the Republic of Peru and the United Mexican States. In the game, each ship can hoist its respective navy's individual ensign (as shown below) or the Pan-American flag (as shown on the left).`,
    netherlands:
      'The colorful beginnings of the first independent Dutch navy are as unique as the empire it would eventually be tasked to protect. Originally a series of private charters defending the interests of the various merchants, trading guilds and local authorities, it would eventually coalesce into a unified fighting force in the Eighty Years’ War, fighting for their independence from Spanish rule.',
    spain: `The Armada Española (Spanish Navy) was the most powerful maritime force in the world from the 16th century to the end of the 18th century. In the early 19th century, with the loss of most of its empire, Spain transitioned to a smaller fleet but maintained a shipbuilding industry which produced important technical innovations.
    The Spanish Navy built and operated one of the first military submarines, made important contributions in the development of the destroyer, and again achieved a first global circumnavigation, this time by an ironclad vessel.`
  })
  const isNationsLoaded: Ref<boolean> = ref(false)

  // Actions
  async function fetchNations() {
    try {
      const result = await axios.get(
        'https://vortex.worldofwarships.eu/api/encyclopedia/en/nations/'
      )
      const { data } = result.data
      data.forEach((nation: Nation) => Object.assign(nations.value, { [nation.name]: nation }))
      nationNames.value = data.map((nation: Nation) => nation.name)
      isNationsLoaded.value = true
      console.log('Nations ready!')
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  onMounted(fetchNations)

  return {
    nationNames,
    nations,
    isNationsLoaded,
    activeNation,
    activeNationName,
    nationDescriptions
  }
})
