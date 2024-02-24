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
    const {data, error} = await supabase 
    .from('status') 
    .select(); 
    res.send(data); 
   }); 
app.listen(8080, () => { 
    console.log('listening on port 8080'); 
    console.log('http://localhost:8080/api/status'); 
   });
//1
   app.get('/api/seasons', async (req, res) => { 
    const {data, error} = await supabase 
    .from('seasons') 
    .select(); 
    if(error){
      jsonMsg(res, "error reading from the seasons table")
    }
    res.send(data); 
   });
//2
app.get('/api/circuits', async (req, res) => { 
    const {data, error} = await supabase 
    .from('circuits') 
    .select(); 
    if(error){
      jsonMsg(res, "error reading from the circuits table")
    }
    res.send(data); 
   });
//3

app.get('/api/circuits/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('circuits') 
    .select()
    .eq('circuitRef', req.params.ref);
    if(error){
      jsonMsg(res, "error reading from the circuits table")
    }
    if(!data.length){
      jsonMsg(res, "Please check your ref as no records match")
    }
    res.send(data); 
   });
//4
app.get('/api/circuits/season/:year', async (req, res) => { 
    const {data, error} = await supabase 
    .from('circuits') 
    .select()
    .eq('season', req.params.year);
    if(error){
      jsonMsg(res, "error reading from the database")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your year as no records match")
    }
    res.send(data); 
   });
//5
app.get('/api/constructors', async (req, res) => { 
    const {data, error} = await supabase 
    .from('constructors') 
    .select(); 
    if(error){
      jsonMsg(res, "error reading from the constructors table")
    }
    res.send(data); 
   });
//6
app.get('/api/constructors/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('constructors') 
    .select()
    .eq('constructorRef', req.params.ref);
    if(error){
      jsonMsg(res, "error reading from the constructors table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your ref as no records match")
    }
    res.send(data); 
   });
//7
app.get('/api/drivers', async (req, res) => { 
    const {data, error} = await supabase 
    .from('drivers') 
    .select(); 
    if(error){
      jsonMsg(res, "error reading from the drivers table")
    }
    res.send(data); 
   });
//8
app.get('/api/drivers/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('drivers') 
    .select()
    .eq('driverRef', req.params.ref);
    if(error){
      jsonMsg(res, "error reading from the drivers table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your ref as no records match")
    }
    res.send(data); 
   });
//9
app.get('/api/drivers/search/:beg', async (req, res) => { 
    const {data, error} = await supabase 
    .from('drivers') 
    .select() 
    .ilike('surname', req.params.beg+"%")
    if(error){
      jsonMsg(res, "error reading from the drivers table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your surname as no records match")
    }
    res.send(data); 
   });
//10
app.get('/api/drivers/race/:raceid', async (req, res) => { 
    const {data, error} = await supabase 
    .from('driverStanding') 
    .select('drivers(*)')
    .eq('raceId', req.params.raceid);
    if(error){
      jsonMsg(res, "error reading from the driverStanding table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your raceId as no records match")
    }
    res.send(data); 
   });
//11
app.get('/api/races/:raceName', async (req, res) => { 
    const {data, error} = await supabase 
    .from('races') 
    .select()
    .eq('raceId', req.params.raceName);
    if(error){
      jsonMsg(res, "error reading from the races table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your race name as no records match")
    }
    res.send(data); 
   });
//12
app.get('/api/races/season/:year', async (req, res) => { 
   const {data, error} = await supabase 
   .from('races') 
   .select()
   .eq('year', req.params.year)
   .order('round', { ascending: true }); 
   if(error){
      jsonMsg(res, "error reading from the races table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your year as no records match")
    }
   res.send(data); 
  });
//13
app.get('/api/races/seasons/:year/:round', async (req, res) => { 
   const {data, error} = await supabase 
   .from('races') 
   .select()
   .match({year: req.params.year, round: req.params.round});
   if(error){
      jsonMsg(res, "error reading from the races table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your year & round as no records match")
    }
   res.send(data); 
  });
//14
app.get('/api/races/circuits/:ref', async (req, res) => { 
   const {data, error} = await supabase 
   .from('races') 
   .select(`
   year, name, circuits !inner (name, location)
   `)
   .eq('circuits.circuitRef', req.params.ref)
   .order('year', { ascending: true });
   if(error){
      jsonMsg(res, "error reading from the races table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your ref as no records match")
    }
   res.send(data); 
  });
