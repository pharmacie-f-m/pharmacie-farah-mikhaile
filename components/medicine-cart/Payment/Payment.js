import {
  PaymentForm,
  PaymentHeading,
  PaymentTitle,
  MethodDescription,
  MethodWrapper,
  MethodPills,
  PaymentInputWrapper,
  FormGroup,
  Label,
  FormInput,
  SummaryWrapper,
  SummaryHeading,
  CostdescriptionWrapper,
  CostText,
  Amount,
  BizumWrapper,
  BizumDescription,
  AccountWrapper,
  HeadingWrapper,
  AccountHeading,
  AccountDetails,
  Name,
  Phone,
  ButtonWrapper,
  Line,
  UploadWrapper,
  UploadDescripton,
  UploadButton,
  UploadButtonWrapper,
  UploadButtonLabel,
} from './Payment-Style'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { Button } from '@/ksh-components'
import { changeMyanNum } from '@/ksh-helpers'
import { CartStates } from '@/ksh-contexts/Cart-Context'
import { ImSpinner9 } from 'react-icons/im'
import styled from 'styled-components'

const LoadingSpinner = styled(ImSpinner9)`
  margin-left: 0.5em;
  transform: translateY(0.15em) rotate(0deg);
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: translateY(0.15em) rotate(0deg);
    }
    to {
      transform: translateY(0.15em) rotate(360deg);
    }
  }
`

