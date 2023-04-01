export default function Contact (props) {
    return (
        <div id={props.id}>
          <div className="p-10 footer font-mono bg-gray-800 text-neutral-content">
            <div>
            </div>
            <h1 className="mb-5 text-4xl font-light justify-center">
              Contact <span className="font-medium">Me</span>
            </h1> 
            <div>
              <span className="footer-title">Socials</span> 
              <a href="http://www.linkedin.com/in/nicholas-hageman-303aa721b" target="_blank" rel="noopener noreferrer" className="link link-hover">LinkedIn</a> 
              <a href="https://github.com/Nick-Hageman" target="_blank" rel="noopener noreferrer" className="link link-hover">GitHub</a> 
              <a href="https://discordapp.com/users/1920" target="_blank" rel="noopener noreferrer" className="link link-hover">Discord</a> 
            </div> 
           <div>
            <span className="footer-title">Email</span> 
            <a href="mailto:nicholas-hageman@uiowa.edu"className="link link-hover">nicholas-hageman@uiowa.edu</a>
          </div>
          <div>
            <span className="footer-title">Resume</span> 
            <a href="NickHageman_Resume2023.pdf" target="_blank" rel="noopener noreferrer" className="link link-hover">View Resume</a> 
          </div>
      </div>
      </div>    
    )
}