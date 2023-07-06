import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from './constants/urls';
import { BooksSchema, UserSchema } from './types/types';
import axios from 'axios';

const users = gql`
  {
    users {
      id
      name
      email
    }
  }
`;
const books = gql`
  {
    books {
      title
    }
  }
`;
const products = gql`
  {
    products {
      title
      price
      description
      category
      image
      rating {
        rate
        count
      }
    }
  }
`;
export const getUsersQuery = () => {
  return {
    queryKey: ['users'],
    queryFn: async () => request(`${GRAPHQL_API_URL}`, users),
  };
};
export const getBooksQuery = () => {
  return {
    queryKey: ['books'],
    queryFn: async () => request(`${GRAPHQL_API_URL}`, books),
  };
};

export const getProductsQuery = () => {
  return {
    queryKey: ['products'],
    queryFn: async () => request(`${GRAPHQL_API_URL}`, products),

    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };
};


// export const getUser = async (id: string) => {
//   try {
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/user/${id}`);
//     const user = UserSchema.parse(await res.data);
//     return user;
//   } catch (err) {
//     console.log('err' + err);
//     throw new Error();
//   }
// };

// const handleFetch = async () => {
//     return (await axios.get('https://fakestoreapi.com/products')).data;
//   };

//   const { data, isLoading, error} = useQuery({...getProductsQuery()})

//   const { data, isLoading, error } = useQuery(['products'], handleFetch, {
//     refetchOnReconnect: false,
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//   });

//   const addProduct = useMutation({
//     mutationFn: addProductMutationFn,
//     onSuccess: () => {
//       console.log('success');
//     },
//     onError(err: Error) {
//       toast.error(err.message);
//     },
//   });

//   const handleClick = async () => {
//     if (data) {
//       (data as any).forEach((item: any) => addProduct.mutate(item));
//     }
//   };