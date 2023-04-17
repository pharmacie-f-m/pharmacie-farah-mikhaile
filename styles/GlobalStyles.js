import styled from 'styled-components'
import { createGlobalStyle, css } from 'styled-components'


export const GlobalContainer = styled.div`
  
  :root{
    --lightteal: rgb(90, 190, 174);
  }
  
  height: 100%;
  padding: ${({ padding }) => padding || '6.25em 7.81em'};

  @media screen and (max-width: 980px) {
    padding: 3.13em 3.91em;
  }

  @media screen and (max-width: 500px) {
    padding: 3.13em 1.25em;
  }
`

export const GlobalStyles = createGlobalStyle`${css`
  @font-face {
    font-family: 'Bahnschrift';
    font-style: normal;
    font-display: swap;
    src: local('Bahnschrift'), url('/fonts/bahnschrift.TTF') format('TTF');
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.colors.dividerOne};

  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({theme}) => theme.colors.heading};
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  ::selection {
    color: ${({theme}) => theme.colors.heading};
    background-color: ${({theme}) => theme.colors.text};
  }

  html,
  body {
    font-family: Bahnschrift, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
    Droid Sans, Helvetica Neue, sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.01);
  }

  body {
    font-size: 1vw;
    line-height: 1.8;
    color: ${({theme}) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.bodyBg};
  }

  @media screen and (max-width: 1200px) {
    body {
      font-size: 13px;
    }
  }
  @media screen and (min-width: 2000px) {
    body {
      font-size: 18px;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
    -moz-appearance: textfield; /* Firefox */
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({theme}) => theme.colors.heading};
    line-height: 1.6;
  }

  h1 {
    font-size: 3.13em;
  }

  h2 {
    font-size: 2.5em;
  }

  @media screen and (max-width: 500px) {
    h2 {
      font-size: 1.88em;
    }
  }

  h3 {
    font-size: 1.72em;
  }

  @media screen and (max-width: 500px) {
    h3 {
      font-size: 1.41em;
    }
  }

  p {
    font-size: 1.25em;
  }

  a,
  button {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
  }

  img {
    max-width: 100%;
    object-fit: cover;
  }

  .center-image {
    display: block;
    margin: auto;
  }

  .center-text {
    text-align: center;
  }

  .justify-text {
    text-align: justify;
  }

  .flex {
    display: flex;
  }

  #category-slide-link-wrapper {
    padding: 20px;
  }

  .category-slide-link {
    background-color: rgb(198, 255, 243);
    border-radius: 20px;
    padding: 20px;
  }

  #products-nav-div {
    text-align: center;
  }

  #products-nav-div a {
    border-radius: 20px;
    box-shadow: 2px 2px 5px rgb(200, 200, 200);
    color: rgb(90, 190, 174);
    font-family: 'Helvetica', sans-serif;
    font-size: 16px;
    font-weight: 900;
    padding: 20px;
    margin: 20px;
  }

  #products-nav-div a:hover {
    box-shadow: 2px 2px 5px rgb(150, 150, 150);
    cursor: pointer;
    transform: translateY(-5%);
    transition: 0.5s;
  }

  #products-grid {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 50px;
    margin: 50px;
  }

  .products-grid-item {
    padding: 20px;
    text-align: center;
    border-radius: 20px;
    box-shadow: 2px 2px 5px rgb(200, 200, 200);
  }

  .products-grid-item:hover {
    box-shadow: 2px 2px 5px rgb(150, 150, 150);
    cursor: pointer;
    transform: translateY(-5%);
    transition: 0.5s;
  }


  .product-grid-item-image {
    max-height: 80px;
  }

  #product-div {
    width: fit-content;
    margin: 50px;
  }

  #product-flex-left {
    flex: 1;
    flex-basis: 50%;
  }

  #product-flex-right {
    flex: 2;
    flex-basis: 50%;
  }

  .mm-number {
    font-size: 1.2em;
  }

  .slick-dots {
    /* transform: translateY(40px); */
    bottom: -50px;
    display: flex !important;
    justify-content: center;
    align-item: center;
  }

  .slick-dots li {
    background-color: ${({theme}) => theme.colors.testimonial};
    width: 0.8em !important;
    height: 0.8em !important;
    border-radius: 100vh;
    transition: 0.5s all ease-out;
  }

  .slick-dots li.slick-active {
    background-color: ${({theme}) => theme.colors.heading};
    width: 2em !important;
    height: 0.8em !important;
    border-radius: 100vh;
  }

  .slick-dots li button:before {
    content: ''
  }

  .slick-prev::before, .slick-next::before {
    color: ${({theme}) => theme.colors.heading};
  }

  #nprogress .bar {
    background: ${({theme}) => theme.colors.heading};
  !important;
    height: 3px !important;
  }

  #nprogress .peg {
    box-shadow: 0 0 10px ${({theme}) => theme.colors.heading};, 0 0 5 px ${({theme}) =>
          theme.colors.heading};
  !important;
  }
`}  
`
