import { useState, useEffect } from 'react';

const ProjectCard = ({ title, icon, description, mediaItems, sourceLink, devpostLink, articleLink, labReportLink, badges }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstItem = currentIndex === 0;
    const newIndex = isFirstItem ? mediaItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastItem = currentIndex === mediaItems.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto-play videos when they become active in the carousel
  useEffect(() => {
    const currentMedia = mediaItems[currentIndex];
    if (currentMedia.type === 'video') {
      const videoElement = document.getElementById(`video-${title}-${currentIndex}`);
      if (videoElement) {
        videoElement.play().catch(error => {
          console.error('Failed to autoplay video:', error);
        });
      }
    }
  }, [currentIndex, mediaItems, title]);

  // Render the current media item (image or video)
  const renderMedia = () => {
    const currentMedia = mediaItems[currentIndex];
    
    if (currentMedia.type === 'video') {
      return (
        <video 
          key={currentMedia.src}
          id={`video-${title}-${currentIndex}`}
          controls 
          autoPlay 
          muted 
          loop
          className="w-full h-48 object-cover"
        >
          <source src={currentMedia.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <img 
          src={currentMedia.src} 
          alt={`${title} - ${currentIndex + 1}`}
          className="w-full h-48 object-cover" 
        />
      );
    }
  };

  return (
    <div className="card w-64 md:w-80 bg-mist-black my-3 shadow-xl">
      <figure className="relative overflow-hidden">
        {/* Only show navigation if there's more than one media item */}
        {mediaItems.length > 1 && (
          <>
            {/* Left Arrow */}
            <button 
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-r-lg z-10"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button 
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-l-lg z-10"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Media Display */}
        {renderMedia()}

        {/* Pagination Dots - only show if more than one media item */}
        {mediaItems.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {mediaItems.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {icon && typeof icon === 'string' ? (
            <span className="mr-1">{icon}</span>
          ) : icon}
          {title}
        </h2>
        
        <div className="flex flex-col md:flex-row space-x-2">
          {sourceLink && (
            <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="badge hover:ring">
              <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba">
                <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/>
              </svg>
              Source
            </a>
          )}
          
          {devpostLink && (
            <a href={devpostLink} target="_blank" rel="noopener noreferrer" className="badge hover:ring">
              <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba">
                <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/>
              </svg>
              DEVPOST
            </a>
          )}

          {articleLink && (
            <a href={articleLink} target="_blank" rel="noopener noreferrer" className="badge hover:ring">
              <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba">
                <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/>
              </svg>
              Featured Article
            </a>
          )}

          {labReportLink && (
            <a href={labReportLink} target="_blank" rel="noopener noreferrer" className="badge hover:ring">
              <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#a6adba">
                <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/>
              </svg>
              Lab Report
            </a>
          )}
        </div>
        
        <p>{description}</p>
        
        <div className="card-actions justify-end">
          {badges && badges.map((badge, index) => (
            <div key={index} className={`badge ${badge.accent ? 'badge-accent badge-outline' : 'badge-outline'}`}>
              {badge.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main component with projects section
const ProjectsSection = () => {
  // Define all projects data
  const projectsData = [
    // SmartDart Project
    {
      // title: "🎯SmartDart",
      icon: <img src="SmartDart/transparentLogoSmartDart-White.png" alt="🎯SmartDart" className="w-24 h-22 mr-0" />,
      description: "Secured $5,000 in funding for SmartDart: A computer-vision driven steel-tip dart system that combines accurate, automated scoring with dynamic solo gameplay and real-time feedback.",
      mediaItems: [
        { type: 'image', src: '/SmartDart/smartdart2.gif' },
        { type: 'video', src: '/SmartDart/quickDemo.MP4' },
        { type: 'image', src: '/SmartDart/modernMarvels.PNG' },
        { type: 'image', src: '/SmartDart/innovationChallenge.PNG' }
      ],
      articleLink: "https://engineering.uiowa.edu/news-all/2024/11/iowa-engineers-win-39500-iowa-innovation-challenge",
      sourceLink: "https://github.com/Nick-Hageman/SmartDart",
      badges: [
        { text: "UIowa Innovation Challenge", accent: true },
        { text: "DeepDarts" },
        { text: "Transfer Learning" },
        { text: "Python" },
        { text: "OpenCV" }
      ]
    },
    // SlopeStats Project
    {
      title: "SlopeStats",
      icon: <img src="SlopeStats/slopeStatsAppIcon.png" alt="SlopeStats icon" className="w-6 h-6 mr-0" />,
      description: "🏂 SlopeStats is a watchOS + iOS app which has multiple modes of tracking activity for skiing & snowboarding. It offers run tracking (speed, heart rate, altitude), Speed Mode (Ghost racing), Resort & Weather Info (API)",
      mediaItems: [
        { type: 'video', src: 'SlopeStats/slopeStats.mp4' },
      ],
      sourceLink: "https://github.com/Nick-Hageman/SlopeStats",
      badges: [
        { text: "Swift" },
        { text: "SwiftUI" },
        { text: "Core Data" },
        { text: "CoreMotion" },
        { text: "HealthKit" }
      ]
    },
    // FarmVision Project
    {
      title: "🌽FarmVision",
      description: "Modeled agricultural field data in Virtual Reality by utilizing John Deere Precision Ag APIs. Awarded \"Best Data Collection Hack\" at HackUIowa 2023.",
      mediaItems: [
        { type: 'video', src: '/FarmVision/farmvisionCropped.mp4' },
        { type: 'image', src: '/FarmVision/farmvision3.jpg' },
        { type: 'image', src: '/FarmVision/farmvision2.PNG' },
        { type: 'image', src: '/FarmVision/farmvision6.jpg' },
        { type: 'image', src: '/FarmVision/farmvision4.jpg' },
      ],
      sourceLink: "https://github.com/Nick-Hageman/FarmVision",
      devpostLink: "https://devpost.com/software/farmvision",
      badges: [
        { text: "HackUIowa 2023", accent: true },
        { text: "Quest 2" },
        { text: "Unity" },
        { text: "C#" },
        { text: "Python" }
      ]
    },
    // LeetGPT
    {
      title: "LeetGPT",
      icon: <img src="/LeetGPT/icon2.PNG" alt="SlopeStats icon" className="w-6 h-6 mr-0" />,
      description: "Developed a Chrome extension tool that provides LeetCode users with solutions to coding problems. Leveraged OpenAI's ChatGPT Language Model API for generative solutions.",
      mediaItems: [
        { type: 'video', src: '/LeetGPT/leetGPTDemo.mp4' }
      ],
      sourceLink: "https://github.com/Nick-Hageman/LeetGPT",
      badges: [
        { text: "OpenAI API" },
        { text: "React" },
        { text: "Javascript" },
        { text: "JSX" },
        { text: "Chromium" },
      ]
    },
    // Real Estate Business Web App
    {
      title: "🏡Real Estate Business Web Application",
      description: "Developed a web application for home builder's business. Implemented an interactive satellite map, 3D CAD Floorplans, and a Content Management Service (CMS).",
      mediaItems: [
        { type: 'video', src: '/HHOMES/HHOMES_DEMO.mp4' }
      ],
      sourceLink: "https://github.com/Nick-Hageman/Real-Estate-Webapp-2023",
      badges: [
        { text: "Node.js" },
        { text: "JavaScript" },
        { text: "Three.js" },
        { text: "Docker" },
        { text: "AWS" },
      ]
    },
    // HoloKinect
    {
      title: "HoloKinect",
      icon: <img src="/HoloKinect/visionPro.png" alt="Apple Vision Pro" className="w-6 h-6 mr-0" />,
      description: "Developed visionOS UI for a realistic 3D video communication application on the Apple Vision Pro. (Mentored by Prof Tyler Bell and PhD candidate Stephen Siemonsma)",
      mediaItems: [
        { type: 'video', src: '/HoloKinect/holokinectDemo.mp4' }
      ],
      badges: [
        { text: "Holo Reality Lab", accent: true },
        { text: "Swift" },
        { text: "SwiftUI" },
        { text: "VisionOS" },
        { text: "Xcode" },
      ]
    },
    // YouTube Comment sentiment analysis
    {
      title: "MoodTube",
      icon: <img src="/SentimentAnalysis/sentiment.PNG" alt="UFC" className="w-12 h-12 mr-0" />,
      description: "Fine-tuned a sentiment analysis model on YouTube comments. Created a chrome extension which did inference and visualized results by modifying the YouTube page's HTML.",
      mediaItems: [
        { type: 'video', src: '/MoodTube/moodtubeSpedUp.MP4' },
        { type: 'image', src: '/SentimentAnalysis/phase2/slide1.PNG' },
        { type: 'image', src: '/SentimentAnalysis/phase2/slide2.PNG' },
        { type: 'image', src: '/SentimentAnalysis/phase2/slide3.PNG' },
        { type: 'image', src: '/SentimentAnalysis/phase2/slide4.PNG' },
        { type: 'image', src: '/SentimentAnalysis/phase2/slide5.PNG' },
        { type: 'image', src: '/SentimentAnalysis/phase2/slide6.PNG' },
        { type: 'image', src: '/SentimentAnalysis/phase2/slide7.PNG' },
        { type: 'image', src: '/SentimentAnalysis/phase2/slide14.PNG' },
      ],
      sourceLink: "https://github.com/Nick-Hageman/YouTube-sentiment-analysis",
      badges: [
        { text: "ECE:5995 LLMs", accent: true },
        { text: "NLP" },
        { text: "Fine-Tuning" },
        { text: "BERT" },
        { text: "LoRa" },
      ]
    },
    // IoT Thermometer Project
    {
      title: "🌡️IoT Thermometer",
      description: "Created an IoT thermometer that communicates with a web server to provide the user with temperature values no later than 300 seconds ago. Withstanded water and drop tests. Conformed to strict design requirements.",
      mediaItems: [
        { type: 'image', src: '/IOTThermometer/thermometer.jpeg' }
      ],
      labReportLink: "/IOTThermometer/ECE4880_Thermometer.pdf",
      badges: [
        { text: "ECE:4880 Senior Design", accent: true },
        { text: "Python" },
        { text: "Serial Communication" },
        { text: "Arduino" },
        { text: "JavaScript" }
      ]
    },
    // Neural RGBD Encoding
    {
      title: "🧠Neural RGB-D Encoding",
      description: "Transmitting 3D data can be expensive, especially on hardware limited devices. Our approach to this problem was to create an end-to-end neural network sandwiched around an image codec for our encoding scheme.",
      mediaItems: [
        { type: 'image', src: '/Neural_RGBD_Encoding/slide1.PNG' },
        { type: 'image', src: '/Neural_RGBD_Encoding/slide2.PNG' },
        { type: 'image', src: '/Neural_RGBD_Encoding/slide3.PNG' },
        { type: 'image', src: '/Neural_RGBD_Encoding/slide4.PNG' },
        { type: 'image', src: '/Neural_RGBD_Encoding/slide5.PNG' },
        { type: 'image', src: '/Neural_RGBD_Encoding/slide6.PNG' },
      ],
      sourceLink: "https://github.com/Nick-Hageman/Neural-RGBD-Encoding",
      badges: [
        { text: "ECE:5995 Applied ML", accent: true },
        { text: "PyTorch" },
        { text: "Python" },
        { text: "Pandas" },
        { text: "Numpy" },
      ]
    },
    // CageVision
    {
      title: "CageVision",
      icon: <img src="/CageVision/ufc.PNG" alt="UFC" className="w-10 h-4 mr-0" />,
      description: "Created a spatial application which utilized an MMA API to gather upcoming event information to be displayed in a visionOS window. Conceptualized viewing MMA matches in augmented reality by introducing a 3D model of an octagon placed on a flat surface.",
      mediaItems: [
        { type: 'video', src: '/CageVision/CageVision.mp4' }
      ],
      sourceLink: "https://github.com/Nick-Hageman/CageVision",
      badges: [
        { text: "Swift" },
        { text: "VisionOS" },
        { text: "Xcode" },
        { text: "RealityKit" },
      ]
    },
    // Handheld Retro Game Controller
    {
      title: "Handheld Retro Game Controller",
      icon: <img src="/RetroController/ghosts.webp" alt="pacman" className="w-6 h-6 mr-0" />,
      description: "Designed and constructed a handheld gaming device leveraging the capabilities of the ESP8266 module and a Raspberry Pi. The choice of game for our device was Pac-Man, a classic arcade game known for its straightforward yet challenging gameplay.",
      mediaItems: [
        { type: 'video', src: '/RetroController/pacmanClipped.mp4' },
        { type: 'image', src: '/RetroController/embeddedTermProject.PNG' },
      ],
      sourceLink: "https://github.com/Nick-Hageman/ECE-3360-Embedded-Systems",
      badges: [
        { text: "ECE:3360 Embedded Systems", accent: true },
        { text: "Arduino" },
        { text: "C++" },
        { text: "websockets" },
        { text: "Raspberry Pi" },
        { text: "JavaScript" },
      ]
    },
    // 🧠Unsupervised RGB-D Scene Categorization
    {
      title: "🧠Unsupervised RGB-D Scene Categorization",
      description: "Clustered scenes from a short film using RGB-D data. Included the depth information for clustering as we thought it may enhance the scene representation in regards to spatial relationships.",
      mediaItems: [
        { type: 'image', src: '/Unsupervised_RGBD_Scene_Categorization/slide1.PNG' },
        { type: 'image', src: '/Unsupervised_RGBD_Scene_Categorization/slide2.PNG' },
        { type: 'image', src: '/Unsupervised_RGBD_Scene_Categorization/slide3.PNG' },
        { type: 'image', src: '/Unsupervised_RGBD_Scene_Categorization/slide4.PNG' },
        { type: 'image', src: '/Unsupervised_RGBD_Scene_Categorization/slide6.PNG' },
        { type: 'image', src: '/Unsupervised_RGBD_Scene_Categorization/slide7.PNG' },
        { type: 'image', src: '/Unsupervised_RGBD_Scene_Categorization/slide8.PNG' },
      ],
      sourceLink: "https://github.com/Nick-Hageman/RGBD-Unsupervised-Clustering",
      badges: [
        { text: "ECE:5995 Applied ML", accent: true },
        { text: "PyTorch" },
        { text: "Python" },
        { text: "Pandas" },
        { text: "Numpy" },
      ]
    },
    // Shards of the Grid
    {
      title: "💎Shards of the Grid",
      description: "Our team developed a multiplayer game with Generative AI components in the form of a SaaS application using the Rails web framework.",
      mediaItems: [
        { type: 'video', src: '/ShardsOfTheGrid/seltClipped.mp4' },
        { type: 'image', src: '/ShardsOfTheGrid/team.PNG' },
      ],
      sourceLink: "https://github.com/olduiowahjmjohnsonSELT2024/projectdirectory-selt_2024_team_003",
      badges: [
        { text: "ECE:5820: SELT", accent: true },
        { text: "Ruby" },
        { text: "OpenAI API" },
        { text: "HTML" },
        { text: "CSS" },
      ]
    },
    // DriveSense
    {
      title: "🚗DriveSense",
      description: "We utilized computer vision to monitor and record driver distractedness. We used a Raspberry Pi and Teachable Machine for our machine learning model. We also constructed a React dashboard application for data visualization.",
      mediaItems: [
        { type: 'video', src: '/DriveSense/drivesenseClipped.mp4' },
      ],
      sourceLink: "https://github.com/Nick-Hageman/ECE-3360-Embedded-Systems",
      badges: [
        { text: "ECE:5550: Internet of Things", accent: true },
        { text: "Python" },
        { text: "OpenCV" },
        { text: "Firebase" },
        { text: "JavaScript" },
      ]
    },
    // The Gauntlet
    {
      title: "The Gauntlet",
      icon: <img src="/Gauntlet/quest2.PNG" alt="VR" className="w-12 h-10" />,
      description: "Created a multi-stage game comprised of various challenges for our Virtual & Augmented Reality final project. Some of the challenges explored the mechanics of zero gravity, propulsion, enemy collision detection, animations, and AI navigation.",
      mediaItems: [
        { type: 'video', src: '/Gauntlet/VarFinalDemo.mp4' },
      ],
      badges: [
        { text: "ECE:5995 VAR", accent: true },
        { text: "Unity" },
        { text: "C#" },
      ]
    },
    // Computers in Engineering
    {
      title: "📚ENGR:2730 Computers in Engineering",
      description: "Added features to Asteroids using topics including: OOP, dynamic memory allocation, SFML library, composition, inheritance, and polymorphism. Assisted 300+ students in learning advanced C++ concepts.",
      mediaItems: [
        { type: 'video', src: '/CIE/Asteroids_Demo.mp4' },
        { type: 'video', src: '/CIE/racing.mp4' },
      ],
      badges: [
        { text: "Teaching Assistant", accent: true },
        { text: "C++" },
        { text: "Computer Graphics" },
        { text: "CMake" },
        { text: "SFML" },
      ]
    },
    // Generative AI Content Pipeline
    {
      title: "Generative AI Content Pipeline",
      icon: <img src="/GAIT/tiktok.PNG" alt="VR" className="w-8 h-8" />,
      description: "Used multiple Generative AI Tools to automate the content generation process for platforms such as YouTube & TikTok.",
      mediaItems: [
        { type: 'image', src: '/GAIT/diagram.PNG' },
      ],
      badges: [
        { text: "ECE:5995 Generative AI Tools", accent: true },
        { text: "Python" },
        { text: "OpenAI API" },
      ]
    },
    // Werewolves
    {
      title: "🐺Werewolves",
      description: "Created a multiplayer game using purely Java. Inolved multithreading, networking, and database management. Was chosen as a top team to present to the class.",
      mediaItems: [
        { type: 'video', src: '/Werewolves/werewolvesClipped.mp4' },
        { type: 'image', src: '/Werewolves/WerewolfUML.PNG' },
      ],
      badges: [
        { text: "ECE:3330: Software Design", accent: true },
        { text: "Java" },
        { text: "SQL" },
      ]
    },
    // Hawk Talk
    {
      title: "🐥Hawk Talk",
      description: "Created a desktop native chat application to familiarize myself with React for my internship @ John Deere. Utilized websockets for bidirectional and low-latency communication.",
      mediaItems: [
        { type: 'video', src: '/HawkTalk/HawkTalk.mp4' },
      ],
      badges: [
        { text: "React" },
        { text: "JSX" },
        { text: "electron.js" },
        { text: "MongoDB" },
        { text: "socket.io" },
      ]
    },
  ];

  // Split projects into rows of 4
  const projectRows = [];
  for (let i = 0; i < projectsData.length; i += 4) {
    projectRows.push(projectsData.slice(i, i + 4));
  }

  return (
    <div id="projects" className="bg-hue-gray text-sky-white font-mono h-auto md:px-24 md:py-12 mb-20">
      <div className="flex flex-col items-center justify-center">
        <h1 data-aos="zoom-out" className="mt-10 mb-8 text-4xl font-medium">
          Portfolio
        </h1>

        {projectRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col xl:flex-row xl:space-x-5 mb-5 justify-center">
            {row.map((project, index) => (
              <ProjectCard key={`${rowIndex}-${index}`} {...project} />
            ))}
          </div>
        ))}
        {/* <p className="text-center text-xl md:text-2xl">
          "What I cannot create, I do not understand"
        </p> */}
      </div>
    </div>
  );
};

export default ProjectsSection;