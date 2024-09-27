import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ClerkProvider} from '@clerk/clerk-react'
import './index.css'
import { createBrowserRouter, RouterProvider as Provider } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import Index from './profile/Index'
import AddListing from './addListing/AddListing'
import { Toaster } from "@/components/ui/sonner"
import SearchByCategory from './search/category'
import SearchByOption from './search'
import ListingDetails from './listingDetails/[id]'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
   {
    path: '/contact',
    element: <Contact />
  },
   {
    path: '/profile',
    element: <Index />
  },
   {
    path: '/add-listing',
    element: <AddListing/>
  },{
    path:'/search/:category',
    element:<SearchByCategory/>
  },{
    path:'/search',
    element:<SearchByOption/>
  },{
    path:'/listing-details/:id',
    element:<ListingDetails/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>,
)
