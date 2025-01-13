/*
    PostgreSQL commands to setup the schema for the database.

	Must run commands in the order they are shown below from top to bottom to
	avoid dependancy issues.
*/

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	about TEXT NOT NULL
);

CREATE TABLE user_authentications (
	user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL
);

CREATE TABLE books (
	isbn CHAR(13) PRIMARY KEY,
	author VARCHAR(50) NOT NULL,
	title VARCHAR(50) NOT NULL
);

CREATE TABLE user_books (
	id SERIAL PRIMARY KEY,
	user_rating SMALLINT NOT NULL,
	post_date BIGINT NOT NULL,
	isbn CHAR(13) REFERENCES books(isbn) NOT NULL,
	user_id INTEGER REFERENCES users(id) NOT NULL,
	UNIQUE (isbn, user_id)
);

CREATE TABLE user_book_notes (
	user_book_id INTEGER REFERENCES user_books(id) NOT NULL,
	note TEXT NOT NULL,
	UNIQUE(user_book_id, note)
);