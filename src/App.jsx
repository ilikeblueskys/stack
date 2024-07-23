import { useState } from 'react'
import './App.css'

/* Components */
const Button = ({onClick, description}) => <button onClick={onClick}>{description}</button>
const StackItem = ({color}) => <div className={"stack_item"} style={{backgroundColor: color}}></div>
const StackContainer = ({colors}) => <div className='stack'>{ colors.map(color => <StackItem color={color}/>) }</div>
const MessageBanner = ({message}) => <div className='banner'><h1>{message}</h1></div>

function App() {
  /* States */
  const [colors, setColors] = useState(["red", "green", "blue"])
  const [removedColors, setRemovedColors] = useState([])
  const [message, setMessage] = useState("")

  /* Buttons onClick logic */
  const pushRed = () => setColors(["red", ...colors])
  const pushGreen = () => setColors(["green", ...colors])
  const pushBlue = () => setColors(["blue", ...colors])

  const pop = () => {
    if (colors.length === 0) {
      setMessage("Unable to pop: no element found.")
      retrun;
    }

    setMessage("");
    const removedColor = colors.shift()
    setRemovedColors([removedColor, ...removedColors])
    setColors(colors)
  }

  const undo = () => {
    if (removedColors.length === 0) {
      setMessage("Unable to undo: no element found.")
      retrun;
    }

    setMessage("");
    const undoColor = removedColors.shift()
    setColors([undoColor, ...colors])
    setRemovedColors(removedColors)
  }

  /* JSX content */
  return (
    <div>
      <MessageBanner message={message}/>
      <header>
        <Button onClick={pushRed} description={"Red"}/>
        <Button onClick={pushGreen} description={"Green"}/>
        <Button onClick={pushBlue} description={"Blue"}/>
        <Button onClick={pop} description={"Pop"}/>
        <Button onClick={undo} description={"Undo"}/>
      </header>
        <StackContainer colors={colors}/>
        <StackContainer colors={removedColors}/>
    </div>
  )
}

export default App

// Do something about the repetion: function that takes the checking condition and changes the state of the message
// based on given condition and returns the result of said. Then if condition is true return:
// bool handled = handleAction((colors) => colors.length === 0, "Unable to pop: no element found")
// if (!handled) return.
// ...
// Maybe don't over abstract.
// Repeat something you can read/write in seconds instead of abstracting it with something you'll need to comprehend.