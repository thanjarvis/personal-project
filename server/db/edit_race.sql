update starting_line_races
set name=${raceName}, image=${raceImg}, date=${raceDate}, location=${raceLocation}, distance=${raceDistance}, elevation_change=${raceElevationChange}, host_phone=${raceHostPhone}, comments=${raceComments}, map=${raceMap} 
where race_id = ${id};

select * from starting_line_races where race_id = ${id}
