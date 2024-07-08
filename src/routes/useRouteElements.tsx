import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Sequence from '../pages/Sequence/Sequence'
import path from '../constants/path'
import Error from '../pages/Error/Error'

export default function useRouteElements() {
    const routeElements = useRoutes([
        {
          path: path.home,
          index: true,
          element: (
            <MainLayout>
              <Sequence />
            </MainLayout>
          )
        },
        {
          path: '/errorTab',
          element: (
            <MainLayout>
              <Error />
            </MainLayout>
          )
        },
        // {
        //   path: '',
        //   element: <ProtectedRoute />,
        //   children: [
        //     {
        //       path: path.cart,
        //       element: (
        //         <MainLayout>
        //           <Cart />
        //         </MainLayout>
        //       )
        //     },
        //     {
        //       path: path.user,
        //       element: (
        //         <MainLayout>
        //           <UserLayout />
        //         </MainLayout>
        //       ),
        //       children: [
        //         {
        //           path: path.profile,
        //           element: <Profile />
        //         },
        //         {
        //           path: path.changePassword,
        //           element: <ChangePassword />
        //         },
        //         {
        //           path: path.historyPurchase,
        //           element: <HistoryPurchase />
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: '',
        //   element: <RejectedRoute />,
        //   children: [
        //     {
        //       path: path.login,
        //       element: (
        //         <RegisterLayout>
        //           <RegisterHeader />
        //           <Login />
        //           <Footer />
        //         </RegisterLayout>
        //       )
        //     },
        //     {
        //       path: path.register,
        //       element: (
        //         <RegisterLayout>
        //           <RegisterHeader />
        //           <Register />
        //           <Footer />
        //         </RegisterLayout>
        //       )
        //     }
        //   ]
        // },
        // {
        //   path: path.products,
        //   element: (
        //     <MainLayout>
        //       <ProductList />
        //     </MainLayout>
        //   )
        // },
        // {
        //   path: `${path.product}/:nameId`,
        //   element: (
        //     <MainLayout>
        //       <Product />
        //     </MainLayout>
        //   )
        // },
        // {
        //   path: '*',
        //   element: <NotFound />
        // }
      ])
      return routeElements
}
