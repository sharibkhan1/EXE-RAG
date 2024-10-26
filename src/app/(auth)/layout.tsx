import Image from "next/image";
const AuthLayout=({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
<div className='h-screen overflow-hidden dark:bg-[0e0c0e]  flex w-full justify-center' >
        <div className='w-[600px] ld:w-full flex flex-col items-center p-6 ' >
            <Image
            src= "/exe logo.png"
            alt="LOGO"
            sizes="100vw"
            style={{
                width:"30%",
                height:"auto",
            }}
            width={0}
            height={0}
            />
        {children}
        </div>
        <div className='hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden
        relative bg-cream flex-col pt-10 pl-24 gap-3 ' >
            <h2 className='text-gravel md:text-6xl font-bold' >
                Join Us
            </h2>
            <p className="text-iridium md:text-lg mb-10">
            Empower yourself with personalized RAG insights tailored just for you on our GenAI platform. ....{' '}
          <br />
           Unlock the knowledge you need to make informed decisions and stay ahead effortlessly! 😉
        </p>
        <Image
            src="/exe sinup image.png"
            alt="iamge"
            loading='lazy'
            sizes="40"
            className=' shrink-0 !w-[1400px]  '
            width={0}
            height={0}
        />  
        </div>
    </div>
  );
}


export default AuthLayout;
