import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const hero = () => {

    const{user}=useSelector(state=>state.auth);
    const [menuOpen, setMenuOpen] = React.useState(false);

    const logos = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ56S3XVx_siGrbcwh6R-yzBMZBgwwRrzRTQQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6yARjb7Zn3174G3XAICuFrDWSr1cdnCX3mQ&s',
        'https://i.insider.com/503660c8ecad04160f000019?width=800&format=jpeg&auto=webp',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdB1EDkgELKWLkyEUW9LPJQ4P3Vzre6fwjTw&s',
        'data:image/png;base64,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',
    ]

  return (
    
    <>
            <div className="min-h-screen pb-20">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    
                        <img src="/logo1.png" alt="logo" className="h-11 w-auto"/>
                    

                    <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
                        <a href="#" className="hover:text-blue-600 transition">Home</a>
                        <a href="#features" className="hover:text-blue-600 transition">Features</a>
                        <a href="#testimonials" className="hover:text-blue-600 transition">Testimonials</a>
                        <a href="#cta" className="hover:text-blue-600 transition">Contact</a>
                    </div>

                    <div className="flex gap-2">
                        <Link to='/app?state=register' className="hidden md:block px-6 py-2 bg-bule-500 hover:bg-bule-700 active:scale-95 transition-all rounded-full text-white"
                            hidden={user}>
                            Get started
                        </Link>
                        <Link to='/app?state=login' className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-blue-400 hover:text-white transition-all rounded-full text-slate-700 hover:text-slate-900"
                            hidden={user} >
                            Login
                        </Link>
                        <Link to='/app' className="hidden md:block px-6 py-2 bg-blue-500 hover:bg-blue-700 active:scale-95 transition-all rounded-full text-white"
                        hidden={!user}>
                            Dashboard   
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                    <a href="/" className="text-white">Home</a>
                    <a href="/features" className="text-white">Features</a>
                    <a href="/testimonials" className="text-white">Testimonials</a>
                    <a href="/contact" className="text-white">Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-green-600 hover:bg-green-700 transition text-white rounded-md flex" >
                        X
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-blue-300 blur-[100px] opacity-30"></div>


                    {/* Headline + CTA */}
                    <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
                        Land your dream job with <span className=" bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent text-nowrap">AI-powered </span> Resumes.
                    </h1>

                    <p className="max-w-md text-center text-base my-7">Create, edit and download professional resumes with AI-powered assistance.</p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 ">
                        <Link to='/app' className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-blue-400 flex items-center transition-colors">
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Link>
                        <button className="flex items-center gap-2 border border-slate-400 hover:bg-blue-100 transition rounded-full px-7 h-12 text-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video size-5" aria-hidden="true"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                            <span>Try demo</span>
                        </button>
                    </div>

                    <p className="text-center text-sm md:text-base text-gray-500 font-medium mt-16 mb-6">
                        Trusted by leading brands worldwide</p>

                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 max-w-4xl mx-auto py-6"
                    id="logo-container">
                    {logos.map((logo, index) => (
                     <img key={index} src={logo} alt="brand logo"
                    className="h-7 md:h-8 w-auto grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-105"
                    /> ))}
                </div>

                </div>
            </div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                        html {
                                scroll-behavior: smooth;
                            }

                `}
            </style>
        </>
  )
}

export default hero