export default function Payment({ prePage, orderFormData, setOrderFormData, medicineToBuy }) {
  const { name, phone, address, delivery_method, payment_method } = orderFormData
  const [base64BizumImage, setBase64BizumImage] = useState(null)
  const [_, setCartVisible] = useContext(CartStates).visibility
  const { setShowOrderSuccessPopup, dispatch } = useContext(CartStates)
  const [orderOnTheProcess, setOrderOnTheProcess] = useState(false)

  useEffect(() => {
    if (payment_method === 'Pay in Cash') {
      setBase64BizumImage(null)
    }
  }, [payment_method])

  const handleOrderFormDataChange = e => {
    const { name, value } = e.target
    setOrderFormData(data => {
      return { ...data, [name]: value }
    })
  }

  const generateAndSetBase64BizumImage = image => {
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onloadend = () => {
      setBase64BizumImage(reader.result)
    }
  }

  const FilterEmptyProduct = medicineToBuy.filter(med => med.quantity !== 0)
  //items total price
  const totalPrice = FilterEmptyProduct.reduce((acc, med) => {
    return acc + med.price
  }, 0)
  //with home delivery
  const GrandTotal = totalPrice + 1500

  const sendOrder = async e => {
    e.preventDefault()
    setOrderOnTheProcess(true)
    const orderData = {
      ...orderFormData,
      medicines: FilterEmptyProduct,
      Bizum_screenshot: base64BizumImage,
    }

    const resp = await fetch('/api/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    const order = await resp.json()
    if (order.message.accepted) {
      console.log('Order accepted!')
      //requested to Strapi to substract the purchased quantity
      fetch('/api/updateMedicinesAmount', {
        method: 'PUT',
        body: JSON.stringify(medicineToBuy),
      })
        .then(resp => resp.json())
        .then(data => {
          setOrderOnTheProcess(false)
          dispatch({ type: 'CLEAR_CART' })
          setCartVisible(false)
          setShowOrderSuccessPopup(true)
        })
    }
  }

  return (
    <>
      <PaymentForm onSubmit={sendOrder}>
        <PaymentHeading>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            onClick={prePage}>
            <path
              d='M19.0005 11H7.83047L12.7105 6.11997C13.1005 5.72997 13.1005 5.08997 12.7105 4.69997C12.3205 4.30997 11.6905 4.30997 11.3005 4.69997L4.71047 11.29C4.32047 11.68 4.32047 12.31 4.71047 12.7L11.3005 19.29C11.6905 19.68 12.3205 19.68 12.7105 19.29C13.1005 18.9 13.1005 18.27 12.7105 17.88L7.83047 13H19.0005C19.5505 13 20.0005 12.55 20.0005 12C20.0005 11.45 19.5505 11 19.0005 11Z'
              fill='white'
            />
          </svg>
          <PaymentTitle>Place an Order</PaymentTitle>
        </PaymentHeading>

        <MethodDescription>Do you want to buy it? Can I have it delivered to my home?</MethodDescription>
        <MethodWrapper>
          <MethodPills>
            <input
              type='radio'
              name='delivery_method'
              id='Take it to store'
              value='Take it to store'
              checked={delivery_method === 'Take it to store'}
              onChange={handleOrderFormDataChange}
            />
            <label htmlFor='Take it to store'>Take it to store</label>
          </MethodPills>
          <MethodPills>
            <input
              type='radio'
              name='delivery_method'
              id='Home delivery'
              value='Home delivery'
              checked={delivery_method === 'Home delivery'}
              onChange={handleOrderFormDataChange}
            />
            <label htmlFor='Home delivery'>Home delivery</label>
          </MethodPills>
        </MethodWrapper>

        <PaymentInputWrapper>
          <FormGroup>
            <Label htmlFor='name'>First Name</Label>
            <FormInput type='text' name='name' id='name' value={name} onChange={handleOrderFormDataChange} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='phone'>Phone Number</Label>
            <FormInput
              type='text'
              name='phone'
              id='phone'
              value={phone}
              onChange={handleOrderFormDataChange}
              pattern='^0(9|4)\d{9}$'
              required
              title='Please enter your 11 digit phone number starting with 09'
            />
          </FormGroup>
          {orderFormData.delivery_method === 'Home delivery' ? (
            <FormGroup>
              <Label htmlFor='address'>Home address</Label>
              <FormInput
                type='text'
                name='address'
                id='address'
                value={address}
                onChange={handleOrderFormDataChange}
                required
              />
            </FormGroup>
          ) : (
            ''
          )}
        </PaymentInputWrapper>

        <SummaryWrapper>
          <SummaryHeading>Cost</SummaryHeading>
          {orderFormData.delivery_method === 'Home delivery' ? (
            <CostdescriptionWrapper>
              <CostText>Home delivery fee</CostText>
              <Amount>5</Amount>
            </CostdescriptionWrapper>
          ) : (
            ''
          )}

          <CostdescriptionWrapper>
            <CostText>Total cost</CostText>
            <Amount>
              {orderFormData.delivery_method === 'Home delivery'
                ? changeMyanNum(GrandTotal)
                : changeMyanNum(totalPrice)}
            </Amount>
          </CostdescriptionWrapper>
        </SummaryWrapper>

        <SummaryWrapper>
          <SummaryHeading>How will you pay?</SummaryHeading>
        </SummaryWrapper>
        <MethodWrapper>
          <MethodPills>
            <input
              type='radio'
              name='payment_method'
              id='With interest'
              value='With interest'
              checked={payment_method === 'With interest'}
              onChange={handleOrderFormDataChange}
            />
            <label htmlFor='With interest'>With interest</label>
          </MethodPills>
          <MethodPills>
            <input
              type='radio'
              name='payment_method'
              id='Bizum'
              value='Bizum'
              checked={payment_method === 'Bizum'}
              onChange={handleOrderFormDataChange}
            />
            <label htmlFor='Bizum'>Bizum</label>
          </MethodPills>
        </MethodWrapper>

        {orderFormData.payment_method === 'Bizum' ? (
          <BizumWrapper>
            <BizumDescription>Bizum to this account</BizumDescription>
            <AccountWrapper>
              <HeadingWrapper>
                <AccountHeading>Account name</AccountHeading>
                <AccountHeading>Phone number</AccountHeading>
              </HeadingWrapper>
              <Line></Line>
              <AccountDetails>
                <Name>Pharmacie</Name> <Phone>1234567</Phone>
                <Name>Pharmacie</Name> <Phone>123456789</Phone>
              </AccountDetails>
            </AccountWrapper>

            <UploadWrapper>
              <UploadDescripton>Upload Transfer Receipt</UploadDescripton>
              <UploadButtonWrapper>
                {base64BizumImage && (
                  <span>
                    <Image src={base64BizumImage} alt='Bizum-screenshot' layout='fill' />
                  </span>
                )}
                <UploadButtonLabel htmlFor='Screenshot' active={Boolean(base64BizumImage)}>
                  ပုံတင်မယ်
                </UploadButtonLabel>
                <UploadButton
                  type='file'
                  id='Screenshot'
                  name='payment_screenshot'
                  onChange={e => {
                    generateAndSetBase64BizumImage(e.target.files[0])
                  }}></UploadButton>
              </UploadButtonWrapper>
            </UploadWrapper>
          </BizumWrapper>
        ) : (
          ''
        )}

        <ButtonWrapper>
          <Button Big>
            {orderOnTheProcess ? (
              <>
                <span>Ordering</span> <LoadingSpinner />
              </>
            ) : (
              'Place order '
            )}
          </Button>
        </ButtonWrapper>
      </PaymentForm>
    </>
  )
}
