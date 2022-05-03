create database cruds;

CREATE USER test WITH PASSWORD 'test123';

grant all privileges on database cruds.* to test;


CREATE TABLE public.users (
  id serial NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  fullname character varying(255) NULL,
  email character varying(255) NULL,
  password character varying(255) NULL,
  updated_at timestamp without time zone NULL DEFAULT now()
);
ALTER TABLE
  public.users
ADD
  CONSTRAINT users_pkey PRIMARY KEY (id);

grant insert,delete,update on users to test;


insert into users (fullname, email, password) values 
  ('Christian Rossi', 'cgrossi70@gmail.com', 'strinidad'),
  ('Norberto Rossi', 'nrossi77@gmail.com', 'strinidad');