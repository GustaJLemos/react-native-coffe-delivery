import { Coffes } from '../types/Coffes';
import { CoffeType } from '../types/CoffeType';
import ExpressoSvg from '../assets/coffes/Expresso.svg'
import AmericanoSvg from '../assets/coffes/Americano.svg'
import ExpressoCremosoSvg from '../assets/coffes/ExpressoCremoso.svg'
import LatteSvg from '../assets/coffes/Latte.svg'
import CafeGeladoSvg from '../assets/coffes/CaféGelado.svg'
import CapuccinoSvg from '../assets/coffes/Capuccino.svg'
import MocaccinoSvg from '../assets/coffes/Mochaccino.svg'
import ChocolateQuenteSvg from '../assets/coffes/ChocolateQuente.svg'
import CubanoSvg from '../assets/coffes/Cubano.svg'
import HavaianoSvg from '../assets/coffes/Havaiano.svg'
import ArabeSvg from '../assets/coffes/Árabe.svg'
import IrlandesSvg from '../assets/coffes/Irlandês.svg'
import { CoffeSize } from '../types/CoffeSize';

type sectionedListProps = {
  title: string;
  data: Coffes[],
}

export const coffeFilterType: CoffeType[] = [
  'tradicionais', 'doces', 'especiais'
]


export const traditionalCoffees: Coffes[] = [
  {
    id: '1',
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    price: '9,90',
    type: 'tradicional',
    image: ExpressoSvg,
  },
  {
    id: '2',
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    price: '9,90',
    type: 'tradicional',
    image: AmericanoSvg,
  },
  {
    id: '3',
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    price: '9,90',
    type: 'tradicional',
    image: ExpressoCremosoSvg,
  },
  {
    id: '4',
    name: 'Latte',
    description: 'Café expresso com o dobro de leite e espuma cremosa',
    price: '9,90',
    type: 'tradicional',
    image: LatteSvg,
  },
  {
    id: '5',
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    price: '9,90',
    type: 'tradicional',
    image: CafeGeladoSvg,
  }
]

export const sweetCoffees: Coffes[] = [
  {
    id: '6',
    name: 'Capuccino',
    description: 'Bebida com canela feita de doses de café, leite e espuma',
    price: '9,90',
    type: 'doce',
    image: CapuccinoSvg,
  },
  {
    id: '7',
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    price: '9,90',
    type: 'doce',
    image: MocaccinoSvg,
  },
  {
    id: '8',
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    price: '9,90',
    type: 'doce',
    image: ChocolateQuenteSvg,
  }
]

export const specialtyCoffees: Coffes[] = [
  {
    id: '9',
    name: 'Cubano',
    description: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    price: '9,90',
    type: 'especial',
    image: CubanoSvg,
  },
  {
    id: '10',
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    price: '9,90',
    type: 'especial',
    image: HavaianoSvg,
  },
  {
    id: '11',
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    price: '9,90',
    type: 'especial',
    image: ArabeSvg,
  },
  {
    id: '12',
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    price: '9,90',
    type: 'especial',
    image: IrlandesSvg,
  }
]

export const principalCoffes: Coffes[] = [
  traditionalCoffees[3],
  sweetCoffees[0],
  specialtyCoffees[0],
]

export const sectionedListCoffes: sectionedListProps[] = [
  {
    title: 'Tradicionais',
    data: traditionalCoffees
  },
  {
    title: 'Doces',
    data: sweetCoffees
  },
  {
    title: 'Especiais',
    data: specialtyCoffees
  }
]

export const coffeSizesOptions: CoffeSize[] = [
  '114ml', '140ml', '227ml'
]
