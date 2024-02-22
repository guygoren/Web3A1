const express = require('express'); 
const supa = require('@supabase/supabase-js'); 
const app = express(); 
 
const supaUrl = 'https://cyewshaaromzmbbsnszi.supabase.co'; 
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5ZXdzaGFhcm9tem1iYnNuc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyNDY5OTQsImV4cCI6MjAyMzgyMjk5NH0.zruZ3mwscJDj8iPIHSCBPCNbg5QBCCyTKYvNHv_VBbU'; 
 
const supabase = supa.createClient(supaUrl, supaAnonKey);
app.get('/f1/status', async (req, res) => { 
    const {data, error} = await supabase 
    .from('status') 
    .select(); 
    res.send(data); 
   }); 
app.listen(8080, () => { 
    console.log('listening on port 8080'); 
    console.log('http://localhost:8080/f1/status'); 
   });
//1
   app.get('/f1/seasons', async (req, res) => { 
    const {data, error} = await supabase 
    .from('seasons') 
    .select(); 
    res.send(data); 
   });
//2
app.get('/f1/circuits', async (req, res) => { 
    const {data, error} = await supabase 
    .from('circuits') 
    .select(); 
    res.send(data); 
   });
//3
app.get('/f1/circuits/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('circuits') 
    .select()
    .eq('circuitRef', req.params.ref);
    res.send(data); 
   });
//4
app.get('/f1/circuits/season/:year', async (req, res) => { 
    const {data, error} = await supabase 
    .from('circuits') 
    .select()
    .eq('season', req.params.year);
    res.send(data); 
   });
//5
app.get('/f1/constructors', async (req, res) => { 
    const {data, error} = await supabase 
    .from('constructors') 
    .select(); 
    res.send(data); 
   });
//6
app.get('/f1/constructors/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('constructors') 
    .select()
    .eq('constructorRef', req.params.ref);
    res.send(data); 
   });
//7
app.get('/f1/drivers', async (req, res) => { 
    const {data, error} = await supabase 
    .from('drivers') 
    .select(); 
    res.send(data); 
   });
//8
app.get('/f1/drivers/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('drivers') 
    .select()
    .eq('driverRef', req.params.ref);
    res.send(data); 
   });
//9
app.get('/f1/drivers/search/:beg', async (req, res) => { 
    const {data, error} = await supabase 
    .from('drivers') 
    .select() 
    .ilike('surname', req.params.beg+"%")
    res.send(data); 
   });
//10
app.get('/f1/drivers/race/:raceid', async (req, res) => { 
    const {data, error} = await supabase 
    .from('driverStanding') 
    .select('drivers(*)')
    .eq('raceId', req.params.raceid);
    res.send(data); 
   });
//11
app.get('/f1/races/:raceName', async (req, res) => { 
    const {data, error} = await supabase 
    .from('races') 
    .select()
    .eq('raceId', req.params.raceName);
    res.send(data); 
   });
//12
app.get('/f1/races/season/:year', async (req, res) => { 
   const {data, error} = await supabase 
   .from('races') 
   .select()
   .eq('year', req.params.year)
   .order('round', { ascending: true }); 
   res.send(data); 
  });
//13
app.get('/f1/races/seasons/:year/:round', async (req, res) => { 
   const {data, error} = await supabase 
   .from('races') 
   .select()
   .match({year: req.params.year, round: req.params.round});
   res.send(data); 
  });
//14
app.get('/f1/races/circuits/:ref', async (req, res) => { 
   const {data, error} = await supabase 
   .from('races') 
   .select(`
   year, name, circuits !inner (name, location)
   `)
   .eq('circuits.circuitRef', req.params.ref)
   .order('year', { ascending: true });  
   res.send(data); 
  });
//16
app.get('/f1/races/circuits/:ref/season/:first/:last', async (req, res) => { 
   const {data, error} = await supabase 
   .from('races') 
   .select(`*, circuits !inner ()
   `) 
   .gte('year', req.params.first)
   .lte('year', req.params.last) 
   .eq('circuits.circuitRef', req.params.ref)
   .order('year', { ascending: true }); 
   res.send(data); 
});
//17
app.get('/f1/results/:id', async (req, res) => { 
   const {data, error} = await supabase 
   .from('results') 
   .select(`
   drivers(driverRef, code, forename, surname), races(name, round, year, date), constructors(name, constructorRef, nationality)
   `)
   .eq('raceId', req.params.id)
   .order('grid', { ascending: true });  
   res.send(data); 
  });
//39
app.get('/f1/results/driver/:ref', async (req, res) => { 
   const {data, error} = await supabase 
   .from('results') 
   .select(`
   *, drivers!inner()`)
   .eq('drivers.driverRef', req.params.ref)
   res.send(data); 
  });
//40!!!!!
// app.get('/f1/results/driver/:ref/seasons/:first/:last', async (req, res) => { 
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
app.get('/f1/results/driver/:ref/seasons/:start/:end', async (req, res) => {
    const { data, error } = await supabase
        .from('results')
        .select('drivers!inner(forename,surname), races!inner(name,year), grid')
        .eq('drivers.driverRef', req.params.ref)
        .gte('races.year', req.params.start)
        .lte('races.year', req.params.end)
        res.send(data);
});

//41
app.get('/f1/qualifying/:raceId/', async (req, res) => { 
   const {data, error} = await supabase 
   .from('qualifying') 
   .select()
   .eq('raceId', req.params.raceId)
   .order('position', { ascending: true });
   res.send(data); 
  });
//42 
app.get('/f1/standings/:raceId/drivers', async (req, res) => { 
   const {data, error} = await supabase 
   .from('driverStanding') 
   .select('drivers!inner(driverRef,code,forename,surname), races!inner(name), position')
   .eq('raceId', req.params.raceId)
   .order('position', { ascending: true });
   res.send(data); 
  });
//43
app.get('/f1/standings/:raceId/constructors', async (req, res) => { 
   const {data, error} = await supabase 
   .from('constructorStandings') 
   .select(`
   constructors!inner(name,constructorRef,nationality), races!inner(name), position
   `)
   .eq('raceId', req.params.raceId)
   .order('position', { ascending: true });
   res.send(data); 
  });