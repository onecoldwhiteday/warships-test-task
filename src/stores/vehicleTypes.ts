import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, onMounted, ref, type Ref } from 'vue'
import type { VehicleCommonType } from '@/common/interfaces/vehicle-common-type.interface'
import type { LocalizationList } from '@/common'

export const useVehicleTypeStore = defineStore('vehicle-types', () => {
  const vehicleTypes: Ref<{ [key: string]: VehicleCommonType }> = ref({})

  // I use it only to extend response, in real case I will use only data from server or provided localization json
  const vehicleTypeDescriptions: Ref<{ [key: string]: LocalizationList }> = ref({
    Destroyer: {
      en: 'Destroyers are the fastest and most agile type of warship. They are lightly armored and possess excellent handling characteristics. In terms of their weaponry, the torpedo armament they carry packs some serious punch—enough to damage or destroy even the toughest warships. They also have the ability to use smoke screens, allowing them to conceal their movement and any nearby allied ships. Capable of both acting alone or in a group, destroyers are masters of the ambush.',
      ru: 'Эсминцы — самый быстрый и манёвренный класс кораблей. Лёгкая броня обеспечивает отличные ходовые характеристики, а торпедное вооружение — ударную мощь. В бою эсминцы могут использовать дымовые завесы, что позволяет прикрыть собственную атаку или же спрятать союзные корабли. Эсминец успешно действует как в составе эскадры, так и в режиме одиночной охоты. Нападая из засады, он способен сокрушить любого противника.',
      de: 'Zerstörer sind der schnellste und wendigste Schiffstyp. Sie sind leicht gepanzert und haben ausgezeichnete Manövrierbarkeit. Was die Bewaffnung betrifft, haben die Torpedos ordentliche Schlagkraft – genug, um selbst die härtesten Kriegsschiffe zu beschädigen oder zerstören. Sie können außerdem Nebelwände benutzen, in denen sie ihre Bewegungen und verbündete Schiffe in der Nähe verbergen können. Sie können sowohl allein als auch in Gruppen agieren und sind Meister der Hinterhalte.'
    },
    Cruiser: {
      en: 'Cruisers fulfill multiple roles in battle. Their various armament and consumable configurations make them versatile soldiers in naval encounters. Cruisers are notable for their rapid-firing artillery and maneuverability, the latter of which helps them dodge enemy torpedoes and salvos fired from battleships. Their high rate of fire is a trump card when it comes to hunting for destroyers. Many cruisers are also armed with torpedoes, which makes them an even more menacing threat in close-quarters brawls.',
      ru: 'Крейсеры — многоцелевой класс. Разнообразие вооружения и снаряжения делает их наиболее универсальными бойцами в морских сражениях. С одной стороны, крейсеры отличаются скорострельными орудиями, с другой — они достаточно манёвренны, чтобы уходить от огня линкоров и от торпед. Скорострельность является главным преимуществом крейсера в борьбе с эсминцами. Более того, многие крейсеры оснащены торпедами, что делает их ещё более грозными противниками в ближнем бою.',
      de: 'Kreuzer füllen im Gefecht mehrere Rollen aus. Ihre diversen Konfigurationen für Bewaffnung und Verbrauchsmaterial machen sie in Seegefechten vielseitig. Kreuzer zeichnen sich durch ihre schnellfeuernde Artillerie aus sowie durch ihre Manövrierbarkeit, weshalb sie feindlichen Torpedos und Salven von Schlachtschiffen ausweichen können. Ihre hohe Feuerrate ist ein Ass im Ärmel bei der Jagd auf Zerstörer. Viele Kreuzer sind außerdem mit Torpedos bewaffnet, was sie zu einer noch gefährlicheren Bedrohung im Nahkampf macht.'
    },
    Battleship: {
      en: 'Battleships are true heavyweights, capable of both dishing out and taking lots of damage. With massive guns and thick armor, they’re akin to fortresses on the high seas, but suffer from poor speed and maneuverability. The range of their guns makes them capable of supporting their allies from the rear, but they can also be a part of the vanguard and wade into the fray while soaking up damage. Commanders of Japanese battleships will want to hang back and take advantage of their superior range, while German Commanders are best off wading into battle and relying on their ship’s armor and secondary armament.',
      ru: 'Линкоры — настоящие тяжеловесы, элита флота. Мощь их орудий заставляет трепетать любого противника, а толстая броня внушает уверенность и спокойствие, хотя и плохо сказывается на скорости и манёвренности. Эти гиганты способны с одинаковым успехом оставаться в тылу, сокрушая противника грубой силой своей артиллерии, или принимать удар на себя. Первая тактика более характерна для японских линкоров, которые отличаются предельно высокой дальностью стрельбы. Немецкие линкоры, обладающие хорошим бронированием и мощным вспомогательным вооружением, хорошо себя показывают на средней дистанции.',
      de: 'Schlachtschiffe sind echte Schwergewichte, die viel Schaden aufnehmen und austeilen können. Mit ihren riesigen Geschützen und dicker Panzerung sehen sie wie Festungen auf hoher See aus. Sie leiden allerdings unter niedriger Geschwindigkeit und schlechter Manövrierbarkeit. Dank der Reichweite ihrer Geschütze können sie ihre Verbündeten aus den hinteren Reihen unterstützen, aber sie können auch Teil der Vorhut sein und im Getümmel den Schaden aufsaugen. Kapitäne japanischer Schlachtschiffe sollten hinten bleiben und ihre überlegene Reichweite nutzen. Deutsche Kapitäne sollten hingegen in den Nahkampf ziehen und sich auf ihre Panzerung und Sekundärbewaffnung verlassen.'
    },
    AirCarrier: {
      en: "A Carrier's principal weapon is her aircraft squadrons. Your aircraft carrier transports aircraft that are ready to take off at your order from the first moment of battle. Three types of aircraft are at your disposal: attack aircraft, torpedo bombers, and bombers. Attack aircraft carry unguided rockets. These rockets are most efficient against lightly armored targets and are quite precise. Bombers are strike aircraft that carry bombs capable of inflicting heavy damage to armored targets. When controlling torpedo bombers, be sure to take the correct lead before launching your torpedoes!",
      ru: 'Главная сила авианосцев — эскадрильи. На палубе авианосцев вас ждут самолёты, готовые подняться в воздух по вашему приказу. Под вашим управлением находятся три типа самолётов: штурмовики, торпедоносцы и бомбардировщики. Штурмовики вооружены неуправляемыми реактивными снарядами. Такие снаряды очень эффективны против легкобронированных целей. Бомбардировщики — это ударные самолёты, оснащённые бомбами, которые наносят мощный урон по бронированным целям. Управляя торпедоносцами, возьмите правильное упреждение по цели и выпустите торпеды!',
      de: 'Die wichtigste Waffe eines Flugzeugträgers sind seine Flugzeugstaffeln. Euer Flugzeugträger transportiert Flugzeuge, die von Anfang des Gefechts an bereit sind, auf euren Befehl hin abzuheben. Drei Arten von Flugzeugen stehen euch zur Verfügung: Schlachtflugzeuge, Torpedobomber und Bomber. Schlachtflugzeuge verfügen über ungelenkte Raketen. Diese Raketen sind am effizientesten gegen leicht gepanzerte Ziele und recht genau. Bomber sind Angriffsflugzeuge, die mit Bomben schweren Schaden an gepanzerten Zielen anrichten können. Das Abwerfen von Torpedos mit Torpedobombern erfordert einen ausreichenden Vorhalt bei eurem Ziel!'
    }
  })
  const vehicleTypeCoverImgs: Ref<{ [key: string]: string }> = ref({
    Destroyer:
      'https://wows-wowsp-global.gcdn.co/media/ceph-image/b858b744-9472-11ea-ae73-38eaa735f4cc.jpg',
    Cruiser:
      'https://wows-wowsp-global.gcdn.co/media/ceph-image/b918dc90-9472-11ea-8c48-38eaa735f4cc.jpg',
    Battleship:
      'https://wows-wowsp-global.gcdn.co/media/ceph-image/1f5d431a-946e-11ea-941c-38eaa735f4cc.jpg',
    AirCarrier:
      'https://wows-wowsp-global.gcdn.co/media/ceph-image/c2e610ec-81ae-11eb-957a-8cdcd4b147d4.jpg',
    Submarine:
      'https://wows-wowsp-global.gcdn.co/media/ceph-image/7c0029d8-9474-11ea-97a7-38eaa735f4cc.jpg'
  })
  const vehicleTypeNames = computed(() => Object.keys(vehicleTypes.value))
  const isVehicleTypesLoaded: Ref<boolean> = ref(false)

  async function fetchVehicleTypes() {
    try {
      const result = await axios.get(
        'https://vortex.worldofwarships.eu/api/encyclopedia/en/vehicle_types_common/'
      )
      const { data } = result.data
      const extData = Object.assign({}, data)
      Object.keys(extData).forEach((type) => {
        Object.assign(extData[type].localization, {
          description: vehicleTypeDescriptions.value[type]
        })
        Object.assign(extData[type].icons, {
          cover: vehicleTypeCoverImgs.value[type]
        })
      })
      vehicleTypes.value = extData
      isVehicleTypesLoaded.value = true
      console.log('Vehicle types ready!')
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  onMounted(fetchVehicleTypes)

  return {
    vehicleTypes,
    vehicleTypeDescriptions,
    vehicleTypeCoverImgs,
    vehicleTypeNames,
    isVehicleTypesLoaded
  }
})
