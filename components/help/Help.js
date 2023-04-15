import { useEffect } from 'react'
import { GlobalContainer } from '@/ksh-styles/GlobalStyles'
import React from 'react'
import Image from 'next/image'
import {
  LeftColumn,
  Helpwrapper,
  Menu,
  Menuheading,
  Menulist,
  MenuItem,
  Content,
  ContentWrapper,
  ContentHeading,
  ImgColumn,
  Instructions,
  StepWrapper,
  StepHeading,
  Steps,
  InstructionsWrapper,
  StickyImg,
} from './helpStyle'
const { HelpData } = require('@/ksh-data/helpData.json')
import parse from 'html-react-parser'

export default function HelpPage() {
  useEffect(() => {
    console.log('component mount')
    const option = {
      rootMargin: '0% 0px -95% 0px',
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id')

        if (entry.intersectionRatio > 0) {
          document.querySelector(`nav li a[href="#${id}"]`).parentElement.style.color = '#5ABEAE'
          console.log(entry)
        } else {
          document.querySelector(`nav li a[href="#${id}"]`).parentElement.style.color = 'unset'
        }
      })
    }, option)

    document.querySelectorAll('.contents').forEach(content => {
      observer.observe(content)
    })
    return () => {
      observer.disconnect(), console.log('component unmount')
    } //componentdie
  }, [])

  return (
    <>
      <GlobalContainer id='Gcontainer'>
        <Helpwrapper>
          <LeftColumn>
            <Menu aria-label='Table of contents'>
              <Menuheading>How to use Website</Menuheading>
              <Menulist>
                {HelpData.map(helpnav => (
                  <MenuItem key={helpnav.id}>
                    <a href={'#' + helpnav.contentId} className='menulink'>
                      {helpnav.heading}
                    </a>
                  </MenuItem>
                ))}
              </Menulist>
            </Menu>
          </LeftColumn>

          <Content>
            {HelpData.map(help => (
              <ContentWrapper id={help.contentId} className='contents' key={help.id}>
                <ContentHeading id='initial-header'>{help.heading}</ContentHeading>
                <InstructionsWrapper>
                  <ImgColumn>
                    <StickyImg>
                      <Image src={help.img} layout='fill' alt=''></Image>
                    </StickyImg>
                  </ImgColumn>
                  <Instructions>
                    {help.instructions.map(instru => (
                      <StepWrapper key={instru.id}>
                        <StepHeading>{instru.step}</StepHeading>
                        <Steps>{parse(instru.text)}</Steps>
                      </StepWrapper>
                    ))}
                  </Instructions>
                </InstructionsWrapper>
              </ContentWrapper>
            ))}
          </Content>
        </Helpwrapper>
      </GlobalContainer>
    </>
  )
}
