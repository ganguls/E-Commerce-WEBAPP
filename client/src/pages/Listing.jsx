import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {useSelector} from 'react-redux';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle'
import {FaShare} from 'react-icons/fa';
import {BiSolidCategory,BiLayer} from 'react-icons/bi'
import {MdHeight,MdProductionQuantityLimits} from 'react-icons/md'
import {RxWidth} from 'react-icons/rx'
import {BsPaletteFill} from 'react-icons/bs'
import Contact from "../components/Contact";





export default function Listing() {
    SwiperCore.use([Navigation])
    const [listing,setListing] =useState(null)
    const [loading,setLoading]= useState(false)
    const [error,setError] = useState(false)
    const [copied, setCopied] = useState(false);
    const [contact,setContact] = useState(false)
    const params =useParams();
    const {curruntUser} = useSelector((state)=>state.user);
    
    useEffect(()=>{
        const fetchListing = async()=>{
            try{
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.
                    listingId}`);
                    const data = await res.json();
                    if(data.success===false){
                        setError(true);
                        setLoading(false)
                        return;
                    }
                    setListing(data)
                    setLoading(false)
                    setError(false)
                    
            }catch(error){
                setError(true)
                setLoading(false)
            }            
            // async function handleCheckOut () {
            //   const stripe = await getStripe();
            // const { error } = await stripe.redirectToCheckout({
            //   lineItems: [
            //     {
            //       price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
            //       quantity: 1,
            //     },
            //   ],
            //   mode: 'subscription',
            //   successUrl: `http://localhost:3000/success`,
            //   cancelUrl: `http://localhost:3000/cancel`,
            //   customerEmail: 'customer@email.com',
            // });
            // console.warn(error.message);
        
            // }
        
        }
        fetchListing();
    },[params.listingId])

    
    const categoryMapping = {
        1: 'Paintings',
        2: 'Sculptures',
        3: 'Prints and Posters',
        4: 'Ceramics and Pottery',
        5: 'Jewelry',
        6: 'Textiles and Fabrics',
        7: 'Paper craft',
        8: 'Wood craft',
        9: 'Glass craft',
        10: 'Leather craft',
        11: 'Metal craft',
        12: 'Traditional craft',
      };


        const handleCheckOut = () => {
          window.location.href = 'https://buy.stripe.com/test_9AQ7te8lxbzma4MeUU';
        }
    
      


    return (
        <main>
          {loading && (
            <p className="text-center my-7 text-2xl">Loading...</p>
          )}
          {error && (
            <div className="text-center my-7 text-2xl">
              <p>Something went wrong!</p>
              <button onClick={() => window.history.go(-1)} className="bg-indigo-900 text-white px-1 py-1 mt-2 rounded-md">
                Go Back
              </button>
            </div>
          )}
          {listing && !loading && !error && (
            <div>
              <Swiper navigation>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                      className="h-[600px] w-[600px] mt-2"
                      style={{
                        backgroundImage: `url(${url})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        
                      }}
                    >
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className='fixed top-[13%] right-[35%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
              <FaShare
              className='text-slate-500' 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
              />
              </div>
              {copied && (
            <p className='fixed top-[13%] right-[28%] z-10 rounded-md bg-slate-100 p-2'>
                 Link copied!
            </p>
              )}
              <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                <p className="text-2xl font-bold">
                    {listing.name}- Rs{' '}
                    {listing.discount
                        ?listing.discount.toLocaleString('en-US')
                        :listing.price.toLocaleString('en-US')}
                </p>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                <p className="flex items-center mt-2 gap-2 text-black text-lg">              
                    <BiSolidCategory className="text-greeb-700"/>   
                    {categoryMapping[listing.category]}
                </p>
                <p className="flex items-center mt-2 gap-2 text-black text-lg">              
                    <BsPaletteFill className="text-greeb-700"/>   
                    {listing.materials}
                </p>
                </div>
                <div className="flex gap-4">
                <p className='bg-amber-400 w-full max-w-[200px]
                 text-black text-center p-1 rounded-md'>
                  for sale
                </p>
                {
                  listing.discount &&(
                    <p className="bg-amber-600 w-full max-w-[200px] text-white
                     text-center p-1 rounded-md">Rs {+listing.price - +listing.discount} OFF</p>
                  )
                }
                </div>
                <p className="text-slate-800">
                <span className="font-semibold text-black">Description -{''} </span>
                {listing.description}
                </p>
                <ul className=" text-black font-semibold text-lg flex flex-wrap 
                items-center gap-4 sm:gap-6">
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <MdHeight className="text-xl" />
                    {listing.height}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <RxWidth className="text-xl" />
                    {listing.width}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <BiLayer className="text-xl" />
                    {listing.width}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <MdProductionQuantityLimits className="text-xl" />
                    {listing.width}
                  </li>
                </ul>
                {curruntUser && listing.userRef !==curruntUser._id 
                && !contact &&
                (

                  <button onClick={handleCheckOut} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Buy Now</button>
                )} 
                {contact && <Contact listing={listing} />}
              </div>
              
            </div>
          )}
        </main>
      );
}      
