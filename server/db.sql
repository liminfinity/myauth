create table users (
	userId uuid primary key,
	email text unique not null,
	password text not null,
	username text not null
);

create table userActivations (
	userId uuid not null references users (userId) on delete cascade,
	isActivated bool default false,
	activationId text not null
);
create table tokens (
	userId uuid not null references users (userId) on delete cascade,
	token text not null,
	userAgent text not null
);