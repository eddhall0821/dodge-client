import React from "react";

export function ConnectionState({ isConnected }) {
  return <p>Online: {"" + isConnected}</p>;
}
