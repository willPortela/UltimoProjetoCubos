drop table customers, users;

create database cubosbaseteste;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name text not null,
    email text not null unique,
    password text not null,
  	phone varchar(11) unique,
	cpf varchar(11) unique
);

create table statuscustomers(
  	id serial primary key,
  	status text not null
 );
insert into statuscustomers
(status)

values ('Inadimplente'), ('Em Dia');


create table customers(
  	id serial primary key,
    name text not null,
    email text not null unique,
	cpf varchar(11) not null unique,
  	phone varchar(11) ,
	zipcode varchar(8),
	sector text,
  	complement text,
  	street text, 
  	number text,
  	city text,
  	state text,
  	status int not null references statuscustomers(id)
);

create table statusbilling(
  	id serial primary key,
  	description text not null
 );
insert into statusbilling
(description)

values ('Vencida'), ('Pendente'), ('Paga');


create table billing(
    id serial primary key,
  	customers int references customers(id),
  	description text,
  	status int references statusbilling(id),
  	amount float,
  	due date 
  );