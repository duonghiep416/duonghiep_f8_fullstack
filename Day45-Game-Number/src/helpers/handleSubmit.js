import { toast } from 'react-toastify'

let dataAnswers = []
const handleSubmit = (
  e,
  numberOfAttempt,
  count,
  dispatch,
  value,
  randomNumber,
  setInputValue
) => {
  e.preventDefault()
  console.log(randomNumber)
  if (value) {
    if (value > randomNumber) {
      toast.warning('Bạn cần giảm một chút nữa')
      if (numberOfAttempt >= 1) {
        dataAnswers.push(value)
      } else {
        setInputValue('')
      }
      dispatchSubmit(numberOfAttempt, dispatch, count, randomNumber)
    } else if (value < randomNumber) {
      toast.warning('Bạn cần tăng một chút nữa')
      if (numberOfAttempt >= 1) {
        dataAnswers.push(value)
      } else {
        setInputValue('')
      }
      dispatchSubmit(numberOfAttempt, dispatch, count, randomNumber)
    } else if (+value === randomNumber) {
      toast.success('Chúc mừng, bạn đã đoán đúng')
      dataAnswers.push(value)
      dispatch({
        type: 'question/submit',
        payload: {
          numberOfAttempt: 0
        }
      })
      dispatch({
        type: 'randomNumber/renew'
      })
      dispatch({
        type: 'history/add',
        payload: {
          dataAnswers,
          randomNumber
        }
      })
      setInputValue('')
      dataAnswers = []
    }
  } else if (!value && numberOfAttempt < 1) {
    toast.success('Chào mừng bạn đến với trò chơi đoán số')
    dispatch({
      type: 'question/submit',
      payload: {
        numberOfAttempt: count.current
      }
    })
  } else if (!value && numberOfAttempt >= 1) {
    toast.error('Vui lòng nhập số')
  }
}

export default handleSubmit

const dispatchSubmit = (numberOfAttempt, dispatch, count, randomNumber) => {
  if (numberOfAttempt > 1) {
    dispatch({
      type: 'question/submit'
    })
  } else if (numberOfAttempt === 1) {
    dispatch({
      type: 'question/submit',
      payload: {
        numberOfAttempt: 0
      }
    })
    dispatch({
      type: 'history/add',
      payload: {
        dataAnswers,
        randomNumber
      }
    })
    dispatch({
      type: 'randomNumber/renew'
    })
    dataAnswers = []
  } else {
    dispatch({
      type: 'question/submit',
      payload: {
        numberOfAttempt: count.current
      }
    })
  }
}
