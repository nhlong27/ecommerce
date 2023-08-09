import { Text } from '@/components/common/Text';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import helper from '@/constants/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductType, addToCartSchema } from '../../types';
import { useAddToCartMutation } from '../../hooks/useAddToCartMutation';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useQueryClient } from '@tanstack/react-query';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCartMutation = useAddToCartMutation();
  const { data: session } = useSession();
  const [amount, setAmount] = React.useState(1);
  const queryClient = useQueryClient();

  const handleAdd = () => {
    if (session) {
      const toCart = {
        productId: product.sku,
        quantity: amount,
        email: session.user.email,
        productTitle: product.title,
        productPrice: product.price,
        productImage: product.image,
        productCategory: product.category,
        productSize: product.size,
        productQuantity: product.quantity,
      };
      try {
        addToCartSchema.parse(toCart);
      } catch (error) {
        console.log(error);
        toast({
          title: 'Command failed',
          description: 'Check console for error message',
          variant: 'destructive',
        });
        return;
      }

      addToCartMutation.mutate(
        {
          productId: product.sku,
          quantity: amount,
          email: session.user.email,
          productTitle: product.title,
          productPrice: product.price,
          productImage: product.image,
          productCategory: product.category,
          productSize: product.size,
          productQuantity: product.quantity,
        },
        {
          onSuccess: () => {
            setAmount(1);
            toast({ title: 'Add to cart successfully' });
            queryClient.invalidateQueries(['cartItems']);
          },
          onError: (error) => {
            console.log(error);
            toast({
              title: 'Command failed',
              description: 'Check console for error message',
              variant: 'destructive',
            });
          },
        },
      );
    }
  };
  return (
    <>
      <Card>
        <Link
          href={`/catalogue/${product.category}/${product.sku}`}
          className='group overflow-hidden rounded-lg flex flex-col justify-start w-[15rem]'
        >
          <CardContent>
            <div className='xl:aspect-h-8 xl:aspect-w-7 relative rounded-lg overflow-hidden bg-white py-4'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_DATA_SOURCE}${product.image}`}
                  alt='product-image'
                  sizes={helper.images.size}
                  className=' object-contain transition-all duration-300 hover:scale-110'
                  fill
                  placeholder='blur'
                  blurDataURL={helper.images.blur}
                />
              </AspectRatio>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <h1 className='text-base font-semibold mt-2 truncate'>{product.title}</h1>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>{product.title}</HoverCardContent>
            </HoverCard>

            <div className='flex justify-between w-full'>
              <Text
                variant='sm/normal/black'
                className='text-left text-green-500 dark:text-green-300'
              >
                $ {product.price}
              </Text>
              <div className='ml-auto flex gap-3 items-center'>
                <Text
                  variant='sm/normal/black'
                  className='text-left text-yellow-500 dark:text-yellow-300'
                >
                  {product.score}
                </Text>
                <span className='py-auto'>.</span>
                <Text
                  variant='sm/normal/black'
                  className='text-left text-gray-500 dark:text-gray-300'
                >
                  {product.n_o_reviews} reviews
                </Text>
              </div>
            </div>
          </CardContent>
        </Link>
        <CardFooter className='flex justify-between -mt-4'>
          <Dialog>
            <DialogTrigger asChild>
              <p className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80 h-9 px-3 cursor-pointer hover:bg-gray-200'>
                Add to cart
              </p>
            </DialogTrigger>
            <DialogContent className='w-full min-w-[250px] sm:max-w-[600px]'>
              <DialogHeader>
                <DialogTitle>Add to cart</DialogTitle>
                <DialogDescription>
                  Below are the product information. Set the amount you want and click Add.
                </DialogDescription>
              </DialogHeader>
              {session ? (
                <div className='sm:p-8 rounded-md bg-white  dark:bg-slate-900 flex flex-col sm:flex-row gap-8'>
                  <div>
                    <div className='relative w-[10rem] h-[10rem]  rounded-lg overflow-hidden bg-white py-4 mx-auto'>
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_DATA_SOURCE}${product.image}`}
                          alt='product-image'
                          sizes={helper.images.size}
                          className=' object-contain transition-all duration-300 hover:scale-110'
                          fill
                          placeholder='blur'
                          blurDataURL={helper.images.blur}
                        />
                      </AspectRatio>
                    </div>
                    <h1 className='text-base font-semibold mt-2 truncate w-11/12'>
                      {product.title}
                    </h1>
                    <div className='flex justify-between w-full'>
                      <Text
                        variant='sm/normal/black'
                        className='text-left text-green-500 dark:text-green-300'
                      >
                        $ {product.price}
                      </Text>
                      <div className='ml-auto flex gap-3 items-center'>
                        <Text
                          variant='sm/normal/black'
                          className='text-left text-yellow-500 dark:text-yellow-300'
                        >
                          {product.score}
                        </Text>
                        <span className='py-auto'>.</span>
                        <Text
                          variant='sm/normal/black'
                          className='text-left text-gray-500 dark:text-gray-300'
                        >
                          {product.n_o_reviews} reviews
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Text variant='base/semibold/black' className=''>
                      Set amount
                    </Text>
                    <div className='py-4 flex gap-3 items-center'>
                      <Button
                        disabled={amount <= 1}
                        onClick={() => setAmount((prev) => prev - 1)}
                        variant='secondary'
                        size='icon'
                      >
                        -
                      </Button>
                      <div className=''>{amount}</div>
                      <Button
                        onClick={() => setAmount((prev) => prev + 1)}
                        variant='secondary'
                        size='icon'
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col justify-start items-start gap-4'>
                  <Text variant='base/normal/primary' className='dark:text-secondary mx-auto'>
                    You must sign in to view this section
                  </Text>
                  <Button variant='secondary' className='mt-4 mx-auto'>
                    <Link href='/auth'>Sign in</Link>
                  </Button>
                </div>
              )}
              {session && (
                <DialogFooter>
                  <Button onClick={handleAdd} type='submit'>
                    Add
                  </Button>
                </DialogFooter>
              )}
            </DialogContent>
          </Dialog>
          <Popover>
            <PopoverTrigger>
              <p className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 rounded-md px-3'>
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 15 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z'
                    fill='currentColor'
                    fillRule='evenodd'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='ml-2'>Fav</span>
              </p>
            </PopoverTrigger>
            <PopoverContent className='px-4 pt-1 w-auto'>Feature in development.</PopoverContent>
          </Popover>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
