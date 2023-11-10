import React, { useContext, useEffect, useRef, useState } from 'react'
import Context from '../../store/countContext/CountContext'
import handleSubmit from '../../helpers/handleSubmit'
import Button from '../Button/Button'
import isNumberInRange from '../../helpers/checkInputNumber'
import listenEvent from '../../helpers/listenEvent'
function FormSubmit() {
  const [state, dispatch] = useContext(Context)
  const [inputValue, setInputValue] = useState('')
  const { numberOfAttempt, fromNumber, toNumber, randomNumber } = state
  const count = useRef(numberOfAttempt)
  useEffect(() => {
    dispatch({
      type: 'randomNumber/renew'
    })
    // listenEvent()
  }, [])

  const handleInputChange = (e) => {
    if (
      e.target.value === '' ||
      isNumberInRange(e.target.value, fromNumber, toNumber)
    ) {
      setInputValue(e.target.value)
    }
  }

  return (
    <>
      <form
        action=''
        className='flex flex-col gap-4 mt-4'
        onSubmit={(e) => {
          handleSubmit(
            e,
            numberOfAttempt,
            count,
            dispatch,
            inputValue,
            randomNumber,
            setInputValue
          )
        }}
      >
        <label htmlFor=''>Hãy nhập thử một số</label>
        {numberOfAttempt >= 1 && (
          <input
            type='number'
            placeholder='Hãy nhập thử một số'
            className='h-10 px-2 outline-none border border-emerald-800 rounded-md'
            min={fromNumber}
            max={toNumber}
            value={inputValue}
            onChange={handleInputChange}
          />
        )}
        <Button
          text={numberOfAttempt >= 1 ? 'Submit' : 'Chơi Lại'}
          color='emerald'
        />
      </form>
    </>
  )
}
export default FormSubmit
