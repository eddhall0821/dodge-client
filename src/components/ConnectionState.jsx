import React from "react";

export function ConnectionState({ isConnected }) {
  return (
    <>
      <p>Online: {"" + isConnected}</p>
      <div>Right click to move.</div>
      <div>Left click to fire.</div>
    </>
  );
}
