const MatchPasswordInput = ({password, setPassword, className = "w-100"}) => {
  return (
    <>
        <input id="modalPassword" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className={className}/>
    </>
  )
}

export default MatchPasswordInput