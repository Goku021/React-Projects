import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassowrd] = useState("");
  const [length, setLength] = useState(8);
  const [charallowed, setCharallowed] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const passref = useRef();

  const passwordGenerator = useCallback(() => {
    let passw = "";
    let strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) strings += "1234567890";
    if (charallowed) strings += "!@#$%^&*()";
    for (let i = 1; i <= length; i++) {
      let str = Math.floor(Math.random() * strings.length + 1);
      passw += strings.charAt(str);
      setPassowrd(passw);
    }
  }, [length, numbers, charallowed, setPassowrd]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, charallowed, setPassowrd]);
  const copyClipboard = () => {
    passref.current.select();
    window.navigator.clipboard.writeText(password);
  };
  return (
    <div className="w-full h-screen bg-slate-900 flex justify-center">
      <div>
        <h1 className="text-white flex justify-center">Password Generator:-</h1>
        <input
          type="text"
          value={password}
          ref={passref}
          className="min-w-56 min-h-10 rounded-3xl px-3"
        />
        <button
          onClick={copyClipboard}
          className="bg-blue-600 text-white px-4 py-3 rounded-3xl"
        >
          Copy
        </button>
        <br></br>
        <input
          type="range"
          min={8}
          max={20}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <h1 className="text-white">{length}</h1>
        <input
          type="checkbox"
          defaultChecked={numbers}
          onChange={(e) => setNumbers((prev) => !prev)}
        />
        <span className="text-white">Numbers Allowed</span>
        <input
          type="checkbox"
          defaultChecked={charallowed}
          onChange={(e) => setCharallowed((prev) => !prev)}
        />
        <span className="text-white">Characters Allowed</span>
      </div>
    </div>
  );
}

export default App;
