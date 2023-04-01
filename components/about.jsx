export default function About (props) {
    return (
        <div id={props.id} className="bg-sky-white h-auto md:px-24 md:py-12">
          <div className="flex flex-col md:flex-row-reverse">
            <div className="mt-10 mb-5">
              <img src="pfp4.JPG" className="rounded-full scale-75 md:scale-100 shadow-2xl" alt="pfp"/>
            </div>
            <div className="text-gray-800 text-center font-mono px-6 md:text-left">
                <h1 className="mb-5 text-4xl">
                About <span className="font-bold">Me</span>
                </h1> 
                <p className="my-5 text-lg lg:pr-24">My name is <span className="font-bold">Nick Hageman</span>. I am currently a sophomore at the University of Iowa pursuing a bachelor&apos;s degree in Computer Science & Engineering. I&apos;m interested in all things technology, especially Web Application Development, Embedded Software and Machine Learning.</p>
                <h3 className="mb-2 text-l">
                <span className="font-bold">Languages</span>: C++, Python, JavaScript, HTML, CSS, Java, MATLAB
                </h3>
                <h3 className="mb-2 text-l">
                <span className="font-bold">Technologies</span>: React.js, Node.js, AWS, Docker, Git
                </h3>
                <h3 className="mb-2 text-l">
                <span className="font-bold">Notable Experience</span>: Bio::Neos Internship, UIowa Teaching Assistant, HackUIowa 2022
                </h3> 
            </div>
          </div>
        </div>
    )   
}