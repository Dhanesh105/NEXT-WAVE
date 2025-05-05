import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="py-12 px-4 font-['Helvetica']">  
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Hero content box without border */}
        <div className="p-8 max-w-2xl w-full text-center">
          <h1 className="text-3xl font-normal uppercase tracking-wide mb-6">DISCOVER OUR PRODUCTS</h1>
          
          <p className="text-sm text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus <br></br>
            scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.
          </p>
        </div>
      </div>
    </section>
  )
}