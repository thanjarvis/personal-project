insert into starting_line_users(
    username, email, password
)values(
    $1, $2, $3
);

select * from starting_line_users
where username = $1