import React, {HTMLAttributes} from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement>{
}

function Container({className, ...props}: IProps) {
  return (
    <div data-testid="container" className={`w-full max-w-[2480px] mx-auto p-5 ${className}`} {...props}/>
  );
}

export default Container;
