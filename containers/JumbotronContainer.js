import Link from 'next/link'
import { Jumbotron, Button } from '@/ksh-components'
import { GlobalContainer } from '@/ksh-styles/GlobalStyles'
const { jumbotronData } = require('@/ksh-data/jumbotronData.json')

export default function JumbotronContainer() {
  return (
    <Jumbotron.Section>
      <GlobalContainer>
        <Jumbotron.Heading>What can you do on Pharmacie website?</Jumbotron.Heading>
        <Jumbotron.Frame>
          {jumbotronData.map(jumbotron => (
            <Jumbotron key={jumbotron.id} data={jumbotron} />
          ))}
          <Link href='/help' passHref>
            <Button>
              <span>How to use</span>
            </Button>
          </Link>
        </Jumbotron.Frame>
      </GlobalContainer>
    </Jumbotron.Section>
  )
}
