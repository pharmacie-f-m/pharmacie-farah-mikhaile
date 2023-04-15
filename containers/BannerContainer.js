import { Banner } from '@/ksh-components'
function BannerContainer() {
  return (
    <>
      <Banner.Section>
        <Banner.Content>
          <Banner.Title>
            How are you feeling today? {' '}
          </Banner.Title>
          <Banner />
        </Banner.Content>
      </Banner.Section>
    </>
  )
}
export default BannerContainer
