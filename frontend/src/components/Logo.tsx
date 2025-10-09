interface LogoProps {
  size?: 'sm' | 'md' | 'lg',
  color?: 'light' | 'dark',
  shadow?: 'light' | 'dark',
}

const Logo = ({ size = 'sm', color = 'light', shadow = 'light' }: LogoProps) => {

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={
        `
          ${size === 'sm'
            ? 'w-12'
            : size === 'md'
              ? 'w-20'
              : 'w-32'
          }
          
          ${color === 'light'
            ? 'fill-emerald-50'
            : 'fill-emerald-700'
          }

          ${shadow === 'light'
            ? 'drop-shadow-md drop-shadow-stone-400'
            : 'drop-shadow-lg drop-shadow-stone-400'
          }
        `
      }
    >
      <rect width="24" height="24" fill="transparent" />
      <path d="M21,16.5a1,1,0,0,1-.53.88l-7.9,4.44a1,1,0,0,1-1.14,0l-7.9-4.44A1,1,0,0,1,3,16.5v-9a1,1,0,0,1,.53-.88l7.9-4.44a1,1,0,0,1,1.14,0l7.9,4.44A1,1,0,0,1,21,7.5v9M12,4.15,5,8.09v7.82l7,3.94,7-3.94V8.09L12,4.15m0,2.08,4.9,2.83L12,11.89,7.1,9.06,12,6.23m5,8.66L13,17.2V13.62l4-2.31v3.58M11,17.2,7,14.89V11.31l4,2.31Z"/>
    </svg>
  )
}

export default Logo