const HEAD = (
    <div key="head"
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        border: "10px solid black",
        position: "absolute",
        top: "50px",
        right: "-30px",
      }}
    />
  );
  
  const BODY = (
    <div key="body"
      style={{
        width: "10px",
        height: "100px",
        background: "black",
        position: "absolute",
        top: "120px",
        right: "0px",
      }}
    />
  );
  
  const RIGHT_ARM = (
    <div key="right-arm"
      style={{
        width: "100px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "-100px",
        rotate: "-30deg",
        //  Rotate from left bottom, not center
        transformOrigin: "left bottom",
      }}
    />
  );
  
  const LEFT_ARM = (
    <div key="left-arm"
      style={{
        width: "100px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "10px",
        rotate: "30deg",
        //  Rotate from left bottom, not center
        transformOrigin: "right bottom",
      }}
    />
  );
  
  const LEFT_LEG = (
    <div key="left-leg"
      style={{
        width: "100px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "210px",
        right: "0px",
        rotate: "-60deg",
        transformOrigin: "right bottom",
      }}
    />
  );
  
  const RIGHT_LEG = (
    <div key="right-leg"
      style={{
        width: "100px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "210px",
        right: "-90px",
        rotate: "60deg",
        //  Rotate from left bottom, not center
        transformOrigin: "left bottom",
      }}
    />
  );
  
  // need these in order that will be drawn
  const BODY_PARTS = [ HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG ];

  // structure used for passing info to HangmanDrawing
  type HangmanDrawingProps = {
    numberOfGuesses: number,
  }


  export function HangmanDrawing({ numberOfGuesses } : HangmanDrawingProps) {
    return (
      <div style={{ position: "relative" }}>
        {/* {HEAD} {BODY} {RIGHT_ARM} {LEFT_ARM} {RIGHT_LEG} {LEFT_LEG} */}
  
        {/* Draw each part up to number of incorrect guesses */}
        { BODY_PARTS.slice(0, numberOfGuesses) }

        {/* These must be drawn from top to bottom */}
        {/* noose */}
        <div
          style={{
            height: "50px",
            width: "10px",
            background: "black",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
        {/* top bar */}
        <div
          style={{
            height: "10px",
            width: "200px",
            background: "black",
            marginLeft: "120px",
          }}
        />
        {/* Tall pole */}
        <div
          style={{
            height: "400px",
            width: "10px",
            background: "black",
            marginLeft: "120px",
          }}
        />
  
        {/* draw bottom */}
        <div style={{ height: "10px", width: "250px", background: "black" }} />
      </div>
    );
  }