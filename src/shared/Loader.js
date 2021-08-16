import { PuffLoader } from 'react-spinners';

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export const Loader = () => {
  return <PuffLoader size="100px" css={styles} color={'#fff'} />;
};
