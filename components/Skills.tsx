import React from 'react';
import { skills } from '../SkillsData';

const Skills: React.FC = () => {
  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#000', color: '#fff' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Professional Skills</h2>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
        {skills.map((skill, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.1rem' }}>{skill.name}</span>
              <span style={{ opacity: 0.8 }}>{skill.level}%</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#222', height: '6px', borderRadius: '3px' }}>
              <div style={{ width: `${skill.level}%`, backgroundColor: '#fff', height: '100%', borderRadius: '3px', transition: 'width 2s ease-out' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;