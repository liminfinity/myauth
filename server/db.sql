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
create table recoveryCodes (
	id serial primary key,
	email varchar(40) unique not null,
	recoveryCode varchar(10) not null
)
create or replace function compareWithTemplate(template_search text, username text) 
returns boolean as $$
begin
	return lower(username) like lower(template_search);
end;
$$
language plpgsql;