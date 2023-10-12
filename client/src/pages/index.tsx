import { Arvo } from 'next/font/google';
import { NextFont } from "next/dist/compiled/@next/font";
const arvo = Arvo({weight: "700", subsets: ['latin']});
import { useState, useEffect } from 'react';
import { Sample } from '@/tools/samples.model';
import Image from 'next/image';
import { getJSONData } from '@/tools/Toolkit';
import { Samples } from '@/tools/samples.model';


export default function Home({ samples }: { samples: Sample[] }) {

  //--------------------------------------state variables
 
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  //--------------------------------------event handlers

  const onSampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSampleIndex(Number(e.target.value));
  };

  const selectedSample = samples[selectedSampleIndex];


  return (
    <main className="p-4 bg-sky-800 min-h-screen">
        <div className='w-full h-full'>
            <header>
                <div className={`${arvo.className} text-6xl text-slate-400`}>Portfolio Sampler</div>
                <div className={`${arvo.className} text-lg pl-1 text-slate-400 font-medium tracking-widest`}>ES2021 Web App implementing AJAX</div>
            </header>

            <div className="flex mt-4">
                <nav id="nav">
                    <select defaultValue="0" onChange={onSampleChange} className="flex items-left justify-left mt-3 mb-3 mr-3 border border-black px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-black">
                    {samples.map((sample, index) => (
                      <option key={sample.id} value={index}>
                        {sample.name}
                      </option>
                    ))}
                    </select>
                </nav>
                
                <aside className="ml-4">
                    <div className="">{selectedSample.name}</div>
                    <div className="">{selectedSample.description}</div>
                    <div>
                      <a href="" target="_blank">{selectedSample.url}</a>
                    </div> 
                    {selectedSample.images.map((image, index) => (
                      <div key={index} className="">
                        <Image src={`..client/lib/images${image.filename}`} alt={image.filename} width={100} height={100} />
                      </div>
                    ))}
                </aside>
            </div>
        </div>
      </main>  
  )
}

// since our data doesn't actually change, we can use getStaticProps to fetch the data at build time
export async function getStaticProps() {
  
  const SAMPLES_WEB_API:string = "http://my-api-server/portfolioData.php";

  // const samples:Sample[] = await getJSONData(SAMPLES_WEB_API);
  let data:any = [];
  try {
    const response = await fetch(SAMPLES_WEB_API);
    data = await response.json();
    console.log(data);
  } catch (error:any) {
    console.log(`error fetching data from web api + ${error.message}`);
  }


  return {
    props: {
      samples: data
    }
  }
}
