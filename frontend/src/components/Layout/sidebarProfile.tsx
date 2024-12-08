import React from 'react';

interface IProps {
}

function SidebarProfile(props: IProps) {
  return (
    <div className="flex gap-3 p-4 items-center">
      <div>
        <div
          className="h-10 w-10 rounded-lg flex items-center justify-center text-center bg-primary-300 text-primary-900">
          <p>RA</p>
        </div>
      </div>
      <div className="py-1">
        <p className="font-bold leading-none mb-1">Raheem Adebayo</p>
        <p className="small leading-none">adraheemzy@gmail.com</p>
      </div>
    </div>
  );
}

export default SidebarProfile;
