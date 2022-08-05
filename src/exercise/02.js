// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)
  console.log('🚀 ~ file: 02.js ~ line 20 ~ prevKeyRef', prevKeyRef)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    console.log(
      '🚀 ~ file: 02.js ~ line 25 ~ React.useEffect ~ prevKey !== key',
      prevKey !== key,
    )
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName

  // const nameValue = window.localStorage.getItem('name') ?? initialName

  // function getInitialNameValue() {
  //   return window.localStorage.getItem('name') ?? initialName
  // }

  // const [name, setName] = React.useState(nameValue) // not optimal for
  // performance, every time the componente renders it will check for the local
  // storage item, and is not necessary since is only the initial value.
  // const [name, setName] = React.useState(getInitialNameValue)
  const [name, setName] = useLocalStorageState('name', initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  // React.useEffect(() => {
  //   setLocalStorageValue('name', name)
  // }, [name, setLocalStorageValue])

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
