const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supaUrl = 'https://cyewshaaromzmbbsnszi.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5ZXdzaGFhcm9tem1iYnNuc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyNDY5OTQsImV4cCI6MjAyMzgyMjk5NH0.zruZ3mwscJDj8iPIHSCBPCNbg5QBCCyTKYvNHv_VBbU';

const supabase = supa.createClient(supaUrl, supaAnonKey);
function jsonMsg(res, message) {
  res.json({ message: message });
}
app.get('/api/status', async (req, res) => {
  const { data, error } = await supabase
    .from('status')
    .select();
  res.send(data);
});
app.listen(8080, () => {
  console.log('listening on port 8080');
  console.log('http://localhost:8080/api/status');
});

//Call for /api/seasons
//returns the seasons
app.get('/api/seasons', async (req, res) => {
  const { data, error } = await supabase
    .from('seasons')
    .select();
  if (error) {
    jsonMsg(res, "error reading from the seasons table")
  }
  res.send(data);
});

//Call for /api/circuits
//returns the circuits
app.get('/api/circuits', async (req, res) => {
  const { data, error } = await supabase
    .from('circuits')
    .select();
  if (error) {
    jsonMsg(res, "error reading from the circuits table")
  }
  res.send(data);
});

//Call for /api/circuits/ref
//returns a specified circuit
app.get('/api/circuits/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('circuits')
    .select()
    .eq('circuitRef', req.params.ref);
  if (error) {
    jsonMsg(res, "error reading from the circuits table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your ref as no records match")
  }
  res.send(data);
});

//Call for /api/circuits/season/year
//returns the specified circuits in a given year
app.get('/api/circuits/season/:year', async (req, res) => {
  const { data, error } = await supabase
    .from('circuits')
    .select()
    .eq('season', req.params.year);
  if (error) {
    jsonMsg(res, "error reading from the database")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your year as no records match")
  }
  res.send(data);
});

//Call for /api/constructors
//returns all of the constructors
app.get('/api/constructors', async (req, res) => {
  const { data, error } = await supabase
    .from('constructors')
    .select();
  if (error) {
    jsonMsg(res, "error reading from the constructors table")
  }
  res.send(data);
});

//Call for /api/constructors/ref
//returns a specified constructor
app.get('/api/constructors/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('constructors')
    .select()
    .eq('constructorRef', req.params.ref);
  if (error) {
    jsonMsg(res, "error reading from the constructors table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your ref as no records match")
  }
  res.send(data);
});

//Call for /api/drivers
//returns all of the drivers
app.get('/api/drivers', async (req, res) => {
  const { data, error } = await supabase
    .from('drivers')
    .select();
  if (error) {
    jsonMsg(res, "error reading from the drivers table")
  }
  res.send(data);
});

//Call for /api/drivers/ref
//returns just a specified driver
app.get('/api/drivers/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('drivers')
    .select()
    .eq('driverRef', req.params.ref);
  if (error) {
    jsonMsg(res, "error reading from the drivers table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your ref as no records match")
  }
  res.send(data);
});

//Call for /api/drivers/search/surname
//returns a driver based off the first x letters of their surname
app.get('/api/drivers/search/:beg', async (req, res) => {
  const { data, error } = await supabase
    .from('drivers')
    .select()
    .ilike('surname', req.params.beg + "%")
  if (error) {
    jsonMsg(res, "error reading from the drivers table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your surname as no records match")
  }
  res.send(data);
});

//Call for /api/drivers/race/raceId
//returns the drivers of a specified race
app.get('/api/drivers/race/:raceid', async (req, res) => {
  const { data, error } = await supabase
    .from('driverStanding')
    .select('drivers(*)')
    .eq('raceId', req.params.raceid);
  if (error) {
    jsonMsg(res, "error reading from the driverStanding table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your raceId as no records match")
  }
  res.send(data);
});

//Call for /api/races/raceId
//returns the specified race
app.get('/api/races/:raceName', async (req, res) => {
  const { data, error } = await supabase
    .from('races')
    .select()
    .eq('raceId', req.params.raceName);
  if (error) {
    jsonMsg(res, "error reading from the races table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your race name as no records match")
  }
  res.send(data);
});

//Call for /api/races/seaon/year
//returns the races within a given season
app.get('/api/races/season/:year', async (req, res) => {
  const { data, error } = await supabase
    .from('races')
    .select()
    .eq('year', req.params.year)
    .order('round', { ascending: true });
  if (error) {
    jsonMsg(res, "error reading from the races table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your year as no records match")
  }
  res.send(data);
});

