const Button = (props) => {
  const {
    className = '',
    children,
    onClick = undefined
  } = props;

  return (
    <button
      className={className}
      onClick={onClick}
    >{children}</button>
  )
}

export default Button;