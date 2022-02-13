import React from 'react'

import Slider, {SlideInterface} from './slider'
import SectionTitle from './sectionTitle'

import styles from '../styles/Partners.module.css'

const partners: SlideInterface[] = [
    { name: '', url: '', imgUrl: 'https://cdn-icons-png.flaticon.com/128/6812/6812597.png' },
    { name: '', url: '', imgUrl: 'https://cdn-icons-png.flaticon.com/128/6812/6812599.png' },
    { name: '', url: '', imgUrl: 'https://cdn-icons-png.flaticon.com/128/6812/6812601.png' },
    { name: '', url: '', imgUrl: 'https://cdn-icons-png.flaticon.com/128/6812/6812606.png' },
    { name: '', url: '', imgUrl: 'https://cdn-icons-png.flaticon.com/128/6812/6812608.png' },
    { name: '', url: '', imgUrl: 'https://cdn-icons-png.flaticon.com/128/6812/6812611.png' },
    { name: '', url: '', imgUrl: 'https://cdn-icons-png.flaticon.com/128/6812/6812614.png' },
    { name: '', url: '', imgUrl: 'https://cdn-icons-png.flaticon.com/128/6812/6812617.png' },
    { name: '', url: '', imgUrl: 'https://cdn-icons-png.flaticon.com/128/6812/6812620.png' },
    { name: '', url: '', imgUrl: 'https://cdn-icons-png.flaticon.com/128/6812/6812624.png' },
]

const Partners: React.FC = (data) => (
    <div className={styles.partners} >
        <SectionTitle title="Parceiros" />
        <div className={styles.partnersSlider} >
            <Slider slides={data.data} slidesToShow={3.5} />
        </div>
    </div>
)

export default Partners
