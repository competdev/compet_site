import React from 'react'
import Slider, {SlideInterface} from '../Slider'
import styles from './Partners.module.css'

import SectionTitle from '../SectionTitle'

interface PartnersProps {
    data: any;
}

const Partners: React.FC<PartnersProps> = ({ data }) => (
    <div className={styles.partners} >
        <SectionTitle title="Parceiros" />
        <div className={styles.partnersSlider} >
            <Slider slides={data} slidesToShow={3.5} />
        </div>
    </div>
)

export default Partners
