import React from "react";
import Image from "next/image";
import {
  ContactWrapper,
  ContactImg,
  ContactContent,
  UpperContent,
  Description,
  ContactTitle,
  LowerContent,
  ContactDetail,
  SocialWrapper,
  SocialIcon,
} from "./Contact-Style";
function contact() {
  return (
    <ContactWrapper>
      <ContactImg>
        <Image
          src="/images/map.png"
          layout="fill"
          alt="Pharmacie-pharmacy"
        />
      </ContactImg>
      <ContactContent>
        <UpperContent>
          <Description>
            Pharmacie - Pharmacy retails and wholesales various drugs
            Available for Purchase
          </Description>
          <ContactTitle>
            If you want to order medicine, please contact the following phone number and address
            You can call if you want to ask anything you want to know
          </ContactTitle>
        </UpperContent>
        <LowerContent>
          <ContactDetail>
            <a href="tel:1234567">1234567</a>၊{" "}
            <a href="tel:123456789">123456789</a>
          </ContactDetail>
          <ContactDetail>info@pharmacie.com</ContactDetail>
          <ContactDetail>
            Paseo De Castellana 259E
          </ContactDetail>
          <SocialWrapper>
            <SocialIcon href="">
              <Image
                src="/icons/facebook.svg"
                width="18"
                height="18"
                alt="facebook-icon"
              />
            </SocialIcon>
            <SocialIcon href="">
              {" "}
              <Image
                src="/icons/viber.svg"
                width="19"
                height="19"
                alt="viber-icon"
              />
            </SocialIcon>
          </SocialWrapper>
        </LowerContent>
      </ContactContent>
    </ContactWrapper>
  );
}

export default contact;
