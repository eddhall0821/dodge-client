import { Plane } from "@react-three/drei";

const Map = (props) => {
  return (
    <Plane
      args={[50, 50]}
      onContextMenu={(e) => props.handleRightClickMap(e)}
      onClick={(e) => props.handleClickMap(e)}
    >
      <meshStandardMaterial receiveShadow />
    </Plane>
  );
};

export default Map;
