delete from starting_line_registrations where race_id = $1;

delete from starting_line_races where race_id = $1;
-- select * from starting_line_races where host_id = $2