import { Link } from "react-router"
import { useContext } from "react"
import { BrandContext } from "../../contexts/Context"

const EmailConfirmation = () => { 
  const { brand } = useContext(BrandContext) as { brand: string };

  return (
    <>
      <div className="flex w-min text-nowrap mx-auto items-baseline gap-2 mt-20">
        <h1 className="font-semibold">{brand}</h1>
        <p className="font-semibold">File Store</p>
      </div>
      <div className="flex flex-col mt-10 mx-auto items-center gap-4 p-8 rounded-sm bg-neutral-200 w-74">
        <h4 className="font-semibold text-center">Email Confirmed</h4>
        <div className="text-sm mx-6 text-center">
          <p >Your email has been confirmed successfully.</p>
          <p className="text-center mt-2">Use the button below to proceed to the sign in page.</p>
        </div>
        <div className="text-green-600 mt-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <Link 
          to="/auth/signin"
          onClick={() => localStorage.removeItem("sb-snvcvbztmwsqqyegkzqu-auth-token")} 
          className="bg-black cursor-pointer text-white p-2 rounded px-10 mt-4 text-center"
        >
          Return to Sign In
        </Link>
      </div>
    </>
  )
}

export default EmailConfirmation