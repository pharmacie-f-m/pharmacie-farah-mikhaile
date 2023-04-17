import Link from 'next/link'
import { Section, Content, Heading } from './CtaSection-styles'
import { GlobalContainer } from '@/ksh-styles/GlobalStyles'
import { Button } from '@/ksh-components'

export default function CtaSection() {
  return (
    <Section>
      <GlobalContainer>
        <Content>
          <Heading>Do you want to View Medicines?</Heading>
          <Link href='/category/1' passHref>
            <Button.White>
              <span>View</span>
            </Button.White>
          </Link>
        </Content>
      </GlobalContainer>
    </Section>
  )
}
