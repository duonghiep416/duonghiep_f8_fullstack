import React, { useContext, useEffect, useRef, useState } from 'react'
import Context from '../../store/countContext/CountContext'
import handleSubmit from '../../helpers/handleSubmit'
import Button from '../Button/Button'
import isNumberInRange from '../../helpers/checkInputNumber'
function FormSubmit() {
  const [state, dispatch] = useContext(Context)
  const [inputValue, setInputValue] = useState('')
  const { numberOfAttempt, fromNumber, toNumber, randomNumber } = state
  const count = useRef(numberOfAttempt)
  const btnFormRef = useRef()
  const inputFormRef = useRef()
  useEffect(() => {
    dispatch({
      type: 'randomNumber/renew'
    })
  }, [])

  const handleInputChange = (e) => {
    if (
      e.target.value === '' ||
      isNumberInRange(e.target.value, fromNumber, toNumber)
    ) {
      setInputValue(e.target.value)
    }
  }

  const handleKeyDown = (e) => {
    inputFormRef.current?.focus()
    switch (e.key) {
      case 'ArrowUp':
        if (
          inputValue < toNumber &&
          !document.activeElement.isEqualNode(btnFormRef.current)
        ) {
          setInputValue((prevValue) => +prevValue + 1)
        }
        break
      case 'ArrowDown':
        if (
          inputValue > fromNumber &&
          !document.activeElement.isEqualNode(btnFormRef.current)
        ) {
          setInputValue((prevValue) => +prevValue - 1)
        }
        break
      case 'Enter':
        if (
          !document.activeElement.isEqualNode(inputFormRef.current) &&
          !document.activeElement.isEqualNode(btnFormRef.current)
        ) {
          btnFormRef.current.click()
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [inputValue])

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
        <label htmlFor='inputNumber'>Hãy nhập thử một số</label>
        {numberOfAttempt >= 1 && (
          <input
            type='text'
            placeholder='Hãy nhập thử một số'
            className='h-10 px-2 outline-none border border-emerald-800 rounded-md'
            min={fromNumber}
            max={toNumber}
            value={inputValue}
            onChange={handleInputChange}
            id='inputNumber'
            ref={inputFormRef}
          />
        )}
        <Button
          text={numberOfAttempt >= 1 ? 'Submit' : 'Chơi Lại'}
          color='emerald'
          ref={btnFormRef}
        />
      </form>
    </>
  )
}
export default FormSubmit
