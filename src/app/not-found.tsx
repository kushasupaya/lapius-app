"use client";

import { Footer, Header } from '@/components/common'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Header />
        <main>
          <div className="container mx-auto px-4 xl:px-0 pt-[76px] md:pt-[96px] min-h-[calc(100vh-707px)] md:min-h-[calc(100vh-477px)] flex flex-col items-center justify-center">
            <Image
              alt=""
              src="/images/not-found.svg"
              height={512}
              width={512}
              className="mx-auto mt-6 mb-6 md:mb-12"
            />
            <p className="max-w-[636px] mx-auto text-center text-base md:text-xl font-medium mb-6 md:mb-10">The page you are looking for is not found. It doesn’t mean you are lost, just start from the Homepage again.</p>
            <Button
              size="default"
              variant="default"
              type="submit"
              className="bg-tertiary text-tertiary-foreground text-base w-max p-4 h-14 rounded-lg hover:bg-primary focus:outline-none transition duration-300 mb-12"
              onClick={() => router.push("/")}
            >
              <div className="flex items-center w-full justify-between">
                Go Back to Homepage
                <Image alt="" src="/icons/arrow-top-right.svg" height={24} width={24} className="ml-2 md:ml-4" />
              </div>
            </Button>
          </div>
        </main>
      <Footer />
    </>      
  )
}