import React from 'react'
import Slider from '../Slider'
import styles from './Partners.module.css'

import SectionTitle from '../SectionTitle'

interface PartnersProps {
    data: any;
}

const Partners: React.FC<PartnersProps> = ({ data }) => (
    <section id ="partners" className={styles.partners} >
        <SectionTitle title="Parceiros" />
        <div className={styles.partnersSlider} >
            <Slider slides={data} slidesToShow={3.5} />
        </div>
    </section>
)

export default Partners
