# ViNiInvest User Stories

## Users

### Sign Up

* Unregistered and unauthorized users are able to sign up for the website via a sign-up form.
  * A user accesses the sign-up form by clicking the profile button on the right side of the page, then clicking the sign up button, at which point a modal appears:
    * A user is able to enter their first name, last name, email, username, password, and profile image (optional) on a clearly laid out form.
    * A user will be logged in upon successfully completing the sign-up form
    * The sign-up form's submit button is disabled if the user hasn't entered data for a required field.
    * When a user enters invalid data on the sign-up form, the app will display validation errors in the form, and also repopulate the form with the valid entries. <br />

### Log in

* Registered but unauthorized users may log into the website via a login form.
  * A user accesses the sign-up form by clicking the profile button on the right side of the page, then clicking the Log in button, at which point a modal appears:
    * A user is able to enter their email or username and password on a clearly laid out form. The user also has an option to login as demo user.
    * A user will be logged in upon successful completion of the sign-up form or by clicking 'login as demo user' <br />
    * The sign-up form's submit button is disabled if the user hasn't entered data for a required field.
    * When a user enters invalid data on the log-in form, the form will display validation errors below the field where the error occured.

### Demo User

* As mentioned above, unregistered and unauthorized users can login as a demo user via the link at the bottom of the login form.
* Clicking the link logs the user in as a guest so they can use the site as a standard user.

### Log Out

* Logged-in users can end their session by clicking the user profile button at the top-left side of the page, then by clicking the Log Out button.
  * Once the user has logged out, the page will be redirect to home page.


## Portfolios

### View Portfolio

* The page will be redirect to portfolio page after a user login successfully.
* A user will only has one portfolio.
* If a user doesn't have a portfolio, the page will show a `Create a Portfolio` button.
* If a user has a portfolio, the page will show the portfolio details include name, fake money balance, stock list, transactions history.

### Create Portfolio

* If a user doesn't have a portfolio, he/she can create a new one.
  * Click `Create a Portfolio` botton will open a create a new portfolio form, user can enter portfolio name and fake money amount and click submit to create a new portfolio. After submited successfully, the page will redirect to portfolio page to view its details.

### Update Portfolio

* On the portfolio page, click `Add Money` button to add more money or change your portfolio name.

### Delete Portfolio

* On the portfolio page, click `Sell All` button will sell all the stock in the portfolio

## Stock Details

### View a Selected Stock Details

* User can search a stock by enter a stock name or symbol in the search bar
  * If a stock found, user can click the stock to view its details.
  * A stock details include its price diagram, sell and buy button.

### Purchase Stocks

* On the stock details page, user can select buy or sell options and enter the stock amout to place an order.
* After an order completed, the stock will auto add to user's portfolio.

### Update Stock Order

* After user placed an order, a transaction table regard to the stock will render on the stock details page bottom.
  * If a transaction status is pending, user can cilck the update button to update the amount of stocks they want to purchase.
  * If a transaction status is completed, user can't update it.

### Delete Stock Order

* After user placed an order, a transaction table regard to the stock will render on the stock details page bottom.
  * If a transaction status is pending, user can cilck the cancel button to delete the stock they want to purchase.
  * If a transaction status is completed, user can't delete it.
