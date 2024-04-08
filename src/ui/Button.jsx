import { Link } from "react-router-dom";

const Button = (props) => {
  const {url, text} = props
  return (
    <Link to={url}>
      <button>{text}</button>
    </Link>
  )
}


export default Button; 