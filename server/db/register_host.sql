insert into starting_line_hosts(
    username, email, password
)values(
    $1, $2, $3
);

select * from starting_line_hosts
where username = $1