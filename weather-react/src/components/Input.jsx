const Input = (props) => {
  const {
    className = '',
    type = 'text',
    value,
    onInput,
    placeholder = '',
  } = props;

  return (
    <input
      placeholder={placeholder}
      onInput={onInput}
      value={value}
      type={type}
      className={className}
    />
  )
}

export default Input;