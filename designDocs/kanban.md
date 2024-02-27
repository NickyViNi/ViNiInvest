### Authentication Required

All endpoints that require a current user to be logged in receive a standard authentication response.

- [ ] Authentication middleware responds with error status 401 when
  authentication is not provided


### Authorization Required

All endpoints that require a current user to have the correct role(s) or permission(s) receive a standard authorization response.

- [ ] Authorization middleware responds with error status 403 when
  an authenticated user does not have the correct role(s) or permission(s)

### Sign Up a User (Feature 0)

Creates a new user, logs them in as the current user, and returns the current user's information.

- [ ] New user exists in the database after request
- [ ] Successful response includes newly created `id`, `firstName`, `lastName`, `email`, `username`, and `profile_image_url`
- [ ] Error response with status 500 is given when the specified `email` or `username` already exists
- [ ] Error response with status 400 is given when body validations for the `firstName`, `lastName`, `email`, `username`, or `profile_image_url` are violated


### Log In a User (Feature 0)

Logs in a current user with valid credentials and returns the current user's information.

- [ ] Successful response includes the user's `id`, `firstName`, `lastName`, `email`, `username`, and `profile_image_url`
- [ ] Error response with status 401 is given when invalid credentials are given
- [ ] Error response with status 400 is given when body validations for the `email`, `username`, `firstName`, or `lastName` are violated


### Get the Current User (Feature 0)

Returns the information about the current user that is logged in.

- [ ] An authenticated user is required for a successful response
- [ ] Successful response includes the user's `id`, `firstName`, `lastName`, `email`, `username`, and `profile_image_url`


### Get all the Current User Portfolios (Feature 1)

Return current user's portfolio list

- [ ] An authenticated user is required for a successful response
- [ ] Seed data exists in the database for portfolios to be returned.
- [ ] Successful response includes each current user's portfolio in the database
- [ ] Portfolio data returned includes the `id`, `portfolio_name`, `fake_money_balance`, `user_id`, `email`, `username`, `stock_id`, `stock_name`, `stock_symbol`, `stock_shares`, `price_per_unit`, `created_at`, `updated_at`


### Create a Portfolio (Feature 1)

Creates and returns a new portfolio

- [ ] An authenticated user is required for a successful response
- [ ] New portfolio exists in the database after request
- [ ] Portfolio data returned includes the `id`, `portfolio_name`, `fake_money_balance`, `user_id`, `email`, `username`, `stock_id`, `stock_name`, `stock_symbol`, `stock_shares`, `price_per_unit`, `created_at`, `updated_at`
- [ ] Error response with status 400 is given when body validations for the `portfolio_name` and `fake_money_balance` are violated

### Update a Portfolio (Feature 1)

Updates and returns an existing portfolio

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the portfolio is authorized to update
- [ ] Portfolio record is updated in the database after request
- [ ] Portfolio data returned includes the `id`, `portfolio_name`, `fake_money_balance`, `user_id`, `email`, `username`, `stock_id`, `stock_name`, `stock_symbol`, `stock_shares`, `price_per_unit`, `created_at`, `updated_at`
- [ ] Error response with status 400 is given when body validations for the `portfolio_name` and `fake_money_balance` are violated
- [ ] Error response with status 404 is given when a portfolio does not exist with the provided `id`


### Delete a Portfolio (Feature 1)

Delete an existing portfolio

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the portfolio is authorized to delete
- [ ] Portfolio record is removed from the database after request
- [ ] Success response includes a `message` indicating a successful deletion
- [ ] Error response with status 404 is given when a portfolio does not exist with the provided `id`


### Get Stocks Details (Feature 2)

Returns the details of a stock specified by its id.

- [ ] Successful response includes data only for the specified stock
- [ ] Stock data returned includes the `id`, `name`, `symbol`, `price`
- [ ] Error response with status 404 is given when a stock does not exist with the provided `id`


### Purchase Stocks and Add them to User's Portfolio (Feature 2)

Return the stock purchased order  and add it to specified portfolio

- [ ] An authenticated user is required for a successful response
- [ ] New stock purchased order exists in the database after request
- [ ] Stock purchased order data returned includes the `id`, `portfolio_id`, `portfolio_name`, `user_id`,`username`, `stock_id`, `stock_name`, `stock_symbol`, `shares`, `price_per_unit`,  `transaction_type`, `created_at`, `updated_at`
- [ ] Error response with status 400 is given when body validations for the `transaction_type` and `shares` is violated
- [ ] Error response with status 404 is given when a stock does not exist with the provided `id`
- [ ] Error response with status 404 is given when a portfolio does not exist with the provided `id`


### Update the Amount of Stocks (Feature 2)

Updates and returns an existing stock purchased order

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the order is authorized to update
- [ ] Stock transaction record is updated from an existing order in the database after request
- [ ] Stock order data returned includes the `id`, `portfolio_id`, `portfolio_name`, `user_id`, `username`, `stock_id`, `stock_name`, `stock_symbol`,  `shares`, `price_per_unit`, `transaction_type`, `created_at`, `updated_at`
- [ ] Error response with status 400 is given when body validations for the `transaction_type` and  `shares`are violated
- [ ] Error response with status 404 is given when a stock does not exist with the provided `id`
- [ ] Error response with status 404 is given when a portfolio does not exist with the provided `id`
- [ ] Error response with status 404 is given when a transaction does not exist with the provided `id`


### Delete Stocks from user's  (Feature 2)

Delete stocks from an existing order

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the order is authorized to delete
- [ ] Transaction record is removed from the database after request
- [ ] Success response includes a `message` indicating a successful deletion
- [ ] Error response with status 404 is given when a transaction does not exist with the provided `id`
