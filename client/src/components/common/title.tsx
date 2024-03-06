import React from 'react'
import { DefaultProps } from '../../types/components';

interface TitleProps extends DefaultProps {
  level: number
}

export default function Title({level, children, className}: TitleProps) {
  let component;
    switch (level) {
        case 1: {
            component = <h1 className={className}>{children}</h1>
            break;
        }
        case 2: {
            component = <h2 className={className}>{children}</h2>
            break;
        }
        case 3: {
            component = <h3 className={className}>{children}</h3>
            break;
        }
        case 4: {
            component = <h4 className={className}>{children}</h4>
            break;
        }
        case 5: {
            component = <h5 className={className}>{children}</h5>
            break;
        }
        case 6: {
            component = <h6 className={className}>{children}</h6>
            break;
        }
        default: {
            component = <h2 className={className}>{children}</h2>
            break;
        }
    }
  return component
}
