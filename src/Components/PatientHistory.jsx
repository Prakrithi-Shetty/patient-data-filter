import { Slider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import usePatientData from '../hooks/usePatientData';
import Paper from '@mui/material/Paper';


const PatientHistory = () => {
  const { patientData, ageFilter, setAgeFilter } = usePatientData();

  const handleAgeFilterChange = (event, newValue) => {
    setAgeFilter(newValue);
  };


  const filteredPatientData = patientData.filter((patient) => {
    const age = patient?.age;
    return age >= ageFilter[0] && age <= ageFilter[1];
  });


  return (
    <div style={{ margin: 20 }}>
      <Typography variant="h4" gutterBottom style={{ marginLeft: 20 }}>
        Patient History
      </Typography>


      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'theme.spacing(2)' ,marginLeft:20}}>
        <Typography id="ageFilterLabel" variant="body1" gutterBottom style={{ marginRight: 20 }}>
          Filter by Age:
        </Typography>

        <Slider
          min={0}
          max={100}
          value={ageFilter}
          onChange={handleAgeFilterChange}
          valueLabelDisplay="auto"
          style={{ marginLeft: 'theme.spacing(2)', marginRight: 'theme.spacing(2)', width: 200 }}
          disableSwap
        />

        <Typography variant="body1" style={{ minWidth: 60, marginLeft: 20 }}>
          {ageFilter[0]} - {ageFilter[1]}
        </Typography>
      </div>

      <Paper style={{ padding: 20, margin: 20 }} elevation={2}>

        <Table>
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Gender</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Age</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Postal Code</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatientData.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>
                  {patient.name[0].given[0]} {patient.name[0].family}
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>
                  {patient && patient.address && patient.address.length && patient.address[0].postalCode}
                </TableCell>
                <TableCell>
                  {patient && patient.telecom && patient.telecom.length && patient.telecom[0].value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default PatientHistory;