//16
app.get('/api/races/circuits/:ref/season/:first/:last', async (req, res) => { 
   const {data, error} = await supabase 
   .from('races') 
   .select(`*, circuits !inner ()
   `) 
   .gte('year', req.params.first)
   .lte('year', req.params.last) 
   .eq('circuits.circuitRef', req.params.ref)
   .order('year', { ascending: true }); 
   if(error){
      jsonMsg(res, "error reading from the races table")
    }
   if(req.params.last<req.params.first){
     jsonMsg(res,"Your last year cannot precede your first") 
   }
    if(!data.length()){
      jsonMsg(res, "Please check your ref & years as no records match")
    }
   res.send(data); 
});
//17
app.get('/api/results/:id', async (req, res) => { 
   const {data, error} = await supabase 
   .from('results') 
   .select(`
   drivers(driverRef, code, forename, surname), races(name, round, year, date), constructors(name, constructorRef, nationality)
   `)
   .eq('raceId', req.params.id)
   .order('grid', { ascending: true });  
   if(error){
      jsonMsg(res, "error reading from the results table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your id as no records match")
    }
   res.send(data); 
  });
//39
app.get('/api/results/driver/:ref', async (req, res) => { 
   const {data, error} = await supabase 
   .from('results') 
   .select(`
   *, drivers!inner()`)
   .eq('drivers.driverRef', req.params.ref)
   if(error){
      jsonMsg(res, "error reading from the results table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your ref as no records match")
    }
   res.send(data); 
  });
//40!!!!!
// app.get('/api/results/driver/:ref/seasons/:first/:last', async (req, res) => { 
//    const {data, error} = await supabase 
//   //  .from('results') 
//   //    .select(`
//   //  *, drivers!inner(), races!inner()
//   //  `) 
//   // .gte('races.year', req.params.first)
//   //  .lte('races.year', req.params.last) 
//   //  .eq('drivers.driverRef', req.params.ref)
//   // .order('races.year', { ascending: true }); 
//    res.send(data); 
// });
app.get('/api/results/driver/:ref/seasons/:start/:end', async (req, res) => {
    const { data, error } = await supabase
        .from('results')
        .select('drivers!inner(forename,surname), races!inner(name,year), grid')
        .eq('drivers.driverRef', req.params.ref)
        .gte('races.year', req.params.start)
        .lte('races.year', req.params.end)
        if(error){
         jsonMsg(res, "error reading from the results table")
       }
      if(req.params.last<req.params.first){
        jsonMsg(res,"Your last year cannot precede your first") 
      }
       if(!data.length()){
         jsonMsg(res, "Please check your ref & years as no records match")
       }
        res.send(data);
});

//41
app.get('/api/qualifying/:raceId/', async (req, res) => { 
   const {data, error} = await supabase 
   .from('qualifying') 
   .select()
   .eq('raceId', req.params.raceId)
   .order('position', { ascending: true });
   if(error){
      jsonMsg(res, "error reading from the qualifying table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your raceId as no records match")
    }
   res.send(data); 
  });
//42 
app.get('/api/standings/:raceId/drivers', async (req, res) => { 
   const {data, error} = await supabase 
   .from('driverStanding') 
   .select('drivers!inner(driverRef,code,forename,surname), races!inner(name), position')
   .eq('raceId', req.params.raceId)
   .order('position', { ascending: true });
   if(error){
      jsonMsg(res, "error reading from the driverStanding table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your raceId as no records match")
    }
   res.send(data); 
  });
//43
app.get('/api/standings/:raceId/constructors', async (req, res) => { 
   const {data, error} = await supabase 
   .from('constructorStandings') 
   .select(`
   constructors!inner(name,constructorRef,nationality), races!inner(name), position
   `)
   .eq('raceId', req.params.raceId)
   .order('position', { ascending: true });
   if(error){
      jsonMsg(res, "error reading from the constructorStandings table")
    }
    if(!data.length()){
      jsonMsg(res, "Please check your raceId as no records match")
    }
   res.send(data); 
  });