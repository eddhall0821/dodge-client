import { Box } from "@react-three/drei";

const Cursor = ({ position }) => {
  return (
    <>
      <mesh>
        <Box args={[2, 2, 1]} position={position}>
          <meshBasicMaterial color="green" />
        </Box>
      </mesh>
    </>
  );
};

export default Cursor;
