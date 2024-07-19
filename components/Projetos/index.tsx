import { Box, Carousel, Heading, TItemComponent, Text } from '@codelife-ui/react';
import { Member, Tutor } from '../../types/types';
import styles from './projetos.module.css';
import { Mail, LinkedIn, GitHub } from "@mui/icons-material"
import Link from 'next/link';
const TutorComponent: TItemComponent<Tutor> = ({ email, id, linkedin, nome, resume, urlImg }) => (
  <div id={id} key={`member-${id}`} className={styles.tutor}>
    <div className={styles.tutorHeader}>
      <img src={urlImg} alt={`image of ${nome}`} />
      <Heading as={"h3"}>{nome}</Heading>
      <div className={styles.tutorFooter}>
        <Link className={`${styles.icon} ${styles.mail}`} href={`mailto:${email}`} about={`send email to ${nome}`}>
          <Mail />
        </Link>
        <Link className={`${styles.icon} ${styles.linkedin}`} href={linkedin}>
          <LinkedIn />
        </Link>
      </div>
    </div>
    {resume ? (
      <div className={styles.tutorContent}>
        <Text>{resume}</Text>
      </div>
    ) : null}
  </div>
)
const MemberComponent: TItemComponent<Member> = ({ id, urlImg, nome, email, github, linkedin, role, statement }) => (
  <Box id={id} key={`member-${id}`} className={styles.member}>
    <div className={styles.memberHeader}>
      <img src={urlImg} alt={`image of ${nome}`} />
      <Heading as={"h3"} className={styles.memberName}>{nome}</Heading>
      <Text>{role}</Text>
    </div>
    <Text className={styles.memberStatement}>{statement}</Text>
    <div className={styles.memberFooter}>
      <a className={`${styles.icon}`} href={`mailto:${email}`} about={`send email to ${nome}`}><Mail /></a>
      <a className={`${styles.icon}`} href={github}><GitHub /></a>
      <a className={`${styles.icon}`} href={linkedin}><LinkedIn /></a>
    </div>
  </Box>
)
export const TutorCarousel = ({ items, key }: { items: Tutor[], key?: string }) => (
  <Carousel<Tutor>
    ItemComponent={TutorComponent}
    items={items}
    resourceName='Tutor'
    variant='primary'
    key={key}
  />
)
export const MemberCarousel = ({ items, key }: { items: Member[], key?: string }) => (
  <Carousel<Member>
    ItemComponent={MemberComponent}
    items={items}
    resourceName='Tutor'
    variant='secondary'
    key={key}
  />
)