insert into starting_line_races(
    name, date, location, distance, elevation_change, host_email, host_phone, comments, map, host_id, image, host_name
)values(
    ${name}, ${date}, ${location}, ${distance}, ${elevationChange}, ${email}, ${phone}, ${comments}, ${map}, ${hostId}, ${img}, ${hostName}
);

select * from starting_line_races where host_id = ${hostId}