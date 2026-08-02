const Loading = () => {
  return (
    <div className="loading-wind">
      <h2>Loading</h2>
      <section className="loader">
        <div className="slider" style={{'--i': 0}}></div>
        <div className="slider" style={{"--i": 1}}></div>
        <div className="slider" style={{"--i": 2}}></div>
        <div className="slider" style={{"--i": 3}}></div>
        <div className="slider" style={{"--i": 4}}></div>
      </section>
    </div>
  );
}

export default Loading;