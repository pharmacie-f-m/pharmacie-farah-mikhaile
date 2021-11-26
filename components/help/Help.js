import {useEffect, useRef} from 'react'
import { GlobalContainer } from '@/ksh-styles/GlobalStyles'
import React from 'react'
import Image from 'next/image'
import { LeftColumn, Helpwrapper, Menu, Menuheading, Menulist, MenuItem, Content , ContentWrapper, ContentHeading, ImgColumn, Instructions, StepWrapper, StepHeading, Steps, InstructionsWrapper, StickyImg} from './helpStyle'
function Help() {
 
    return (
        <>
        <GlobalContainer>
            <Helpwrapper>
                <LeftColumn>
                <Menu aria-label="Table of contents" >
                    <Menuheading>ဝပ်ဆိုက်ဒ် အသုံးပြုနည်း</Menuheading>
                    <Menulist>
                        <MenuItem><a  href="#content-1" >ဆေးတွေ ဘယ်လိုရှာမလဲ။</a></MenuItem>
                        <MenuItem><a href="#content-2"  >လိုချင်တဲ့ဆေးကုန်နေရင် ဘာလုပ်လို့ရမလဲ။</a></MenuItem>
                        <MenuItem>ဆေးဝယ်စာရင်းကို ဘယ်လိုသုံးမလဲ။</MenuItem>
                        <MenuItem>အော်ဒါဘယ်လိုတင်မလဲ။</MenuItem>
                    </Menulist>
                </Menu>
                </LeftColumn>
                <Content>

                <ContentWrapper id = "content-1" >
                    <ContentHeading id="initial-header" >ဆေးတွေ ဘယ်လိုရှာမလဲ</ContentHeading>
                    <InstructionsWrapper>
                    <ImgColumn>
                    <StickyImg>
                    <Image src = "/temp/phoneImage.png" layout="fill" alt="" ></Image>
                    </StickyImg>
                    </ImgColumn>
                    <Instructions>
                        <StepWrapper>
                            <StepHeading>အဆင့် ၁</StepHeading>
                            <Steps>အဆင့်မြင့်အားဆေး၊ နှာစေးချောင်းဆိုးပျောက်ဆေး၊ ကလေးအားဆေး၊ ဆေးပြား၊ ဓာတ်ဆား၊ အာရုံကြောဆေးများ၊ အရေပြားလိမ်းဆေး၊ ဆီးချိုတိုင်းစက်အစရှိသည်တို့ ကို မှာယူနိုင်ပါတယ်။</Steps>
                        </StepWrapper>
                        <StepWrapper>
                            <StepHeading>အဆင့် ၂</StepHeading>
                            <Steps>အဆင့်မြင့်အားဆေး၊ နှာစေးချောင်းဆိုးပျောက်ဆေး၊ ကလေးအားဆေး၊ ဆေးပြား၊ ဓာတ်ဆား၊ အာရုံကြောဆေးများ၊ အရေပြားလိမ်းဆေး၊ ဆီးချိုတိုင်းစက်အစရှိသည်တို့ ကို မှာယူနိုင်ပါတယ်။</Steps>
                        </StepWrapper>
                        <StepWrapper>
                            <StepHeading>အဆင့် ၃</StepHeading>
                            <Steps>အဆင့်မြင့်အားဆေး၊ နှာစေးချောင်းဆိုးပျောက်ဆေး၊ ကလေးအားဆေး၊ ဆေးပြား၊ ဓာတ်ဆား၊ အာရုံကြောဆေးများ၊ အရေပြားလိမ်းဆေး၊ ဆီးချိုတိုင်းစက်အစရှိသည်တို့ ကို မှာယူနိုင်ပါတယ်။</Steps>
                        </StepWrapper>
                        <StepWrapper>
                            <StepHeading>အဆင့် ၄</StepHeading>
                            <Steps>အဆင့်မြင့်အားဆေး၊ နှာစေးချောင်းဆိုးပျောက်ဆေး၊ ကလေးအားဆေး၊ ဆေးပြား၊ ဓာတ်ဆား၊ အာရုံကြောဆေးများ၊ အရေပြားလိမ်းဆေး၊ ဆီးချိုတိုင်းစက်အစရှိသည်တို့ ကို မှာယူနိုင်ပါတယ်။</Steps>
                        </StepWrapper>
                    </Instructions>
                    </InstructionsWrapper>
                </ContentWrapper>

                <ContentWrapper id = "content-2"  >
                    <ContentHeading id="initial-header" >လိုချင်တဲ့ဆေးကုန်နေရင် ဘာလုပ်လို့ရမလဲ။</ContentHeading>
                    <InstructionsWrapper>
                    <ImgColumn>
                    <StickyImg>
                    <Image src = "/temp/phoneImage.png" layout="fill" alt="" ></Image>
                    </StickyImg>
                    </ImgColumn>
                    <Instructions>
                        <StepWrapper>
                            <StepHeading>အဆင့် ၁</StepHeading>
                            <Steps>အဆင့်မြင့်အားဆေး၊ နှာစေးချောင်းဆိုးပျောက်ဆေး၊ ကလေးအားဆေး၊ ဆေးပြား၊ ဓာတ်ဆား၊ အာရုံကြောဆေးများ၊ အရေပြားလိမ်းဆေး၊ ဆီးချိုတိုင်းစက်အစရှိသည်တို့ ကို မှာယူနိုင်ပါတယ်။</Steps>
                        </StepWrapper>
                        <StepWrapper>
                            <StepHeading>အဆင့် ၂</StepHeading>
                            <Steps>အဆင့်မြင့်အားဆေး၊ နှာစေးချောင်းဆိုးပျောက်ဆေး၊ ကလေးအားဆေး၊ ဆေးပြား၊ ဓာတ်ဆား၊ အာရုံကြောဆေးများ၊ အရေပြားလိမ်းဆေး၊ ဆီးချိုတိုင်းစက်အစရှိသည်တို့ ကို မှာယူနိုင်ပါတယ်။</Steps>
                        </StepWrapper>
                        <StepWrapper>
                            <StepHeading>အဆင့် ၃</StepHeading>
                            <Steps>အဆင့်မြင့်အားဆေး၊ နှာစေးချောင်းဆိုးပျောက်ဆေး၊ ကလေးအားဆေး၊ ဆေးပြား၊ ဓာတ်ဆား၊ အာရုံကြောဆေးများ၊ အရေပြားလိမ်းဆေး၊ ဆီးချိုတိုင်းစက်အစရှိသည်တို့ ကို မှာယူနိုင်ပါတယ်။</Steps>
                        </StepWrapper>
                        <StepWrapper>
                            <StepHeading>အဆင့် ၄</StepHeading>
                            <Steps>အဆင့်မြင့်အားဆေး၊ နှာစေးချောင်းဆိုးပျောက်ဆေး၊ ကလေးအားဆေး၊ ဆေးပြား၊ ဓာတ်ဆား၊ အာရုံကြောဆေးများ၊ အရေပြားလိမ်းဆေး၊ ဆီးချိုတိုင်းစက်အစရှိသည်တို့ ကို မှာယူနိုင်ပါတယ်။</Steps>
                        </StepWrapper>
                    </Instructions>
                    </InstructionsWrapper>
                </ContentWrapper>

                </Content>
            </Helpwrapper>
        </GlobalContainer>
        </>
    )
}

export default Help