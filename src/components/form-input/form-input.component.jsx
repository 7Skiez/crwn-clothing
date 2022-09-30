import './form-input.styles.scss'
const FormInput = ({ inputOptions }) => {
  return (
    <div className='group'>
      <input className='form-input' {...inputOptions} />
      <label className={`${inputOptions.value.length && 'shrink'} form-input-label`} htmlFor='displayName'>
        {inputOptions.name
          .replace(/([A-Z])/g, (match) => ` ${match}`)
          .replace(/^./, (match) => match.toUpperCase())
          .trim()}
      </label>
    </div>
  )
}

export default FormInput
