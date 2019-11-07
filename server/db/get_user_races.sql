-- select starting_line_races.race_id, starting_line_races.name, starting_line_races.date, starting_line_races.location, starting_line_races.distance
-- from starting_line_races
-- join starting_line_registrations on starting_line_races.race_id = starting_line_registrations.race_id
-- join starting_line_users on starting_line_registrations.user_id = starting_line_users.user_id
-- where starting_line_users.user_id = $1

select *
from starting_line_races
join starting_line_registrations on starting_line_races.race_id = starting_line_registrations.race_id
join starting_line_users on starting_line_registrations.user_id = starting_line_users.user_id
where starting_line_users.user_id = $1