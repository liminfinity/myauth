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

create or replace function delete_old_records() 
returns trigger as $$
begin
	if (SELECT count(*)
		FROM information_schema.columns
		WHERE table_name = TG_RELNAME AND column_name = 'created_at') = 1 
		then execute 
		'delete from ' || TG_RELNAME || ' where created_at < now() - interval ''' || TG_ARGV[0] || '''';
	else raise exception 'created_at field had''t founded';
	end if;
	return NEW;
	exception when others then
		raise notice 'ERROR CODE: %. MESSAGE TEXT: %', SQLSTATE, SQLERRM;
	
end;
$$ language plpgsql;

create or replace trigger delete_old_codes
after insert on recoveryCodes
for each row
execute function delete_old_records('2m');

create or replace trigger delete_old_tokens
after insert on tokens
for each row
execute function delete_old_records('30d');