import myanmarNumbers from 'myanmar-numbers'

export const changeMyanNum = num => myanmarNumbers(num, 'my')

export const getEmailTemplate = data => {
  const { medicines, name, phone, address, delivery_method, payment_method, Bizum_screenshot } = data
  const totalPrice = medicines.reduce((acc, medicine) => acc + medicine.price, 0)
  const GrandTotal = totalPrice + 1500

  let medicineListHTML = ''
  for (let medicine of medicines) {
    const { image, name, price, quantity, UnitPrice } = medicine
    medicineListHTML += `
    <tr style="height: 24px"></tr>
    <tr>
      <td style="width: 20%">
        <img
          src=${image}
          alt=""
          class="product-image"
        />
      </td>
      <td style="width: 20%">${name}</td>
      <td style="width: 20%">${changeMyanNum(UnitPrice)}</td>
      <td style="width: 20%">${changeMyanNum(quantity)}</td>
      <td style="width: 20%">${changeMyanNum(price)}</td>
    </tr>
          `
  }

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
    <link rel="stylesheet" href="./email-template.css" />
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      body {
        background-color: #f9f9f9;
        padding: 40px;
      }
      @media screen and (max-width: 465px) {
        body {
          padding: 16px;
        }
      }
      h1 {
        color: #5abeae;
        font-size: 24px;
        text-align: center;
      }
      h2 {
        color: #7c91b6;
        font-size: 12px;
        font-weight: normal;
      }
      @media screen and (max-width: 465px) {
        h1 {
          font-size: 20px;
        }
        h2 {
          font-size: 10px;
        }
      }
      p,
      td {
        color: #3a4a67;
        font-size: 12px;
      }
      @media screen and (max-width: 465px) {
        p,
        td {
          font-size: 10px;
        }
      }
      table {
        width: 100%;
      }
      .product-image {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 12px;
      }
      @media screen and (max-width: 465px) {
        .product-image {
          width: 32px;
          height: 32px;
          border-radius: 6px;
        }
      }
      .notice {
        max-width: 240px;
        margin: 24px auto 0 auto;
        text-align: center;
      }
      @media screen and (max-width: 465px) {
        .notice {
          max-width: 200px;
        }
      }
      .Bizum-screenshot {
        max-width: 360px;
        margin: 0 auto;
        border-radius: 4px;
      }
      @media screen and (max-width: 465px) {
        .Bizum-screenshot {
          max-width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <table>
      <tbody>
        <tr>
          <td colspan="3" style="text-align: center">
            <img
              src="/logos/pharmacie-logo.png"
              alt="Pharmacie Logo"
            />
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <h1 style="margin: 40px 0 24px 0">Customer information</h1>
          </td>
        </tr>
        <tr>
          <td style="width: 25%">
            <div style="margin-bottom: 24px">
              <h2 style="margin-bottom: 8px">Customer name</h2>
              <p>${name}</p>
            </div>
          </td>
          <td style="width: 31%">
            <div style="margin-bottom: 24px">
              <h2 style="margin-bottom: 8px">ပThe method that will be provided</h2>
              <p>${delivery_method}</p>
            </div>
          </td>

              <td style='width: 33%'>
                <div style='margin-bottom: 24px'>
                  <h2 style='margin-bottom: 8px'>Address</h2>
                  <p>${delivery_method === 'Home delivery' ? address : '-'}</p>
                </div>
              </td>
          

        </tr>
        <tr>
          <td>
            <div>
              <h2 style="margin-bottom: 8px">Phone number</h2>
              <p>${phone}</p>
            </div>
          </td>
          <td>
            <div>
              <h2 style="margin-bottom: 8px">ငPayment method</h2>
              <p>${payment_method}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <table style="margin-top: 40px">
      <tbody>
        <tr>
          <td colspan="5">
            <h1 style="margin-bottom: 24px">Cost list</h1>
          </td>
        </tr>
        <tr>
          <td style="width: 20%">Medicine picture</td>
          <td style="width: 20%">Medicine to buy</td>
          <td style="width: 20%">Price</td>
          <td style="width: 20%">Amount</td>
          <td style="width: 20%">Charge<br />Euro</td>
        </tr>
        <tr style="height: 16px"></tr>
      </tbody>
    </table>
    <div style="height: 1px; background-color: #b6e2db"></div>
    <table>
      <tbody>
       ${medicineListHTML}
        <tr style="height: 24px"></tr>
      </tbody>
    </table>
    <table align="right" style="width: 60%; border-collapse: collapse">
      <tbody>
        <tr style="height: 32px"></tr>
        <tr>
          <td colspan="2">Shipping fee
          </td>
          <td style="width: 20%">${
            delivery_method === 'Home delivery' ? changeMyanNum(1500) : changeMyanNum(0)
          }</td>
        </tr>
        <tr style="height: 24px"></tr>
        <tr style="border-bottom: 1pt solid #b6e2db">
          <td colspan="2">
            <p style="margin-bottom: 24px">Total drug value</p>
          </td>
          <td style="width: 20%"><p style="margin-bottom: 24px">${changeMyanNum(totalPrice)}</p></td>
        </tr>
        <tr style="height: 16px"></tr>
      </tbody>
    </table>
    <div style="height: 1px; background-color: #b6e2db"></div>
    <table align="right" style="width: 60%; border-collapse: collapse">
      <tbody>
        <tr>
          <td colspan="2" style="font-weight: bold">Total cost</td>
          <td style="width: 20%; font-weight: bold; font-size: 18px; color: #5abeae">${
            delivery_method === 'Home delivery' ? changeMyanNum(GrandTotal) : changeMyanNum(totalPrice)
          }</td>
        </tr>
      </tbody>
    </table>
   
        <table>
          <tbody>
            <tr>
              <td colspan='5'>
                <h1 style='margin-bottom: 24px; margin-top: 40px; text-align: right'>${
                  Bizum_screenshot ? 'The screenshot' : '-'
                }</h1>
              </td>
            </tr>
            <tr>
              <td style='text-align: right'>
               <img src='cid:Bizum_screenshot' alt='' class='Bizum-screenshot' />
              </td>
            </tr>
          </tbody>
        </table>
    
    <table>
      <tbody>
        <tr>
          <td>
            <p class="notice">If there are any errors in the information, you can contact 123456789.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
  `
}
