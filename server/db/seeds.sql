create table starting_line_hosts(
    host_id serial primary key,
    username varchar(50),
    email varchar(50),
    password varchar(300)
);

create table starting_line_registrations(
    registration_id serial primary key,
    user_id integer references starting_line_users(user_id),
    race_id integer references starting_line_races(race_id)
);


create table starting_line_users(
    user_id serial primary key,
    username varchar(50),
    email varchar(50),
    password varchar(300)
);

create table starting_line_races(
    race_id serial primary key,
    name varchar(50),
    date varchar(50),
    location varchar(100),
    distance varchar(50),
    elevation_change varchar(100),
    host_email varchar(50),
    host_phone varchar(50),
    comments varchar(700),
    image text,
    map text,
    host_id integer references starting_line_hosts(host_id),
    host_name varchar(50)
);