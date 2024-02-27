# ViNiInvest

## `users`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id                | integer   | not null, primary key |
| first_name        | string(50)| not null              |
| last_name         | string(50)| not null              |
| username          | string(50)| not null, unique      |
| hashed_password   | string    | not null              |
| email             | string    | not null, unique      |
| profile_image_url | string    | not null              |
| created_at        | date      |                       |
| updated-at        | date      |                       |

## `workspaces`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | string(50)| not null, unique      |
| owner_id    | integer   | not null, foreign key |
| created_at  | date      |                       |
| updated-at  | date      |                       |

* `owner_id` references `users` table

## `channels`
| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name  | string(50)   | not null, unique         |
| owner_id    | integer  | not null, foreign key |
| workspace_id    | integer  | not null, foreign key |
| created_at  | date  | not null              |
| updated-at  | date  | not null              |

* `owner_id` references `users` table
* `workspace_id` references `workspaces` table

## `messages`
| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| is_private  | boolean   | not null              |
| message     | text      | not null              |
| workspace_id| integer   | not null, foreign key |
| sender_id   | integer   | not null, foreign key |
| receiver_id | integer   | not null, foreign key |
| channel_id  | integer   | foreign key           |
| created_at  | date      | not null              |
| updated-at  | date      | not null              |

* `sender_id` references `users` table
* `receiver_id` references `users` table
* `workspace_id` references `workspaces` table
* `channel_id` references `channels` table

## `reactions`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| encoded_text| string    | not null              |
| user_id     | integer   | not null, foreign key |
| message_id  | integer   | not null, foreign key |
| created_at  | date      | not null              |

* `user_id` references `users` table
* `message_id` references `messages` table

## `user_workspaces`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| user_id     | integer   | not null, foreign key |
| workspace_id| integer   | not null, foreign key |
| created_at  | date      | not null              |
| updated-at  | date      | not null              |

* `user_id` references `users` table
* `message_id` references `messages` table
