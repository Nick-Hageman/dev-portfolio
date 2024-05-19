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
                <p className="my-5 text-lg lg:pr-24">Experienced in the fields of Software Engineering, Applied AI/ML, and Human-Computer Interaction. I grew up in a small Iowa farm town (home to the Field of Dreams) and currently live in Iowa City. Outside of programming, I enjoy lifting weights, cooking, and watching UFC events. I&apos;m always eager to learn new skills and technologies, so feel free to reach out regarding any software engineering related opportunities.</p>
                <h3 className="mb-2 text-l">
                <span className="font-bold">Languages</span>: C++, Python, Java, JavaScript, HTML, CSS, MATLAB
                </h3>
                <h3 className="mb-2 text-l">
                <span className="font-bold">Technologies</span>: PyTorch, TensorFlow, React.js, Node.js, AWS, Docker, Git
                </h3>
                <h3 className="mb-2 text-l">
                <span className="font-bold">Engineering Experience</span>: SWE Intern @ Apple, Previously @ John Deere, Bio::Neos
                </h3> 
                <h3 className="mb-2 text-l">
                <span className="font-bold">Notable Experience</span>: Holo Reality Lab Undergraduate Researcher, University of Iowa Teaching Assistant
                </h3> 
            </div>
          </div>
        </div>
    )   
}