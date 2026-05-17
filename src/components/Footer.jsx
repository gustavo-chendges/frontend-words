import { FaGithub, FaLinkedin } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="container d-flex justify-content-around text-center py-5">
        <abbr title="Github">
          <Link to="" style={{color: "white"}}>
            <FaGithub size={40}/>
          </Link>
        </abbr>
        <abbr title="LinkedIn">
          <Link to="" style={{color: "white"}}>
            <FaLinkedin size={40}/>
          </Link>
        </abbr>
      </div>
    </footer>
  )
}


export default Footer