import Link from 'next/link'
import Image from 'next/image'
import { StyledFooter, Container, GroupWrapper, Group, InfoText, MiniLogo } from './Footer-styles'
import { changeMyanNum } from '@/ksh-helpers'

export default function MinimalFooter() {
  return (
    <StyledFooter>
      <Container>
        <GroupWrapper>
          <Group>
            <Link href='/' passHref>
              <MiniLogo>
                <Image src='/logos/pharmacie-logo.png' layout='fill' alt='pharmacie-logo' />
              </MiniLogo>
            </Link>
          </Group>
          <Group>
            <InfoText small>Copyright/ {changeMyanNum(new Date().getFullYear())} </InfoText>
          </Group>
          <Group>
            <InfoText small>
              Designed & Developed by{' '}
              <a
                href='https://www.linkedin.com/in/farah-abuatiyeh-3b6a911b7/'
                style={{ textDecoration: 'underline' }}
                target='_blank'
                rel='noreferrer'>
                Farah Abuatiyeh
              </a>{' '}
              |{' '}
              <a
                href='https://www.linkedin.com/in/mikhaile-collins/'
                style={{ textDecoration: 'underline' }}
                target='_blank'
                rel='noreferrer'>
                Mikhaile Collins
              </a>{' '}
              |{' '}
              <a
                href='https://www.linkedin.com/pharmacie'
                style={{ textDecoration: 'underline' }}
                target='_blank'
                rel='noreferrer'>
                Pharmacie Linkedin
              </a>
            </InfoText>
          </Group>
        </GroupWrapper>
      </Container>
    </StyledFooter>
  )
}
