import React from 'react';

interface IProps {
  score: number
}

function ValueScore({score}: IProps) {
  return (
    <div className="inline-flex gap-1 items-center">
      {[...Array(4)].map((_, idx) => (
        <div key={`vs-${idx}`}
             className={`w-3 h-3 rounded-sm ${idx < score ? "bg-teal-400" : `bg-zinc-300 dark:bg-opacity-40`}`}/>
      ))}
    </div>
  );
}

export default ValueScore;
