import React from 'react';

function Education() {
  // Chronological Academic Credentials
  const credentials = [
    { 
      id: 1, 
      institution: 'Thorold Secondary School', 
      credential: 'High School Diploma', 
      years: '2014 - 2018',
      details: 'Completed high school curriculum.'
    },
    { 
      id: 2, 
      institution: 'Centennial College', 
      credential: 'Advanced Diploma in Software Engineering Technology', 
      years: 'Expected Graduation: Dec. 2028',
      details: 'Currently enrolled in a comprehensive program covering software development, web technologies, and software systems design.'
    }
  ];

  // Technical courses completed
  const relevantCourses = [
    'Object-Oriented Programming (Java/C#)',
    'Relational Databases & SQL (MySQL, PostgreSQL)',
    'Advanced Web Architecture (HTML5, CSS3, JavaScript)',
    'Front-End Frameworks (React.js, Express.js)',
    'Mobile Application Development (React Native)',
    'Software Engineering Principles & Agile Methodologies',
  ];

  // Skills metrics tracking or awards
  const academicHighlights = [
    { title: 'Honor Roll Status', desc: 'Maintained strict GPA standards throughout software engineering core classes.' },
    { title: 'Dean\'s List', desc: 'Recognized for outstanding academic performance in the field of software engineering.' }
  ];

  return (
    <div className="container" style={{ padding: '4rem 2rem' }}>
      <h1>Education & Qualifications</h1>
      <p style={{ marginBottom: '3rem', fontSize: '1.15rem', color: '#4b5563' }}>
        A compilation of the computer programming studies I am taking, commendations, and targeted front-end engineering competencies.
      </p>
      
      <div style={{ display: 'grid', gap: '3.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        
        {/* --- Left Column: Deep Timeline View --- */}
        <div style={{ flex: '1.5' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
            Academic History & Credentials
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {credentials.map((edu) => (
              <div 
                key={edu.id} 
                style={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderLeft: '5px solid #eb2525', 
                  padding: '2rem', 
                  borderRadius: '0 12px 12px 0', 
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)' 
                }}
              >
                <span style={{ fontSize: '0.85rem', color: '#3d69aa', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {edu.years}
                </span>
                <h3 style={{ fontSize: '1.4rem', margin: '0.4rem 0 0.6rem 0', color: '#111827' }}>
                  {edu.credential}
                </h3>
                <p style={{ margin: '0 0 1rem 0', color: '#4b5563', fontWeight: '600', fontSize: '1rem' }}>
                  {edu.institution}
                </p>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Right Column: Coursework and Honors Side Panel --- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Sub-Section 1: Relevant Coursework Grid */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
              Core Technical Coursework
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              {relevantCourses.map((course, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    backgroundColor: '#f8fafc', 
                    border: '1px solid #e2e8f0', 
                    padding: '0.85rem 1rem', 
                    borderRadius: '8px', 
                    fontSize: '0.95rem', 
                    color: '#334155',
                    fontWeight: '500' 
                  }}
                >
                  🔹 {course}
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Section 2: Academic Achievements */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
              Distinctions & Commendations
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {academicHighlights.map((highlight, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    padding: '1.25rem', 
                    borderRadius: '10px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                  }}
                >
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#111827' }}>
                    🏆 {highlight.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#6b7280' }}>
                    {highlight.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Education;
