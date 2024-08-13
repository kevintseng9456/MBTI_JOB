import React from 'react';

interface PersonalityIconProps {
  path: string;
  color: string;
}

const PersonalityIcon: React.FC<PersonalityIconProps> = ({ path, color }) => {
  return (
    <svg width="120" height="120" viewBox="-60 -80 120 160">
      <path d={path} fill={color} />
    </svg>
  );
};

export default PersonalityIcon;