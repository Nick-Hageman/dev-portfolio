export default function Portfolio (props) {
    return (
        <div id={props.id} className="bg-hue-gray text-sky-white font-mono h-auto md:px-24 md:py-12 mb-20">
            <div className="flex flex-col items-center justify-center">
                <h1 data-aos="zoom-out" className="mt-10 mb-8 text-4xl font-medium">
                    Portfolio
                </h1>
                <div className="flex flex-col xl:space-x-5 xl:flex-row">
                    <div className="card w-64 md:w-80 bg-mist-black my-3 shadow-xl">
                                    <figure>
                                        <video width="750" height="500" controls autoPlay muted loop>
                                            <source src="/HagemanHomesDemo1.mp4" type="video/mp4"/>
                                        </video>
                                    </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                    Real Estate Business Web Application
                                    </h2>
                                    <div className="flex flex-col md:flex-row space-x-2">
                                        <a href="https://hageman-homes.com" target="_blank" rel="noopener noreferrer" className="badge hover:ring"><svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>Website</a>
                                        <a href="https://github.com/Nick-Hageman/Real-Estate-Webapp-2023" target="_blank" rel="noopener noreferrer" className="badge hover:ring"><svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>Source</a>
                                    </div>
                                    <p>Developed a web application for home builder&apos;s business. Implemented interactive satellite maps of available lots and 3D models of floorplans using LiDAR technology.</p>
                                    <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Node.js</div>
                                    <div className="badge badge-outline">Javascript</div>
                                    <div className="badge badge-outline">Three.js</div>
                                    <div className="badge badge-outline">Docker</div>
                                    <div className="badge badge-outline">AWS</div>
                                    </div>
                                </div>
                        </div>
                    <div className="card w-64 md:w-80 bg-mist-black my-3 shadow-xl">
                        <figure><img src="nbaml.PNG" alt="discordCGPT" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                            NBA Data Machine Learning Competition
                            </h2>
                            <div className="flex flex-col md:flex-row space-x-2">
                                <a href="https://github.com/Nick-Hageman/NBA-Data-Machine-Learning-Project/blob/main/project1_scoring.ipynb" target="_blank" rel="noopener noreferrer" className="badge hover:ring"><svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>Source</a>
                            </div>
                            <p>Determined the optimal regression model to make predictions on NBA scoring data. Performed feature engineering to yield better performance and accuracy.</p>
                            <div className="card-actions justify-end">
                            <div className="badge badge-outline">Python</div> 
                            <div className="badge badge-outline">Jupyter Notebook</div>
                            <div className="badge badge-outline">scikit-learn</div>
                            <div className="badge badge-outline">Pandas</div>
                            </div>
                        </div>
                    </div>
                    <div className="card w-64 md:w-80 bg-mist-black my-3 shadow-xl">
                        <figure><img src="leetgpt.PNG" alt="Pynq" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                LeetGPT 
                            </h2>
                            <div className="flex flex-col md:flex-row space-x-2">
                                <a href="https://github.com/Nick-Hageman/LeetGPT" target="_blank" rel="noopener noreferrer" className="badge hover:ring"><svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>Source</a>
                            </div>
                            <p>Developed a Chrome extension tool that provides LeetCode users with solutions to coding problems. Leveraged OpenAI&apos;s ChatGPT Language Model API for generative solutions.</p>
                            <div className="card-actions justify-end">
                            <div className="badge badge-outline">OpenAI</div>
                            <div className="badge badge-outline">React</div>
                            <div className="badge badge-outline">Javascript</div>
                            <div className="badge badge-outline">JSX</div>
                            <div className="badge badge-outline">Chromium</div>
                            </div>
                        </div>
                    </div>
                    <div className="card w-64 md:w-80 bg-mist-black my-3 shadow-xl">
                        <figure>
                            <video width="750" height="500" controls autoPlay muted loop>
                                <source src="/HawkTalk.mp4" type="video/mp4"/>
                            </video>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                            Hawk Talk
                            </h2>
                            <div className="flex flex-col md:flex-row space-x-2">
                                <a href="https://github.com/Nick-Hageman/Desktop-Native-Chat-Application" target="_blank" rel="noopener noreferrer" className="badge hover:ring"><svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>Source</a>
                            </div>
                            <p>Created a desktop native chat application to familiarize myself with React for my incoming internship @ John Deere. Utilized websockets for bidirectional and low-latency communication.</p>
                            <div className="card-actions justify-end">
                            <div className="badge badge-outline">React</div>
                            <div className="badge badge-outline">JSX</div>
                            <div className="badge badge-outline">electron.js</div> 
                            <div className="badge badge-outline">MongoDB</div>
                            <div className="badge badge-outline">socket.io</div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="flex flex-col lg:space-x-5 lg:flex-row">
                        <div className="card w-64 md:w-80 bg-mist-black my-3 shadow-xl">
                            <figure><img src="hackuiowa22.png" alt="Headphones" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                            Plate Scraper
                            </h2>
                            <div className="flex flex-col md:flex-row space-x-2">
                                <a href="https://github.com/Nick-Hageman/Hackathon2022" target="_blank" rel="noopener noreferrer" className="badge hover:ring"><svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>Source</a>
                                <a href="https://devpost.com/software/plate-scraper" target="_blank" rel="noopener noreferrer" className="badge hover:ring"><svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>DEVPOST</a>
                            </div>
                            <p>Led a hackathon team in designing a personalized version of the University&apos;s dining hall menu. Leveraged Selenium WebDriver to extract HTML data from University websites.</p>
                            <div className="card-actions justify-end">
                            <div className="badge badge-accent badge-outline">HackUIowa 2023</div>
                            <div className="badge badge-outline">Python</div> 
                            <div className="badge badge-outline">Selenium</div>
                            <div className="badge badge-outline">Node.js</div>
                            </div>
                        </div>
                    </div>
                    <div className="card w-64 md:w-80 bg-mist-black my-3 shadow-xl">
                        <figure>
                            <video width="750" height="500" controls autoPlay muted loop>
                                <source src="/Asteroids_Demo.mp4" type="video/mp4"/>
                            </video>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                            ENGR:2730 Computers in Engineering
                            </h2>
                            <div className="flex flex-col md:flex-row space-x-2">
                                <a href="https://github.com/Nick-Hageman/ENGR-2730-Computers-in-Engineering/tree/main/Asteroids" target="_blank" rel="noopener noreferrer" className="badge hover:ring"><svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>Source</a>
                            </div>
                            <p>Added features to &quot;Asteroids&quot; using topics including: OOP, dynamic memory allocation, SFML library, composition, inheritance, and polymorphism.</p>
                            <div className="card-actions justify-end">
                            <div className="badge badge-accent badge-outline">Teaching Assistant</div>
                            <div className="badge badge-outline">C++</div> 
                            <div className="badge badge-outline">SFML</div> 
                            <div className="badge badge-outline">CMake</div> 
                            </div>
                        </div>
                    </div>
                    <div className="card w-64 md:w-80 bg-mist-black my-3 shadow-xl">
                        <figure><img src="bioneos.PNG" alt="Pynq" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Plant Hydration Monitor 
                            </h2>
                            <div className="flex flex-col md:flex-row space-x-2">
                                <a href="https://github.com/Nick-Hageman/plant-hydration-monitor" target="_blank" rel="noopener noreferrer" className="badge hover:ring"><svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>Source</a>
                            </div>
                            <p>Developed an IoT web application to monitor soil moisture levels in real time. Created RESTful APIs to receive and handle sensor data from a microcontroller.</p>
                            <div className="card-actions justify-end">
                            <div className="badge badge-accent badge-outline">Bio::Neos Internship</div>
                            <div className="badge badge-outline">Arduino</div>
                            <div className="badge badge-outline">REST API</div>
                            <div className="badge badge-outline">SQLite</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
}