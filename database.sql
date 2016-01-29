DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS digests;
DROP TABLE IF EXISTS user_integrations;
DROP TABLE IF EXISTS group_integrations;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name text not null,
  email text not null UNIQUE,
  created_at timestamp not null default CURRENT_DATE,
  updated_at timestamp
);

CREATE TABLE groups(
  id SERIAL PRIMARY KEY,
  name text not null,
  regex text,
  created_at timestamp not null default CURRENT_DATE,
  updated_at timestamp
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  user_id integer not null,
  group_id integer not null,
  digest_id integer,
  url text,
  description text,
  created_at timestamp not null default CURRENT_DATE,
  updated_at timestamp
);

CREATE TABLE subscriptions(
  id SERIAL PRIMARY KEY,
  user_id integer not null,
  group_id integer not null,
  created_at timestamp not null default CURRENT_DATE,
  updated_at timestamp
);

CREATE TABLE digests(
  id SERIAL PRIMARY KEY,
  group_id integer not null,
  created_at timestamp not null default CURRENT_DATE,
  sent_at timestamp
);

CREATE TABLE user_integrations(
  id SERIAL PRIMARY KEY,
  user_id integer not null,
  key text,
  name text
);

CREATE TABLE group_integrations(
  id SERIAL PRIMARY KEY,
  group_id integer not null,
  key text,
  name text
);

INSERT INTO users VALUES (1, 'Dave Garwacke', 'dave.garwacke@warbyparker.com');
INSERT INTO groups VALUES (1, 'Front End Guild');
INSERT INTO posts VALUES (1, 1, 1, null, 'http://warbyparker.com', 'This site is great');
INSERT INTO subscriptions VALUES (1, 1, 1);
INSERT INTO digests VALUES (1, 1);
INSERT INTO user_integrations VALUES (1, 1, '1661743', 'hipchat');
INSERT INTO user_integrations VALUES (1, 1, '1147567', 'The Weather Channel');