//Call for /api/races/seaon/year/round
//returns a specified race in a season given by a round
app.get('/api/races/seasons/:year/:round', async (req, res) => {
  const { data, error } = await supabase
    .from('races')
    .select()
    .match({ year: req.params.year, round: req.params.round });
  if (error) {
    jsonMsg(res, "error reading from the races table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your year & round as no records match")
  }
  res.send(data);
});

//Call for /api/races/circuits/ref
//returns the races for a given circuit
app.get('/api/races/circuits/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('races')
    .select(`
   year, name, circuits !inner (name, location)
   `)
    .eq('circuits.circuitRef', req.params.ref)
    .order('year', { ascending: true });
  if (error) {
    jsonMsg(res, "error reading from the races table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your ref as no records match")
  }
  res.send(data);
});

//Call for /api/races/circuits/ref/season/start/end
//returns the races for a given circuit between two years
app.get('/api/races/circuits/:ref/season/:first/:last', async (req, res) => {
  const { data, error } = await supabase
    .from('races')
    .select(`*, circuits !inner ()
   `)
    .gte('year', req.params.first)
    .lte('year', req.params.last)
    .eq('circuits.circuitRef', req.params.ref)
    .order('year', { ascending: true });
  if (error) {
    jsonMsg(res, "error reading from the races table")
  }
  if (req.params.last < req.params.first) {
    jsonMsg(res, "Your last year cannot precede your first")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your ref & years as no records match")
  }
  res.send(data);
});

//Call for /api/results/raceId
//returns the results for a specified race
app.get('/api/results/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('results')
    .select(`
   drivers(driverRef, code, forename, surname), races(name, round, year, date), constructors(name, constructorRef, nationality)
   `)
    .eq('raceId', req.params.id)
    .order('grid', { ascending: true });
  if (error) {
    jsonMsg(res, "error reading from the results table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your id as no records match")
  }
  res.send(data);
});

//Call for /api/results/driver/ref
//returns all of the results for a given driver
app.get('/api/results/driver/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('results')
    .select(`
   *, drivers!inner()`)
    .eq('drivers.driverRef', req.params.ref)
  if (error) {
    jsonMsg(res, "error reading from the results table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your ref as no records match")
  }
  res.send(data);
});

//Call for /api/results/driver/ref/seasons/start/end
// returns the results for a given driver between two years
app.get('/api/results/driver/:ref/seasons/:start/:end', async (req, res) => {
  const { data, error } = await supabase
    .from('results')
    .select('drivers!inner(forename,surname), races!inner(name,year), grid')
    .eq('drivers.driverRef', req.params.ref)
    .gte('races.year', req.params.start)
    .lte('races.year', req.params.end)
  if (error) {
    jsonMsg(res, "error reading from the results table")
  }
  if (req.params.last < req.params.first) {
    jsonMsg(res, "Your last year cannot precede your first")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your ref & years as no records match")
  }
  res.send(data);
});

//Call for /api/qualifying/raceId
//returns the qualifying results for a specified race
app.get('/api/qualifying/:raceId/', async (req, res) => {
  const { data, error } = await supabase
    .from('qualifying')
    .select()
    .eq('raceId', req.params.raceId)
    .order('position', { ascending: true });
  if (error) {
    jsonMsg(res, "error reading from the qualifying table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your raceId as no records match")
  }
  res.send(data);
});

//Call for /api/standings/raceId/drivers
//returns the current season driver standings for a specified race
app.get('/api/standings/:raceId/drivers', async (req, res) => {
  const { data, error } = await supabase
    .from('driverStanding')
    .select('drivers!inner(driverRef,code,forename,surname), races!inner(name), position')
    .eq('raceId', req.params.raceId)
    .order('position', { ascending: true });
  if (error) {
    jsonMsg(res, "error reading from the driverStanding table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your raceId as no records match")
  }
  res.send(data);
});

//Call for /api/standings/raceId/cosntructors
//returns the current season constructor standings for a specified race
app.get('/api/standings/:raceId/constructors', async (req, res) => {
  const { data, error } = await supabase
    .from('constructorStandings')
    .select(`
   constructors!inner(name,constructorRef,nationality), races!inner(name), position
   `)
    .eq('raceId', req.params.raceId)
    .order('position', { ascending: true });
  if (error) {
    jsonMsg(res, "error reading from the constructorStandings table")
  }
  if (!data.length) {
    jsonMsg(res, "Please check your raceId as no records match")
  }
  res.send(data);
});