import { useState, useEffect } from "react"

function App() {
  const [gameOver, setGameOver] = useState(false)
  const [playerTurn, setPlayerTurn] = useState(true)
  const [gameRound, setGameRound] = useState(1)
  const [isDraw, setIsDraw] = useState(false)
  const [xPlaces, setXPlaces] = useState("")
  const [oPlaces, setOPlaces] = useState("")
  const [message, setMessage] = useState("")
  const [xWin, setXWin] = useState(0)
  const [oWin, setOWin] = useState(0)

  const winStates = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ]

  useEffect(() => {
    if (gameRound > 9) {
      setGameOver(true)
      setIsDraw(true)
    } else {
      return
    }
  }, [gameRound])

  const pMove = (e) => {
    if (!gameOver) {
      const sqId = e.target.id

      if (playerTurn) {
        if (document.getElementById(`${sqId}`).innerHTML === "") {
          document.getElementById(`${sqId}`).innerHTML = "X"
          let xPlcCopy = [...xPlaces]
          xPlcCopy.push(sqId)
          setXPlaces(xPlcCopy)

          setPlayerTurn(false)
          setGameRound(gameRound + 1)
          for (let i = 0; i < winStates.length; i++) {
            const [a, b, c] = winStates[i]
            if (
              xPlcCopy.includes(a) &&
              xPlcCopy.includes(b) &&
              xPlcCopy.includes(c)
            ) {
              setGameOver(true)
              setMessage("X's Win!")
              setXWin(xWin + 1)
            }
          }
        }
      }
      if (!playerTurn) {
        if (document.getElementById(`${sqId}`).innerHTML === "") {
          document.getElementById(`${sqId}`).innerHTML = "O"
          let oPlcCopy = [...oPlaces]
          oPlcCopy.push(sqId)
          setOPlaces(oPlcCopy)
          setPlayerTurn(true)
          setGameRound(gameRound + 1)
          for (let i = 0; i < winStates.length; i++) {
            const [a, b, c] = winStates[i]
            if (
              oPlcCopy.includes(a) &&
              oPlcCopy.includes(b) &&
              oPlcCopy.includes(c)
            ) {
              setGameOver(true)
              setMessage("O's Win!")
              setOWin(oWin + 1)
            }
          }
        }
      }
    } else {
      alert("Game Over!")
    }
  }

  const restartGame = () => {
    setGameOver(false)
    setPlayerTurn(true)
    setGameRound(1)
    setXPlaces("")
    setOPlaces("")
    setIsDraw(false)
    setMessage("")
    document.getElementById("1").innerHTML = ""
    document.getElementById("2").innerHTML = ""
    document.getElementById("3").innerHTML = ""
    document.getElementById("4").innerHTML = ""
    document.getElementById("5").innerHTML = ""
    document.getElementById("6").innerHTML = ""
    document.getElementById("7").innerHTML = ""
    document.getElementById("8").innerHTML = ""
    document.getElementById("0").innerHTML = ""
  }

  return (
    <div className="app">
      <div className="scoreboard">
        <h2>
          Player1 <span style={{ fontSize: "3rem" }}>{xWin}</span>
        </h2>
        <span style={{ fontSize: "1.5rem" }}>vs</span>
        <h2>
          <span style={{ fontSize: "3rem" }}>{oWin}</span> Player2
        </h2>
      </div>
      <div className="info">{isDraw ? "It's a draw" : message}</div>
      <div className="game-table" id="game-table">
        <div className="row-1" id="row-1">
          <div className="sq-1" id="0" onClick={(e) => pMove(e)}></div>
          <div className="sq-2" id="1" onClick={(e) => pMove(e)}></div>
          <div className="sq-3" id="2" onClick={(e) => pMove(e)}></div>
        </div>
        <div className="row-2">
          <div className="sq-1" id="3" onClick={(e) => pMove(e)}></div>
          <div className="sq-2" id="4" onClick={(e) => pMove(e)}></div>
          <div className="sq-3" id="5" onClick={(e) => pMove(e)}></div>
        </div>
        <div className="row-3">
          <div className="sq-1" id="6" onClick={(e) => pMove(e)}></div>
          <div className="sq-2" id="7" onClick={(e) => pMove(e)}></div>
          <div className="sq-3" id="8" onClick={(e) => pMove(e)}></div>
        </div>
      </div>
      <button onClick={() => restartGame()}>Restart Game</button>
    </div>
  )
}

export default App
