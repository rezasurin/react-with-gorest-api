import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gorest.co.in/public/v1/' }),
  endpoints: (builder) => ({
    getListCustomer: builder.query({
      query: (numPage,perPage) => `users?page=${numPage}&per_page=${perPage}`,

    }),
    getDetailCustomer: builder.query({
      query: (id) => `users/${id}`,
    })
  }),
})

export const { useGetListCustomerQuery, useGetDetailCustomerQuery } = customerApi