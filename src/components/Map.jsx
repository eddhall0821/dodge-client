import { Plane } from "@react-three/drei";

const Map = (props) => {
  return (
    <Plane
      args={[10, 10]}
      onContextMenu={(e) => props.handleClickMap(e)}
      onClick={(e) => props.handleClickMap(e)}
    />
  );
};

export default Map;
