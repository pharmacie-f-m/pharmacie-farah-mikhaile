import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  BannerContainer,
  BannerTitle,
  BannerContent,
  DropdownWrapper,
  Dropdown,
  FixedText,
  ClickAble,
  DropdownData,
  Pill,
  PillWrapper,
  ViewAll,
  BannerBackgroundHuman,
  BannerBackgroundBedo,
  BannerBackgroundThoughts,
  BannerBackgroundHumanMobile,
  BannerBackgroundThoughtsMobile,
} from './Banner-Style'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useWindowSize } from 'react-use'
const { bannerpillData } = require('@/ksh-data/bannerpillData.json')

const Banner = () => {
  const [dropdownState, setDropdownState] = useState(false)
  const [dropdownText, setDropdownText] = useState('Pharmacie')

  const HoverHandler = e => {
    setDropdownText(e)
  }

  const clickHandler = e => {
    e.stopPropagation()
    setDropdownState(!dropdownState)
  }
  //close dropdowndata when click on other areas
  useEffect(() => {
    document.addEventListener('click', () => setDropdownState(false))
  }, [])

  useEffect(() => {
    //to throw back to default text of dropdown
    if (dropdownState == false) {
      setDropdownText('Symptoms')
    }
  }, [dropdownState])

  return (
    <>
      <DropdownWrapper>
        <ClickAble onClick={clickHandler}>
          <Dropdown dropdownState={dropdownState}>
            {dropdownText}
            <svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11.8546 0.355353L6.99374 5.0691L2.13289 0.355353C1.6443 -0.118451 0.855034 -0.118451 0.366443 0.355353C-0.122148 0.829157 -0.122148 1.59453 0.366443 2.06834L6.11678 7.64465C6.60537 8.11845 7.39463 8.11845 7.88322 7.64465L13.6336 2.06834C14.1221 1.59453 14.1221 0.829157 13.6336 0.355353C13.145 -0.106302 12.3432 -0.118451 11.8546 0.355353Z'
                fill='#3A4A67'
              />
            </svg>
          </Dropdown>
          <FixedText></FixedText>
        </ClickAble>

        <AnimatePresence>
          {dropdownState && (
            <DropdownData
              onClick={e => e.stopPropagation()}
              dropdownState={dropdownState}
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.86, 0, 0.07, 1],
                },
              }}
              exit={{
                opacity: 0,
                y: 24,
                transition: {
                  duration: 0.8,
                  ease: [0.86, 0, 0.07, 1],
                },
              }}>
              <PillWrapper>
                {bannerpillData.map(pill => (
                  <Link href={pill.path} key={pill.id} passHref>
                    <Pill
                      onMouseEnter={() => {
                        HoverHandler(pill.issues)
                      }}>
                      {pill.issues}
                    </Pill>
                  </Link>
                ))}
              </PillWrapper>
              <Link href='/category/1' passHref>
                <ViewAll>View Drugs</ViewAll>
              </Link>
            </DropdownData>
          )}
        </AnimatePresence>
      </DropdownWrapper>
    </>
  )
}
export default Banner

//Compound component spilittings
Banner.Section = function BannerSection({ children, ...restProps }) {
  const { width } = useWindowSize()
  return (
    <BannerContainer {...restProps}>
      {children}
      {width > 700 ? (
        <>
          <BannerBackgroundHuman>
            <Image
              src='/illustrations/hero-pc-human.svg'
              layout='fill'
              alt='a doctor in pharmacy asking how are you feeling today'
            />
          </BannerBackgroundHuman>
          <BannerBackgroundBedo>
            <Image
              src='/illustrations/hero-pc-bedo.svg'
              layout='fill'
              alt='a doctor in pharmacy asking how are you feeling today'
            />
          </BannerBackgroundBedo>
          <BannerBackgroundThoughts>
            <Image
              src='/illustrations/hero-pc-thoughts.svg'
              layout='fill'
              alt='a doctor in pharmacy asking how are you feeling today'
            />
          </BannerBackgroundThoughts>
        </>
      ) : (
        <BannerBackgroundHumanMobile>
          <Image
            src='/illustrations/hero-mobile-human.svg'
            layout='fill'
            alt='a doctor in pharmacy asking how are you feeling today'
          />
        </BannerBackgroundHumanMobile>
      )}
    </BannerContainer>
  )
}

Banner.Content = function BannerContentWrapper({ children, ...restProps }) {
  return <BannerContent {...restProps}> {children} </BannerContent>
}

Banner.Title = function TheTitle({ children, ...restProps }) {
  return <BannerTitle {...restProps}> {children} </BannerTitle>
}
