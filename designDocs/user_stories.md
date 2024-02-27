# ViNiInvest User Stories

## Users

### Sign Up

* Unregistered and unauthorized users are able to sign up for the website via a sign-up form.
  * A user accesses the sign-up form by clicking the profile button on the left side of the page, then clicking the sign up button, at which point a modal appears:
    * A user is able to enter their first name, last name, email, username, password, and profile image (optional) on a clearly laid out form.
    * A user will be logged in upon successfully completing the sign-up form
    * The sign-up form's submit button is disabled if the user hasn't entered data for a required field.
    * When a user enters invalid data on the sign-up form, the app will display validation errors in the form, and also repopulate the form with the valid entries. <br />

### Log in

* Registered but unauthorized users may log into the website via a login form.
  * A user accesses the sign-up form by clicking the profile button on the left side of the page, then clicking the Log in button, at which point a modal appears:
    * A user is able to enter their email and password on a clearly laid out form. The user also has an option to login as demo user 1 or demo user 2.
    * A user will be logged in upon successful completion of the sign-up form or by clicking 'login as demo user' <br />
    * The sign-up form's submit button is disabled if the user hasn't entered data for a required field.
    * When a user enters invalid data on the log-in form, the form will display validation errors below the field where the error occured.

### Demo User

* As mentioned above, unregistered and unauthorized users can login as a demo user via the link at the bottom of the login form.
* Clicking the link logs the user in as a guest so they can use the site as a standard user.

### Log Out

* Logged-in users can end their session by clicking the user profile button at the top-left side of the page, then by clicking the Log Out button.
  * Once the user has logged out, the user's portfolios and watchlist are cleared from the UI.
