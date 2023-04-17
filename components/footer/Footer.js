import Link from 'next/link'
import Image from 'next/image'
import { changeMyanNum } from '@/ksh-helpers'
import {
  StyledFooter,
  Container,
  GroupWrapper,
  Group,
  InfoText,
  SocialIconWrapper,
  SocialIcon,
  Divider,
  Logo,
} from './Footer-styles'

export default function Footer() {
  return (
    <StyledFooter>
      <Container>
        <GroupWrapper>
          <Group>
            <InfoText>
              A variety of medicines at Pharmacie
              <br /> Available for retail and wholesale purchase
            </InfoText>
          </Group>
          <Group mt='-0.4em 0 0 0'>
            <InfoText large>
              <a href='tel:1234567'>1234567</a>၊ <a href='tel:123456789'>123456789</a>
            </InfoText>
            <InfoText>Paseo De Castellana 259E</InfoText>
          </Group>
          <Group>
            <InfoText>info@pharmacie.com</InfoText>
            <SocialIconWrapper>
              <SocialIcon href='https://www.facebook.com/pharmacie' target='_blank'>
                <Image src='/icons/facebook.svg' width='18' height='18' alt='facebook-icon' />
              </SocialIcon>
              {/* <SocialIcon href='https://google.com' target='_blank'>
                <Image src='/icons/viber.svg' width='19' height='19' alt='viber-icon' />
              </SocialIcon> */}
            </SocialIconWrapper>
          </Group>
        </GroupWrapper>

        <Divider />

        <GroupWrapper>
          <Group>
            <Link href='/' passHref>
              <Logo>
                <Image src='/logos/pharmacie-logo.png' layout='fill' alt='pharmacie-logo' />
              </Logo>
            </Link>
          </Group>
          <Group>
            <InfoText small>PharmacIE </InfoText>
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
