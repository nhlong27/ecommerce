import { Button } from '@/components/ui/button';
import helper from '@/constants/helper';
import { getServerSideProps } from '@/pages/auth';
import { InferGetServerSidePropsType } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

export default function SignInWithProviders({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <div className='flex justify-center items-center gap-4'>
      {providers &&
        Object.values(providers).map((provider) => {
          switch (provider.id) {
            case 'google':
              return (
                <div key={provider.name}>
                  <Button
                    variant='default'
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='flex gap-4'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      viewBox='0 0 48 48'
                      width='25'
                      height='25'
                    >
                      <defs>
                        <path
                          id='a'
                          d='M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z'
                        />
                      </defs>
                      <clipPath id='b'>
                        <use xlinkHref='#a' overflow='visible' />
                      </clipPath>
                      <path clipPath='url(#b)' fill='#FBBC05' d='M0 37V11l17 13z' />
                      <path clipPath='url(#b)' fill='#EA4335' d='M0 11l17 13 7-6.1L48 14V0H0z' />
                      <path clipPath='url(#b)' fill='#34A853' d='M0 37l30-23 7.9 1L48 0v48H0z' />
                      <path clipPath='url(#b)' fill='#4285F4' d='M48 48L17 24l-4-3 35-10z' />
                    </svg>
                    <span>Sign in with {provider.name}</span>
                  </Button>
                </div>
              );
            // case 'facebook':
            //   return (
            //     <div key={provider.name}>
            //       <Button
            //         variant='secondary'
            //         onClick={() => signIn(provider.id)}
            //         className='flex gap-4'
            //       >
            //         <svg
            //           xmlns='http://www.w3.org/2000/svg'
            //           viewBox='0 0 48 48'
            //           width='28'
            //           height='28'
            //         >
            //           <linearGradient
            //             id='Ld6sqrtcxMyckEl6xeDdMa'
            //             x1='9.993'
            //             x2='40.615'
            //             y1='9.993'
            //             y2='40.615'
            //             gradientUnits='userSpaceOnUse'
            //           >
            //             <stop offset='0' stopColor='#2aa4f4' />
            //             <stop offset='1' stopColor='#007ad9' />
            //           </linearGradient>
            //           <path
            //             fill='url(#Ld6sqrtcxMyckEl6xeDdMa)'
            //             d='M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z'
            //           />
            //           <path
            //             fill='#fff'
            //             d='M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z'
            //           />
            //         </svg>
            //         <span>{provider.name}</span>
            //       </Button>
            //     </div>
            //   );
            // case 'github':
            //   return (
            //     <div key={provider.name}>
            //       <Button
            //         variant='secondary'
            //         onClick={() => signIn(provider.id)}
            //         className='flex gap-4'
            //       >
            //         <svg
            //           xmlns='http://www.w3.org/2000/svg'
            //           fill='white dark:black'
            //           width='25'
            //           height='25'
            //           viewBox='0 0 24 24'
            //         >
            //           <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            //         </svg>
            //         <span>{provider.name}</span>
            //       </Button>
            //     </div>
            //   );
            default:
              return null;
          }
        })}
    </div>
  );
}
