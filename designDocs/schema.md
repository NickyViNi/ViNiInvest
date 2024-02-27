# ViNiInvest

## `users`

| column name | data type | details                     |
|-------------|-----------|-----------------------------|
| id                | integer   | not null, primary key |
| first_name        | string(50)| not null              |
| last_name         | string(50)| not null              |
| username          | string(50)| not null, unique      |
| hashed_password   | string    | not null              |
| email             | string    | not null, unique      |
| profile_image_url | string    | not null              |
| created_at        | date      |                       |
| updated-at        | date      |                       |


## `portfolios`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | string    |                       |
| user_id     | integer   | not null, foreign key |
| fake_money_balance| float|                      |
| created_at  | date      |                       |
| updated-at  | date      |                       |

* `user_id` references `users` table


## `stocks`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | string    | not null, unique      |
| symbol      | string    | not null, unique      |
| created_at  | date      |                       |
| updated-at  | date      |                       |


## `transactions`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| portfolio_id| integer   | not null, foreign key |
| stock_id    | integer   | not null, foreign key |
| shares      | float     | not null              |
| type        | string    | not null, "sell"/"buy"|
| price_per_unit| float   | not null              |
| created_at  | date      |                       |
| updated-at  | date      |                       |

* `stock_id` references `stocks` table
* `portfolio_id` references `portfolios` table

## `portfolio_stocks`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| stock_id    | integer   | not null, foreign key |
| portfolio_id| integer   | not null, foreign key |
| quantity    | float     | not null              |
| created_at  | date      |                       |
| updated-at  | date      |                       |

* `stock_id` references `stocks` table
* `portfolio_id` references `portfolios` table


## `watchlists`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | string    | not null              |
| user_id     | integer   | not null, foreign key |
| created_at  | date      |                       |
| updated-at  | date      |                       |

* `user_id` references `users` table

## `watchlist_stocks`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| stock_id    | integer   | not null, foreign key |
| watchlist_id| integer   | not null, foreign key |
| created_at  | date      |                       |
| updated-at  | date      |                       |

* `stock_id` references `stocks` table
* `watchlist_id` references `watchlist` table

## `prices`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| stock_id    | integer   | not null, foreign key |
| max_price   | float     | not null              |
| price       | float     | not null              |
| min_price   | float     | not null              |
| created_at  | date      |                       |
| updated-at  | date      |                       |

* `stock_id` references `stocks` table
