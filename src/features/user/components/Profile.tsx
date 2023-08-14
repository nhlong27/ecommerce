import { Text } from '@/components/common/Text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useGetUserQuery } from '../hooks/useGetUsersQuery';
import { Session } from 'next-auth';
import { Button } from '@/components/ui/button';
import { useUpdateUserMutation } from '../hooks/useUpdateUserMutation';
import { toast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import AlertError from '@/features/catalog/components/AlertError';
import Image from 'next/image';
import helper from '@/constants/helper';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';

const Profile = ({ session }: { session: Session }) => {
  const { data, error } = useGetUserQuery(session.user.email);
  const [name, setName] = React.useState<string>('');
  const [image, setImage] = React.useState<any>(null);
  const [password, setPassword] = React.useState<string>('');
  const [editDisabled, setEditDisabled] = React.useState(true);
  const [shouldPasswordDisplay, setShouldPasswordDisplay] = React.useState(false);

  const updateUserMutation = useUpdateUserMutation();
  const queryClient = useQueryClient();
  const handleUpdate = async () => {
    if (data) {
      if (password !== '') {
        updateUserMutation.mutate(
          {
            email: data.user.email,
            name: name !== '' ? name : data.user.name,
            password: password,
          },
          {
            onSuccess: () => {
              toast({ title: 'User updated successfully' });
              queryClient.invalidateQueries(['user', session.user.email]);
            },
            onError: (error) => {
              console.log(error);
              toast({ title: 'Failed to save changes' });
            },
          },
        );
      } else {
        updateUserMutation.mutate(
          {
            email: data.user.email,
            name: name !== '' ? name : data.user.name,
          },
          {
            onSuccess: () => {
              toast({ title: 'User updated successfully' });
              queryClient.invalidateQueries(['user', session.user.email]);
            },
            onError: (error) => {
              console.log(error);
              toast({ title: 'Failed to save changes' });
            },
          },
        );
      }
      if (image) {
        let formData = new FormData();
        formData.append('image', image, image.name);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          toast({ title: 'Image uploaded successfully' });
          queryClient.invalidateQueries(['user', session.user.email]);
        } else {
          toast({ title: 'Failed to upload image' });
        }
      }
      setEditDisabled(true);
    }
  };

  return data ? (
    <div className='w-full'>
      <div className='w-full'>
        <Text variant='xl/semibold/black' className='mt-4 mb-4'>
          Account Information
        </Text>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='order-1 lg:order-2 p-4 flex w-full max-w-sm items-center space-x-6 flex-col gap-4'>
            <div className='flex relative justify-center items-center w-[1/3] min-w-[10rem] h-[10rem] rounded-full overflow-hidden shadow-inner'>
              <Image
                src={
                  data.user.image
                    ? `${process.env.NEXT_PUBLIC_S3_BUCKET}/${data.user.image}`
                    : helper.images.commercial3
                }
                alt='hero'
                sizes={helper.images.size}
                className='object-contain'
                fill
              />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='picture'>Picture</Label>
              <Input
                id='picture'
                type='file'
                accept='image/*'
                disabled={!editDisabled}
                value={''}
                onChange={(e) => {
                  setImage(e?.currentTarget?.files?.[0] ?? null);
                  setEditDisabled(false);
                }}
              />
            </div>
          </div>
          <div className='order-2 lg:order-1'>
            <div className='p-4 flex w-full max-w-sm items-center space-x-6'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' value={data.user.email} disabled={true} />
            </div>
            <div className='p-4 flex w-full max-w-sm items-center space-x-6'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                value={editDisabled ? data.user.name : name}
                onChange={(e) => setName(e.currentTarget.value)}
                disabled={editDisabled}
              />
              <Button variant='secondary' onClick={() => setEditDisabled(false)}>
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 15 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z'
                    fill='currentColor'
                    fillRule='evenodd'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </Button>
            </div>
            <div className='p-4 flex w-full max-w-sm items-center space-x-6'>
              <Label htmlFor='password'>Password</Label>
              <Input
                type={shouldPasswordDisplay ? 'text' : 'password'}
                id='password'
                value={editDisabled ? 'randomPassword' : password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                disabled={editDisabled}
              />
              {!editDisabled &&
                (!shouldPasswordDisplay ? (
                  <Button variant='ghost' onClick={() => setShouldPasswordDisplay(true)}>
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z'
                        fill='currentColor'
                        fillRule='evenodd'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </Button>
                ) : (
                  <Button variant='ghost' onClick={() => setShouldPasswordDisplay(false)}>
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M14.7649 6.07596C14.9991 6.22231 15.0703 6.53079 14.9239 6.76495C14.4849 7.46743 13.9632 8.10645 13.3702 8.66305L14.5712 9.86406C14.7664 10.0593 14.7664 10.3759 14.5712 10.5712C14.3759 10.7664 14.0593 10.7664 13.8641 10.5712L12.6011 9.30817C11.805 9.90283 10.9089 10.3621 9.93375 10.651L10.383 12.3277C10.4544 12.5944 10.2961 12.8685 10.0294 12.94C9.76267 13.0115 9.4885 12.8532 9.41704 12.5865L8.95917 10.8775C8.48743 10.958 8.00036 10.9999 7.50001 10.9999C6.99965 10.9999 6.51257 10.958 6.04082 10.8775L5.58299 12.5864C5.51153 12.8532 5.23737 13.0115 4.97064 12.94C4.7039 12.8686 4.5456 12.5944 4.61706 12.3277L5.06625 10.651C4.09111 10.3621 3.19503 9.90282 2.3989 9.30815L1.1359 10.5712C0.940638 10.7664 0.624058 10.7664 0.428798 10.5712C0.233537 10.3759 0.233537 10.0593 0.428798 9.86405L1.62982 8.66303C1.03682 8.10643 0.515113 7.46742 0.0760677 6.76495C-0.0702867 6.53079 0.000898544 6.22231 0.235065 6.07596C0.469231 5.9296 0.777703 6.00079 0.924058 6.23496C1.40354 7.00213 1.989 7.68057 2.66233 8.2427C2.67315 8.25096 2.6837 8.25972 2.69397 8.26898C4.00897 9.35527 5.65537 9.99991 7.50001 9.99991C10.3078 9.99991 12.6564 8.5063 14.076 6.23495C14.2223 6.00079 14.5308 5.9296 14.7649 6.07596Z'
                        fill='currentColor'
                        fillRule='evenodd'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </Button>
                ))}
              <Button variant='secondary' onClick={() => setEditDisabled(false)}>
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 15 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z'
                    fill='currentColor'
                    fillRule='evenodd'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
        {!editDisabled ? (
          <div className='flex gap-6 h-12 max-w-sm ml-auto'>
            <Button
              variant='default'
              onClick={handleUpdate}
              disabled={updateUserMutation.isLoading}
            >
              Save changes{' '}
              {updateUserMutation.isLoading && (
                <RotatingLines strokeColor='#C8E7F2' strokeWidth='5' width='20' />
              )}
            </Button>
            <Button
              variant='secondary'
              onClick={() => {
                setEditDisabled(true);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className='h-12'></div>
        )}
      </div>
      <Text variant='xl/semibold/black' className='mb-8'>
        Account Settings
      </Text>
      <div className='flex gap-4 items-center w-full h-12 rounded-md border max-w-sm justify-center bg-gray-100 dark:bg-slate-900'>
        <svg
          width='15'
          height='15'
          viewBox='0 0 15 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z'
            fill='currentColor'
            fillRule='evenodd'
            clipRule='evenodd'
          ></path>
        </svg>
        Features in development
      </div>
    </div>
  ) : error instanceof Error ? (
    <AlertError error={error} />
  ) : (
    <div className='w-full'>
      <Skeleton className='w-40 h-12 my-8' />
      <div className='flex gap-4 flex-col'>
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
      </div>
      <Skeleton className='w-40 h-12 my-8' />
      <div className='flex gap-4 flex-col'>
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
      </div>
    </div>
  );
};

export default Profile;
