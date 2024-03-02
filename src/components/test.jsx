import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState({});
  const apiUsername = 'your_username';
  const apiPassword = 'your_password';

  useEffect(() => {
    //api 1
    const subjectsApiUrl = "";

    axios.get(subjectsApiUrl, {
      auth: {
        username: apiUsername,
        password: apiPassword
      }
    })
      .then(response => {
        const subjectsData = response.data;
        setSubjects(subjectsData);
        //api 2
        const gradesApiUrl = "";

        subjectsData.forEach(subject => {
          const subjectId = subject.id;
          axios.get(`${gradesApiUrl}?subject_id=${subjectId}`, {
            auth: {
              username: apiUsername,
              password: apiPassword
            }
          })
            .then(gradesResponse => {
              const gradesData = gradesResponse.data;

              setGrades(prevGrades => ({
                ...prevGrades,
                [subjectId]: gradesData
              }));
            })
            .catch(error => {
              console.error(`error${subjectId}: ${error.message}`);
            });
        });
      })
      .catch(error => {
        console.error(`Error: ${error.message}`);
      });
  }, [apiUsername, apiPassword]);

  return (
    <div>
      <h2>Subjects</h2>
      <ul>
        {subjects.map(subject => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>

      <h2>Grades</h2>
      <ul>
        {Object.keys(grades).map(subjectId => (
          <li key={subjectId}>
            Subject {subjectId}:
            <ul>
              {grades[subjectId].map(grade => (
                <li key={grade.studentId}>Stud {grade.studentId}: {grade.grade}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
