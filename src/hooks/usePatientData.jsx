import { useState, useEffect } from 'react';
import { API_URL } from '../constants/api.constants'

const usePatientData = () => {
  const [patientData, setPatientData] = useState([]);
  const [ageFilter, setAgeFilter] = useState([0, 100]);

  const fetchPatientData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      // Calculate age for each patient and update the patientData array
      const updatedPatientData = json.entry.map((entry) => {
        const patient = entry?.resource;
        const birthDate =  new Date(patient?.birthDate);
        let age = Math.round((Date.now() - birthDate) / (1000 * 60 * 60 * 24 * 365));
        if(isNaN(age)) {
          age = 0;
        }
        return { ...patient, age };
      });
      
      setPatientData(updatedPatientData);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  return { patientData, ageFilter, setAgeFilter };
};

export default usePatientData;
